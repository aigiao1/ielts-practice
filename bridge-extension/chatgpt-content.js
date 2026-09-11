(() => {
  "use strict";

  let busy = false;

  function sendMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
        else resolve(response || {});
      });
    });
  }

  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async function waitFor(check, timeout = 30000, interval = 250) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const value = check();
      if (value) return value;
      await sleep(interval);
    }
    throw new Error("等待ChatGPT页面元素超时；请确认已经登录并打开正常对话页面");
  }

  function findComposer() {
    return document.querySelector("#prompt-textarea")
      || document.querySelector('[data-testid="prompt-textarea"]')
      || document.querySelector('textarea[data-id="root"]')
      || document.querySelector('main [contenteditable="true"]');
  }

  function setComposerValue(composer, text) {
    composer.focus();
    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const prototype = composer instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
      if (setter) setter.call(composer, text);
      else composer.value = text;
      composer.dispatchEvent(new Event("input", { bubbles: true }));
      composer.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(composer);
    selection.removeAllRanges();
    selection.addRange(range);
    const inserted = document.execCommand("insertText", false, text);
    if (!inserted || !composer.textContent.trim()) {
      composer.replaceChildren();
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      composer.append(paragraph);
      composer.dispatchEvent(new InputEvent("input", {
        bubbles: true,
        inputType: "insertText",
        data: text,
      }));
    }
  }

  function findSendButton() {
    const candidates = [
      '[data-testid="send-button"]',
      'button[aria-label="Send prompt"]',
      'button[aria-label="Send message"]',
      'button[aria-label*="发送"]',
      'form button[type="submit"]',
    ];
    return candidates.map((selector) => document.querySelector(selector)).find((button) => button && !button.disabled);
  }

  function assistantMessages() {
    return [...document.querySelectorAll('[data-message-author-role="assistant"]')];
  }

  function generating() {
    return Boolean(document.querySelector('[data-testid="stop-button"], button[aria-label="Stop generating"], button[aria-label*="停止生成"]'));
  }

  async function submitPrompt(prompt) {
    const initialCount = assistantMessages().length;
    const composer = await waitFor(findComposer, 30000);
    setComposerValue(composer, prompt);
    const sendButton = await waitFor(findSendButton, 10000);
    sendButton.click();

    await waitFor(() => assistantMessages().length > initialCount, 120000, 500);
    let previousText = "";
    let stableChecks = 0;
    const deadline = Date.now() + 240000;
    while (Date.now() < deadline) {
      const messages = assistantMessages();
      const text = messages.at(-1)?.innerText?.trim() || "";
      if (text && text === previousText && !generating()) stableChecks += 1;
      else stableChecks = 0;
      if (stableChecks >= 3) return text;
      previousText = text;
      await sleep(1000);
    }
    throw new Error("等待ChatGPT完成回复超过4分钟");
  }

  async function poll() {
    if (busy) return;
    let job;
    try {
      const response = await sendMessage({ type: "ielts-bridge-poll" });
      job = response.job;
    } catch {
      return;
    }
    if (!job) return;

    busy = true;
    try {
      const rawText = await submitPrompt(job.prompt);
      await sendMessage({ type: "ielts-bridge-complete", id: job.id, rawText });
    } catch (error) {
      await sendMessage({ type: "ielts-bridge-fail", id: job.id, error: error.message }).catch(() => {});
    } finally {
      busy = false;
    }
  }

  setInterval(poll, 2500);
  poll();
})();

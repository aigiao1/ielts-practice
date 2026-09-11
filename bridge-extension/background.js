const BRIDGE_ORIGIN = "http://127.0.0.1:8765";

async function getNextJob() {
  try {
    const response = await fetch(`${BRIDGE_ORIGIN}/bridge/jobs/next`, { cache: "no-store" });
    if (response.status === 204) return { job: null };
    if (!response.ok) return { job: null, error: `桥接服务返回 ${response.status}` };
    return { job: await response.json() };
  } catch {
    return { job: null, error: "本机桥接服务未启动" };
  }
}

async function completeJob(id, rawText) {
  const response = await fetch(`${BRIDGE_ORIGIN}/bridge/jobs/${encodeURIComponent(id)}/result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rawText }),
  });
  if (!response.ok) throw new Error(`无法回传批改结果：${response.status}`);
  return { ok: true };
}

async function failJob(id, error) {
  await fetch(`${BRIDGE_ORIGIN}/bridge/jobs/${encodeURIComponent(id)}/fail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error: String(error || "ChatGPT页面自动化失败") }),
  }).catch(() => {});
  return { ok: true };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!sender.tab || !/^(https:\/\/(chatgpt\.com|chat\.openai\.com)\/)/.test(sender.tab.url || "")) return false;
  let operation;
  if (message?.type === "ielts-bridge-poll") operation = getNextJob();
  else if (message?.type === "ielts-bridge-complete") operation = completeJob(message.id, message.rawText);
  else if (message?.type === "ielts-bridge-fail") operation = failJob(message.id, message.error);
  else return false;

  operation.then(sendResponse).catch((error) => sendResponse({ error: error.message }));
  return true;
});

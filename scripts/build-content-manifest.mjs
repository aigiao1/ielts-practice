// 自动扫描 content 目录并刷新生成 content/manifest.js
// 运行：node scripts/build-content-manifest.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const contentDir = path.join(rootDir, "content");

function loadJsModule(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const sandbox = { window: {}, module: { exports: {} } };
  const evalFn = new Function("window", "module", code);
  evalFn(sandbox.window, sandbox.module);
  return sandbox.module.exports || sandbox.window;
}

function scanPacks(dir) {
  const packs = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      packs.push(...scanPacks(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".js") && !["manifest.js", "schemas.js", "registry.js"].includes(entry.name)) {
      try {
        const loaded = loadJsModule(fullPath);
        const packObj = (loaded && loaded.packId) ? loaded : Object.values(loaded).find((v) => v && typeof v === "object" && v.packId);
        if (packObj) {
          const relPath = path.relative(rootDir, fullPath).replace(/\\/g, "/");
          packs.push({
            packId: packObj.packId,
            name: packObj.name || packObj.metadata?.sourceRef || packObj.packId,
            path: relPath,
            domain: packObj.domain,
            contentType: packObj.contentType,
            expectedCount: packObj.items ? packObj.items.length : undefined,
            canonical: Boolean(packObj.canonical),
            status: packObj.metadata?.status || "active",
            role: packObj.role || undefined
          });
        }
      } catch (e) {
        // 非 pack 辅助 JS 文件跳过
      }
    }
  }
  return packs;
}

const discoveredPacks = scanPacks(contentDir);
// 稳定排序
discoveredPacks.sort((a, b) => a.packId.localeCompare(b.packId));

const manifestContent = `// 雅思内容包静态注册清单 (Content Pack Manifest)
// 此清单由 scripts/build-content-manifest.mjs 自动生成或校验，为全站内容包发现的单一可信源
(() => {
  "use strict";

  const CONTENT_MANIFEST = {
    version: "1.0.0",
    packs: ${JSON.stringify(discoveredPacks, null, 4)}
  };

  if (typeof window !== "undefined") {
    window.CONTENT_MANIFEST = CONTENT_MANIFEST;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CONTENT_MANIFEST;
  }
})();
`;

fs.writeFileSync(path.join(contentDir, "manifest.js"), manifestContent, "utf8");
console.log(`[Manifest] 成功扫描并生成 content/manifest.js，共注册 ${discoveredPacks.length} 个 Pack：`);
discoveredPacks.forEach((p) => {
  console.log(`   • ${p.packId.padEnd(25)} [${p.domain}/${p.contentType}] (${p.expectedCount || 0} 项, status: ${p.status})`);
});

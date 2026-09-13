// Task 1 纯原生矢量图表交互渲染引擎 (Task 1 Native SVG Chart Renderer)
// 零外部依赖，支持饼图、柱图、对比表格，与题目输入框双向无缝联动
(() => {
  "use strict";

  class Task1ChartRenderer {
    /**
     * 极坐标转笛卡尔坐标辅助计算
     */
    static polarToCartesian(centerX, centerY, radius, angleInRadians) {
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    }

    /**
     * 渲染完整交互式图表容器 HTML
     */
    static renderChart(config) {
      if (!config) return "";

      const chartType = config.chartType || "pie";
      const title = config.chartTitle || "数据图表";
      const data = config.chartData || [];

      let chartSvgHtml = "";

      if (chartType === "pie" && data.length > 0) {
        chartSvgHtml = this.renderPieSvg(data);
      } else if (chartType === "table" && data.length > 0) {
        chartSvgHtml = this.renderTableHtml(data, config.unit);
      } else if (chartType === "bar" && data.length > 0) {
        chartSvgHtml = this.renderBarSvg(data, config.unit);
      } else {
        // 通用背景卡片
        chartSvgHtml = `
          <div class="generic-chart-box">
            <div class="generic-chart-icon">📊</div>
            <p class="generic-chart-text">${config.genericContext || "雅思学术类图表核心数据"}</p>
          </div>
        `;
      }

      return `
        <div class="task1-chart-card card-panel" id="task1ChartCard">
          <div class="chart-header">
            <div class="chart-tag-badge">IELTS Academic Task 1 视觉真图</div>
            <h4 class="chart-title">${title}</h4>
          </div>
          <div class="chart-viewport" id="chartViewport">
            ${chartSvgHtml}
          </div>
        </div>
      `;
    }

    /**
     * 渲染原生矢量 SVG 饼图
     */
    static renderPieSvg(data) {
      const cx = 130;
      const cy = 130;
      const radius = 100;
      const total = data.reduce((sum, d) => sum + Number(d.value || 0), 0) || 100;

      let currentAngle = -Math.PI / 2; // 从 12 点钟方向开始顺时针绘制
      const slicePaths = [];
      const labelElements = [];

      data.forEach((item) => {
        const val = Number(item.value || 0);
        const sliceAngle = (val / total) * (Math.PI * 2);
        const nextAngle = currentAngle + sliceAngle;

        const p1 = this.polarToCartesian(cx, cy, radius, currentAngle);
        const p2 = this.polarToCartesian(cx, cy, radius, nextAngle);
        const largeArc = sliceAngle > Math.PI ? 1 : 0;

        const pathD = `M ${cx} ${cy} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;

        // 计算文字标注的中心偏置角
        const midAngle = currentAngle + sliceAngle / 2;
        const textPos = this.polarToCartesian(cx, cy, radius * 0.65, midAngle);

        slicePaths.push(`
          <path d="${pathD}"
                fill="${item.color || '#e76f51'}"
                class="pie-slice"
                data-item-label="${item.label}"
                data-item-val="${val}%">
            <title>${item.label}: ${val}%</title>
          </path>
        `);

        // 如果扇区比例大于 8%，在内部绘制百分比标签
        if (val >= 8) {
          labelElements.push(`
            <text x="${textPos.x.toFixed(2)}"
                  y="${(textPos.y + 4).toFixed(2)}"
                  fill="#ffffff"
                  font-size="12"
                  font-weight="800"
                  text-anchor="middle"
                  class="pie-slice-label"
                  pointer-events="none">
              ${val}%
            </text>
          `);
        }

        currentAngle = nextAngle;
      });

      // 图例 (Legends)
      const legendHtml = data.map((item) => `
        <div class="pie-legend-item" data-legend-label="${item.label}">
          <span class="legend-color-dot" style="background-color: ${item.color || '#e76f51'};"></span>
          <span class="legend-name">${item.label}</span>
          <strong class="legend-val">${item.value}%</strong>
        </div>
      `).join("");

      return `
        <div class="pie-chart-wrapper">
          <svg viewBox="0 0 260 260" class="task1-pie-svg" id="task1PieSvg" aria-label="饼图">
            <!-- 柔和背景圆 -->
            <circle cx="${cx}" cy="${cy}" r="${radius + 2}" fill="#fdfbf7" stroke="#e8dfd3" stroke-width="1.5" />
            <!-- 扇区 -->
            <g class="pie-slices-group">
              ${slicePaths.join("")}
            </g>
            <!-- 扇区中心点点缀 (Donut 中心孔) -->
            <circle cx="${cx}" cy="${cy}" r="32" fill="#ffffff" stroke="#e8dfd3" stroke-width="2" />
            <text x="${cx}" y="${cy - 2}" font-size="9" font-weight="800" fill="#7a7065" text-anchor="middle">TOTAL</text>
            <text x="${cx}" y="${cy + 13}" font-size="12" font-weight="900" fill="#9b4b1d" text-anchor="middle">100%</text>
            <!-- 扇区文字 -->
            <g class="pie-labels-group">
              ${labelElements.join("")}
            </g>
          </svg>
          <div class="pie-legends-grid">
            ${legendHtml}
          </div>
        </div>
      `;
    }

    /**
     * 渲染优雅学术表格 (Table View)
     */
    static renderTableHtml(data, unit = "") {
      return `
        <div class="task1-table-wrapper">
          <table class="task1-styled-table">
            <thead>
              <tr>
                <th>主体项目 (Category)</th>
                <th>数值 (${unit || "量值"})</th>
                <th>特征与比较 (Key Feature)</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((row) => `
                <tr data-table-row="${row.label}">
                  <td class="table-cat-cell"><strong>${row.label}</strong></td>
                  <td class="table-val-cell"><span class="table-num-badge">${row.value}</span></td>
                  <td class="table-note-cell">${row.note || "—"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    /**
     * 渲染原生水平对比柱图 (Bar Chart)
     */
    static renderBarSvg(data, unit = "%") {
      const maxVal = Math.max(...data.map((d) => Number(d.value || 0)), 100);

      return `
        <div class="task1-bar-wrapper">
          ${data.map((item) => {
            const val = Number(item.value || 0);
            const widthPct = Math.min(100, Math.round((val / maxVal) * 100));
            return `
              <div class="bar-row-item" data-bar-label="${item.label}">
                <div class="bar-label-line">
                  <span class="bar-name">${item.label}</span>
                  <strong class="bar-value">${val} ${unit}</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${widthPct}%; background-color: ${item.color || '#e76f51'};"></div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    /**
     * 高亮指定目标图表扇区/元素
     */
    static highlightElements(targetLabels = []) {
      const svg = document.getElementById("task1PieSvg");
      if (!svg) return;

      const normalizedTargets = targetLabels.map((t) => t.toLowerCase());

      // 扇区联动
      svg.querySelectorAll(".pie-slice").forEach((slice) => {
        const lbl = (slice.dataset.itemLabel || "").toLowerCase();
        const isMatch = normalizedTargets.some((t) => lbl.includes(t) || t.includes(lbl.split(" ")[0]));
        slice.classList.toggle("slice-highlighted", isMatch);
      });

      // 图例联动
      document.querySelectorAll(".pie-legend-item").forEach((leg) => {
        const lbl = (leg.dataset.legendLabel || "").toLowerCase();
        const isMatch = normalizedTargets.some((t) => lbl.includes(t) || t.includes(lbl.split(" ")[0]));
        leg.classList.toggle("legend-highlighted", isMatch);
      });
    }

    /**
     * 清除全部高亮
     */
    static clearHighlights() {
      document.querySelectorAll(".slice-highlighted, .legend-highlighted").forEach((el) => {
        el.classList.remove("slice-highlighted", "legend-highlighted");
      });
    }
  }

  if (typeof window !== "undefined") {
    window.Task1ChartRenderer = Task1ChartRenderer;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Task1ChartRenderer;
  }
})();

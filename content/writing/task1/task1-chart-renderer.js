// Task 1 纯原生矢量图表交互渲染引擎 (Task 1 Native SVG Chart Renderer)
// 零外部依赖，支持饼图、折线图、分组柱图、对比双饼、工艺流程图、地图演变图与表格
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
      const data = config.chartData;

      let chartContentHtml = "";

      if (chartType === "pie" && Array.isArray(data) && data.length > 0) {
        chartContentHtml = this.renderPieSvg(data);
      } else if (chartType === "dual_pie" && data && data.pieA && data.pieB) {
        chartContentHtml = this.renderDualPieHtml(data);
      } else if (chartType === "line" && data && data.series) {
        chartContentHtml = this.renderLineSvg(data);
      } else if ((chartType === "bar" || chartType === "bar_grouped" || chartType === "bar_compare") && data) {
        chartContentHtml = this.renderBarSvg(data, config.unit);
      } else if ((chartType === "flow" || chartType === "flow_circular") && data && data.steps) {
        chartContentHtml = this.renderProcessFlowHtml(data);
      } else if (chartType === "map" && data && data.periods) {
        chartContentHtml = this.renderMapHtml(data);
      } else if (chartType === "mixed" && data) {
        chartContentHtml = this.renderMixedHtml(data);
      } else if (chartType === "table" && Array.isArray(data) && data.length > 0) {
        chartContentHtml = this.renderTableHtml(data, config.unit);
      } else {
        // 通用背景卡片兜底
        chartContentHtml = `
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
            ${chartContentHtml}
          </div>
        </div>
      `;
    }

    /**
     * 1. 渲染原生矢量 SVG 单饼图 (Pie Chart)
     */
    static renderPieSvg(data, opts = {}) {
      const cx = opts.cx || 130;
      const cy = opts.cy || 130;
      const radius = opts.radius || 100;
      const total = data.reduce((sum, d) => sum + Number(d.value || 0), 0) || 100;

      let currentAngle = -Math.PI / 2;
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
            <circle cx="${cx}" cy="${cy}" r="${radius + 2}" fill="#fdfbf7" stroke="#e8dfd3" stroke-width="1.5" />
            <g class="pie-slices-group">
              ${slicePaths.join("")}
            </g>
            <circle cx="${cx}" cy="${cy}" r="32" fill="#ffffff" stroke="#e8dfd3" stroke-width="2" />
            <text x="${cx}" y="${cy - 2}" font-size="9" font-weight="800" fill="#7a7065" text-anchor="middle">TOTAL</text>
            <text x="${cx}" y="${cy + 13}" font-size="12" font-weight="900" fill="#9b4b1d" text-anchor="middle">100%</text>
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
     * 2. 渲染双饼对比图 (Dual Pie)
     */
    static renderDualPieHtml(data) {
      const renderMiniDonut = (pie, id) => {
        const cx = 80;
        const cy = 80;
        const radius = 65;
        const total = (pie.data || []).reduce((sum, d) => sum + Number(d.value || 0), 0) || 100;
        let cur = -Math.PI / 2;
        const paths = [];

        (pie.data || []).forEach((item) => {
          const val = Number(item.value || 0);
          const ang = (val / total) * (Math.PI * 2);
          const next = cur + ang;
          const p1 = this.polarToCartesian(cx, cy, radius, cur);
          const p2 = this.polarToCartesian(cx, cy, radius, next);
          const large = ang > Math.PI ? 1 : 0;
          const d = `M ${cx} ${cy} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
          paths.push(`
            <path d="${d}" fill="${item.color || '#2a9d8f'}" class="pie-slice" data-item-label="${pie.title} ${item.label}">
              <title>${pie.title} - ${item.label}: ${val}%</title>
            </path>
          `);
          cur = next;
        });

        return `
          <div class="mini-pie-box">
            <h5 class="mini-pie-title">${pie.title}</h5>
            <svg viewBox="0 0 160 160" class="mini-pie-svg">
              <circle cx="${cx}" cy="${cy}" r="${radius + 2}" fill="#fdfbf7" stroke="#e8dfd3" stroke-width="1" />
              <g>${paths.join("")}</g>
              <circle cx="${cx}" cy="${cy}" r="22" fill="#ffffff" stroke="#e8dfd3" stroke-width="1.5" />
            </svg>
            <div class="mini-pie-sub-legends">
              ${(pie.data || []).map((d) => `
                <div class="mini-legend-row" data-legend-label="${pie.title} ${d.label}">
                  <span class="legend-color-dot" style="background-color: ${d.color};"></span>
                  <span>${d.label}</span>
                  <strong>${d.value}%</strong>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      };

      return `
        <div class="dual-pie-container">
          ${renderMiniDonut(data.pieA, "pieA")}
          ${renderMiniDonut(data.pieB, "pieB")}
        </div>
      `;
    }

    /**
     * 3. 渲染原生矢量 SVG 动态折线图 (Line Chart)
     */
    static renderLineSvg(data) {
      const xLabels = data.xLabels || [];
      const series = data.series || [];
      const yMin = data.yMin !== undefined ? data.yMin : 0;
      const yMax = data.yMax || 100;
      const yUnit = data.yUnit || "";

      const width = 420;
      const height = 210;
      const padLeft = 45;
      const padRight = 20;
      const padTop = 25;
      const padBottom = 35;
      const plotW = width - padLeft - padRight;
      const plotH = height - padTop - padBottom;

      const getX = (i) => padLeft + (xLabels.length > 1 ? (i / (xLabels.length - 1)) * plotW : plotW / 2);
      const getY = (v) => padTop + plotH - ((Number(v) - yMin) / (yMax - yMin || 1)) * plotH;

      // 4 条背景横虚线及 Y 轴文字
      const yTicks = [0, 0.33, 0.66, 1].map((pct) => {
        const val = Math.round(yMin + pct * (yMax - yMin));
        const y = padTop + plotH - pct * plotH;
        return `
          <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#ebe4d8" stroke-dasharray="3,3" stroke-width="1" />
          <text x="${padLeft - 6}" y="${y + 4}" font-size="10" font-weight="700" fill="#9a8e82" text-anchor="end">${val}</text>
        `;
      }).join("");

      // X 轴刻度及文字
      const xTicks = xLabels.map((lbl, idx) => {
        const x = getX(idx);
        return `
          <line x1="${x}" y1="${padTop + plotH}" x2="${x}" y2="${padTop + plotH + 4}" stroke="#7a7065" stroke-width="1.5" />
          <text x="${x}" y="${padTop + plotH + 18}" font-size="11" font-weight="700" fill="#685e54" text-anchor="middle">${lbl}</text>
        `;
      }).join("");

      // 多条折线与数据拐点
      const linesSvg = series.map((s) => {
        const points = s.points || [];
        const pathCoords = points.map((p, i) => `${getX(i).toFixed(1)},${getY(p).toFixed(1)}`).join(" L ");
        const d = `M ${pathCoords}`;

        const dots = points.map((p, i) => {
          const cx = getX(i);
          const cy = getY(p);
          return `
            <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5"
                    fill="${s.color || '#2a9d8f'}" stroke="#ffffff" stroke-width="1.5"
                    class="line-dot" data-item-label="${s.label}" data-point-val="${p}">
              <title>${s.label} (${xLabels[i]}): ${p} ${yUnit}</title>
            </circle>
            <text x="${cx.toFixed(1)}" y="${(cy - 7).toFixed(1)}" font-size="9" font-weight="800" fill="${s.color || '#2a9d8f'}" text-anchor="middle" pointer-events="none">${p}</text>
          `;
        }).join("");

        return `
          <g class="line-series-group" data-series-label="${s.label}">
            <path d="${d}" fill="none" stroke="${s.color || '#2a9d8f'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="line-path" data-item-label="${s.label}" />
            ${dots}
          </g>
        `;
      }).join("");

      // 图例 (Legends)
      const legendHtml = series.map((s) => `
        <div class="line-legend-item" data-legend-label="${s.label}">
          <span class="legend-color-line" style="background-color: ${s.color};"></span>
          <span class="legend-name">${s.label}</span>
          <span class="legend-trend-badge">${s.points[0]} ➔ ${s.points[s.points.length - 1]} ${yUnit}</span>
        </div>
      `).join("");

      return `
        <div class="task1-line-wrapper">
          <svg viewBox="0 0 ${width} ${height}" class="task1-line-svg" id="task1LineSvg">
            <rect x="${padLeft}" y="${padTop}" width="${plotW}" height="${plotH}" fill="#faf7f2" rx="4" />
            <g class="grid-group">${yTicks}</g>
            <line x1="${padLeft}" y1="${padTop + plotH}" x2="${width - padRight}" y2="${padTop + plotH}" stroke="#8c8072" stroke-width="1.5" />
            <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="#8c8072" stroke-width="1.5" />
            <g class="x-axis-group">${xTicks}</g>
            <g class="lines-group">${linesSvg}</g>
          </svg>
          <div class="line-legends-bar">
            ${legendHtml}
          </div>
        </div>
      `;
    }

    /**
     * 4. 渲染原生水平/垂直对比柱状图 (Bar Chart)
     */
    static renderBarSvg(data, unit = "%") {
      // 模式 A：分组多系列柱图
      if (data.categories && data.series) {
        const categories = data.categories;
        const series = data.series;
        const allVals = series.flatMap((s) => s.values || []);
        const maxVal = Math.max(...allVals, 10);

        return `
          <div class="grouped-bar-container">
            <div class="grouped-bar-legends">
              ${series.map((s) => `
                <div class="bar-series-legend" data-legend-label="${s.name}">
                  <span class="legend-color-dot" style="background-color:${s.color};"></span>
                  <span>${s.name}</span>
                </div>
              `).join("")}
            </div>
            <div class="grouped-bar-grid">
              ${categories.map((cat, catIdx) => `
                <div class="grouped-category-card">
                  <div class="grouped-cat-title">${cat}</div>
                  <div class="grouped-bars-row">
                    ${series.map((s) => {
                      const val = s.values[catIdx] || 0;
                      const pct = Math.min(100, Math.round((val / maxVal) * 100));
                      return `
                        <div class="single-bar-col bar-item" data-item-label="${cat} ${s.name}">
                          <div class="bar-col-track">
                            <div class="bar-col-fill" style="height:${pct}%; background-color:${s.color};">
                              <span class="bar-col-val">${val}${unit || ""}</span>
                            </div>
                          </div>
                          <span class="bar-sub-label">${s.name}</span>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }

      // 模式 B：标准单维度条形图
      const list = Array.isArray(data) ? data : (data.items || []);
      const maxVal = Math.max(...list.map((d) => Number(d.value || 0)), 100);

      return `
        <div class="task1-bar-wrapper">
          ${list.map((item) => {
            const val = Number(item.value || 0);
            const widthPct = Math.min(100, Math.round((val / maxVal) * 100));
            return `
              <div class="bar-row-item bar-item" data-item-label="${item.label}">
                <div class="bar-label-line">
                  <span class="bar-name">${item.label}</span>
                  <strong class="bar-value">${val} ${item.unit || unit}</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${widthPct}%; background-color: ${item.color || '#e76f51'};"></div>
                </div>
                ${item.note ? `<div class="bar-subnote">${item.note}</div>` : ""}
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    /**
     * 5. 渲染工业工序与生物生命周期流程图 (Process Flow)
     */
    static renderProcessFlowHtml(data) {
      const steps = data.steps || [];
      const isCircular = Boolean(data.isCircular);

      return `
        <div class="task1-flow-wrapper ${isCircular ? 'is-circular-flow' : 'is-linear-flow'}">
          <div class="flow-steps-grid">
            ${steps.map((st, idx) => `
              <div class="flow-step-card" data-item-label="${st.label} ${st.en || ''}">
                <div class="flow-step-header">
                  <span class="flow-step-num">Step ${st.step || idx + 1}</span>
                  <span class="flow-step-icon">${st.icon || '⚙️'}</span>
                </div>
                <h5 class="flow-step-title">${st.label}</h5>
                <p class="flow-step-en">${st.en || ''}</p>
                ${st.note ? `<span class="flow-step-note">${st.note}</span>` : ''}
              </div>
              ${idx < steps.length - 1 ? `
                <div class="flow-arrow-node">
                  <span class="flow-arrow-symbol">➔</span>
                </div>
              ` : ''}
            `).join("")}
          </div>
          ${isCircular ? `
            <div class="flow-loop-badge">
              <span>🔄 闭环循环：最终产卵/回收再进入下一轮循环 (Cycle repeats automatically)</span>
            </div>
          ` : ''}
        </div>
      `;
    }

    /**
     * 6. 渲染规划演变与平面地图 (Map Layout)
     */
    static renderMapHtml(data) {
      const periods = data.periods || [];

      return `
        <div class="task1-map-wrapper">
          <div class="map-compass-badge">🧭 北 (North) ↑</div>
          <div class="map-periods-grid">
            ${periods.map((p) => `
              <div class="map-period-card">
                <div class="map-period-header">
                  <span class="period-pill">${p.title}</span>
                </div>
                <div class="map-zones-cluster">
                  ${(p.zones || []).map((z) => `
                    <div class="map-zone-card zone-type-${z.type || 'generic'} ${z.status ? 'status-' + z.status : ''}" data-item-label="${z.label} ${z.en || ''}">
                      <div class="zone-top-row">
                        <strong class="zone-label">${z.label}</strong>
                        ${z.statusBadge ? `<span class="zone-badge">${z.statusBadge}</span>` : ''}
                      </div>
                      <div class="zone-en">${z.en || ''}</div>
                      ${z.desc ? `<div class="zone-desc">${z.desc}</div>` : ''}
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    /**
     * 7. 渲染混合图表 (Mixed Chart: e.g. 游客柱图 + 占比饼图)
     */
    static renderMixedHtml(data) {
      return `
        <div class="task1-mixed-wrapper">
          <div class="mixed-sub-block">
            <h5 class="mixed-sub-title">${data.partA?.title || "图 1：总量走势"}</h5>
            ${data.partA?.type === "line" ? this.renderLineSvg(data.partA.data) : this.renderBarSvg(data.partA.data)}
          </div>
          <div class="mixed-sub-block" style="margin-top:14px;">
            <h5 class="mixed-sub-title">${data.partB?.title || "图 2：结构分布"}</h5>
            ${this.renderPieSvg(data.partB?.data || [])}
          </div>
        </div>
      `;
    }

    /**
     * 8. 渲染对比表格 (Table View)
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
     * 全局高亮指定目标元素（支持扇区、折线拐点、柱子、流程卡片、地图区块）
     */
    static highlightElements(targetLabels = []) {
      if (!Array.isArray(targetLabels) || targetLabels.length === 0) return;

      const normalizedTargets = targetLabels.map((t) => String(t).toLowerCase().trim());

      const matchElement = (el, attr = "itemLabel") => {
        const lbl = (el.dataset[attr] || el.textContent || "").toLowerCase();
        return normalizedTargets.some((t) => lbl.includes(t) || t.includes(lbl.split(" ")[0]));
      };

      // 1. 饼图
      document.querySelectorAll(".pie-slice, .pie-legend-item").forEach((el) => {
        el.classList.toggle("slice-highlighted", matchElement(el, "itemLabel") || matchElement(el, "legendLabel"));
      });

      // 2. 折线图
      document.querySelectorAll(".line-dot, .line-path, .line-legend-item").forEach((el) => {
        el.classList.toggle("line-highlighted", matchElement(el, "itemLabel") || matchElement(el, "legendLabel"));
      });

      // 3. 柱图
      document.querySelectorAll(".bar-item, .bar-row-item").forEach((el) => {
        el.classList.toggle("bar-highlighted", matchElement(el, "itemLabel"));
      });

      // 4. 流程图
      document.querySelectorAll(".flow-step-card").forEach((el) => {
        el.classList.toggle("flow-highlighted", matchElement(el, "itemLabel"));
      });

      // 5. 地图
      document.querySelectorAll(".map-zone-card").forEach((el) => {
        el.classList.toggle("map-highlighted", matchElement(el, "itemLabel"));
      });
    }

    /**
     * 清除全部图表高亮
     */
    static clearHighlights() {
      document.querySelectorAll(`
        .slice-highlighted,
        .line-highlighted,
        .bar-highlighted,
        .flow-highlighted,
        .map-highlighted
      `).forEach((el) => {
        el.classList.remove(
          "slice-highlighted",
          "line-highlighted",
          "bar-highlighted",
          "flow-highlighted",
          "map-highlighted"
        );
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

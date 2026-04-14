(() => {
  const pages = [
    { href: "./index.html", label: "导览首页", key: "index.html" },
    { href: "./system-login-zh-b8fe7fb8.html", label: "登录入口", key: "system-login-zh-b8fe7fb8.html" },
    { href: "./asset-management-zh-d43e2f37.html", label: "业务资产", key: "asset-management-zh-d43e2f37.html" },
    { href: "./merchant-management-zh-f4b87970.html", label: "商户管理", key: "merchant-management-zh-f4b87970.html" },
    { href: "./business-dashboard-zh-ea70f768.html", label: "经营分析", key: "business-dashboard-zh-ea70f768.html" },
    { href: "./ai-site-inspection-alert-zh.html", label: "AI巡检", key: "ai-site-inspection-alert-zh.html" }
  ];
  const businessKeys = [
    "asset-management-zh-d43e2f37.html",
    "merchant-management-zh-f4b87970.html",
    "business-dashboard-zh-ea70f768.html",
    "ai-site-inspection-alert-zh.html"
  ];

  const current = window.location.pathname.split("/").pop() || "index.html";
  let visiblePages = pages.filter((page) => page.key !== current);

  if (businessKeys.includes(current)) {
    visiblePages = pages.filter((page) =>
      page.key === "index.html" || page.key === "system-login-zh-b8fe7fb8.html"
    );
  } else if (current === "system-login-zh-b8fe7fb8.html") {
    visiblePages = pages.filter((page) => page.key !== current);
  } else if (current === "index.html") {
    visiblePages = pages.filter((page) => page.key !== current);
  }

  if (!visiblePages.length) return;

  const style = document.createElement("style");
  style.textContent = `
    .stitch-nav {
      position: fixed;
      top: 16px;
      left: calc(100vw - 336px);
      z-index: 2147483647;
      width: min(320px, calc(100vw - 24px));
      border: 1px solid rgba(196, 198, 208, 0.72);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 24px 48px rgba(25, 28, 30, 0.12);
      backdrop-filter: blur(16px);
      color: #191c1e;
      font-family: Inter, system-ui, sans-serif;
      overflow: hidden;
      user-select: none;
    }
    .stitch-nav__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      background: linear-gradient(135deg, #001736 0%, #002b5b 100%);
      color: #fff;
      cursor: grab;
    }
    .stitch-nav__head:active { cursor: grabbing; }
    .stitch-nav__title {
      font: 700 13px/1.2 Manrope, Inter, sans-serif;
      letter-spacing: 0.03em;
    }
    .stitch-nav__hint {
      font-size: 11px;
      opacity: 0.76;
    }
    .stitch-nav__list {
      padding: 10px;
      display: grid;
      gap: 8px;
    }
    .stitch-nav__link {
      display: block;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(242, 244, 246, 0.95);
      color: #191c1e;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: transform 120ms ease, background-color 120ms ease, color 120ms ease;
    }
    .stitch-nav__link:hover {
      transform: translateY(-1px);
      background: #e6f8ff;
      color: #002b5b;
    }
    .stitch-nav__link--active {
      background: #002b5b;
      color: #fff;
    }
    .stitch-nav__footer {
      padding: 2px 14px 14px;
      font-size: 13px;
      color: #001736;
      font-weight: 800;
      letter-spacing: 0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .stitch-nav__drag-dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #00a3c4;
      box-shadow: 0 0 0 4px rgba(0, 163, 196, 0.14);
      flex: 0 0 auto;
    }
    @media (max-width: 720px) {
      .stitch-nav {
        bottom: 12px;
        left: 12px;
        width: min(320px, calc(100vw - 24px));
      }
    }
  `;

  const nav = document.createElement("aside");
  nav.className = "stitch-nav";

  const links = visiblePages
    .map((page) => {
      return `<a class="stitch-nav__link" href="${page.href}">${page.label}</a>`;
    })
    .join("");

  nav.innerHTML = `
    <div class="stitch-nav__head">
      <div>
        <div class="stitch-nav__title">BusinessSystemDemo</div>
        <div class="stitch-nav__hint">页面快捷入口</div>
      </div>
      <div class="stitch-nav__hint">${visiblePages.length} 个页面</div>
    </div>
    <nav class="stitch-nav__list">${links}</nav>
    <div class="stitch-nav__footer"><span class="stitch-nav__drag-dot"></span>拖动顶部标题栏，可自由移动此窗口</div>
  `;

  document.head.appendChild(style);
  document.body.appendChild(nav);

  const setDefaultPosition = () => {
    const margin = 16;
    const width = nav.offsetWidth;
    nav.style.left = `${Math.max(margin, window.innerWidth - width - margin)}px`;
    nav.style.top = `${margin}px`;
  };

  setDefaultPosition();

  let dragState = null;
  const head = nav.querySelector(".stitch-nav__head");

  head.addEventListener("pointerdown", (event) => {
    dragState = {
      startX: event.clientX,
      startY: event.clientY,
      left: nav.offsetLeft,
      top: nav.offsetTop
    };
    head.setPointerCapture(event.pointerId);
  });

  head.addEventListener("pointermove", (event) => {
    if (!dragState) return;
    const nextLeft = dragState.left + (event.clientX - dragState.startX);
    const nextTop = dragState.top + (event.clientY - dragState.startY);
    const maxLeft = window.innerWidth - nav.offsetWidth - 8;
    const maxTop = window.innerHeight - nav.offsetHeight - 8;
    nav.style.left = `${Math.min(Math.max(8, nextLeft), Math.max(8, maxLeft))}px`;
    nav.style.top = `${Math.min(Math.max(8, nextTop), Math.max(8, maxTop))}px`;
  });

  const clearDrag = (event) => {
    if (!dragState) return;
    dragState = null;
    if (event) head.releasePointerCapture(event.pointerId);
  };

  head.addEventListener("pointerup", clearDrag);
  head.addEventListener("pointercancel", clearDrag);

  window.addEventListener("resize", () => {
    const maxLeft = window.innerWidth - nav.offsetWidth - 8;
    const maxTop = window.innerHeight - nav.offsetHeight - 8;
    nav.style.left = `${Math.min(nav.offsetLeft, Math.max(8, maxLeft))}px`;
    nav.style.top = `${Math.min(nav.offsetTop, Math.max(8, maxTop))}px`;
  });
})();

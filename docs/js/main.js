/* ==========================================================
   HackLab Inc. — interactions & motion
   ========================================================== */
(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Colour themes ---------- */
  const root = document.documentElement;
  const themeColor = { sky: "#d3e7fb", mint: "#cfeee3", sunrise: "#ffe0c7" };
  const themeMain = { sky: "#2490f3", mint: "#00a884", sunrise: "#ff5a36" };
  const favicon = $('link[rel="icon"]');
  // tab icon = the logo's "0x48" block in the theme's main colour
  const faviconFor = (c) =>
    "data:image/svg+xml," + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect x="2" y="7" width="36" height="26" rx="4" fill="${c}"/>` +
      `<text x="20" y="25.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="12" fill="#fff">0x48</text></svg>`
    );
  const themeListeners = [];
  const themeButtons = $$("[data-theme-set]");

  const setTheme = (name) => {
    root.dataset.theme = name;
    try { localStorage.setItem("hl-theme", name); } catch (_) { /* not persisted */ }
    themeButtons.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.themeSet === name)));
    $('meta[name="theme-color"]')?.setAttribute("content", themeColor[name]);
    favicon?.setAttribute("href", faviconFor(themeMain[name]));
    themeListeners.forEach((fn) => fn());
  };

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const name = btn.dataset.themeSet;
      if (name === root.dataset.theme) return;

      if (document.startViewTransition && !reduceMotion) {
        // new palette spreads out in a circle from the clicked swatch
        const r = btn.getBoundingClientRect();
        const x = e.clientX || r.left + r.width / 2;
        const y = e.clientY || r.top + r.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const vt = document.startViewTransition(() => setTheme(name));
        vt.ready.then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 1000, easing: "cubic-bezier(.65, 0, .35, 1)", pseudoElement: "::view-transition-new(root)" }
          );
        }).catch(() => {});
      } else {
        root.classList.add("theme-anim");
        setTheme(name);
        setTimeout(() => root.classList.remove("theme-anim"), 700);
      }
    });
  });
  setTheme(root.dataset.theme || "sky");

  /* ---------- Split headings into characters ---------- */
  $$("[data-split]").forEach((el) => {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--i", i + (el.closest(".line")?.previousElementSibling ? 7 : 0));
      span.textContent = ch;
      el.appendChild(span);
    });
  });

  // Each character paints its own slice of one shared gradient (offsetLeft ignores transforms)
  const measureChars = () => {
    $$("[data-split]").forEach((el) => {
      const chars = $$(".char", el);
      const x0 = chars[0]?.offsetLeft || 0;
      chars.forEach((c) => c.style.setProperty("--x", `${c.offsetLeft - x0}px`));
    });
  };
  measureChars();
  document.fonts?.ready.then(measureChars);
  addEventListener("resize", measureChars);

  /* ---------- Stagger indexes & delays ---------- */
  $$('[data-anim="stagger"]').forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty("--i", i));
  });
  $$("[data-delay]").forEach((el) => el.style.setProperty("--d", `${el.dataset.delay}ms`));

  /* ---------- Opening sequence ---------- */
  const loader = $("#loader");
  const count = $("#loaderCount");
  const bar = $("#loaderBar");

  // Full-length intro on the first visit of a session, a shorter one afterwards.
  let timeScale = 1;
  try {
    if (sessionStorage.getItem("hl-intro-seen")) timeScale = 0.5;
    sessionStorage.setItem("hl-intro-seen", "1");
  } catch (_) { /* storage unavailable: always play the full intro */ }
  loader.style.setProperty("--t", timeScale);

  // tagline → characters
  const tagline = $("#loaderTagline");
  [...tagline.textContent].forEach((ch, i, all) => {
    if (i === 0) tagline.textContent = "";
    const span = document.createElement("span");
    span.className = "char";
    span.style.setProperty("--i", i);
    span.textContent = ch;
    tagline.appendChild(span);
  });

  // rising sparks
  const sparkBox = $("#loaderSparks");
  const sparkColors = ["var(--accent)", "var(--orb-2)", "var(--orb-2)", "var(--accent-2)"];
  for (let i = 0; i < 34; i++) {
    const s = document.createElement("i");
    const size = 1.5 + Math.random() * 3.5;
    s.style.cssText = [
      `--x:${Math.random() * 100}%`,
      `--s:${size}px`,
      `--c:${sparkColors[i % sparkColors.length]}`,
      `--d:${4 + Math.random() * 4}s`,
      `--delay:${Math.random() * 3}s`,
      `--dx:${(Math.random() - 0.5) * 160}px`,
    ].join(";");
    sparkBox.appendChild(s);
  }

  const startPage = () => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    // hero reveals fire as the iris opens
    $$(".hero [data-anim]").forEach((el) => el.classList.add("is-in"));
    startTyping();
    startHeroVideo();
  };

  let exited = false;
  const exitIntro = () => {
    if (exited) return;
    exited = true;
    count.textContent = "0x64";
    bar.style.width = "100%";
    loader.classList.add("is-done");
    startPage();
    setTimeout(() => loader.classList.add("is-hidden"), 2300 * timeScale);
  };

  if (reduceMotion) {
    loader.classList.add("is-hidden");
    // run after the rest of this script has initialised (typing, video, …)
    queueMicrotask(startPage);
  } else {
    // light sweep across the logo once it has been drawn
    setTimeout(() => {
      $$("#intro-shine-x1, #intro-shine-x2").forEach((a) => a.beginElement?.());
    }, 2300 * timeScale);

    loader.classList.add("is-running");
    const duration = 3400 * timeScale;
    const hold = 700 * timeScale;
    const t0 = performance.now();
    const tick = (now) => {
      if (exited) return;
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2.2);
      const v = Math.round(eased * 100);
      count.textContent = "0x" + v.toString(16).toUpperCase().padStart(2, "0");
      bar.style.width = `${v}%`;
      if (p < 1) return requestAnimationFrame(tick);
      setTimeout(exitIntro, hold);
    };
    requestAnimationFrame(tick);

    // let impatient visitors skip
    loader.addEventListener("click", exitIntro);
    addEventListener("keydown", exitIntro, { once: true });
  }

  /* ---------- Hero background video ---------- */
  const heroVideo = $("#heroVideo");
  const videoBtn = $("#heroVideoToggle");
  let startHeroVideo = () => {};
  if (heroVideo) {
    const wrap = heroVideo.parentElement;
    const saveData = navigator.connection?.saveData;
    let userPaused = reduceMotion || saveData; // motion-sensitive / data-saving visitors get the still frame
    let inView = true;
    let loaded = false;

    const syncBtn = () => {
      videoBtn.setAttribute("aria-pressed", String(userPaused));
      videoBtn.setAttribute("aria-label", userPaused ? "背景動画を再生" : "背景動画を一時停止");
    };
    const load = () => {
      if (loaded) return;
      loaded = true;
      // 1080p only for large screens; phones and tablets get the lighter 720p file
      const hd = innerWidth >= 1100 && innerWidth * Math.min(devicePixelRatio || 1, 2) > 1600;
      heroVideo.src = hd ? heroVideo.dataset.srcHd : heroVideo.dataset.srcSd;
    };
    const update = () => {
      if (!userPaused && inView && document.body.classList.contains("is-ready")) {
        load();
        heroVideo.play().then(() => wrap.classList.add("is-playing")).catch(() => {});
      } else {
        heroVideo.pause();
      }
    };

    startHeroVideo = update;
    syncBtn();
    videoBtn.addEventListener("click", () => {
      userPaused = !userPaused;
      syncBtn();
      update();
    });
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); }).observe(wrap);
    document.addEventListener("visibilitychange", () => (document.hidden ? heroVideo.pause() : update()));
  }

  /* ---------- Terminal typing ---------- */
  const lines = [
    ['<span class="t-prompt">❯</span> ', "hacklab init --project your-idea"],
    ['<span class="t-dim">', "  ✔ requirements analyzed by AI", "</span>"],
    ['<span class="t-dim">', "  ✔ architecture: Flutter + Spring + AWS", "</span>"],
    ['<span class="t-prompt">❯</span> ', "hacklab build --ai-assisted"],
    ['<span class="t-key">', "  ⚡ est. 4 months → ~1 month", "</span>"],
    ['<span class="t-ok">', "  ✔ deployed. monitoring: auto", "</span>"],
  ];
  let typingStarted = false;

  function startTyping() {
    const out = $("#typing");
    if (!out || typingStarted) return;
    typingStarted = true;
    if (reduceMotion) {
      out.innerHTML = lines.map(([a, b, c = ""]) => a + b + c).join("\n");
      return;
    }
    let li = 0;
    let ci = 0;
    let done = "";
    const step = () => {
      if (li >= lines.length) {
        setTimeout(() => { done = ""; li = 0; ci = 0; out.innerHTML = ""; step(); }, 4000);
        return;
      }
      const [pre, body, post = ""] = lines[li];
      ci++;
      out.innerHTML = done + pre + body.slice(0, ci) + post;
      if (ci >= body.length) {
        done += pre + body + post + "\n";
        li++;
        ci = 0;
        setTimeout(step, pre.includes("t-prompt") ? 500 : 280);
      } else {
        setTimeout(step, pre.includes("t-prompt") ? 45 : 14);
      }
    };
    setTimeout(step, 2600);
  }

  /* ---------- Scroll reveal ---------- */
  // Fully clipped elements never report an intersection, so "reveal" targets are watched via their parent.
  const watched = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const t = watched.get(e.target) || e.target;
        t.classList.add("is-in");
        io.unobserve(e.target);
        if (t.dataset.anim === "stagger") {
          // once the staggered entrance has finished, hand transforms over to hover effects
          setTimeout(() => t.classList.add("is-settled"), 1100 + t.children.length * 110);
        }
        $$("[data-count]", t).forEach(countUp);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  $$("[data-anim]").forEach((el) => {
    if (el.closest(".hero")) return;
    const target = el.dataset.anim === "reveal" ? el.parentElement : el;
    if (target !== el) watched.set(target, el);
    io.observe(target);
  });

  /* ---------- Counters ---------- */
  function countUp(el) {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    const t0 = performance.now();
    const dur = 2000;
    const run = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  /* ---------- Scroll-driven effects ---------- */
  const header = $("#header");
  const progress = $("#scrollProgress");
  const parallax = $$("[data-parallax]");
  const sbgs = $$(".sbg img");
  const stepsTrack = $(".process__track");
  const stepsLine = $("#stepsLine");
  const steps = $$(".step");
  const timeline = $("#timeline");
  const timelineFill = $("#timelineFill");
  const navLinks = $$('.nav ul a');
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  let lastY = 0;
  let ticking = false;

  const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
  // 0 when the element's top hits `start` of viewport, 1 when its bottom passes `end`
  const progressOf = (el, start = 0.75, end = 0.6) => {
    const r = el.getBoundingClientRect();
    const vh = innerHeight;
    return clamp((vh * start - r.top) / (r.height + vh * (start - end)));
  };

  const onScroll = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    header.classList.toggle("is-scrolled", y > 40);
    if (!document.body.classList.contains("is-open")) {
      header.classList.toggle("is-hidden", y > lastY && y > 600);
    }
    lastY = y;

    if (!reduceMotion) {
      sbgs.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        // -1 … 1 as the section travels through the viewport
        const t = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2);
        img.style.setProperty("--sbg-y", `${(t * -6).toFixed(2)}%`);
      });
      parallax.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        el.style.transform = `translateX(${(r.top - innerHeight / 2) * +el.dataset.parallax}px)`;
      });
    }

    if (stepsTrack) {
      const p = progressOf(stepsTrack);
      stepsLine.style.setProperty("--p", p);
      steps.forEach((s, i) => s.classList.toggle("is-lit", p > i / steps.length));
    }

    if (timeline) {
      timelineFill.style.setProperty("--p", progressOf(timeline, 0.7, 0.5));
    }

    // active nav link
    let current = null;
    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top < innerHeight * 0.4) current = sec;
    });
    navLinks.forEach((a) => a.classList.toggle("is-active", current && a.getAttribute("href") === "#" + current.id));

    ticking = false;
  };

  addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = $("#menuToggle");
  const setMenu = (open) => {
    document.body.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("is-open")));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Strengths: the item in the middle of the screen drives the photo ---------- */
  const sx = $("#sx");
  if (sx) {
    const items = $$(".sx__item", sx);
    const photos = $$(".sx__photo", sx);
    const now = $("#sxNow");
    const bar = $("#sxBar");
    let active = 0;
    const activate = (i) => {
      if (i === active) return;
      active = i;
      items.forEach((el, k) => el.classList.toggle("is-active", k === i));
      photos.forEach((el, k) => el.classList.toggle("is-active", k === i));
      now.textContent = String(i + 1).padStart(2, "0");
      bar.style.transform = `scaleX(${(i + 1) / items.length})`;
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) activate(+e.target.dataset.i); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Build simulator ---------- */
  const sim = $("#simulator");
  if (sim) {
    // weeks are rough guides, deliberately shown as ranges
    const KIND = {
      web:    { label: "業務Webシステム", code: "WEB",    weeks: 10, stack: ["Java / Spring", "React", "PostgreSQL", "AWS"], nodes: ["client", "api", "db"] },
      mobile: { label: "モバイルアプリ",   code: "MOBILE", weeks: 11, stack: ["Flutter", "Dart", "Firebase", "iOS / Android"], nodes: ["client", "api", "db"] },
      ai:     { label: "AI組み込み",       code: "AI",     weeks: 9,  stack: ["Python", "LLM API", "TypeScript", "AWS"], nodes: ["client", "api", "db", "ai"] },
      renew:  { label: "既存システム刷新", code: "RENEW",  weeks: 13, stack: ["Java", "COBOL 解析", "Oracle", "移行設計"], nodes: ["client", "api", "db", "link"] },
    };
    const SIZE = {
      s: { label: "小（画面 〜10）", code: "S", mul: 0.7 },
      m: { label: "中（画面 〜30）", code: "M", mul: 1 },
      l: { label: "大（画面 30〜）", code: "L", mul: 1.5 },
    };
    const OPT = {
      auth:   { label: "ログイン・権限", weeks: 2, node: "auth",   stack: ["OAuth / SSO"] },
      admin:  { label: "管理画面",       weeks: 3, node: "admin",  stack: ["管理UI"] },
      pay:    { label: "決済",           weeks: 3, node: "pay",    stack: ["Stripe / 決済API"] },
      notify: { label: "通知",           weeks: 1, node: "notify", stack: ["Push / SendGrid"] },
      link:   { label: "外部システム連携", weeks: 3, node: "link",  stack: ["REST / CSV連携"] },
      ai:     { label: "生成AI機能",      weeks: 3, node: "ai",    stack: ["生成AI", "ベクトル検索"] },
    };
    const LINKS = { client: "client-api", db: "api-db", auth: "api-auth", ai: "api-ai", link: "api-link", admin: "api-admin", notify: "api-notify", pay: "api-pay" };

    const nodes = Object.fromEntries($$("[data-node]", sim).map((g) => [g.dataset.node, g]));
    const links = Object.fromEntries($$("[data-link]", sim).map((l) => [l.dataset.link, l]));
    const stackList = $("#simStack");
    const weeks = { base: $("#simWeeksBase"), ai: $("#simWeeksAi") };
    const range = { base: $("#simRangeBase"), ai: $("#simRangeAi") };
    const core = { base: $("#simCoreBase"), ai: $("#simCoreAi") };
    const axis = $("#simAxis");
    const head = { crumb: $("#simCrumb"), rev: $("#simRev") };
    const tb = { config: $("#tbConfig"), size: $("#tbSize"), mod: $("#tbMod"), rev: $("#tbRev") };
    const pad2 = (n) => String(n).padStart(2, "0");
    let summary = "";
    let rev = 0;

    // both estimates are drawn against one axis, so the bars can be compared by eye.
    // the axis always ends on a tick, so the right edge of the track is a labelled value.
    const scaleFor = (weeks) => {
      const step = weeks <= 20 ? 5 : weeks <= 50 ? 10 : 20;
      return { step, max: Math.max(step * 2, Math.ceil(weeks / step) * step) };
    };
    const drawAxis = ({ step, max }) => {
      let out = "";
      for (let v = 0; v <= max; v += step) {
        const pct = (v / max) * 100;
        const shift = v === 0 ? "0" : pct >= 99.9 ? "-100%" : "-50%";
        out += `<span style="left:${pct}%;transform:translateX(${shift})">${v}</span>`;
      }
      axis.innerHTML = out;
    };

    const read = () => ({
      kind: $('input[name="sim-kind"]:checked', sim).value,
      size: $('input[name="sim-size"]:checked', sim).value,
      opts: $$('input[name="sim-opt"]:checked', sim).map((i) => i.value),
    });

    const update = () => {
      const { kind, size, opts } = read();
      const k = KIND[kind];
      const sz = SIZE[size];

      // weeks: base scope × size + options, then the AI-assisted range
      const raw = k.weeks * sz.mul + opts.reduce((n, o) => n + OPT[o].weeks, 0);
      const base = [Math.round(raw), Math.round(raw * 1.3)];
      const ai = [Math.max(2, Math.round(raw * 0.4)), Math.max(3, Math.round(raw * 0.6))];
      weeks.base.textContent = `${base[0]}〜${base[1]}週`;
      weeks.ai.textContent = `${ai[0]}〜${ai[1]}週`;

      const scale = scaleFor(base[1]);
      drawAxis(scale);
      range.base.style.width = `${(base[1] / scale.max) * 100}%`;
      core.base.style.width = `${(base[0] / scale.max) * 100}%`;
      range.ai.style.width = `${(ai[1] / scale.max) * 100}%`;
      core.ai.style.width = `${(ai[0] / scale.max) * 100}%`;

      // diagram
      const on = new Set([...k.nodes, ...opts.map((o) => OPT[o].node)]);
      Object.entries(nodes).forEach(([name, g]) => {
        g.classList.toggle("is-on", on.has(name));
        g.classList.toggle("is-accent", name === "ai" && on.has("ai"));
      });
      Object.values(links).forEach((l) => l.classList.remove("is-on"));
      on.forEach((n) => { const id = LINKS[n]; if (id && links[id]) links[id].classList.add("is-on"); });

      // sheet metadata: every change is a new revision of the drawing
      rev += 1;
      const modules = on.size;
      head.crumb.textContent = `${k.code} / ${sz.code} / ${pad2(modules)} MODULES`;
      head.rev.textContent = pad2(rev);
      tb.config.textContent = k.label;
      tb.size.textContent = sz.label;
      tb.mod.textContent = pad2(modules);
      tb.rev.textContent = pad2(rev);

      // stack
      const chips = [...new Set([...k.stack, ...opts.flatMap((o) => OPT[o].stack)])];
      stackList.innerHTML = chips.map((c, i) => `<li style="animation-delay:${i * 40}ms">${c}</li>`).join("");

      summary = [
        `【開発シミュレーター】`,
        `つくるもの：${k.label}`,
        `規模：${sz.label.replace(/（.*/, "")}規模`,
        `必要な機能：${opts.length ? opts.map((o) => OPT[o].label).join("、") : "未選択"}`,
        `期間の目安：${ai[0]}〜${ai[1]}週（AI活用時）`,
      ].join("\n");
    };

    $$('input[name^="sim-"]', sim).forEach((i) => i.addEventListener("change", update));
    update();

    // hand the selection over to the contact form
    $("#simCta").addEventListener("click", () => {
      const msg = $("#cf-msg");
      if (!msg) return;
      const rest = msg.value.replace(/^【開発シミュレーター】[\s\S]*?(?:\n\n|$)/, "");
      msg.value = `${summary}\n\n${rest}`;
      msg.dispatchEvent(new Event("input"));
    });
  }

  /* ---------- Industries: tabs with photo stage ---------- */
  const ind = $("#industries");
  if (ind) {
    const tabs = $$(".ind__tab", ind);
    const panels = tabs.map((t) => $("#" + t.getAttribute("aria-controls")));
    let current = 0;
    let autoplay = !reduceMotion;

    const show = (i, { focus = false } = {}) => {
      if (i === current) return;
      tabs[current].setAttribute("aria-selected", "false");
      tabs[current].tabIndex = -1;
      panels[current].classList.remove("is-active");
      panels[current].hidden = true;

      current = (i + tabs.length) % tabs.length;
      const tab = tabs[current];
      tab.setAttribute("aria-selected", "true");
      tab.tabIndex = 0;
      panels[current].hidden = false;
      // reflow so the entrance animations restart
      void panels[current].offsetWidth;
      panels[current].classList.add("is-active");
      if (focus) tab.focus();

      // keep the active chip visible in the horizontal (mobile) list
      const list = tab.parentElement;
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: tab.offsetLeft - list.offsetLeft - 20, behavior: reduceMotion ? "auto" : "smooth" });
      }
      // warm up the next photo
      const next = panels[(current + 1) % panels.length]?.querySelector("img");
      if (next) next.loading = "eager";
    };

    const stopAutoplay = () => {
      autoplay = false;
      ind.classList.remove("is-autoplay");
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => { stopAutoplay(); show(i); });
      tab.addEventListener("keydown", (e) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (e.key in keys) { e.preventDefault(); stopAutoplay(); show(current + keys[e.key], { focus: true }); }
        if (e.key === "Home") { e.preventDefault(); stopAutoplay(); show(0, { focus: true }); }
        if (e.key === "End") { e.preventDefault(); stopAutoplay(); show(tabs.length - 1, { focus: true }); }
      });
      // the progress bar drives autoplay, so pausing the animation pauses the rotation too
      $(".ind__tab-bar", tab).addEventListener("animationend", () => {
        if (autoplay) show(current + 1);
      });
    });

    // autoplay only while the section is on screen and not hovered
    const setPaused = (paused) => ind.classList.toggle("is-paused", paused);
    new IntersectionObserver(([e]) => {
      if (!autoplay) return;
      ind.classList.add("is-autoplay");
      setPaused(!e.isIntersecting);
    }, { threshold: 0.35 }).observe(ind);
    ind.addEventListener("pointerenter", () => setPaused(true));
    ind.addEventListener("pointerleave", () => setPaused(false));

    // "相談する" pre-fills the contact form with the chosen industry
    $$(".ind__cta", ind).forEach((a) => {
      a.addEventListener("click", () => {
        const msg = $("#cf-msg");
        if (!msg) return;
        const line = `【業界】${a.dataset.industry}`;
        msg.value = msg.value.startsWith("【業界】")
          ? msg.value.replace(/^【業界】.*$/m, line)
          : `${line}\n${msg.value}`;
        msg.dispatchEvent(new Event("input"));
      });
    });
  }

  /* ---------- Contact form → e-mail (Web3Forms) + the existing Google Form ---------- */
  const MAIL_ENDPOINT = "https://api.web3forms.com/submit";
  const MAIL_KEY_PLACEHOLDER = "PASTE_WEB3FORMS_ACCESS_KEY";

  const form = $("#contactForm");
  if (form) {
    const box = $("#cform");
    const done = $("#cf-done");
    const status = $("#cf-status");
    const msg = $("#cf-msg");
    const counter = $("#cf-msg-count b");
    const submit = $(".cform__submit", form);
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const checks = {
      "cf-name": (v) => v.trim().length > 0,
      "cf-email": (v) => emailOk(v.trim()),
      "cf-msg": (v) => v.trim().length > 0,
    };
    const validate = (input) => {
      const ok = checks[input.id](input.value);
      input.closest(".cfield").classList.toggle("is-invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      return ok;
    };

    Object.keys(checks).forEach((id) => {
      const input = $("#" + id);
      // validate after the first blur, then live while typing
      input.addEventListener("blur", () => { input.dataset.touched = "1"; validate(input); });
      input.addEventListener("input", () => { if (input.dataset.touched) validate(input); });
    });

    msg.addEventListener("input", () => { counter.textContent = msg.value.length; });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      const inputs = Object.keys(checks).map((id) => $("#" + id));
      inputs.forEach((i) => (i.dataset.touched = "1"));
      const bad = inputs.filter((i) => !validate(i));
      if (bad.length) { bad[0].focus(); return; }

      const topic = form.querySelector('input[name="topic"]:checked')?.value || "";
      const name = $("#cf-name").value.trim();
      const org = $("#cf-org").value.trim();
      const email = $("#cf-email").value.trim();
      const text = msg.value.trim();

      // the selected topic is prepended to the message (the Google Form has a single text field)
      const body = new URLSearchParams();
      body.set("emailAddress", email);
      body.set("entry.508185143", name);
      body.set("entry.279623463", org);
      body.set("entry.846002261", (topic ? `【ご相談の種類】${topic}\n\n` : "") + text);
      body.set("fvv", "1");
      body.set("pageHistory", "0");

      // Google Forms does not send CORS headers: the response is opaque, so it can only
      // be fired off. The mail below is what the submission is actually judged on.
      const record = fetch(form.action, { method: "POST", mode: "no-cors", body }).catch(() => {});

      const mail = async () => {
        const key = $("#cf-key")?.value.trim();
        if (!key || key === MAIL_KEY_PLACEHOLDER) {
          console.warn(
            "[contact] Web3Forms access key is not set in index.html — this message was recorded " +
            "in the Google Form but no notification mail was sent."
          );
          return;
        }
        const res = await fetch(MAIL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: key,
            subject: `【サイトお問い合わせ】${name} 様${topic ? ` / ${topic}` : ""}`,
            from_name: "0x48lab コーポレートサイト",
            replyto: email,
            botcheck: form.querySelector('input[name="botcheck"]')?.checked || false,
            "お名前": name,
            "会社名・団体名": org || "（未記入）",
            "メールアドレス": email,
            "ご相談の種類": topic || "（未選択）",
            "お問い合わせ内容": text,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) throw new Error(data.message || `HTTP ${res.status}`);
      };

      box.classList.add("is-sending");
      submit.disabled = true;
      try {
        await Promise.all([record, mail()]);
        form.reset();
        counter.textContent = "0";
        form.hidden = true;
        done.hidden = false;
        done.focus();
      } catch (err) {
        console.error("[contact]", err);
        status.textContent = "送信できませんでした。通信状況をご確認のうえ再度お試しいただくか、下記リンクのフォームをご利用ください。";
      } finally {
        box.classList.remove("is-sending");
        submit.disabled = false;
      }
    });

    $("#cf-again").addEventListener("click", () => {
      done.hidden = true;
      form.hidden = false;
      $("#cf-name").focus();
    });
  }

  if (reduceMotion) return;

  /* ---------- Particle network (hero) ---------- */
  const canvas = $("#particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const mouse = { x: -9999, y: -9999 };
    let w, h, dpr, points = [];
    let visible = true;

    let ink = "11 29 58";
    let hot = "36 144 243";
    const readPalette = () => {
      const cs = getComputedStyle(root);
      ink = cs.getPropertyValue("--text-rgb").trim() || ink;
      hot = cs.getPropertyValue("--accent-rgb").trim() || hot;
    };
    readPalette();
    themeListeners.push(readPalette);

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, (w * h) / 14000));
      points = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.6,
        hot: Math.random() < 0.18,
      }));
    };

    const draw = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const dxm = p.x - mouse.x;
          const dym = p.y - mouse.y;
          const dm = Math.hypot(dxm, dym);
          if (dm < 160) {
            p.x += (dxm / dm) * 1.6;
            p.y += (dym / dm) * 1.6;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.hot ? `rgb(${hot} / .9)` : `rgb(${ink} / .35)`;
          ctx.fill();

          for (let j = i + 1; j < points.length; j++) {
            const q = points[j];
            const d = Math.hypot(p.x - q.x, p.y - q.y);
            if (d < 130) {
              ctx.strokeStyle = `rgb(${ink} / ${(1 - d / 130) * 0.12})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
          if (dm < 200) {
            ctx.strokeStyle = `rgb(${hot} / ${(1 - dm / 200) * 0.6})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    const hero = $("#hero");
    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
    addEventListener("resize", resize);
    resize();
    draw();
  }

  if (!finePointer) return;

  /* ---------- Custom cursor ---------- */
  const cursor = $(".cursor");
  const dot = $(".cursor__dot");
  const ring = $(".cursor__ring");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
  });
  (function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();
  $$("a, button, .card, .service, input, select, textarea").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
  });

  /* ---------- Magnetic buttons ---------- */
  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });

  /* ---------- 3D tilt + spotlight ---------- */
  $$(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      if (!card.parentElement.classList.contains("is-in")) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.classList.add("is-tilting");
      card.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
      card.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

})();

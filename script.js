/* ================================================================
   PORTFOLIO — script.js  |  Fauzan Afryan
   Refactored: OS Selector, Gemini AMA, clean code
   ================================================================ */
"use strict";

/* ──────────────────────────────────────────────────────────────
   OS STATE — shared by hero terminal + playground
────────────────────────────────────────────────────────────── */
const OS = {
  current: "windows", // 'windows' | 'linux'

  set(val) {
    this.current = val;
    this.broadcast();
  },

  isWin() {
    return this.current === "windows";
  },

  prompt() {
    return this.isWin()
      ? '<span class="kw">PS</span>&nbsp;<span class="tp">C:\\Users\\fauzan</span><span class="df">&gt;</span>'
      : '<span class="tp">fauzan</span><span class="cm-color">@portfolio</span><span class="df">:~$</span>';
  },

  promptText() {
    return this.isWin() ? "PS C:\\Users\\fauzan>" : "fauzan@portfolio:~$";
  },

  broadcast() {
    document.dispatchEvent(
      new CustomEvent("os-change", { detail: this.current }),
    );
  },
};

/* ──────────────────────────────────────────────────────────────
   1. HERO TERMINAL ANIMATION
────────────────────────────────────────────────────────────── */
(function () {
  const SESSION_KEY = "term-played-v7";

  function makeScript(os) {
    const isWin = os === "windows";
    return isWin
      ? [
          { type: "output", text: "Windows PowerShell", cls: "fn" },
          {
            type: "output",
            text: "Copyright (C) Microsoft Corporation. All rights reserved.",
            cls: "",
          },
          { type: "blank" },
          { type: "cmd", text: "whoami" },
          { type: "output", text: "DESKTOP-FA\\fauzan-afryan", cls: "success" },
          { type: "blank" },
          { type: "cmd", text: "Get-Content profile.json" },
          { type: "output", text: "{", cls: "" },
          { type: "output", text: '  "name": "Fauzan Afryan",', cls: "" },
          {
            type: "output",
            text: '  "role": "Frontend Developer",',
            cls: "",
          },
          { type: "output", text: '  "status": "Open to Work",', cls: "" },
          {
            type: "output",
            text: '  "stack": ["React", "Node", "Go"]',
            cls: "",
          },
          { type: "output", text: "}", cls: "" },
          { type: "blank" },
          { type: "cmd", text: "git log --oneline -3" },
          {
            type: "output",
            text: "a3f2e1c feat: add dark mode toggle",
            cls: "info",
          },
          {
            type: "output",
            text: "b9d8c7a fix: responsive layout",
            cls: "info",
          },
          {
            type: "output",
            text: "c2a1b0f perf: lazy load images",
            cls: "info",
          },
          { type: "blank" },
          { type: "cmd", text: "npm run dev" },
          {
            type: "output",
            text: "  VITE v5.0.0  ready in 312 ms",
            cls: "success",
          },
          {
            type: "output",
            text: "  =>  Local:   http://localhost:5173/",
            cls: "info",
          },
          { type: "blank" },
          { type: "cursor", text: "" },
        ]
      : [
          { type: "output", text: "Ubuntu 22.04.4 LTS", cls: "fn" },
          {
            type: "output",
            text: "Last login: " + new Date().toDateString(),
            cls: "",
          },
          { type: "blank" },
          { type: "cmd", text: "whoami" },
          { type: "output", text: "fauzan", cls: "success" },
          { type: "blank" },
          { type: "cmd", text: "cat profile.json" },
          { type: "output", text: "{", cls: "" },
          { type: "output", text: '  "name": "Fauzan Afryan",', cls: "" },
          {
            type: "output",
            text: '  "role": "Frontend Developer",',
            cls: "",
          },
          { type: "output", text: '  "status": "Open to Work",', cls: "" },
          {
            type: "output",
            text: '  "stack": ["React", "Node", "Go"]',
            cls: "",
          },
          { type: "output", text: "}", cls: "" },
          { type: "blank" },
          { type: "cmd", text: "git log --oneline -3" },
          {
            type: "output",
            text: "a3f2e1c feat: add dark mode toggle",
            cls: "info",
          },
          {
            type: "output",
            text: "b9d8c7a fix: responsive layout",
            cls: "info",
          },
          {
            type: "output",
            text: "c2a1b0f perf: lazy load images",
            cls: "info",
          },
          { type: "blank" },
          { type: "cmd", text: "npm run dev" },
          {
            type: "output",
            text: "  VITE v5.0.0  ready in 312 ms",
            cls: "success",
          },
          {
            type: "output",
            text: "  =>  Local:   http://localhost:5173/",
            cls: "info",
          },
          { type: "blank" },
          { type: "cursor", text: "" },
        ];
  }

  function esc(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function promptHTML(os) {
    return os === "windows"
      ? '<span class="t-prompt">PS C:\\Users\\fauzan&gt;</span>'
      : '<span class="t-prompt">fauzan@portfolio:~$</span>';
  }

  function createEl(item, os) {
    const d = document.createElement("div");
    d.className = "t-line";
    if (item.type === "blank") {
      d.style.height = ".6rem";
      d.style.display = "block";
      d.style.opacity = "1";
      d.style.transform = "none";
      return d;
    }
    if (item.type === "cursor") {
      d.innerHTML = `${promptHTML(os)} <span class="t-cursor"></span>`;
      return d;
    }
    if (item.type === "cmd") {
      d.innerHTML = `${promptHTML(os)}<span class="t-text"> ${esc(item.text)}</span>`;
    } else {
      d.innerHTML = `<span class="t-output ${item.cls || ""}">${esc(item.text)}</span>`;
    }
    return d;
  }

  function renderAll(body, os) {
    body.innerHTML = "";
    makeScript(os).forEach((item) => {
      const el = createEl(item, os);
      el.style.opacity = "1";
      el.style.transform = "none";
      body.appendChild(el);
    });
  }

  function play(body, os) {
    const SCRIPT = makeScript(os);
    let i = 0;
    function next() {
      if (i >= SCRIPT.length) {
        try {
          sessionStorage.setItem(SESSION_KEY, os);
        } catch (_) {}
        return;
      }
      const item = SCRIPT[i++];
      const el = createEl(item, os);
      if (item.type === "blank") {
        el.style.opacity = "1";
        el.style.transform = "none";
        body.appendChild(el);
        setTimeout(next, 100);
        return;
      }
      body.appendChild(el);
      void el.offsetHeight;
      el.style.transition = "opacity .12s ease, transform .12s ease";
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
      setTimeout(next, item.type === "cmd" ? 480 : 28);
    }
    setTimeout(next, 800);
  }

  function updateHeroMeta(os) {
    const titleEl = document.getElementById("heroTermTitle");
    const shellEl = document.getElementById("heroTermShell");
    if (titleEl)
      titleEl.textContent =
        os === "windows"
          ? "Windows PowerShell — 80x24"
          : "Bash — fauzan@portfolio — 80x24";
    if (shellEl) shellEl.textContent = os === "windows" ? "pwsh" : "bash";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("terminalBody");
    if (!body) return;

    let lastOs = null;
    try {
      lastOs = sessionStorage.getItem(SESSION_KEY);
    } catch (_) {}

    const initOs = OS.current;
    updateHeroMeta(initOs);
    if (lastOs === initOs) {
      renderAll(body, initOs);
    } else {
      play(body, initOs);
    }

    document.addEventListener("os-change", (e) => {
      updateHeroMeta(e.detail);
      body.innerHTML = "";
      play(body, e.detail);
    });
  });
})();

/* ──────────────────────────────────────────────────────────────
   2. TYPEWRITER — hero role
────────────────────────────────────────────────────────────── */
(function () {
  const ROLES = [
    "Frontend Developer",
    "React & TypeScript Dev",
    "UI/UX Craftsman",
    "Web Designer",
    "CSS Architecture Nerd",
    "Component Builder",
    "Coffee Addict",
  ];
  let ri = 0,
    ci = 0,
    del = false,
    el = null;

  function tick() {
    if (!el) return;
    const r = ROLES[ri];
    el.textContent = del ? r.slice(0, ci--) : r.slice(0, ci++);
    let delay = del ? 40 : 72;
    if (!del && ci > r.length) {
      delay = 2200;
      del = true;
    }
    if (del && ci < 0) {
      del = false;
      ri = (ri + 1) % ROLES.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  }

  document.addEventListener("DOMContentLoaded", () => {
    el = document.getElementById("heroTyped");
    if (el) setTimeout(tick, 1400);
  });
})();

/* ──────────────────────────────────────────────────────────────
   3. OS SELECTOR
────────────────────────────────────────────────────────────── */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const btnWin = document.getElementById("osBtnWin");
    const btnLin = document.getElementById("osBtnLin");
    if (!btnWin || !btnLin) return;

    function setOS(val) {
      OS.set(val);
      btnWin.classList.toggle("active", val === "windows");
      btnLin.classList.toggle("active", val === "linux");
    }

    btnWin.addEventListener("click", () => setOS("windows"));
    btnLin.addEventListener("click", () => setOS("linux"));
  });
})();

/* ──────────────────────────────────────────────────────────────
   4. NAVBAR + MOBILE BOTTOM NAV
────────────────────────────────────────────────────────────── */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const mbnItems = document.querySelectorAll(".mbn-item");
    const sections = document.querySelectorAll("section[id]");

    function smoothScroll(id) {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScroll(link.dataset.section);
      });
    });

    mbnItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScroll(item.dataset.section);
      });
    });

    window.addEventListener(
      "scroll",
      () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
      },
      { passive: true },
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.dataset.section === id),
            );
            mbnItems.forEach((l) =>
              l.classList.toggle("active", l.dataset.section === id),
            );
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((s) => io.observe(s));

    document.getElementById("navLogo")?.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();

/* ──────────────────────────────────────────────────────────────
   5. AOS + SCROLL EFFECTS
────────────────────────────────────────────────────────────── */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
      duration: 600,
      easing: "cubic-bezier(0.4,0,0.2,1)",
      once: false,
      mirror: true,
      offset: 60,
    });

    const bar = document.getElementById("scrollProgress");
    const backTop = document.getElementById("backTop");

    window.addEventListener(
      "scroll",
      () => {
        const pct =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        if (bar) bar.style.width = pct + "%";
        if (backTop) backTop.classList.toggle("show", window.scrollY > 400);
      },
      { passive: true },
    );

    backTop?.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );

    const fy = document.getElementById("fyear");
    if (fy) fy.textContent = new Date().getFullYear();

    // Code line hover highlight
    document.querySelectorAll(".code-line").forEach((line) => {
      line.addEventListener("mouseenter", () => {
        line.style.borderLeftColor = "var(--acc)";
      });
      line.addEventListener("mouseleave", () => {
        line.style.borderLeftColor = "";
      });
    });

    // Project card 3D tilt
    document.querySelectorAll(".proj-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -6;
        card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
        card.style.transition = "transform .1s ease";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "";
      });
    });

    // Name glitch on hover
    const hnb = document.querySelector(".hn-b");
    if (hnb) {
      hnb.addEventListener("mouseenter", () => {
        hnb.style.animation = "glitch .35s ease";
      });
      hnb.addEventListener("animationend", () => {
        hnb.style.animation = "";
      });
    }

    // Dev console easter egg
    console.log(
      "%c\n███████╗ █████╗ \n██╔════╝██╔══██╗\n█████╗  ███████║\n██╔══╝  ██╔══██║\n██║     ██║  ██║\n╚═╝     ╚═╝  ╚═╝\n",
      "color:#bd93f9;font-family:monospace;font-size:11px;",
    );
    console.log(
      "%c Hey dev! Reach out: fauzanafryan1@gmail.com",
      "color:#ff79c6;font-size:12px;",
    );
  });
})();

/* ──────────────────────────────────────────────────────────────
   6. PROJECT FILTER
────────────────────────────────────────────────────────────── */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll(".pf");
    const cards = document.querySelectorAll(".proj-card");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        cards.forEach((c) => {
          c.style.display = f === "all" || c.dataset.cat === f ? "" : "none";
        });
      });
    });
  });
})();

/* ──────────────────────────────────────────────────────────────
   7. TERMINAL PLAYGROUND — OS-aware simulation
────────────────────────────────────────────────────────────── */
(function () {
  let pgCurrentDir = { windows: "C:\\Users\\fauzan", linux: "/home/fauzan" };
  let cmdHistory = [];
  let histIdx = -1;
  let pgReady = false;

  /* ---------- SHARED DATA ---------------------------------------- */
  const COMMITS = [
    {
      hash: "a3f2e1c",
      msg: "feat: add AMA section with AI chat",
      time: "2h ago",
    },
    {
      hash: "b9d8c7a",
      msg: "feat: add coding playlist vibe section",
      time: "4h ago",
    },
    {
      hash: "c2a1b0f",
      msg: "fix: mobile responsive bottom nav",
      time: "1d ago",
    },
    {
      hash: "d5e4f3g",
      msg: "chore: dark theme purple dracula edition",
      time: "1d ago",
    },
    {
      hash: "e8f7g6h",
      msg: "feat: polish animations + hero section",
      time: "2d ago",
    },
    { hash: "f1g2h3i", msg: "init: portfolio v4 scaffold", time: "3d ago" },
  ];

  function bar(pct) {
    const f = Math.round(pct / 5);
    return "█".repeat(f) + "░".repeat(20 - f);
  }

  /* ---------- OS CONFIG ------------------------------------------ */
  const OS_CONFIG = {
    windows: {
      barTitle: "Windows PowerShell — fauzan@DESKTOP",
      subtitle:
        '// PowerShell simulation — type commands. Try: <span class="kw">help</span>',
      shellLabel: "pwsh",
      chips: [
        { label: "help", icon: "fa-question-circle", cmd: "help" },
        { label: "whoami", icon: "fa-user", cmd: "whoami" },
        { label: "skills", icon: "fa-code", cmd: "skills" },
        { label: "Get-Projects", icon: "fa-folder", cmd: "Get-Projects" },
        { label: "Get-Contact", icon: "fa-envelope", cmd: "Get-Contact" },
        { label: "neofetch", icon: "fa-laptop-code", cmd: "neofetch" },
        { label: "git log", icon: "fa-git-alt fab", cmd: "git log" },
        {
          label: "winget list",
          icon: "fa-windows fab",
          cmd: "winget list",
          cls: "pg-chip-linux",
        },
        {
          label: "Invoke-HireMe",
          icon: "fa-star",
          cmd: "Invoke-HireMe",
          cls: "pg-chip-special",
        },
      ],
      boot: [
        { t: "info", s: "Windows PowerShell" },
        {
          t: "text",
          s: "Copyright (C) Microsoft Corporation. All rights reserved.",
        },
        { t: "blank" },
        {
          t: "cm",
          s: '// Type <span class="kw">help</span> to see all available commands',
        },
      ],
    },
    linux: {
      barTitle: "Bash — fauzan@portfolio",
      subtitle:
        '// Bash simulation — type commands. Try: <span class="kw">help</span>',
      shellLabel: "bash",
      chips: [
        { label: "help", icon: "fa-question-circle", cmd: "help" },
        { label: "whoami", icon: "fa-user", cmd: "whoami" },
        { label: "skills", icon: "fa-code", cmd: "skills" },
        { label: "projects", icon: "fa-folder", cmd: "projects" },
        { label: "contact", icon: "fa-envelope", cmd: "contact" },
        { label: "neofetch", icon: "fa-laptop-code", cmd: "neofetch" },
        { label: "git log", icon: "fa-git-alt fab", cmd: "git log" },
        {
          label: "apt list",
          icon: "fa-linux fab",
          cmd: "apt list",
          cls: "pg-chip-linux",
        },
        {
          label: "sudo hire",
          icon: "fa-star",
          cmd: "sudo hire me",
          cls: "pg-chip-special",
        },
      ],
      boot: [
        { t: "info", s: "Ubuntu 22.04.4 LTS — fauzan@portfolio" },
        { t: "blank" },
        {
          t: "cm",
          s: '// Type <span class="kw">help</span> to see all available commands',
        },
      ],
    },
  };

  /* ---------- COMMAND DEFINITIONS --------------------------------- */
  function buildCommands(os) {
    const isWin = os === "windows";

    const shared = {
      help: () => [
        { t: "header", s: "Available Commands" },
        { t: "spacer" },
        { t: "section", s: "Portfolio" },
        {
          t: "cmd-list",
          items: [
            [isWin ? "whoami" : "whoami", "Show current user info"],
            ["skills", "List tech skills with bars"],
            [isWin ? "Get-Projects" : "projects", "Show portfolio projects"],
            [isWin ? "Get-Contact" : "contact", "Get contact info"],
            ["neofetch", "System info — dev edition"],
            ["git log", "Show recent commits"],
            ["git status", "Show working tree status"],
            ["git branch", "List branches"],
            ["cat about.txt", "Read about file"],
          ],
        },
        { t: "section", s: isWin ? "Windows / PowerShell" : "Linux / Bash" },
        {
          t: "cmd-list",
          items: isWin
            ? [
                ["dir / ls", "List directory contents"],
                ["cd <path>", "Change directory"],
                ["pwd", "Print working directory"],
                ["echo <text>", "Print text"],
                ["Get-Date", "Show date & time"],
                ["ipconfig", "Show network config"],
                ["winget list", "Installed packages"],
                ["systeminfo", "System information"],
                ["tasklist", "Running processes"],
                ["ping <host>", "Ping a host"],
                ["cls / clear", "Clear terminal"],
              ]
            : [
                ["ls / dir", "List directory contents"],
                ["cd <path>", "Change directory"],
                ["pwd", "Print working directory"],
                ["echo <text>", "Print text"],
                ["date", "Show date & time"],
                ["ifconfig", "Show network config"],
                ["apt list", "Installed packages"],
                ["uname -a", "System information"],
                ["ps aux", "Running processes"],
                ["ping <host>", "Ping a host"],
                ["clear", "Clear terminal"],
              ],
        },
        { t: "section", s: "Fun" },
        {
          t: "cmd-list",
          items: [
            [isWin ? "Invoke-HireMe" : "sudo hire me", "Make me an offer"],
          ],
        },
      ],

      whoami: () => [
        {
          t: "json",
          lines: isWin
            ? [
                "DESKTOP-FA\\fauzan-afryan",
                "",
                "{",
                '  "name"       : "Fauzan Afryan",',
                '  "role"       : "Frontend Developer",',
                '  "location"   : "Indonesia",',
                '  "experience" : "3+ years",',
                '  "status"     : "Open to Work",',
                '  "email"      : "fauzanafryan1@gmail.com",',
                '  "github"     : "github.com/zannaxe"',
                "}",
              ]
            : [
                "fauzan",
                "",
                "uid=1000(fauzan) gid=1000(fauzan) groups=1000(fauzan),4(adm),27(sudo)",
              ],
        },
      ],

      skills: () => [
        { t: "section", s: "Frontend" },
        { t: "skill-bar", name: "React.js", pct: 88 },
        { t: "skill-bar", name: "TypeScript", pct: 82 },
        { t: "skill-bar", name: "CSS3/SCSS", pct: 93 },
        { t: "skill-bar", name: "Tailwind CSS", pct: 90 },
        { t: "section", s: "Design" },
        { t: "skill-bar", name: "Figma", pct: 85 },
        { t: "skill-bar", name: "UI/UX Design", pct: 80 },
        { t: "skill-bar", name: "Motion/Anim", pct: 78 },
        { t: "section", s: "Tools" },
        { t: "skill-bar", name: "Git", pct: 90 },
        { t: "skill-bar", name: "Vite/Webpack", pct: 82 },
        { t: "skill-bar", name: "VS Code", pct: 95 },
      ],

      projects: () => [
        { t: "section", s: "Portfolio Projects" },
        {
          t: "proj",
          name: "CodeFlow IDE",
          desc: "Browser-based collaborative code editor",
          stars: "2.4k",
        },
        {
          t: "proj",
          name: "DevOps Dashboard",
          desc: "Unified infra monitoring platform",
          stars: "1.1k",
        },
        {
          t: "proj",
          name: "API Forge",
          desc: "Open-source REST API testing tool",
          stars: "890",
        },
        {
          t: "proj",
          name: "Neural Search",
          desc: "Semantic search with vector embeddings",
          stars: "430",
        },
        { t: "spacer" },
        { t: "text-dim", s: "View all: https://github.com/zannaxe" },
      ],

      contact: () => [
        {
          t: "json",
          lines: [
            "{",
            '  "email"     : "fauzanafryan1@gmail.com",',
            '  "phone"     : "+62 877-3155-0949",',
            '  "github"    : "github.com/zannaxe",',
            '  "instagram" : "@fzan_oizyss",',
            '  "response"  : "< 24 hours"',
            "}",
          ],
        },
      ],

      neofetch: () => [{ t: "neofetch", os }],

      "git log": () => [{ t: "git-log" }],

      "git status": () => [
        { t: "text", s: "On branch main" },
        { t: "text", s: "Your branch is up to date with 'origin/main'." },
        { t: "spacer" },
        { t: "text-green", s: "nothing to commit, working tree clean" },
      ],

      "git branch": () => [
        { t: "text-green", s: "* main" },
        { t: "text-dim", s: "  dev" },
        { t: "text-dim", s: "  feature/ama-ai" },
        { t: "text-dim", s: "  feature/terminal-playground" },
      ],

      "cat about.txt": () => [
        { t: "text", s: "I'm Fauzan — a Full Stack Developer from Indonesia." },
        { t: "text", s: "I love building things that live on the internet." },
        { t: "text", s: "My philosophy: write code that tells a story." },
        { t: "spacer" },
        {
          t: "text",
          s: "Currently exploring AI integrations and open source.",
        },
        { t: "text", s: "Reach out if you have an exciting project!" },
      ],
    };

    // Windows-specific
    const win = {
      "get-projects": shared.projects,
      "get-contact": shared.contact,
      dir: () => [{ t: "ls-win" }],
      ls: () => [{ t: "ls-win" }],
      pwd: () => [{ t: "text", s: pgCurrentDir.windows }],
      "get-date": () => [{ t: "date" }],
      ipconfig: () => [{ t: "ipconfig" }],
      "winget list": () => [{ t: "winget-list" }],
      systeminfo: () => [{ t: "systeminfo" }],
      tasklist: () => [{ t: "tasklist" }],
      "invoke-hireme": () => [{ t: "hire", os: "windows" }],
    };

    // Linux-specific
    const lin = {
      ls: () => [{ t: "ls-linux" }],
      dir: () => [{ t: "ls-linux" }],
      pwd: () => [{ t: "text", s: pgCurrentDir.linux }],
      date: () => [{ t: "date" }],
      ifconfig: () => [{ t: "ifconfig" }],
      "apt list": () => [{ t: "apt-list" }],
      "uname -a": () => [{ t: "uname" }],
      "ps aux": () => [{ t: "ps-aux" }],
      "sudo hire me": () => [{ t: "hire", os: "linux" }],
    };

    const base = isWin ? { ...shared, ...win } : { ...shared, ...lin };
    return base;
  }

  /* ---------- RENDER -------------------------------------------- */
  function renderOutput(items) {
    const frags = [];
    items.forEach((item) => {
      switch (item.t) {
        case "spacer":
          frags.push(`<div class="pg-row">&nbsp;</div>`);
          break;

        case "header":
          frags.push(
            `<div class="pg-row" style="color:var(--fn);font-weight:700;font-size:.9rem">${item.s}</div>`,
          );
          break;

        case "section":
          frags.push(
            `<div class="pg-row" style="color:var(--acc);margin-top:8px;font-weight:600">-- ${item.s} --</div>`,
          );
          break;

        case "info":
          frags.push(`<div class="pg-row pg-info">${item.s}</div>`);
          break;

        case "cm":
          frags.push(
            `<div class="pg-row cm-color mono" style="font-size:.74rem">${item.s}</div>`,
          );
          break;

        case "cmd-list":
          item.items.forEach(([cmd, desc]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--kw);min-width:160px;display:inline-block">${cmd}</span><span style="color:var(--tx2)">${desc}</span></div>`,
            );
          });
          break;

        case "json":
          item.lines.forEach((l) => {
            if (!l) {
              frags.push(`<div class="pg-row">&nbsp;</div>`);
              return;
            }
            const colored = l
              .replace(
                /"([^"]+)"\s*:/g,
                `<span style="color:var(--acc2)">"$1"</span>:`,
              )
              .replace(
                /:\s*"([^"]+)"/g,
                `: <span style="color:var(--st)">"$1"</span>`,
              );
            frags.push(
              `<div class="pg-row"><span class="mono" style="color:var(--df)">${colored}</span></div>`,
            );
          });
          break;

        case "skill-bar":
          frags.push(
            `<div class="pg-row"><span style="min-width:110px;display:inline-block;color:var(--tx2)">${item.name}</span><span style="color:var(--acc)">${bar(item.pct)}</span><span style="color:var(--fn);margin-left:8px">${item.pct}%</span></div>`,
          );
          break;

        case "proj":
          frags.push(
            `<div class="pg-row" style="margin:3px 0"><span style="color:var(--acc2);font-weight:600">+ ${item.name}</span> <span style="color:var(--tx3);font-size:.68rem">* ${item.stars}</span></div><div class="pg-row" style="padding-left:14px;color:var(--tx2);font-size:.74rem">${item.desc}</div>`,
          );
          break;

        case "text":
          frags.push(
            `<div class="pg-row" style="color:var(--tx2)">${item.s}</div>`,
          );
          break;

        case "text-dim":
          frags.push(
            `<div class="pg-row" style="color:var(--tx3)">${item.s}</div>`,
          );
          break;

        case "text-green":
          frags.push(
            `<div class="pg-row" style="color:var(--green)">${item.s}</div>`,
          );
          break;

        case "date":
          frags.push(
            `<div class="pg-row" style="color:var(--tx2)">${new Date().toString()}</div>`,
          );
          break;

        case "neofetch": {
          const isWin = item.os === "windows";
          const logo = isWin
            ? [
                '<span style="color:#00adef">##########  ##########</span>',
                '<span style="color:#00adef">##########  ##########</span>',
                '<span style="color:#00adef">##########  ##########</span>',
                '<span style="color:#00adef">            </span>',
                '<span style="color:#00adef">##########  ##########</span>',
                '<span style="color:#00adef">##########  ##########</span>',
                '<span style="color:#00adef">##########  ##########</span>',
              ]
            : [
                '<span style="color:#e95420">        /\\        </span>',
                '<span style="color:#e95420">       /  \\       </span>',
                '<span style="color:#dd4814">      /\\   \\      </span>',
                '<span style="color:#dd4814">     /  __  \\     </span>',
                '<span style="color:#c03728">    /  (  )  \\    </span>',
                '<span style="color:#c03728">   / ___||___ \\   </span>',
                '<span style="color:#9e2a2b">  /_____________\\ </span>',
              ];
          logo.forEach((l) =>
            frags.push(
              `<div class="pg-row" style="font-size:.72rem;line-height:1.4">${l}</div>`,
            ),
          );
          frags.push(`<div class="pg-row">&nbsp;</div>`);
          frags.push(
            `<div class="pg-row" style="color:var(--acc);font-weight:700">fauzan@${isWin ? "DESKTOP-FA" : "portfolio"}</div>`,
          );
          frags.push(
            `<div class="pg-row" style="color:var(--border2)">──────────────────────────────</div>`,
          );
          const sysInfo = isWin
            ? [
                ["OS", "Windows 11 Pro 23H2"],
                ["Host", "DESKTOP-FA (Custom Build)"],
                ["Shell", "PowerShell 7.4.1"],
                ["Editor", "VS Code (Dracula)"],
                ["Font", "JetBrains Mono"],
                ["RAM", "16 GB"],
                ["CPU", "Intel i7-12700H"],
                ["GPU", "RTX 3060 Ti"],
                ["Uptime", "3+ years coding"],
                ["GitHub", "github.com/zannaxe"],
              ]
            : [
                ["OS", "Ubuntu 22.04.4 LTS"],
                ["Kernel", "5.15.0-94-generic"],
                ["Shell", "bash 5.1.16"],
                ["Editor", "VS Code (Dracula)"],
                ["Font", "JetBrains Mono"],
                ["RAM", "16 GB (4.2 GB used)"],
                ["CPU", "Intel i7-12700H"],
                ["DE", "GNOME 42.9"],
                ["Uptime", "3+ years coding"],
                ["GitHub", "github.com/zannaxe"],
              ];
          sysInfo.forEach(([k, v]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--kw);min-width:90px;display:inline-block">${k}:</span><span style="color:var(--tx2)">${v}</span></div>`,
            );
          });
          break;
        }

        case "git-log":
          frags.push(
            `<div class="pg-row" style="color:var(--acc2);margin-bottom:4px">commit history (main)</div>`,
          );
          COMMITS.forEach((c) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--fn)">${c.hash}</span> <span style="color:var(--tx)">${c.msg}</span> <span style="color:var(--tx3);font-size:.68rem;margin-left:8px">${c.time}</span></div>`,
            );
          });
          break;

        case "ls-win": {
          const dir = pgCurrentDir.windows;
          const files = [
            {
              name: "Documents",
              mode: "d----",
              date: "04/22/2026",
              size: "<DIR>",
            },
            {
              name: "Downloads",
              mode: "d----",
              date: "04/22/2026",
              size: "<DIR>",
            },
            {
              name: "Projects",
              mode: "d----",
              date: "04/22/2026",
              size: "<DIR>",
            },
            {
              name: "about.txt",
              mode: "-a---",
              date: "04/22/2026",
              size: "1,024",
            },
            {
              name: "profile.json",
              mode: "-a---",
              date: "04/22/2026",
              size: "512",
            },
            {
              name: "README.md",
              mode: "-a---",
              date: "04/22/2026",
              size: "2,048",
            },
          ];
          frags.push(
            `<div class="pg-row" style="color:var(--tx3)">    Directory: ${dir}</div>`,
          );
          frags.push(`<div class="pg-row">&nbsp;</div>`);
          frags.push(
            `<div class="pg-row"><span style="color:var(--tx3);min-width:60px;display:inline-block">Mode</span><span style="color:var(--tx3);min-width:120px;display:inline-block">LastWriteTime</span><span style="color:var(--tx3);min-width:80px;display:inline-block">Length</span><span style="color:var(--tx3)">Name</span></div>`,
          );
          frags.push(
            `<div class="pg-row" style="color:var(--border2)">────  ─────────────  ──────  ────</div>`,
          );
          files.forEach((f) => {
            const c = f.mode.startsWith("d") ? "var(--acc)" : "var(--tx)";
            frags.push(
              `<div class="pg-row"><span style="color:var(--tx3);min-width:60px;display:inline-block">${f.mode}</span><span style="color:var(--tx3);min-width:120px;display:inline-block">${f.date}</span><span style="color:var(--tx3);min-width:80px;display:inline-block">${f.size}</span><span style="color:${c}">${f.name}</span></div>`,
            );
          });
          break;
        }

        case "ls-linux": {
          const linFiles = [
            { name: "Desktop/", color: "var(--acc)" },
            { name: "Documents/", color: "var(--acc)" },
            { name: "Downloads/", color: "var(--acc)" },
            { name: "projects/", color: "var(--acc)" },
            { name: "about.txt", color: "var(--tx)" },
            { name: "profile.json", color: "var(--tx)" },
            { name: "README.md", color: "var(--green)" },
            { name: ".bashrc", color: "var(--tx3)" },
            { name: ".gitconfig", color: "var(--tx3)" },
          ];
          const html = linFiles
            .map(
              (f) =>
                `<span style="color:${f.color};margin-right:12px">${f.name}</span>`,
            )
            .join("");
          frags.push(
            `<div class="pg-row" style="flex-wrap:wrap;gap:2px">${html}</div>`,
          );
          break;
        }

        case "ipconfig":
          frags.push(
            `<div class="pg-row" style="color:var(--fn);font-weight:600">Windows IP Configuration</div>`,
          );
          frags.push(`<div class="pg-row">&nbsp;</div>`);
          [
            ["Connection-specific DNS Suffix", "local"],
            ["IPv4 Address", "192.168.1.69"],
            ["Subnet Mask", "255.255.255.0"],
            ["Default Gateway", "192.168.1.1"],
          ].forEach(([k, v]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--tx2);min-width:220px;display:inline-block">   ${k} . :</span><span style="color:var(--st)"> ${v}</span></div>`,
            );
          });
          break;

        case "ifconfig":
          frags.push(
            `<div class="pg-row" style="color:var(--fn);font-weight:600">eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;</div>`,
          );
          frags.push(
            `<div class="pg-row" style="color:var(--tx2)">      inet 192.168.1.42  netmask 255.255.255.0  broadcast 192.168.1.255</div>`,
          );
          frags.push(
            `<div class="pg-row" style="color:var(--tx2)">      inet6 fe80::1a2b:3c4d:5e6f:7a8b</div>`,
          );
          break;

        case "winget-list": {
          const pkgs = [
            ["Git.Git", "2.44.0"],
            ["OpenJS.NodeJS", "20.11.1"],
            ["Microsoft.VSCode", "1.87.2"],
            ["Docker.DockerDesktop", "4.28.0"],
            ["GoLang.Go", "1.22.1"],
            ["Python.Python.3.12", "3.12.2"],
          ];
          frags.push(
            `<div class="pg-row" style="color:var(--fn);font-weight:600">Name                   Id                     Version   Source</div>`,
          );
          frags.push(
            `<div class="pg-row" style="color:var(--border2)">──────────────────────────────────────────────────────</div>`,
          );
          pkgs.forEach(([id, ver]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--tx);min-width:200px;display:inline-block">${id}</span><span style="color:var(--acc2);min-width:80px;display:inline-block">${ver}</span><span style="color:var(--tx3)">winget</span></div>`,
            );
          });
          break;
        }

        case "apt-list": {
          const pkgs = [
            ["git", "2.34.1"],
            ["nodejs", "20.11.1"],
            ["code", "1.87.2"],
            ["docker.io", "24.0.5"],
            ["golang", "1.22.1"],
            ["python3", "3.10.12"],
          ];
          frags.push(
            `<div class="pg-row" style="color:var(--tx3)">Listing... Done</div>`,
          );
          pkgs.forEach(([n, v]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--tx);min-width:120px;display:inline-block">${n}</span><span style="color:var(--acc2)">${v}</span><span style="color:var(--tx3);margin-left:8px">amd64 [installed]</span></div>`,
            );
          });
          break;
        }

        case "uname":
          frags.push(
            `<div class="pg-row" style="color:var(--tx2)">Linux portfolio 5.15.0-94-generic #104-Ubuntu SMP Tue Jan 9 15:25:40 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux</div>`,
          );
          break;

        case "systeminfo":
          [
            ["OS Name", "Microsoft Windows 11 Pro"],
            ["OS Version", "10.0.22631 Build 22631"],
            ["Processor", "Intel(R) Core(TM) i7-12700H"],
            ["Total Physical Memory", "16,384 MB"],
            ["Time Zone", "(UTC+07:00) Bangkok, Hanoi, Jakarta"],
          ].forEach(([k, v]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--kw);min-width:200px;display:inline-block">${k}:</span><span style="color:var(--tx2)">${v}</span></div>`,
            );
          });
          break;

        case "tasklist":
          frags.push(
            `<div class="pg-row"><span style="color:var(--fn);min-width:200px;display:inline-block">Image Name</span><span style="color:var(--fn);min-width:80px;display:inline-block">PID</span><span style="color:var(--fn)">Mem Usage</span></div>`,
          );
          frags.push(
            `<div class="pg-row" style="color:var(--border2)">────────────────────────────────────────</div>`,
          );
          [
            ["node.exe", "4892", "128,456 K"],
            ["Code.exe", "3120", "256,880 K"],
            ["chrome.exe", "1024", "512,340 K"],
            ["powershell.exe", "5566", "64,512 K"],
          ].forEach(([n, p, m]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--tx);min-width:200px;display:inline-block">${n}</span><span style="color:var(--acc2);min-width:80px;display:inline-block">${p}</span><span style="color:var(--tx2)">${m}</span></div>`,
            );
          });
          break;

        case "ps-aux":
          frags.push(
            `<div class="pg-row"><span style="color:var(--fn);min-width:80px;display:inline-block">USER</span><span style="color:var(--fn);min-width:60px;display:inline-block">PID</span><span style="color:var(--fn)">COMMAND</span></div>`,
          );
          [
            ["fauzan", "1234", "node /home/fauzan/projects/portfolio"],
            ["fauzan", "2345", "code"],
            ["fauzan", "3456", "/usr/bin/bash"],
            ["fauzan", "4567", "docker daemon"],
          ].forEach(([u, p, c]) => {
            frags.push(
              `<div class="pg-row"><span style="color:var(--st);min-width:80px;display:inline-block">${u}</span><span style="color:var(--acc2);min-width:60px;display:inline-block">${p}</span><span style="color:var(--tx2)">${c}</span></div>`,
            );
          });
          break;

        case "hire":
          if (item.os === "windows") {
            frags.push(
              `<div class="pg-row pg-err">Invoke-HireMe: Access denied. Credentials required.</div>`,
            );
          } else {
            frags.push(
              `<div class="pg-row pg-err">sudo: Authentication failure</div>`,
            );
            frags.push(
              `<div class="pg-row pg-err">sudo: 3 failed attempts</div>`,
            );
          }
          setTimeout(() => {
            appendRows([
              `<div class="pg-row" style="color:var(--green);font-weight:700;margin-top:6px">Just kidding! I'd love to work with you.</div>`,
              `<div class="pg-row" style="color:var(--tx2)">Email: <span style="color:var(--acc)">fauzanafryan1@gmail.com</span></div>`,
              `<div class="pg-row" style="color:var(--tx2)">Phone: <span style="color:var(--acc)">+62 877-3155-0949</span></div>`,
            ]);
          }, 1500);
          break;
      }
    });
    return frags;
  }

  function appendRows(rows) {
    const out = document.getElementById("pgOut");
    if (!out) return;
    rows.forEach((r) => {
      const div = document.createElement("div");
      div.innerHTML = r;
      out.appendChild(div);
    });
    out.scrollTop = out.scrollHeight;
  }

  function runCommand(rawCmd) {
    const out = document.getElementById("pgOut");
    if (!rawCmd.trim()) return;

    const os = OS.current;
    const isWin = os === "windows";
    const trimmed = rawCmd.trim();
    const lower = trimmed.toLowerCase();

    // Render prompt + command echo
    const promptHTML = isWin
      ? `<span style="color:var(--kw)">PS</span> <span style="color:var(--tp)">${pgCurrentDir.windows}</span><span style="color:var(--df)">&gt;</span>`
      : `<span style="color:var(--tp)">fauzan</span><span style="color:var(--cm)">@portfolio</span><span style="color:var(--df)">:~$</span>`;

    const cmdDiv = document.createElement("div");
    cmdDiv.className = "pg-row";
    cmdDiv.innerHTML = `${promptHTML} <span style="color:var(--tx)">${trimmed}</span>`;
    out.appendChild(cmdDiv);

    // cd
    if (lower.startsWith("cd ")) {
      const target = trimmed.slice(3).trim();
      if (target === ".." || target === "../") {
        const sep = isWin ? "\\" : "/";
        const parts = (isWin ? pgCurrentDir.windows : pgCurrentDir.linux)
          .split(sep)
          .filter(Boolean);
        if (parts.length > 1) parts.pop();
        if (isWin) pgCurrentDir.windows = parts.join("\\") || "C:\\";
        else pgCurrentDir.linux = "/" + parts.join("/");
      } else {
        if (isWin) pgCurrentDir.windows += "\\" + target;
        else pgCurrentDir.linux += "/" + target;
      }
      updatePromptEl();
      appendRows([`<div class="pg-row">&nbsp;</div>`]);
      return;
    }

    // echo
    if (lower.startsWith("echo ")) {
      const text = trimmed.slice(5);
      appendRows([
        `<div class="pg-row" style="color:var(--tx2)">${text}</div>`,
        `<div class="pg-row">&nbsp;</div>`,
      ]);
      return;
    }

    // ping
    if (lower.startsWith("ping ")) {
      const host = trimmed.slice(5).trim();
      appendRows([
        `<div class="pg-row" style="color:var(--tx2)">Pinging ${host} with 32 bytes of data:</div>`,
        `<div class="pg-row" style="color:var(--green)">Reply from ${host}: bytes=32 time=12ms TTL=64</div>`,
        `<div class="pg-row" style="color:var(--green)">Reply from ${host}: bytes=32 time=11ms TTL=64</div>`,
        `<div class="pg-row" style="color:var(--green)">Reply from ${host}: bytes=32 time=13ms TTL=64</div>`,
        `<div class="pg-row" style="color:var(--green)">Reply from ${host}: bytes=32 time=10ms TTL=64</div>`,
        `<div class="pg-row">&nbsp;</div>`,
        `<div class="pg-row" style="color:var(--fn)">Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)</div>`,
      ]);
      appendRows([`<div class="pg-row">&nbsp;</div>`]);
      return;
    }

    // winget install
    if (lower.startsWith("winget install")) {
      const pkg = trimmed.slice(15).trim() || "package";
      appendRows([
        `<div class="pg-row" style="color:var(--tx2)">Found ${pkg}</div>`,
        `<div class="pg-row" style="color:var(--tx2)">Downloading...</div>`,
        `<div class="pg-row" style="color:var(--acc)">[████████████████████] 100%</div>`,
        `<div class="pg-row" style="color:var(--green)">Successfully installed ${pkg}</div>`,
      ]);
      appendRows([`<div class="pg-row">&nbsp;</div>`]);
      return;
    }

    // apt install
    if (
      lower.startsWith("apt install") ||
      lower.startsWith("sudo apt install")
    ) {
      const pkg = trimmed.split(" ").slice(-1)[0];
      appendRows([
        `<div class="pg-row" style="color:var(--tx2)">Reading package lists... Done</div>`,
        `<div class="pg-row" style="color:var(--tx2)">Building dependency tree... Done</div>`,
        `<div class="pg-row" style="color:var(--acc)">[████████████████████] 100%</div>`,
        `<div class="pg-row" style="color:var(--green)">Successfully installed ${pkg}</div>`,
      ]);
      appendRows([`<div class="pg-row">&nbsp;</div>`]);
      return;
    }

    // clear / cls
    if (lower === "cls" || lower === "clear") {
      pgBootTerminal(os);
      return;
    }

    const cmds = buildCommands(os);
    const handler = cmds[lower];
    if (handler) {
      appendRows(renderOutput(handler()));
    } else {
      const errMsg = isWin
        ? `${trimmed} : The term '${trimmed}' is not recognized as a cmdlet, function, or operable program.`
        : `bash: ${trimmed}: command not found`;
      appendRows([
        `<div class="pg-row pg-err">${errMsg}</div>`,
        `<div class="pg-row" style="color:var(--tx3)">Type <span style="color:var(--kw)">help</span> for available commands.</div>`,
      ]);
    }

    appendRows([`<div class="pg-row">&nbsp;</div>`]);
    out.scrollTop = out.scrollHeight;
  }

  function updatePromptEl() {
    const el = document.getElementById("pgPromptEl");
    if (!el) return;
    const os = OS.current;
    if (os === "windows") {
      el.innerHTML = `<span class="kw">PS</span>&nbsp;<span class="tp">${pgCurrentDir.windows}</span><span class="df">&gt;</span>`;
    } else {
      el.innerHTML = `<span class="tp">fauzan</span><span class="cm-color">@portfolio</span><span class="df">:~$</span>`;
    }
  }

  function pgBootTerminal(os) {
    const out = document.getElementById("pgOut");
    const cfg = OS_CONFIG[os];
    if (!out) return;
    out.innerHTML = "";
    cfg.boot.forEach((item) => {
      const d = document.createElement("div");
      d.className = "pg-row";
      if (item.t === "info") {
        d.classList.add("pg-info");
        d.innerHTML = item.s;
      } else if (item.t === "cm") {
        d.className = "pg-row cm-color mono";
        d.style.fontSize = ".74rem";
        d.innerHTML = item.s;
      } else {
        d.style.color = "var(--tx2)";
        d.innerHTML = item.s;
      }
      out.appendChild(d);
    });
  }

  function pgRefreshUI(os) {
    const cfg = OS_CONFIG[os];

    // Update bar title
    const barTitle = document.getElementById("pgBarTitle");
    if (barTitle) barTitle.textContent = cfg.barTitle;

    // Update subtitle
    const sub = document.getElementById("pgSubtitle");
    if (sub) sub.innerHTML = cfg.subtitle;

    // Update chips
    const chipsEl = document.getElementById("pgChips");
    if (chipsEl) {
      chipsEl.innerHTML = "";
      cfg.chips.forEach((chip) => {
        const span = document.createElement("span");
        span.className = "pg-chip" + (chip.cls ? " " + chip.cls : "");
        const iconClass = chip.icon.includes("fab")
          ? chip.icon.replace(" fab", "") + " fab"
          : "fas " + chip.icon;
        span.innerHTML = `<i class="${iconClass}"></i> ${chip.label}`;
        span.addEventListener("click", () => pgRun(chip.cmd));
        chipsEl.appendChild(span);
      });
    }

    // Update prompt
    updatePromptEl();

    // Reset dir
    pgCurrentDir = { windows: "C:\\Users\\fauzan", linux: "/home/fauzan" };

    // Boot screen
    pgBootTerminal(os);
  }

  // Exposed globals
  window.pgRun = function (cmd) {
    const input = document.getElementById("pgInput");
    if (input) {
      input.value = cmd;
      input.focus();
    }
    runCommand(cmd);
    if (input) input.value = "";
  };

  window.pgClear = function () {
    pgBootTerminal(OS.current);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pgInput");
    if (!input) return;
    pgReady = true;

    // Initial render
    pgRefreshUI(OS.current);

    // OS change
    document.addEventListener("os-change", (e) => {
      pgRefreshUI(e.detail);
    });

    // Keyboard
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const v = input.value;
        if (v.trim()) {
          cmdHistory.unshift(v);
          histIdx = -1;
        }
        runCommand(v);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (histIdx < cmdHistory.length - 1) {
          histIdx++;
          input.value = cmdHistory[histIdx];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdx > 0) {
          histIdx--;
          input.value = cmdHistory[histIdx];
        } else {
          histIdx = -1;
          input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const cmds = Object.keys(buildCommands(OS.current)).concat([
          "cd",
          "echo",
          "ping",
          "clear",
          "cls",
        ]);
        const match = cmds.find((c) => c.startsWith(input.value.toLowerCase()));
        if (match) input.value = match;
      }
    });

    document
      .querySelector(".pg-terminal")
      ?.addEventListener("click", () => input.focus());
  });
})();

/* ──────────────────────────────────────────────────────────────
   8. CUSTOM CURSOR
────────────────────────────────────────────────────────────── */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;
    if ("ontouchstart" in window) {
      dot.style.display = "none";
      ring.style.display = "none";
      return;
    }

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });
    (function animRing() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animRing);
    })();

    const hoverTargets =
      "a,button,.proj-card,.ac,.pf,.pg-chip,.ctl-item,.tag,.tech-badge,.mbn-item,.nav-link,.ama-chip,.pi-mood,.os-btn";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.add("hovering");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.remove("hovering");
    });
    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity = "1";
      ring.style.opacity = ".45";
    });
  });
})();

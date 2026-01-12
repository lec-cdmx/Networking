// Main UI: active nav, reveal on scroll, countdown, simple helpers.
(function(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a=>{
    if((a.getAttribute("href")||"").toLowerCase() === path) a.classList.add("active");
  });

  // Reveal on scroll
  const els = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("in");
    });
  }, { threshold: 0.12 });
  els.forEach(el=>io.observe(el));

  // Countdown: set via data-countdown="2026-03-19T16:00:00-06:00"
  const cd = document.querySelector("[data-countdown]");
  if(cd){
    const targetStr = cd.getAttribute("data-countdown");
    const target = new Date(targetStr).getTime();
    const parts = {
      d: cd.querySelector("[data-cd='d']"),
      h: cd.querySelector("[data-cd='h']"),
      m: cd.querySelector("[data-cd='m']"),
      s: cd.querySelector("[data-cd='s']")
    };
    const pad = (n)=> String(Math.max(0,n)).padStart(2,"0");
    const tick = ()=>{
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000*60*60*24)); diff -= d*(1000*60*60*24);
      const h = Math.floor(diff / (1000*60*60)); diff -= h*(1000*60*60);
      const m = Math.floor(diff / (1000*60)); diff -= m*(1000*60);
      const s = Math.floor(diff / 1000);
      if(parts.d) parts.d.textContent = String(d);
      if(parts.h) parts.h.textContent = pad(h);
      if(parts.m) parts.m.textContent = pad(m);
      if(parts.s) parts.s.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  // Smooth in-page anchors
  document.querySelectorAll("a[href^='#']").forEach(a=>{
    a.addEventListener("click",(e)=>{
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior:"smooth", block:"start" });
    });
  });
})();

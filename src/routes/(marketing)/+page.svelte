<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }
  const jsonldScript = `<script type="application/ld+json">${JSON.stringify(ldJson) + "<"}/script>`

  const features = [
    { name: "User Auth",       link: "/login",            desc: "Sign up, sign out, forgot password, email verification, and oAuth. Powered by Supabase Auth.", icon: "🔐" },
    { name: "Pricing Page",    link: "/pricing",          desc: "Customizable and fast pricing page, integrated into the billing portal.", icon: "💲" },
    { name: "Blog Engine",     link: "/blog",             desc: "Blog engine with rich formatting, RSS and SEO optimization.", icon: "✍" },
    { name: "Subscriptions",   link: "/pricing",          desc: "User-friendly subscriptions powered by Stripe Checkout.", icon: "💳" },
    { name: "Billing Portal",  link: "/account/billing",  desc: "Self-serve portal for updating card, receipts, upgrades, downgrades and more.", icon: "🧾" },
    { name: "User Dashboard",  link: "/account/settings", desc: "User profile, settings, update email/password, billing, and more.", icon: "⚙" },
    { name: "Contact Us",      link: "/contact_us",       desc: "Contact form for customers to reach out for demos, quotes, and questions.", icon: "📬" },
    { name: "Site Search",     link: "/search",           desc: "Lightning-fast site search, without a backend.", icon: "🔍" },
    { name: "Email",           link: "https://github.com/CriticalMoments/CMSaasStarter/blob/main/email_docs.md", desc: "Send emails to users, including template support.", icon: "📧" },
    { name: "Performance",     link: "https://github.com/CriticalMoments/CMSaasStarter?tab=readme-ov-file#performance--best-practices", desc: "Pre-rendering. Compiled on deploy to remove unused CSS/JS. Perfect 100/100 Google scores.", icon: "⚡" },
    { name: "Responsive",      link: "/",                 desc: "Designed for mobile and desktop.", icon: "📱" },
    { name: "Free to Host",    link: "https://github.com/CriticalMoments/CMSaasStarter?tab=readme-ov-file#suggested-hosting-stack", desc: "Instructions included for Cloudflare + Supabase. Free to start.", icon: "🚀" },
  ]
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonldScript}
</svelte:head>

<!-- ─── HERO ─────────────────────────────────────────────────── -->
<section style="
  padding: 64px 24px 56px;
  text-align: center;
  border-bottom: 1px solid var(--border);
  background: radial-gradient(ellipse 60% 40% at 50% -10%, rgba(240,180,41,.07) 0%, transparent 70%);
">
  <div style="max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; align-items: center;">
    <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
      <span class="ds-badge badge-dxy">SvelteKit</span>
      <span class="ds-badge badge-gold">Supabase</span>
      <span class="ds-badge badge-live">Stripe</span>
      <span class="ds-badge badge-sig">Tailwind</span>
    </div>
    <h1 style="
      font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:800;
      color:var(--text);line-height:1.15;text-wrap:balance;
    ">
      The fastest way to launch your <span style="color:var(--gold);">SaaS</span>
    </h1>
    <p style="font-size:.85rem;color:var(--muted);line-height:1.7;max-width:520px;text-wrap:pretty;">
      {WebsiteDescription}
    </p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:8px;">
      <a href="/pricing" class="ds-btn-primary" style="padding:10px 28px;font-size:.8rem;">Get Started</a>
      <a href="https://github.com/CriticalMoments/CMSaasStarter" target="_blank" class="ds-btn" style="padding:10px 20px;font-size:.8rem;">View on GitHub</a>
    </div>
  </div>
</section>

<!-- ─── STATS STRIP ───────────────────────────────────────────── -->
<section style="
  display:grid;grid-template-columns:repeat(4,1fr);
  border-bottom:1px solid var(--border);background:var(--surface);
">
  {#each [
    {label:'Open Source', value:'100%', sub:'MIT license'},
    {label:'Lighthouse Score', value:'100', sub:'Performance'},
    {label:'Stack', value:'4+', sub:'Best-in-class tools'},
    {label:'Time to Launch', value:'<1hr', sub:'From zero to deploy'},
  ] as s}
    <div style="padding:16px 20px;border-right:1px solid var(--border);display:flex;flex-direction:column;gap:3px;" class="stat-strip-cell">
      <span style="font-size:.55rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;">{s.label}</span>
      <span style="font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:var(--gold);">{s.value}</span>
      <span style="font-size:.58rem;color:var(--muted);">{s.sub}</span>
    </div>
  {/each}
</section>

<!-- ─── FEATURES ──────────────────────────────────────────────── -->
<section style="padding:48px 24px;max-width:1060px;margin:0 auto;">
  <div class="ds-shd" style="margin-bottom:24px;">Everything you need to ship</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;">
    {#each features as f}
      <a href={f.link} style="text-decoration:none;" target={f.link.startsWith('http') ? '_blank' : '_self'}>
        <div class="ds-card" style="padding:16px 18px;display:flex;flex-direction:column;gap:7px;transition:border-color .15s;"
          onmouseover={(e)=>(e.currentTarget as HTMLElement).style.borderColor='var(--gold)'}
          onmouseout={(e)=>(e.currentTarget as HTMLElement).style.borderColor='var(--border)'}
        >
          <span style="font-size:1.2rem;">{f.icon}</span>
          <span style="font-family:'Syne',sans-serif;font-weight:700;font-size:.8rem;color:var(--text);">{f.name}</span>
          <span style="font-size:.62rem;color:var(--muted);line-height:1.55;">{f.desc}</span>
        </div>
      </a>
    {/each}
  </div>
</section>

<!-- ─── TECH STACK ─────────────────────────────────────────────── -->
<section style="
  padding:40px 24px;
  border-top:1px solid var(--border);
  background:var(--surface);
">
  <div style="max-width:700px;margin:0 auto;text-align:center;display:flex;flex-direction:column;gap:16px;align-items:center;">
    <div class="ds-shd" style="width:100%;justify-content:center;">Tech Stack</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
      {#each ['SvelteKit','Supabase','Stripe','Tailwind CSS','DaisyUI','PostgreSQL','TypeScript'] as t}
        <span style="
          font-size:.6rem;padding:4px 12px;border-radius:20px;
          border:1px solid var(--border);color:var(--muted);
          background:var(--s2);font-family:'JetBrains Mono',monospace;
        ">{t}</span>
      {/each}
    </div>
    <div class="ds-note" style="text-align:left;font-size:.63rem;">
      <strong>Free to host:</strong> Deploy on Cloudflare Pages + Supabase free tier.
      Stripe handles payments. Zero infrastructure to manage.
    </div>
    <a href="/pricing" class="ds-btn-primary" style="padding:10px 28px;font-size:.78rem;">Start for Free</a>
  </div>
</section>

<style>
  @media (max-width:640px) {
    section:nth-child(2) { grid-template-columns: repeat(2,1fr); }
    .stat-strip-cell:nth-child(2n) { border-right: none; }
  }
</style>

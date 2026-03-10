<script lang="ts">
  import { WebsiteName } from "./../../config"
  import "../../app.css"

  interface Props {
    children?: import("svelte").Snippet
  }
  let { children }: Props = $props()
</script>

<!-- STICKY HEADER -->
<header style="
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;
  padding:10px 24px;border-bottom:1px solid var(--border);
  background:rgba(13,17,23,.97);position:sticky;top:0;z-index:200;
">
  <!-- Logo -->
  <a href="/" style="
    font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;
    display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--text);
  ">
    <span class="ldot"></span>
    <span>{WebsiteName}</span>
  </a>

  <!-- Desktop nav -->
  <nav style="display:flex;align-items:center;gap:4px;" class="hidden-mobile">
    <a href="/blog"    class="ds-nav-link">Blog</a>
    <a href="/pricing" class="ds-nav-link">Pricing</a>
    <a href="/account" class="ds-nav-link">Account</a>
    <a href="/contact_us" class="ds-nav-link">Contact</a>
    <a href="/search"  class="ds-nav-link" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z"/>
      </svg>
    </a>
    <a href="/login" style="margin-left:8px;" class="ds-btn-primary">Sign In</a>
  </nav>

  <!-- Mobile hamburger -->
  <details class="mobile-menu" style="position:relative;">
    <summary style="
      cursor:pointer;list-style:none;
      padding:6px 10px;border:1px solid var(--border);border-radius:4px;
      color:var(--muted);background:transparent;
    ">
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7"/>
      </svg>
    </summary>
    <div style="
      position:absolute;right:0;top:calc(100% + 8px);
      background:var(--s2);border:1px solid var(--border);border-radius:7px;
      min-width:160px;padding:6px 0;z-index:300;
    ">
      {#each [{href:'/blog',label:'Blog'},{href:'/pricing',label:'Pricing'},{href:'/account',label:'Account'},{href:'/contact_us',label:'Contact'},{href:'/search',label:'Search'},{href:'/login',label:'Sign In'}] as item}
        <a href={item.href} style="
          display:block;padding:8px 16px;font-size:.72rem;
          color:var(--muted);text-decoration:none;transition:color .15s;
        "
          onmouseover={(e)=>(e.currentTarget as HTMLElement).style.color='var(--gold)'}
          onmouseout={(e)=>(e.currentTarget as HTMLElement).style.color='var(--muted)'}
        >{item.label}</a>
      {/each}
    </div>
  </details>
</header>

<!-- PAGE CONTENT -->
<main style="flex:1;">
  {@render children?.()}
</main>

<!-- FOOTER -->
<footer style="
  border-top:1px solid var(--border);
  background:var(--surface);
  padding:32px 24px 20px;
  margin-top:6px;
">
  <div style="max-width:1000px;margin:0 auto;display:flex;gap:48px;flex-wrap:wrap;justify-content:space-between;">
    <!-- Brand col -->
    <div style="display:flex;flex-direction:column;gap:10px;">
      <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;display:flex;align-items:center;gap:8px;">
        <span class="ldot"></span>{WebsiteName}
      </span>
      <p style="font-size:.6rem;color:var(--muted);max-width:220px;line-height:1.6;">
        Open source SaaS starter. Built with SvelteKit, Supabase, Stripe, and Tailwind.
      </p>
    </div>
    <!-- Nav cols -->
    <nav style="display:flex;gap:48px;flex-wrap:wrap;">
      <div style="display:flex;flex-direction:column;gap:6px;">
        <span style="font-size:.55rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-bottom:4px;">Explore</span>
        {#each [{href:'/',label:'Overview'},{href:'/pricing',label:'Pricing'},{href:'/blog',label:'Blog'},{href:'/contact_us',label:'Contact Us'}] as l}
          <a href={l.href} style="font-size:.65rem;color:var(--muted);text-decoration:none;transition:color .15s;"
            onmouseover={(e)=>(e.currentTarget as HTMLElement).style.color='var(--gold)'}
            onmouseout={(e)=>(e.currentTarget as HTMLElement).style.color='var(--muted)'}
          >{l.label}</a>
        {/each}
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <span style="font-size:.55rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-bottom:4px;">Account</span>
        {#each [{href:'/login',label:'Sign In'},{href:'/login/sign_up',label:'Sign Up'},{href:'/account/billing',label:'Billing'},{href:'/account/settings',label:'Settings'}] as l}
          <a href={l.href} style="font-size:.65rem;color:var(--muted);text-decoration:none;transition:color .15s;"
            onmouseover={(e)=>(e.currentTarget as HTMLElement).style.color='var(--gold)'}
            onmouseout={(e)=>(e.currentTarget as HTMLElement).style.color='var(--muted)'}
          >{l.label}</a>
        {/each}
      </div>
    </nav>
  </div>
  <div style="max-width:1000px;margin:24px auto 0;padding-top:16px;border-top:1px solid var(--border);
    text-align:center;font-size:.57rem;color:var(--muted);">
    &copy; {new Date().getFullYear()} {WebsiteName} &nbsp;·&nbsp;
    <a href="https://github.com/CriticalMoments/CMSaasStarter" target="_blank"
      style="color:var(--dxy);text-decoration:none;">GitHub</a>
  </div>
</footer>

<style>
  .ds-nav-link {
    padding: 4px 10px;
    font-size: .67rem;
    font-family: 'JetBrains Mono', monospace;
    color: var(--muted);
    text-decoration: none;
    border-radius: 4px;
    transition: color .15s;
  }
  .ds-nav-link:hover { color: var(--gold); }
  .hidden-mobile { display: flex; }
  .mobile-menu   { display: none;  }
  @media (max-width: 640px) {
    .hidden-mobile { display: none;  }
    .mobile-menu   { display: block; }
  }
</style>

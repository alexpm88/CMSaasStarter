<script lang="ts">
  import "../../../../app.css"
  import { writable } from "svelte/store"
  import { setContext } from "svelte"
  import { WebsiteName } from "../../../../config"

  interface Props {
    children?: import("svelte").Snippet
  }
  let { children }: Props = $props()

  const adminSectionStore = writable("")
  setContext("adminSection", adminSectionStore)
  let adminSection: string | undefined = $state()
  adminSectionStore.subscribe((v) => (adminSection = v))

  const navItems = [
    {
      href: "/account",
      section: "home",
      label: "Dashboard",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`,
    },
    {
      href: "/account/billing",
      section: "billing",
      label: "Billing",
      icon: `<path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke-width="1.5"/><path d="M10 16H6M8 13H6M2 10H22" stroke-width="1.5" stroke-linecap="round"/>`,
    },
    {
      href: "/account/settings",
      section: "settings",
      label: "Settings",
      icon: `<circle cx="12" cy="12" r="3" stroke-width="2"/><path d="M12 2c-.93 0-1.4 0-1.77.15a2 2 0 0 0-1.08 1.08C9 3.6 9 4.07 9 5v.1A1.9 1.9 0 0 1 7.64 6.5l-.08-.04c-.77-.44-1.15-.66-1.55-.7a2 2 0 0 0-1.41.41c-.3.24-.52.6-.96 1.33L3 8.83c-.44.73-.66 1.1-.7 1.47a2 2 0 0 0 .41 1.41c.17.22.41.4.9.69A1.9 1.9 0 0 1 4.5 14a1.9 1.9 0 0 1-.9.6c-.48.3-.72.47-.89.69a2 2 0 0 0-.41 1.41c.04.37.26.74.7 1.47l.64 1.33c.44.73.66 1.1.96 1.33a2 2 0 0 0 1.41.41c.4-.04.78-.26 1.55-.7l.08-.04A1.9 1.9 0 0 1 9 20.9V21c0 .93 0 1.4.15 1.77a2 2 0 0 0 1.08 1.08C10.6 24 11.07 24 12 24s1.4 0 1.77-.15a2 2 0 0 0 1.08-1.08C15 22.4 15 21.93 15 21v-.1a1.9 1.9 0 0 1 1.36-1.4l.08.04c.77.44 1.15.66 1.55.7a2 2 0 0 0 1.41-.41c.3-.23.52-.6.96-1.33l.64-1.33c.44-.73.66-1.1.7-1.47a2 2 0 0 0-.41-1.41c-.17-.22-.41-.4-.9-.69A1.9 1.9 0 0 1 19.5 14a1.9 1.9 0 0 1 .9-.6c.48-.3.72-.47.89-.69a2 2 0 0 0 .41-1.41c-.04-.37-.26-.74-.7-1.47l-.64-1.33c-.44-.73-.66-1.1-.96-1.33a2 2 0 0 0-1.41-.41c-.4.04-.78.26-1.55.7l-.08.04A1.9 1.9 0 0 1 15 5.1V5c0-.93 0-1.4-.15-1.77A2 2 0 0 0 13.77 2.15C13.4 2 12.93 2 12 2z" stroke-width="0" fill="currentColor" opacity=".15"/>`,
    },
  ]

  let mobileOpen = $state(false)
</script>

<!-- ACCOUNT SHELL: sticky dark header + sidebar -->
<div style="display:flex;min-height:100vh;background:var(--bg);">

  <!-- Desktop Sidebar -->
  <aside class="ds-sidebar" style="
    width:200px;flex-shrink:0;
    background:var(--surface);border-right:1px solid var(--border);
    display:flex;flex-direction:column;
    position:sticky;top:0;height:100vh;overflow-y:auto;
  ">
    <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
      <span class="ldot"></span>
      <a href="/" style="font-family:'Syne',sans-serif;font-weight:800;font-size:.85rem;color:var(--text);text-decoration:none;">
        {WebsiteName}
      </a>
    </div>
    <nav style="padding:8px 0;flex:1;">
      {#each navItems as item}
        <a href={item.href} style="
          display:flex;align-items:center;gap:10px;
          padding:9px 14px;font-family:'JetBrains Mono',monospace;
          font-size:.68rem;text-decoration:none;
          border-left:2px solid {adminSection === item.section ? 'var(--gold)' : 'transparent'};
          color:{adminSection === item.section ? 'var(--gold)' : 'var(--muted)'};
          background:{adminSection === item.section ? 'var(--gdim)' : 'transparent'};
          transition:all .15s;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html item.icon}
          </svg>
          {item.label}
        </a>
      {/each}
    </nav>
    <div style="padding:12px 14px;border-top:1px solid var(--border);">
      <a href="/account/sign_out" style="
        display:block;font-size:.65rem;font-family:'JetBrains Mono',monospace;
        color:var(--muted);text-decoration:none;padding:6px 0;
        transition:color .15s;
      "
        onmouseover={(e)=>(e.currentTarget as HTMLElement).style.color='var(--red)'}
        onmouseout={(e)=>(e.currentTarget as HTMLElement).style.color='var(--muted)'}
      >Sign Out</a>
    </div>
  </aside>

  <!-- Content area -->
  <div style="flex:1;display:flex;flex-direction:column;min-width:0;">

    <!-- Mobile header -->
    <div class="ds-mobile-header" style="
      display:none;
      align-items:center;justify-content:space-between;
      padding:10px 16px;border-bottom:1px solid var(--border);
      background:rgba(13,17,23,.97);position:sticky;top:0;z-index:100;
    ">
      <a href="/" style="font-family:'Syne',sans-serif;font-weight:800;font-size:.85rem;color:var(--text);text-decoration:none;display:flex;align-items:center;gap:7px;">
        <span class="ldot"></span>{WebsiteName}
      </a>
      <button onclick={()=>(mobileOpen = !mobileOpen)} style="
        background:transparent;border:1px solid var(--border);
        color:var(--muted);border-radius:4px;padding:5px 8px;cursor:pointer;
      ">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7"/>
        </svg>
      </button>
    </div>

    <!-- Mobile dropdown nav -->
    {#if mobileOpen}
      <div style="
        background:var(--s2);border-bottom:1px solid var(--border);
        padding:6px 0;
      ">
        {#each navItems as item}
          <a href={item.href} onclick={()=>(mobileOpen=false)} style="
            display:block;padding:9px 16px;font-family:'JetBrains Mono',monospace;
            font-size:.7rem;color:var(--muted);text-decoration:none;
          ">{item.label}</a>
        {/each}
        <a href="/account/sign_out" style="display:block;padding:9px 16px;font-size:.7rem;color:var(--red);text-decoration:none;font-family:'JetBrains Mono',monospace;">Sign Out</a>
      </div>
    {/if}

    <!-- Page content -->
    <div style="padding:24px 28px;flex:1;">
      {@render children?.()}
    </div>

  </div>
</div>

<style>
  @media (max-width: 768px) {
    .ds-sidebar      { display: none !important; }
    .ds-mobile-header{ display: flex !important; }
  }
</style>

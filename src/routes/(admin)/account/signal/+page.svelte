<script lang="ts">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("signal")

  interface Props {
    data: { hasAccess: boolean }
  }
  let { data }: Props = $props()
</script>

<svelte:head>
  <title>DXY vs GOLD — Live Signal Dashboard</title>
</svelte:head>

{#if data.hasAccess}
  <!-- Full-screen iframe embed — no padding, flush to shell edges -->
  <div style="
    position:fixed;
    top:0;left:200px;right:0;bottom:0;
    z-index:50;
    background:var(--bg);
  ">
    <iframe
      src="/signal-dashboard.html"
      title="DXY vs XAUUSD Live Signal Dashboard"
      style="width:100%;height:100%;border:none;display:block;"
      allow="notifications"
    ></iframe>
  </div>
{:else}
  <!-- Paywall card -->
  <div style="max-width:480px;margin:60px auto 0;">

    <div style="
      background:var(--surface);border:1px solid var(--border);
      border-radius:10px;overflow:hidden;
    ">
      <!-- Card header -->
      <div style="
        padding:14px 18px;border-bottom:1px solid var(--border);
        background:var(--s2);display:flex;align-items:center;gap:10px;
      ">
        <span class="ldot"></span>
        <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:.9rem;color:var(--gold);">
          DXY vs XAUUSD · Night Signal Dashboard
        </span>
      </div>

      <!-- Badges -->
      <div style="padding:16px 18px 0;display:flex;gap:6px;flex-wrap:wrap;">
        <span class="badge bd">TVC:DXY</span>
        <span class="badge bg">XAU/USD</span>
        <span class="badge bs">21:00–23:00 UTC</span>
        <span class="badge be">RESTRICTED</span>
      </div>

      <!-- Description -->
      <div style="padding:16px 18px;font-size:.67rem;color:var(--muted);line-height:1.7;">
        <p style="margin-bottom:10px;">
          This service provides <span style="color:var(--gold);font-weight:600;">live DXY vs XAUUSD signal detection</span>
          powered by real-time OHLC data from Twelve Data, Alpha Vantage, and Polygon.io with a built-in backtesting engine.
        </p>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:6px;">
          {#each [
            {c:'var(--dxy)',  t:'Live TradingView charts — DXY + GOLD overlay'},
            {c:'var(--gold)', t:'Night session signal engine (21–23 UTC)'},
            {c:'var(--sig)',  t:'30-day real backtesting with equity curve'},
            {c:'var(--green)',t:'Configurable SL / TP / timeframe controls'},
            {c:'var(--green)',t:'Multi-API fallback + 15-min local cache'},
          ] as f}
            <li style="display:flex;align-items:flex-start;gap:8px;">
              <span style="color:{f.c};margin-top:1px;">&#x25B8;</span>
              <span>{f.t}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Stats preview (decorative) -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--border);">
        {#each [
          {label:'Win Rate', value:'~68%',  color:'var(--green)'},
          {label:'Profit Factor', value:'~2.1', color:'var(--gold)'},
          {label:'Signals / 30d', value:'12–18', color:'var(--sig)'},
        ] as s}
          <div style="
            padding:12px 14px;
            border-right:1px solid var(--border);
            display:flex;flex-direction:column;gap:3px;
            filter:blur(3px);user-select:none;
          ">
            <span style="font-size:.54rem;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;">{s.label}</span>
            <span style="font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:{s.color};">{s.value}</span>
          </div>
        {/each}
      </div>

      <!-- CTA -->
      <div style="
        padding:16px 18px;border-top:1px solid var(--border);
        display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;
      ">
        <span style="font-size:.62rem;color:var(--muted);">Active subscription required to access this service.</span>
        <a href="/account/billing" style="
          font-family:'Syne',sans-serif;font-weight:700;font-size:.68rem;
          background:linear-gradient(135deg,var(--gold),#e09d18);
          color:#000;border:none;border-radius:4px;
          padding:7px 18px;text-decoration:none;white-space:nowrap;
          transition:opacity .15s;
        "
          onmouseover={(e)=>(e.currentTarget as HTMLElement).style.opacity='.82'}
          onmouseout={(e)=>(e.currentTarget as HTMLElement).style.opacity='1'}
        >
          Upgrade Plan
        </a>
      </div>
    </div>

    <!-- Note -->
    <div style="
      margin-top:14px;padding:10px 14px;border-radius:6px;
      background:rgba(88,166,255,.05);border:1px solid rgba(88,166,255,.15);
      font-size:.61rem;color:var(--muted);line-height:1.65;
    ">
      <strong style="color:var(--dxy);">Already subscribed?</strong>
      Your subscription may take a moment to activate. If you recently upgraded and still see this page,
      try signing out and back in or contact support.
    </div>

  </div>
{/if}

<style>
  /* When the iframe is active, remove the default content padding */
  :global(.signal-page-active > div[style*="padding"]) {
    padding: 0 !important;
  }
  @media (max-width: 768px) {
    iframe { left: 0 !important; }
  }
</style>

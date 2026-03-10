<script lang="ts">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("home")
</script>

<svelte:head>
  <title>Account — Dashboard</title>
</svelte:head>

<!-- Page header -->
<div style="margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
  <div>
    <h1 style="font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:var(--text);">Dashboard</h1>
    <p style="font-size:.62rem;color:var(--muted);margin-top:2px;">Welcome back. Here's an overview of your account.</p>
  </div>
  <span class="ds-badge badge-live" style="display:flex;align-items:center;gap:5px;padding:3px 10px;">
    <span class="ldot" style="width:6px;height:6px;"></span> Live
  </span>
</div>

<!-- Stats grid -->
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin-bottom:24px;">
  {#each [
    {label:'Downloads',  value:'31K',   sub:'↗ 546 (2%)',  color:'var(--gold)'},
    {label:'Users',      value:'4,200', sub:'↗ 40 (2%)',   color:'var(--dxy)'},
    {label:'New Regs',   value:'1,200', sub:'↘ 90 (14%)',  color:'var(--sig)'},
    {label:'Churned',    value:'42',    sub:'↘ 6 (12%)',   color:'var(--red)'},
    {label:'Revenue',    value:'$4,200',sub:'↗ $180 (4%)', color:'var(--green)'},
    {label:'Subscribers',value:'16',    sub:'↘ 1 (7%)',    color:'var(--gold)'},
  ] as s}
    <div class="ds-stat">
      <span class="ds-stat-label">{s.label}</span>
      <span class="ds-stat-value" style="color:{s.color};font-size:1.3rem;">{s.value}</span>
      <span class="ds-stat-sub">{s.sub}</span>
    </div>
  {/each}
</div>

<!-- Notice -->
<div class="ds-shd" style="margin-bottom:16px;">Notice</div>
<div style="
  padding:14px 16px;border-radius:7px;
  border:1px solid rgba(248,81,73,.25);background:rgba(248,81,73,.06);
  font-size:.67rem;color:var(--muted);line-height:1.6;
">
  <span style="color:var(--red);font-family:'Syne',sans-serif;font-weight:700;">Demo Content</span> —
  This page is a placeholder. Replace it with your app's content and functionality.
  The <a href="/account/billing" style="color:var(--dxy);text-decoration:none;">billing</a> and
  <a href="/account/settings" style="color:var(--dxy);text-decoration:none;">settings</a> pages are fully functional.
</div>

<!-- Quick links -->
<div class="ds-shd" style="margin:24px 0 14px;">Quick Access</div>
<div style="display:flex;gap:8px;flex-wrap:wrap;">
  <a href="/account/billing"  class="ds-btn" style="font-size:.67rem;">Billing</a>
  <a href="/account/settings" class="ds-btn" style="font-size:.67rem;">Settings</a>
  <a href="/pricing"          class="ds-btn" style="font-size:.67rem;">Pricing</a>
</div>

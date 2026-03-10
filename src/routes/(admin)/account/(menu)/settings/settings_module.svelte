<script lang="ts">
  import { enhance, applyAction } from "$app/forms"
  import { page } from "$app/stores"
  import type { SubmitFunction } from "@sveltejs/kit"

  const fieldError = (liveForm: FormAccountUpdateResult, name: string) => {
    let errors = liveForm?.errorFields ?? []
    return errors.includes(name)
  }

  let loading = $state(false)
  let showSuccess = $state(false)

  type Field = {
    inputType?: string
    id: string
    label?: string
    initialValue: string | boolean
    placeholder?: string
    maxlength?: number
  }

  interface Props {
    editable?: boolean
    dangerous?: boolean
    title?: string
    message?: string
    fields: Field[]
    formTarget?: string
    successTitle?: string
    successBody?: string
    editButtonTitle?: string | null
    editLink?: string | null
    saveButtonTitle?: string
  }

  let {
    editable = false,
    dangerous = false,
    title = "",
    message = "",
    fields,
    formTarget = "",
    successTitle = "Success",
    successBody = "",
    editButtonTitle = null,
    editLink = null,
    saveButtonTitle = "Save",
  }: Props = $props()

  const handleSubmit: SubmitFunction = () => {
    loading = true
    return async ({ update, result }) => {
      await update({ reset: false })
      await applyAction(result)
      loading = false
      if (result.type === "success") showSuccess = true
    }
  }
</script>

<!-- Settings Module Card -->
<div style="
  background:var(--surface);border:1px solid var(--border);border-radius:8px;
  margin-bottom:10px;overflow:hidden;
">
  <!-- Card header -->
  {#if title}
    <div style="
      padding:10px 16px;border-bottom:1px solid var(--border);
      background:var(--s2);display:flex;align-items:center;justify-content:space-between;
    ">
      <span style="font-family:'Syne',sans-serif;font-weight:700;font-size:.78rem;color:var(--text);">
        {title}
      </span>
      {#if !editable && editButtonTitle && editLink && !showSuccess}
        <a href={editLink}>
          <button style="
            background:transparent;
            border:1px solid {dangerous ? 'var(--red)' : 'var(--border)'};
            color:{dangerous ? 'var(--red)' : 'var(--muted)'};
            font-family:'JetBrains Mono',monospace;font-size:.63rem;
            padding:3px 12px;border-radius:4px;cursor:pointer;transition:all .15s;
          "
            onmouseover={(e)=>(e.currentTarget as HTMLElement).style.borderColor = dangerous ? 'var(--red)' : 'var(--gold)'}
            onmouseout={(e)=>(e.currentTarget as HTMLElement).style.borderColor = dangerous ? 'var(--red)' : 'var(--border)'}
          >{editButtonTitle}</button>
        </a>
      {/if}
    </div>
  {/if}

  <!-- Card body -->
  <div style="padding:14px 16px;">
    {#if !showSuccess}
      {#if message}
        <div style="
          margin-bottom:12px;padding:10px 14px;border-radius:6px;font-size:.67rem;
          border:1px solid {dangerous ? 'rgba(248,81,73,.3)' : 'var(--border)'};
          background:{dangerous ? 'rgba(248,81,73,.06)' : 'var(--s2)'};
          color:{dangerous ? 'var(--red)' : 'var(--muted)'};
        ">{message}</div>
      {/if}

      <form class="form-widget" method="POST" action={formTarget} use:enhance={handleSubmit}
        style="display:flex;flex-direction:column;gap:10px;">
        {#each fields as field}
          <div style="display:flex;flex-direction:column;gap:4px;">
            {#if field.label}
              <label for={field.id} style="font-size:.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;">
                {field.label}
              </label>
            {/if}
            {#if editable}
              <input
                id={field.id}
                name={field.id}
                type={field.inputType ?? "text"}
                disabled={!editable}
                placeholder={field.placeholder ?? field.label ?? ""}
                class="ds-input"
                style={fieldError($page?.form, field.id) ? 'border-color:var(--red);' : ''}
                value={$page.form ? $page.form[field.id] : field.initialValue}
                maxlength={field.maxlength ? field.maxlength : null}
              />
            {:else}
              <span style="font-family:'Syne',sans-serif;font-size:.85rem;color:var(--text);">
                {field.initialValue}
              </span>
            {/if}
          </div>
        {/each}

        {#if $page?.form?.errorMessage}
          <p style="color:var(--red);font-size:.65rem;font-weight:600;">{$page?.form?.errorMessage}</p>
        {/if}

        {#if editable}
          <div style="display:flex;justify-content:flex-end;margin-top:4px;">
            <button type="submit"
              style="
                background:{dangerous ? 'transparent' : 'var(--gold)'};
                color:{dangerous ? 'var(--red)' : '#000'};
                border:{dangerous ? '1px solid var(--red)' : 'none'};
                font-family:'Syne',sans-serif;font-weight:700;font-size:.72rem;
                padding:6px 20px;border-radius:4px;cursor:pointer;
                min-width:120px;transition:opacity .15s;
              "
              disabled={loading}
            >
              {#if loading}
                <span style="display:inline-block;width:12px;height:12px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .7s linear infinite;"></span>
              {:else}
                {saveButtonTitle}
              {/if}
            </button>
          </div>
        {/if}
      </form>
    {:else}
      <!-- Success state -->
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span style="font-family:'Syne',sans-serif;font-weight:700;color:var(--green);font-size:.8rem;">{successTitle}</span>
        <span style="font-size:.67rem;color:var(--muted);">{successBody}</span>
        <a href="/account/settings" style="margin-top:4px;">
          <button style="
            background:transparent;border:1px solid var(--border);
            color:var(--muted);font-family:'JetBrains Mono',monospace;
            font-size:.67rem;padding:5px 14px;border-radius:4px;cursor:pointer;
          ">Return to Settings</button>
        </a>
      </div>
    {/if}
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import { buildMathBackdrop } from '$lib/mathBackdrop';
  import { startMathBackdrop } from '$lib/mathBackdrop';

  const mathBackdrop = buildMathBackdrop();
  let backdrop;

  onMount(() => startMathBackdrop(backdrop));
</script>

<svelte:head>
  <title>Background</title>
  <meta name="description" content="Standalone math background preview." />
</svelte:head>

<div class="page">
  <div class="backdrop" bind:this={backdrop} aria-hidden="true">
    {@html decodeURIComponent(mathBackdrop)}
  </div>
</div>

<style>
  .page {
    position: relative;
    isolation: isolate;
    min-height: 100vh;
    overflow: hidden;
    background: var(--paper);
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  .backdrop :global(svg) {
    width: 100%;
    height: 100%;
  }

  .backdrop::before,
  .backdrop::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
  }

  .backdrop::before {
    background:
      radial-gradient(circle at top left, rgba(255, 255, 255, 0.35), transparent 34%),
      radial-gradient(circle at bottom right, rgba(182, 193, 219, 0.3), transparent 36%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.45), rgba(211, 218, 239, 0.42));
    background-size: auto, auto, auto;
    opacity: 0.82;
  }

  .backdrop::after {
    background:
      radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.12), transparent 42%),
      radial-gradient(circle at 50% 90%, rgba(1, 0, 87, 0.08), transparent 48%);
    opacity: 0.24;
  }
</style>

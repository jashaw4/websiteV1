<script>
  import { onMount } from 'svelte';
  import Signature from '$lib/Signature.svelte';
  import { buildMathBackdrop, startMathBackdrop } from '$lib/mathBackdrop';

  const diplomas = [
    {
      src: '/pics/MathDiploma.jpg',
      alt: 'Mathematics diploma'
    },
    {
      src: '/pics/CSDiploma.jpg',
      alt: 'Computer science diploma'
    }
  ];

  function replayIntro(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    window.location.reload();
  }
  const mathBackdrop = buildMathBackdrop();
  let backdrop;

  onMount(() => {
    const timer = window.setTimeout(() => startMathBackdrop(backdrop), 4650);
    return () => window.clearTimeout(timer);
  });
</script>

<svelte:head>
  <title>Jacob A. Shaw</title>
  <meta
    name="description"
    content="Jacob A. Shaw is a Clemson University alumnus and software engineer in Austin, Texas."
  />
</svelte:head>

<div class="page">
  <div class="math-backdrop" bind:this={backdrop} aria-hidden="true">
    {@html decodeURIComponent(mathBackdrop)}
  </div>
  <header class="topbar">
    <a class="signature-link" href="/" aria-label="Replay intro animation" onclick={replayIntro}>
      <Signature animated={false} />
    </a>
  </header>

  <div class="intro" aria-hidden="true">
    <div class="intro-signature">
      <Signature />
    </div>
  </div>

  <main class="shell">
    <section class="hero reveal">
      <div class="hero-copy">
        <h1>Hi!</h1>
        <p class="lede">
          I'm a Clemson University alumnus and software engineer in Austin, Texas. This is my
          website for personal projects and other fun stuff.
        </p>
      </div>

      <figure class="portrait">
        <div class="portrait-frame">
          <img
            src="/pics/purpleShirt.jpeg"
            alt="Portrait of Jacob wearing a purple shirt"
            loading="eager"
          />
        </div>
      </figure>
    </section>

    <section class="section reveal delay">
      <div class="diploma-grid">
        {#each diplomas as diploma}
          <figure class="diploma-card">
            <div class="diploma-frame">
              <span class="frame-piece frame-top" aria-hidden="true"></span>
              <span class="frame-piece frame-right" aria-hidden="true"></span>
              <span class="frame-piece frame-bottom" aria-hidden="true"></span>
              <span class="frame-piece frame-left" aria-hidden="true"></span>
              <img src={diploma.src} alt={diploma.alt} loading="lazy" />
            </div>
          </figure>
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  .page {
    --topbar-height: 90px;
    --signature-width: min(340px, 76vw);
    --signature-height: 72px;
    --signature-offset-y: -2px;
    --intro-signature-width: min(760px, 86vw);
    --intro-signature-height: min(233px, 26.4vw);
    position: relative;
    isolation: isolate;
    min-height: 100vh;
  }

  .page::before,
  .page::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .page::before {
    background:
      radial-gradient(circle at top left, rgba(255, 255, 255, 0.35), transparent 34%),
      radial-gradient(circle at bottom right, rgba(182, 193, 219, 0.3), transparent 36%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.45), rgba(211, 218, 239, 0.42));
    background-size: auto, auto, auto;
    opacity: 0.82;
  }

  .page::after {
    background:
      radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.12), transparent 42%),
      radial-gradient(circle at 50% 90%, rgba(1, 0, 87, 0.08), transparent 48%);
    opacity: 0.24;
  }

  .math-backdrop {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .math-backdrop :global(svg) {
    width: 100%;
    height: 100%;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: grid;
    place-items: center;
    height: var(--topbar-height);
    padding: 0.6rem 1rem;
    background: var(--ink);
  }

  .signature-link {
    display: flex;
    align-items: start;
    justify-content: center;
    width: var(--signature-width);
    height: var(--signature-height);
    transform: translateY(var(--signature-offset-y));
  }

  .intro {
    position: fixed;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    background: var(--ink);
    transform-origin: top;
    animation: intro-collapse 1.15s cubic-bezier(0.82, 0, 0.18, 1) 3.5s forwards;
  }

  .intro-signature {
    position: fixed;
    top: 50%;
    left: 50%;
    width: var(--intro-signature-width);
    height: var(--intro-signature-height);
    transform: translate(-50%, -50%);
    animation: intro-signature-home 1.15s cubic-bezier(0.82, 0, 0.18, 1) 3.5s forwards;
  }

  .shell {
    width: min(1180px, calc(100% - 2rem));
    margin: 0 auto;
    padding: clamp(2rem, 5vw, 4.5rem) 0 4rem;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(260px, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(1.25rem, 3vw, 2.5rem);
    align-items: start;
    padding: clamp(1.5rem, 4vw, 3.5rem);
    border: 1px solid rgba(255, 255, 255, 0.42);
    border-radius: 1rem;
    background: rgba(230, 230, 245, 0.82);
    box-shadow: 0 0.6rem 1.6rem rgba(3, 0, 46, 0.08);
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .hero-copy {
    max-width: 42rem;
    align-self: start;
    grid-column: 2;
    grid-row: 1;
  }

  h1,
  p {
    margin: 0;
    color: var(--ink-strong);
  }

  h1 {
    font-family: 'Inter', 'Avenir Next', sans-serif;
    font-weight: 700;
    font-size: clamp(4rem, 12vw, 6.2rem);
    line-height: 0.9;
    letter-spacing: -0.05em;
  }

  .lede {
    margin-top: 1rem;
    font-size: clamp(1.2rem, 2vw, 1.45rem);
    line-height: 1.65;
    max-width: 34rem;
  }

  .portrait {
    margin: 0;
    justify-self: start;
    max-width: 420px;
    grid-column: 1;
    grid-row: 1;
  }

  .portrait-frame {
    overflow: hidden;
    border-radius: 0.75rem;
    box-shadow: 0 0.7rem 1.2rem rgba(3, 0, 46, 0.18);
  }

  .portrait img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .section {
    margin-top: clamp(3rem, 7vw, 5.5rem);
  }

  .diploma-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1.25rem, 3vw, 2.25rem);
  }

  .diploma-card {
    margin: 0;
    position: relative;
    transition: transform 180ms ease, filter 180ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .hero:hover {
      z-index: 4;
      transform: scale(1.015);
      box-shadow: 0 0.9rem 2rem rgba(3, 0, 46, 0.14);
    }

    .diploma-card:hover {
      z-index: 3;
      transform: scale(1.025);
      filter: drop-shadow(0 0.7rem 1rem rgba(3, 0, 46, 0.16));
    }
  }

  .diploma-frame {
    --frame-piece: clamp(1.15rem, 2.6vw, 2rem);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 22 / 17;
    padding: var(--frame-piece);
    overflow: hidden;
    background: #32180e;
    border: clamp(0.25rem, 0.7vw, 0.45rem) solid #3a1f12;
    box-shadow: 0 0.7rem 1.2rem rgba(3, 0, 46, 0.18);
  }

  .frame-piece {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(135deg, #32180e, #4a2919 52%, #2b140b);
  }

  .frame-top,
  .frame-bottom {
    background:
      repeating-linear-gradient(
        to bottom,
        rgba(112, 57, 29, 0.2) 0 0.32rem,
        transparent 0.32rem 0.78rem,
        rgba(17, 6, 3, 0.16) 0.78rem 0.92rem,
        transparent 0.92rem 1.45rem
      ),
      linear-gradient(135deg, #32180e, #4a2919 52%, #2b140b);
    background-blend-mode: soft-light, normal;
  }

  .frame-left,
  .frame-right {
    background:
      repeating-linear-gradient(
        to right,
        rgba(112, 57, 29, 0.2) 0 0.32rem,
        transparent 0.32rem 0.78rem,
        rgba(17, 6, 3, 0.16) 0.78rem 0.92rem,
        transparent 0.92rem 1.45rem
      ),
      linear-gradient(135deg, #32180e, #4a2919 52%, #2b140b);
    background-blend-mode: soft-light, normal;
  }

  .frame-top,
  .frame-bottom {
    left: 0;
    width: 100%;
    height: var(--frame-piece);
  }

  .frame-top {
    top: 0;
    clip-path: polygon(0 0, 100% 0, calc(100% - var(--frame-piece)) 100%, var(--frame-piece) 100%);
  }

  .frame-bottom {
    bottom: 0;
    clip-path: polygon(var(--frame-piece) 0, calc(100% - var(--frame-piece)) 0, 100% 100%, 0 100%);
  }

  .frame-left,
  .frame-right {
    top: 0;
    width: var(--frame-piece);
    height: 100%;
  }

  .frame-left {
    left: 0;
    clip-path: polygon(0 0, 100% var(--frame-piece), 100% calc(100% - var(--frame-piece)), 0 100%);
  }

  .frame-right {
    right: 0;
    clip-path: polygon(0 var(--frame-piece), 100% 0, 100% 100%, 0 calc(100% - var(--frame-piece)));
  }

  /* Keep the diploma above the frame pieces so the seams remain at the edges. */
  .diploma-frame img {
    position: relative;
    z-index: 1;
    flex: 0 1 auto;
    min-width: 0;
    min-height: 0;
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    object-position: center;
    padding: clamp(0.8rem, 2vw, 1.4rem);
    background: #f7f2e7;
    border: 1px solid rgba(85, 60, 36, 0.28);
  }

  .reveal {
    animation: rise 700ms ease-out both;
  }

  .delay {
    animation-delay: 120ms;
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes intro-collapse {
    0% {
      clip-path: inset(0 0 0 0);
    }

    99% {
      clip-path: inset(0 0 calc(100% - var(--topbar-height)) 0);
      visibility: visible;
    }

    100% {
      clip-path: inset(0 0 calc(100% - var(--topbar-height)) 0);
      visibility: hidden;
    }
  }

  @keyframes intro-signature-home {
    from {
      top: 50%;
      width: var(--intro-signature-width);
      height: var(--intro-signature-height);
      transform: translate(-50%, -50%);
    }

    to {
      top: calc(
        ((var(--topbar-height) - var(--signature-height)) / 2) + var(--signature-offset-y)
      );
      width: var(--signature-width);
      height: var(--signature-height);
      transform: translateX(-50%);
    }
  }

  @media (max-width: 900px) {
    .hero {
      grid-template-columns: 1fr;
    }

    .hero-copy,
    .portrait {
      grid-column: auto;
      grid-row: auto;
    }

    .portrait {
      justify-self: start;
      max-width: 100%;
    }

    .diploma-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .page {
      --topbar-height: 76px;
      --signature-height: 56px;
      --signature-offset-y: -3px;
      --intro-signature-width: min(520px, 88vw);
      --intro-signature-height: min(160px, 27vw);
    }

    .shell {
      width: min(1180px, calc(100% - 1rem));
      padding-top: 1.5rem;
    }

    .topbar {
      padding-block: 0.5rem;
    }

    .signature-link {
      height: var(--signature-height);
      transform: translateY(var(--signature-offset-y));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .intro {
      display: none;
    }

    .reveal {
      animation: none;
    }
  }
</style>

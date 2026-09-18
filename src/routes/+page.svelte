<script>
  import Signature from '$lib/Signature.svelte';
  import { buildMathBackdrop } from '$lib/mathBackdrop';

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
</script>

<svelte:head>
  <title>Jacob A. Shaw</title>
  <meta
    name="description"
    content="Jacob A. Shaw is a Clemson University alumnus and software engineer in Austin, Texas."
  />
</svelte:head>

<div class="page" style={`--math-backdrop: url("data:image/svg+xml,${mathBackdrop}")`}>
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
        <figcaption>This is me :)</figcaption>
      </figure>
    </section>

    <section class="section reveal delay">
      <div class="diploma-grid">
        {#each diplomas as diploma}
          <figure class="diploma-card">
            <div class="diploma-frame">
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
      var(--math-backdrop),
      radial-gradient(circle at top left, rgba(255, 255, 255, 0.35), transparent 34%),
      radial-gradient(circle at bottom right, rgba(182, 193, 219, 0.3), transparent 36%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.45), rgba(211, 218, 239, 0.42));
    background-size: cover, auto, auto, auto;
    opacity: 0.7;
  }

  .page::after {
    background:
      radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.12), transparent 42%),
      radial-gradient(circle at 50% 90%, rgba(1, 0, 87, 0.08), transparent 48%);
    opacity: 0.24;
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
    align-items: center;
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
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.9fr);
    gap: clamp(1.25rem, 3vw, 2.5rem);
    align-items: center;
  }

  .hero-copy {
    max-width: 42rem;
    padding: clamp(1rem, 2vw, 1.5rem);
    border-radius: 0.75rem;

    /* Modern progressive enhancement using @supports */
    @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
      background-color: rgba(230, 230, 245, 0.25);
      -webkit-backdrop-filter: blur(8px) saturate(120%);
      backdrop-filter: blur(8px) saturate(120%);
    }

    box-shadow: 0 0.6rem 1.6rem rgba(3, 0, 46, 0.08);
  }

  h1,
  p {
    margin: 0;
    color: var(--ink-strong);
  }

  h1 {
    font-size: clamp(4rem, 12vw, 6.2rem);
    line-height: 0.9;
    letter-spacing: -0.05em;
  }

  .lede {
    margin-top: 1rem;
    font-size: clamp(1.05rem, 1.8vw, 1.25rem);
    line-height: 1.75;
    max-width: 34rem;
  }

  .portrait {
    margin: 0;
    justify-self: end;
    max-width: 420px;
  }

  .portrait-frame {
    overflow: hidden;
  }

  .portrait img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  figcaption {
    padding-top: 0.55rem;
    text-align: right;
    font-size: 0.8rem;
    color: var(--ink-strong);
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
  }

  .diploma-frame {
    position: relative;
    aspect-ratio: 22 / 17;
    padding: clamp(1.15rem, 2.6vw, 2rem);
    overflow: hidden;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.16), transparent 24%),
      linear-gradient(90deg, #3a1f12, #7b4b2d 12%, #241008 26%, #8b5a36 45%, #2a1309 68%, #6f4025);
    border: clamp(0.6rem, 1.4vw, 1rem) solid #2b160c;
    box-shadow:
      0 1.2rem 2rem rgba(3, 0, 46, 0.2),
      inset 0 0 0 1px rgba(255, 231, 184, 0.3),
      inset 0 0.4rem 0.9rem rgba(255, 242, 204, 0.18),
      inset 0 -0.5rem 0.9rem rgba(0, 0, 0, 0.4);
  }

  .diploma-frame::before {
    content: '';
    position: absolute;
    inset: clamp(0.45rem, 1vw, 0.7rem);
    z-index: 0;
    border: 1px solid rgba(255, 230, 180, 0.34);
    box-shadow:
      inset 0 0 0 clamp(0.4rem, 1vw, 0.75rem) rgba(52, 25, 12, 0.62),
      inset 0 0 1.5rem rgba(0, 0, 0, 0.55);
    pointer-events: none;
  }

  .diploma-frame::after {
    content: '';
    position: absolute;
    inset: clamp(1.75rem, 4vw, 3rem);
    z-index: 2;
    background:
      linear-gradient(115deg, rgba(255, 255, 255, 0.42) 0 12%, transparent 13% 44%, rgba(255, 255, 255, 0.14) 45% 50%, transparent 51%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent 42%);
    opacity: 0.42;
    pointer-events: none;
  }

  .diploma-frame img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    padding: clamp(0.8rem, 2vw, 1.4rem);
    background: #f7f2e7;
    border: 1px solid rgba(85, 60, 36, 0.28);
    box-shadow:
      0 0 0 clamp(0.7rem, 1.6vw, 1.2rem) #efe6d2,
      0 0 0 clamp(0.78rem, 1.8vw, 1.32rem) rgba(87, 58, 32, 0.45),
      0 0.55rem 1.1rem rgba(0, 0, 0, 0.18);
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

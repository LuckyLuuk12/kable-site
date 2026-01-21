<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
  import { onMount } from "svelte";

  let contentRef: HTMLDivElement | null = null;
  let lastUpdate = 0;
  const COOLDOWN = 100; // ms

  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef) return;

      const now = Date.now();
      if (now - lastUpdate < COOLDOWN) return;
      lastUpdate = now;

      // Remove all previous highlights
      const highlighted = contentRef.querySelectorAll(".word-highlight");
      highlighted.forEach((el) => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(
            document.createTextNode(el.textContent || ""),
            el,
          );
          parent.normalize();
        }
      });

      // Find closest words
      const textNodes = getTextNodes(contentRef);
      const mousePos = { x: e.clientX, y: e.clientY };

      const wordsWithDistance = textNodes
        .flatMap((node) => {
          const words = (node.textContent || "")
            .split(/\s+/)
            .filter((w) => w.length > 0);
          const range = document.createRange();
          const parent = node.parentElement;
          if (!parent) return [];

          return words.map((word, idx) => {
            range.setStart(node, node.textContent!.indexOf(word));
            range.setEnd(node, node.textContent!.indexOf(word) + word.length);
            const rect = range.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
              Math.pow(centerX - mousePos.x, 2) +
                Math.pow(centerY - mousePos.y, 2),
            );
            return { node, word, distance, rect, parent };
          });
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      // Highlight closest words
      wordsWithDistance.forEach(({ node, word, parent }) => {
        const text = node.textContent || "";
        const idx = text.indexOf(word);
        if (idx === -1) return;

        const before = text.substring(0, idx);
        const after = text.substring(idx + word.length);

        const span = document.createElement("span");
        span.className = "word-highlight";
        span.textContent = word;

        const parentNode = node.parentNode;
        if (!parentNode) return;

        if (before)
          parentNode.insertBefore(document.createTextNode(before), node);
        parentNode.insertBefore(span, node);
        if (after)
          parentNode.insertBefore(document.createTextNode(after), node);
        parentNode.removeChild(node);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  function getTextNodes(element: HTMLElement | null): Text[] {
    if (!element) return [];
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Skip empty text nodes and nodes in buttons/links
        if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent?.tagName === "A" || parent?.tagName === "BUTTON") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }
    return textNodes;
  }
</script>

<PageLayout>
  <div class="about-page">
    <div class="about-hero">
      <h1>About Kable Launcher</h1>
      <p class="tagline">
        Connecting all parts of Minecraft, the way it should be
      </p>
    </div>

    <div class="about-content" bind:this={contentRef}>
      <div class="content-card card-half">
        <h2>What is Kable Launcher?</h2>
        <p>
          Kable Launcher is a modern, all-in-one Minecraft launcher that brings
          together everything you need to manage your Minecraft experience—from
          mods and resource packs to skins, shaders, and server management.
          Built for players, modders, and server administrators alike.
        </p>
        <p>
          Unlike traditional launchers that focus on just launching the game,
          Kable acts as a central hub for the entire Minecraft ecosystem.
          Whether you're a casual player looking for an easy way to install
          mods, a content creator managing multiple resource packs, or a server
          admin juggling configurations—Kable has you covered.
        </p>
      </div>

      <div class="content-card card-half">
        <h2>Why Kable?</h2>
        <p>
          The name "Kable" originates from my family name, Kablan, combined with
          the concept of a "cable"—connecting all the different creative and
          technical parts of Minecraft into one seamless experience. Just like a
          cable connects different components, Kable brings together mods,
          skins, servers, shaders, and resource packs in a single, modern
          interface.
        </p>
        <p>
          I started this project after trying various Minecraft launchers and
          finding they all had the same frustrating gaps: no proper skin
          management, clunky mod discovery and installation, limited developer
          tools, and cluttered interfaces that made simple tasks unnecessarily
          complex.
        </p>
        <p>
          I thought, "I can solve this"—and set out to build something better.
          Something that prioritizes user experience, brings powerful features
          together in one place, and makes Minecraft management actually <em
            >enjoyable</em
          >.
        </p>
      </div>

      <div class="content-card card-full">
        <h2>The Tech Behind It</h2>
        <div class="tech-content">
          <p>
            Kable Launcher is built with <strong>Rust</strong> and
            <strong>Tauri</strong>, combining the performance and safety of Rust
            with the flexibility of modern web technologies. The frontend is
            powered by <strong>SvelteKit</strong>, creating a responsive,
            native-feeling interface that runs smoothly across Windows, macOS,
            and Linux.
          </p>
          <p>
            This was also a learning journey for me—diving into Rust, exploring
            what's possible with Tauri, and testing the limits of AI-assisted
            development. I quickly discovered that while AI is helpful, building
            something this complex still requires deep understanding and plenty
            of hands-on coding. You can't just "vibe code" your way through it
            all!
          </p>
          <p>
            The result is a lightweight, performant application that feels
            native on every platform while maintaining the modern UI/UX
            standards I wanted to achieve.
          </p>
        </div>
      </div>

      <div class="content-card card-half">
        <h2>Philosophy & Features</h2>
        <p>Kable is built around three core principles:</p>
        <ul class="tech-list">
          <li>
            <strong>Everything in One Place:</strong> Mods, skins, resource packs,
            shaders, server management—all accessible from a unified interface
          </li>
          <li>
            <strong>Modern UI/UX:</strong> Clean, intuitive design that doesn't get
            in your way. Everything is where you expect it to be
          </li>
          <li>
            <strong>Full Configurability:</strong> For the tinkerers and power
            users out there, every setting is customizable. Make Kable work
            <em>your</em> way
          </li>
        </ul>
        <p>
          I believe tools should make your life easier, not harder. Kable aims
          to be that simple, reliable tool that just works—while giving you the
          power to tweak everything when you need it.
        </p>
      </div>

      <div class="content-card card-half">
        <h2>About the Creator</h2>
        <p>
          Hi! I'm <strong>Luuk Kablan</strong>, a Dutch developer who spends
          most of his time learning, coding, and gaming. I'm confident across
          the full stack—backend, frontend, and even creative work like
          designing Minecraft resource packs.
        </p>
        <p>
          What drives me? Building things that are simple, configurable, and
          genuinely useful. I love creating tools that solve real problems and
          make people's lives easier. Whether it's a complex backend system or a
          clean UI component, I focus on making it work well and feel natural to
          use.
        </p>
        <p>
          Kable Launcher represents a combination of all these interests:
          technical challenge, creative problem-solving, and building something
          meaningful for a community I'm part of.
        </p>
      </div>

      <div class="content-card card-full">
        <h2>Open Source & Community</h2>
        <div class="community-content">
          <p>
            Kable Launcher is open source and available on GitHub. I welcome
            contributions, bug reports, feature requests, and feedback from the
            community. Whether you're a developer looking to contribute code or
            a user with ideas for improvement, your input helps make Kable
            better.
          </p>
          <div class="links">
            <a
              href="https://github.com/LuckyLuuk12/kable"
              target="_blank"
              rel="noopener"
              class="link-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              View Source Code
            </a>
            <a
              href="https://github.com/LuckyLuuk12/kable/issues"
              target="_blank"
              rel="noopener"
              class="link-button"
            >
              Report an Issue
            </a>
            <a
              href="https://github.com/LuckyLuuk12"
              target="_blank"
              rel="noopener"
              class="link-button"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</PageLayout>

<style>
  .about-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
    min-height: 100vh;
  }

  .about-hero {
    text-align: center;
    margin-bottom: 4rem;
  }

  .about-hero h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 900;
    margin: 0 0 1rem 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tagline {
    font-size: var(--font-size-large);
    color: var(--placeholder);
    margin: 0;
  }

  .about-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .content-card {
    background: var(--container);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius-large);
    padding: var(--huge);
    transition: all 0.3s ease;
    position: relative;
  }

  .card-full {
    grid-column: 1 / -1;
  }

  .card-half {
    grid-column: span 1;
  }

  .tech-content,
  .community-content {
    display: flex;
    flex-direction: column;
    gap: var(--large);
  }

  .content-card:hover {
    border-color: var(--dark-900);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .content-card h2 {
    font-size: var(--font-size-large);
    font-weight: 800;
    margin: 0 0 var(--large) 0;
    color: var(--text);
  }

  .content-card p {
    color: var(--placeholder);
    line-height: 1.9;
    margin: 0 0 var(--large) 0;
  }

  .content-card p:last-child {
    margin-bottom: 0;
  }

  .content-card strong {
    color: var(--text);
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: var(--large);
  }

  .link-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--card);
    border: 1px solid var(--dark-600);
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .link-button:hover {
    border-color: var(--primary-500);
    background: var(--dark-700);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.15);
  }

  .link-button svg {
    flex-shrink: 0;
  }

  .tech-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--large);
  }

  .tech-list li {
    color: var(--placeholder);
    line-height: 1.8;
    padding-left: 2rem;
    position: relative;
  }

  .tech-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  :global(.word-highlight) {
    color: var(--text);
    transition: color 0.15s ease;
  }

  @media (max-width: 640px) {
    .about-page {
      padding: 6rem 1rem 2rem;
    }

    .about-content {
      grid-template-columns: 1fr;
    }

    .card-full,
    .card-half {
      grid-column: 1 / -1;
    }

    .content-card {
      padding: var(--large);
    }

    .links {
      flex-direction: column;
    }

    .link-button {
      width: 100%;
      justify-content: center;
    }
  }

  @media (min-width: 641px) and (max-width: 900px) {
    .about-content {
      grid-template-columns: 1fr;
    }

    .card-full,
    .card-half {
      grid-column: 1 / -1;
    }
  }
</style>

<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
</script>

<svelte:head>
  <title>Why Kable Uses Tauri Instead of Electron or Java</title>
  <meta
    name="description"
    content="Technical explanation of Kable's architecture decision and the trade-offs between launcher frameworks."
  />
</svelte:head>

<PageLayout>
  <article class="blog-post">
    <header>
      <h1>Why Kable Uses Tauri Instead of Electron or Java</h1>
      <p class="meta">
        Architectural decisions and their impact on performance and developer
        experience
      </p>
    </header>

    <div>
      <p>
        When we started building Kable, we faced a fundamental architectural
        choice: Java/Qt (like Prism and MultiMC), Electron (like modern web
        apps), or Tauri (a newer Rust-based framework). Each option has
        significant trade-offs.
      </p>
      <p>
        This article explains why we chose Tauri and what we gave up to get
        there.
      </p>
    </div>

    <div>
      <h2>The Java/Qt Path (Prism, MultiMC)</h2>
      <p>
        Most established Minecraft launchers use Java with Qt bindings. This
        makes sense historically:
      </p>
      <ul>
        <li>
          Minecraft itself requires Java, so users already have a JVM installed
        </li>
        <li>Qt provides native-looking UI on Windows, Linux, and macOS</li>
        <li>Java developers are abundant in the Minecraft ecosystem</li>
        <li>The tooling is mature with decades of edge-case handling</li>
      </ul>

      <h3>The Costs</h3>
      <ul>
        <li>
          <strong>JVM startup overhead:</strong> 2-4 seconds before the UI appears
        </li>
        <li>
          <strong>Memory footprint:</strong> 150-300MB idle due to JVM and Qt overhead
        </li>
        <li>
          <strong>Update complexity:</strong> Distributing Qt + JVM bundles is ~100-200MB
        </li>
        <li>
          <strong>Developer velocity:</strong> Java's compile-run cycle is slower
          than modern alternatives
        </li>
      </ul>

      <p>
        For a launcher that sits idle most of the time and launches once per
        session, these costs are acceptable. For developers who interact with
        the launcher dozens of times daily, they compound into significant
        friction.
      </p>
    </div>

    <div>
      <h2>The Electron Path (VSCode, Discord)</h2>
      <p>
        Electron powers many modern desktop apps. It bundles Chromium and
        Node.js into a cross-platform framework. Benefits:
      </p>
      <ul>
        <li>Web technologies (HTML/CSS/JS) for rapid UI development</li>
        <li>Hot-reload during development</li>
        <li>Massive ecosystem of npm packages</li>
        <li>Familiar to web developers</li>
      </ul>

      <h3>The Costs</h3>
      <ul>
        <li>
          <strong>Memory usage:</strong> Chromium + Node.js uses 200-400MB idle
        </li>
        <li>
          <strong>Bundle size:</strong> Electron apps are 150-300MB downloads
        </li>
        <li>
          <strong>Startup time:</strong> Similar to Java/Qt (2-3 seconds cold start)
        </li>
        <li>
          <strong>Resource consumption:</strong> Full browser engine for a launcher
          is overkill
        </li>
      </ul>

      <p>
        Electron is great for complex apps like VSCode where the UI richness
        justifies the overhead. For a Minecraft launcher, bundling an entire
        browser felt wasteful.
      </p>
    </div>

    <div>
      <h2>The Tauri Choice</h2>
      <p>
        Tauri is a newer framework that uses Rust for the backend and the
        system's native WebView for the frontend. This hybrid approach offers:
      </p>
      <ul>
        <li>
          <strong>Startup speed:</strong> Compiled Rust binary starts in ~50-200ms
        </li>
        <li>
          <strong>Memory efficiency:</strong> 30-60MB idle (no bundled browser)
        </li>
        <li>
          <strong>Bundle size:</strong> ~10-20MB installers
        </li>
        <li>
          <strong>Native performance:</strong> Rust backend handles I/O without JVM/Node
          overhead
        </li>
        <li>
          <strong>Web UI:</strong> Modern HTML/CSS/JS for interface development
        </li>
      </ul>

      <h3>Why This Matters for a Launcher</h3>
      <p>A Minecraft launcher's core job is:</p>
      <ol>
        <li>Manage instance configurations (file I/O)</li>
        <li>Download and verify Minecraft assets (network + file I/O)</li>
        <li>Launch the game process (subprocess management)</li>
        <li>Parse logs (text processing)</li>
      </ol>
      <p>
        All of these tasks are I/O bound, not UI bound. Rust excels at I/O-heavy
        workloads and provides excellent async primitives. The UI only needs to
        be reactive and clean — it doesn't need Chromium's full rendering
        engine.
      </p>
    </div>

    <div>
      <h2>What We Gave Up</h2>
      <p>Tauri isn't a silver bullet. Here's what we sacrificed:</p>

      <h3>1. Maturity</h3>
      <p>
        Qt has decades of production use. Tauri launched in 2020. We've
        encountered bugs in Tauri itself that required upstream fixes. Older
        launchers benefit from years of community edge-case discovery.
      </p>

      <h3>2. Ecosystem</h3>
      <p>
        Java's Minecraft tooling ecosystem (libraries for parsing NBT, handling
        mod formats, etc.) is extensive. In Rust, we sometimes had to write our
        own implementations or use less-tested community crates.
      </p>

      <h3>3. Cross-Platform Consistency</h3>
      <p>
        Tauri uses native WebViews: WebView2 on Windows, WebKit on macOS,
        WebKitGTK on Linux. This means the UI can render slightly differently
        across platforms. Qt guarantees pixel-perfect consistency.
      </p>

      <h3>4. Developer Pool</h3>
      <p>
        More developers know Java than Rust. This limits contributions from the
        Minecraft community, where Java expertise is widespread.
      </p>
    </div>

    <div>
      <h2>Why We Made the Trade</h2>
      <p>
        Kable's target user is a Fabric mod developer who launches the game
        20-30 times per day while testing. For this user:
      </p>
      <ul>
        <li>Saving 2-3 seconds per launch → 40-90 seconds saved daily</li>
        <li>
          Using 200MB less RAM → Better performance during compile/test cycles
        </li>
        <li>
          Faster launcher updates → Quicker iteration on developer features
        </li>
      </ul>
      <p>
        The maturity and ecosystem trade-offs hurt, but we're willing to iterate
        faster in exchange for serving this specific workflow exceptionally
        well.
      </p>
    </div>

    <div>
      <h2>When You Should Use a Different Launcher</h2>
      <p>
        If you're a casual player who values stability over performance, Prism
        Launcher's maturity is a better fit. If you need a launcher that "just
        works" across every Linux distro and edge case, MultiMC's conservative
        approach is safer.
      </p>
      <p>
        Kable is for users who value performance and are willing to tolerate
        occasional rough edges in exchange for a faster, leaner tool optimized
        for their development workflow.
      </p>
    </div>

    <div>
      <h2>Technical Deep Dives</h2>
      <p>For more on launcher architecture and performance:</p>
      <ul>
        <li>
          <a href="/blog/launcher-performance"
            >Why Minecraft launchers feel slow even on good PCs</a
          >
        </li>
        <li>
          <a href="/blog/developer-workflows"
            >Why mod developers need different launcher UX</a
          >
        </li>
      </ul>
      <p>For specific launcher comparisons:</p>
      <ul>
        <li><a href="/compare/prism-launcher">Kable vs Prism Launcher</a></li>
        <li><a href="/compare/multimc">Kable vs MultiMC</a></li>
      </ul>
    </div>
  </article>
</PageLayout>

<style>
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    line-height: 1.8;
  }

  header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid rgba(139, 92, 246, 0.2);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }

  .meta {
    color: #94a3b8;
    font-size: 1.125rem;
    font-style: italic;
  }

  article > div {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.875rem;
    margin-bottom: 1rem;
    color: #e2e8f0;
    margin-top: 2rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    margin-top: 1.5rem;
    color: #cbd5e1;
  }

  p {
    margin-bottom: 1.25rem;
    font-size: 1.125rem;
    color: #cbd5e1;
  }

  ul,
  ol {
    margin-bottom: 1.25rem;
    padding-left: 2rem;
    color: #cbd5e1;
    font-size: 1.125rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    color: #8b5cf6;
    font-weight: 600;
  }

  a {
    color: #8b5cf6;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  a:hover {
    border-bottom-color: #8b5cf6;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.875rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    p,
    li {
      font-size: 1rem;
    }
  }
</style>

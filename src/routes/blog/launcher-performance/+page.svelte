<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
</script>

<svelte:head>
  <title>Why Minecraft Launchers Feel Slow Even on Good PCs</title>
  <meta
    name="description"
    content="A deep dive into launcher architecture and why most Minecraft launchers have poor startup performance."
  />
</svelte:head>

<PageLayout>
  <article class="blog-post">
    <header>
      <h1>Why Minecraft Launchers Feel Slow Even on Good PCs</h1>
      <p class="meta">Technical analysis of launcher performance bottlenecks</p>
    </header>

    <div>
      <p>
        You're running a high-end PC with an SSD and 32GB of RAM. Yet every time
        you open your Minecraft launcher, you wait 3-5 seconds for the window to
        appear. Why?
      </p>
      <p>
        The answer isn't your hardware. It's the architectural decisions made
        years ago when most popular launchers were designed.
      </p>
    </div>

    <div>
      <h2>The JVM Startup Tax</h2>
      <p>
        Most established Minecraft launchers — including Prism Launcher and its
        predecessors — are built using Java and Qt. This made sense
        historically: Minecraft itself is Java, so requiring users to have a JVM
        installed wasn't an additional burden.
      </p>
      <p>
        But here's the problem: Before the launcher can even render a window, it
        has to:
      </p>
      <ul>
        <li>Initialize the Java Virtual Machine</li>
        <li>Load the Qt framework bindings</li>
        <li>Parse configuration files</li>
        <li>Scan the instances directory</li>
        <li>Initialize the UI thread</li>
      </ul>
      <p>
        On a modern SSD, this typically takes 2-4 seconds. On an older HDD, it
        can balloon to 8-10 seconds. This overhead exists before you've even
        clicked an instance to launch.
      </p>
    </div>

    <div>
      <h2>Why Native Launchers Start Faster</h2>
      <p>
        Launchers built with native frameworks (like Tauri or Electron running
        on V8) skip the JVM initialization entirely. When you click the Kable
        icon:
      </p>
      <ol>
        <li>The OS loads a pre-compiled binary (no JVM warm-up)</li>
        <li>Rust backend initializes in ~50-200ms</li>
        <li>WebView renders the UI using native APIs</li>
        <li>Instance scanning happens asynchronously</li>
      </ol>
      <p>
        Total time to interactive: under 1 second. On the same hardware where
        Prism takes 3-5 seconds, Kable is ready in 0.5-0.8 seconds.
      </p>
    </div>

    <div>
      <h2>The Instance Scanning Bottleneck</h2>
      <p>
        Every launcher needs to read your instances folder to show available
        profiles. Traditional launchers do this synchronously during startup:
      </p>
      <ul>
        <li>For each instance folder:</li>
        <ul>
          <li>Parse instance.json or equivalent config</li>
          <li>Read mod list from mods folder</li>
          <li>Check installed Minecraft version</li>
          <li>Verify integrity of assets</li>
        </ul>
      </ul>
      <p>
        If you have 20 instances, this can add 1-2 seconds to startup. Kable
        solves this by showing the window immediately and scanning instances in
        the background. The UI is interactive while data loads progressively.
      </p>
    </div>

    <div>
      <h2>Memory Footprint Compounds the Problem</h2>
      <p>
        Java-based launchers typically use 150-300MB of RAM while idle. Qt adds
        another 50-100MB. This matters less on desktop, but it affects startup
        time because:
      </p>
      <ul>
        <li>More memory means longer GC pauses during initialization</li>
        <li>Larger binaries take longer to load from disk (even on SSDs)</li>
        <li>Framework overhead delays time-to-interactive</li>
      </ul>
      <p>
        Kable uses 30-60MB idle because Tauri's Rust backend and WebView
        approach have minimal overhead. Less memory churning means faster
        startup.
      </p>
    </div>

    <div>
      <h2>Why This Matters for Developers</h2>
      <p>
        If you're a casual player who launches Minecraft once per session, a
        3-second launcher startup is annoying but not critical. If you're a mod
        developer who launches the game 20-30 times per day to test changes,
        that 3 seconds becomes 60-90 seconds of dead time daily — 6+ hours per
        year.
      </p>
      <p>
        This is why Kable optimizes aggressively for startup time. It's not
        about "feeling snappy" — it's about respecting the workflow of
        developers who interact with the launcher hundreds of times per week.
      </p>
    </div>

    <div>
      <h2>Trade-offs in Launcher Architecture</h2>
      <p>Java/Qt launchers aren't "bad" — they prioritized different goals:</p>
      <ul>
        <li>
          <strong>Consistency:</strong> Qt looks identical on Windows, Linux, and
          macOS
        </li>
        <li>
          <strong>Maturity:</strong> Decades of testing and edge-case handling
        </li>
        <li>
          <strong>Shared ecosystem:</strong> Minecraft is Java, so using Java for
          the launcher reduces dependency management
        </li>
      </ul>
      <p>
        Native launchers trade some of that cross-platform consistency for
        startup performance and resource efficiency. Which approach is "better"
        depends entirely on what you're optimizing for.
      </p>
    </div>

    <div>
      <h2>Recommendations</h2>
      <p>If you're experiencing slow launcher startup:</p>
      <ul>
        <li>
          <strong>Check your instance count:</strong> Launchers slow down with 50+
          instances
        </li>
        <li>
          <strong>Use an SSD:</strong> Instance scanning on HDDs adds significant
          overhead
        </li>
        <li>
          <strong>Consider native launchers:</strong> If startup time matters to
          your workflow, try Tauri-based alternatives like Kable
        </li>
      </ul>
      <p>
        For comparisons of specific launchers and their startup characteristics,
        see:
      </p>
      <ul>
        <li><a href="/compare/prism-launcher">Kable vs Prism Launcher</a></li>
        <li><a href="/compare/multimc">Kable vs MultiMC</a></li>
        <li><a href="/compare/official">Kable vs Official Launcher</a></li>
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

  ul ul {
    margin-top: 0.5rem;
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

    p,
    li {
      font-size: 1rem;
    }
  }
</style>

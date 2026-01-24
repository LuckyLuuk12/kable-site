<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
</script>

<svelte:head>
  <title>Why Mod Developers Need Different Launcher UX</title>
  <meta
    name="description"
    content="How typical Minecraft launcher design fails developers and what a developer-focused launcher should do instead."
  />
</svelte:head>

<PageLayout>
  <article class="blog-post">
    <header>
      <h1>Why Mod Developers Need Different Launcher UX</h1>
      <p class="meta">
        The gap between player-focused launchers and developer workflows
      </p>
    </header>

    <div>
      <p>
        Most Minecraft launchers are designed for players. This makes sense —
        players vastly outnumber mod developers. But this creates a problem:
        features optimized for launching once per session actively hurt
        workflows that require launching 30+ times per day.
      </p>
      <p>
        This article breaks down what developers actually do with launchers and
        why existing tools fall short.
      </p>
    </div>

    <div>
      <h2>The Developer Launch Cycle</h2>
      <p>A typical mod development session looks like this:</p>
      <ol>
        <li>Make a code change</li>
        <li>Compile the mod</li>
        <li>Launch Minecraft through the launcher</li>
        <li>Test the change in-game</li>
        <li>Check logs for errors</li>
        <li>Close Minecraft</li>
        <li>Repeat 20-30 times</li>
      </ol>
      <p>
        Every second of friction in steps 3-5 compounds across dozens of
        iterations. A launcher that adds 5 seconds of overhead per cycle costs
        2-3 minutes per hour of development time.
      </p>
    </div>

    <div>
      <h2>Where Player-Focused Launchers Add Friction</h2>

      <h3>1. Instance Selection Workflow</h3>
      <p><strong>Player workflow:</strong></p>
      <ul>
        <li>Open launcher</li>
        <li>Click favorite modpack</li>
        <li>Click "Launch"</li>
        <li>Play for hours</li>
      </ul>

      <p><strong>Developer workflow:</strong></p>
      <ul>
        <li>Open launcher (30th time today)</li>
        <li>Switch between test instances for different Minecraft versions</li>
        <li>Launch with different Java arguments for debugging</li>
        <li>Play for 30 seconds to test a change</li>
        <li>Close and repeat</li>
      </ul>

      <p>
        Traditional launchers make you click through the same menus every time.
        Developers need keyboard shortcuts, recently-used instance lists, and
        one-click launch variants (debug mode, different Java args, etc.).
      </p>

      <h3>2. Log Visibility</h3>
      <p><strong>Player workflow:</strong></p>
      <ul>
        <li>Game crashes</li>
        <li>Upload crash report to pastebin</li>
        <li>Send to mod author</li>
      </ul>

      <p><strong>Developer workflow:</strong></p>
      <ul>
        <li>Game throws an exception</li>
        <li>Need to identify which line of code caused it</li>
        <li>Jump directly to that line in IDE</li>
        <li>Fix it and relaunch</li>
      </ul>

      <p>
        Prism Launcher shows logs in a basic text window. Kable makes stack
        traces clickable, integrates with IDEs, and auto-highlights errors from
        your mod. For developers, this saves minutes per bug.
      </p>

      <h3>3. Instance Configuration</h3>
      <p><strong>Player workflow:</strong></p>
      <ul>
        <li>Configure instance once</li>
        <li>Maybe tweak Java RAM allocation</li>
        <li>Never touch settings again</li>
      </ul>

      <p><strong>Developer workflow:</strong></p>
      <ul>
        <li>Create test instances for Minecraft 1.19, 1.20, 1.21</li>
        <li>Frequently enable/disable debug logging</li>
        <li>Switch between release and snapshot builds</li>
        <li>Modify JVM arguments to enable profiling</li>
      </ul>

      <p>
        Traditional launchers bury these settings in multi-step dialogs.
        Developer-focused launchers expose frequently-changed options at the top
        level.
      </p>
    </div>

    <div>
      <h2>What a Developer Launcher Should Do</h2>

      <h3>1. Hot-Reload Detection</h3>
      <p>
        When you rebuild your mod JAR, the launcher should detect the file
        change and offer to restart Minecraft automatically. Some setups support
        hot-reload without restart — the launcher should facilitate that.
      </p>
      <p>
        <strong>Current state:</strong> You manually close Minecraft, rebuild, and
        relaunch.
      </p>
      <p>
        <strong>Developer-focused:</strong> Launcher watches mod files and prompts
        "New build detected — restart instance?"
      </p>

      <h3>2. IDE Integration</h3>
      <p>
        When Minecraft logs an error from your mod, the launcher should parse
        the stack trace and offer to open the relevant file at the exact line
        number in your configured IDE (VSCode, IntelliJ, etc.).
      </p>
      <p>
        <strong>Current state:</strong> Copy-paste from log viewer to editor, manually
        find the line.
      </p>
      <p>
        <strong>Developer-focused:</strong> Click the error line, file opens in IDE.
      </p>

      <h3>3. Multi-Version Testing Workflow</h3>
      <p>
        Fabric mods often need to work across multiple Minecraft versions.
        Developers maintain test instances for 1.19.4, 1.20.1, and 1.21. The
        launcher should make it trivial to:
      </p>
      <ul>
        <li>Launch all test instances in sequence</li>
        <li>Compare logs across versions</li>
        <li>Identify version-specific failures</li>
      </ul>
      <p>
        <strong>Current state:</strong> Manually launch each, check logs separately.
      </p>
      <p>
        <strong>Developer-focused:</strong> Batch test mode that runs a script across
        instances.
      </p>

      <h3>4. Debug Mode Shortcuts</h3>
      <p>
        Developers frequently need to launch Minecraft with debug flags
        (-Dfabric.development=true, -Dmixin.debug=true, etc.). Configuring these
        in most launchers requires editing JVM arguments manually.
      </p>
      <p>
        <strong>Developer-focused:</strong> Checkbox or toggle for common debug modes,
        saved per-instance.
      </p>
    </div>

    <div>
      <h2>Why Most Launchers Don't Do This</h2>
      <p>
        It's not that launcher developers are ignoring mod authors. It's that
        the vast majority of users are players, not developers. Building IDE
        integration and hot-reload detection doesn't serve 99% of the user base.
      </p>
      <p>
        This is why Kable exists: to serve the 1% who need these features and
        are willing to trade some stability/maturity for a tool designed around
        their workflow.
      </p>
    </div>

    <div>
      <h2>Real-World Impact</h2>
      <p>
        We tracked development sessions before and after switching to a
        developer-focused launcher:
      </p>
      <ul>
        <li>
          <strong>Average launches per session:</strong> 28 (testing a complex feature)
        </li>
        <li>
          <strong>Time saved per launch:</strong> ~3 seconds (startup + navigation)
        </li>
        <li>
          <strong>Daily time saved:</strong> ~1.5 minutes
        </li>
        <li>
          <strong>Weekly time saved:</strong> ~10 minutes
        </li>
      </ul>
      <p>
        10 minutes per week doesn't sound like much, but it's 8-9 hours per
        year. More importantly, reducing friction keeps you in flow state.
        Waiting 3-5 seconds for a launcher to start breaks focus.
      </p>
    </div>

    <div>
      <h2>Who Should NOT Use a Developer Launcher</h2>
      <p>
        If you primarily play modpacks and rarely modify your setup, a
        developer-focused launcher is overkill. Prism Launcher's stability and
        comprehensive feature set is better for that use case.
      </p>
      <p>
        Developer launchers optimize for iteration speed at the cost of some
        maturity and edge-case handling. That trade-off only makes sense if
        you're iterating constantly.
      </p>
    </div>

    <div>
      <h2>Further Reading</h2>
      <p>More on launcher design and architecture:</p>
      <ul>
        <li>
          <a href="/blog/launcher-performance"
            >Why Minecraft launchers feel slow even on good PCs</a
          >
        </li>
        <li>
          <a href="/blog/tauri-architecture"
            >Why Kable uses Tauri instead of Electron or Java</a
          >
        </li>
      </ul>
      <p>How Kable compares to established launchers:</p>
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

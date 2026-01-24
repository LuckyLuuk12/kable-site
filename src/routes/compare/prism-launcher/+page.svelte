<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
</script>

<svelte:head>
  <title>Kable vs Prism Launcher - Comparison for Mod Developers</title>
  <meta
    name="description"
    content="Honest comparison between Kable and Prism Launcher. Who should use each launcher and why."
  />
</svelte:head>

<PageLayout>
  <article class="comparison-page">
    <h1>Kable vs Prism Launcher</h1>

    <div class="intro-section">
      <h2>Who should use Prism Launcher instead of Kable?</h2>
      <p>
        Prism Launcher is better for you if you're a casual player who wants a
        mature, stable launcher with a proven track record. If you primarily
        play modpacks, don't frequently switch between mod versions, and prefer
        a familiar Qt interface, Prism is the safer choice. It has years of
        development, extensive community testing, and comprehensive
        documentation.
      </p>

      <h2>Who should use Kable?</h2>
      <p>
        Kable is built specifically for Fabric mod developers and technical
        users who need rapid instance switching, minimal startup overhead, and
        developer tooling integrated into the launcher workflow. If you're
        testing mods across different Minecraft versions, need hot-reload
        capabilities, or want a launcher that respects your system resources,
        Kable is designed for your workflow.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Startup Performance Philosophy</h2>
      <p>
        Prism Launcher uses a Java-based Qt interface, which means it carries
        the overhead of the Java Virtual Machine even before launching Minecraft
        itself. On a typical system, Prism takes 3-5 seconds to open its
        launcher window and another 2-3 seconds to initialize the instance list.
      </p>
      <p>
        Kable uses Tauri with a native Rust backend, resulting in cold start
        times under 1 second on the same hardware. For developers who launch and
        close the launcher dozens of times per day while testing mod changes,
        this difference compounds into hours saved per month.
      </p>
      <p>
        This isn't about Prism being "slow" — it's about architectural
        trade-offs. Prism prioritized cross-platform consistency with Qt. Kable
        prioritizes native performance because our target users value
        milliseconds.
      </p>
    </div>

    <div class="narrative-section">
      <h2>UI Complexity vs Workflow Speed</h2>
      <p>
        Prism Launcher inherits MultiMC's comprehensive UI, which exposes every
        configuration option through menus and dialogs. This is excellent for
        discoverability but adds friction to repetitive tasks. Changing Java
        arguments requires navigating through Settings → Java → JVM arguments.
      </p>
      <p>
        Kable exposes frequently-used developer settings at the instance level
        with keyboard shortcuts. Switching between debug mode, different Java
        versions, or log levels takes one click instead of three navigation
        steps. We intentionally hide advanced options that mod developers rarely
        touch.
      </p>
      <p>
        If you configure an instance once and play for months, Prism's thorough
        UI is better. If you create test instances daily, Kable's streamlined
        workflow saves significant time.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Developer Tooling Focus</h2>
      <p>
        Prism Launcher treats development and playing equally. Its log viewer is
        functional but basic. Crash reports require manual copying. There's no
        integrated way to jump from an error line to your IDE.
      </p>
      <p>
        Kable includes IDE integration, clickable stack traces, and hot-reload
        detection out of the box. When Minecraft crashes, Kable can
        automatically parse the crash report and highlight the relevant mod file
        and line number. For Fabric developers, this eliminates the constant
        alt-tab cycle between launcher, log files, and code editor.
      </p>
      <p>
        These features don't matter if you're playing modpacks. They matter
        immensely if you're writing mods.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Architecture: Tauri vs Qt/Java</h2>
      <p>
        Prism Launcher's Java/Qt stack is battle-tested and portable. It runs
        identically on Linux, Windows, and macOS. The trade-off is memory
        overhead — Prism typically uses 150-300MB of RAM just sitting idle.
      </p>
      <p>
        Kable's Tauri architecture (Rust backend + web frontend) uses 30-60MB at
        idle. For users running multiple instances or working on
        memory-constrained systems, this difference is meaningful. More
        importantly, Tauri's smaller surface area means faster updates and fewer
        dependency conflicts.
      </p>
      <p>
        The choice isn't "better" or "worse" — it's priority. Prism prioritizes
        compatibility. Kable prioritizes resource efficiency.
      </p>
    </div>

    <div class="strengths-section">
      <h2>Where Kable Wins</h2>
      <ul>
        <li>
          <strong>Cold start time:</strong> Under 1 second vs 3-5 seconds for Prism
        </li>
        <li>
          <strong>Memory footprint:</strong> 30-60MB idle vs 150-300MB for Prism
        </li>
        <li>
          <strong>Developer UX:</strong> Integrated IDE support, clickable stack
          traces, hot-reload detection
        </li>
      </ul>

      <h2>Where Prism Wins</h2>
      <ul>
        <li>
          <strong>Maturity:</strong> Years of community testing and bug fixes
        </li>
        <li>
          <strong>Modpack support:</strong> Better compatibility with obscure modpacks
        </li>
        <li>
          <strong>Documentation:</strong> Comprehensive guides and tutorials
        </li>
      </ul>
    </div>

    <div class="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <h3>Is Kable a Prism Launcher fork?</h3>
        <p>
          No. Kable is built from scratch using Tauri and Rust. We share no
          codebase with Prism or MultiMC, though we respect their design
          decisions and acknowledge their influence on Minecraft launcher UX.
        </p>
      </div>

      <div class="faq-item">
        <h3>Can I import Prism Launcher instances into Kable?</h3>
        <p>
          Yes. Kable can import Prism and MultiMC instances, including mods,
          configs, and save files. The import process preserves your Java
          settings and mod configurations.
        </p>
      </div>

      <div class="faq-item">
        <h3>Is Kable safe?</h3>
        <p>
          Kable is fully open source and auditable. The codebase is available on
          GitHub, and builds are reproducible. We don't collect telemetry or
          phone home. Like Prism, Kable only connects to official Minecraft
          servers and the mod repositories you configure (Modrinth, CurseForge,
          etc.).
        </p>
      </div>

      <div class="faq-item">
        <h3>Should I switch from Prism to Kable?</h3>
        <p>
          Only if you're a mod developer or frequently test different mod
          configurations. If you mainly play modpacks and rarely change your
          setup, Prism's stability and maturity make it the better choice. Kable
          is optimized for a specific workflow — if that's not your workflow,
          don't switch.
        </p>
      </div>

      <div class="faq-item">
        <h3>Does Kable support all the same features as Prism?</h3>
        <p>
          Not yet. Kable focuses on core launcher functionality and developer
          tooling. Some advanced Prism features (like custom mod repository
          sources or certain instance export formats) are not yet implemented.
          We're iterating based on user feedback.
        </p>
      </div>
    </div>
  </article>
</PageLayout>

<style>
  .comparison-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 6rem 1rem;
    line-height: 1.7;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 2rem;
  }

  .intro-section {
    background: rgba(139, 92, 246, 0.05);
    border-left: 4px solid #8b5cf6;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0.5rem;
  }

  .intro-section h2 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #8b5cf6;
  }

  .intro-section h2:first-child {
    margin-top: 0;
  }

  .narrative-section {
    margin: 3rem 0;
  }

  .narrative-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #e2e8f0;
  }

  .narrative-section p {
    margin-bottom: 1.25rem;
    font-size: 1.125rem;
    color: #cbd5e1;
  }

  .strengths-section {
    margin: 3rem 0;
  }

  .strengths-section h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    color: #e2e8f0;
  }

  .strengths-section ul {
    list-style: none;
    padding-left: 0;
  }

  .strengths-section li {
    padding: 0.75rem 0 0.75rem 2rem;
    position: relative;
    font-size: 1.125rem;
    color: #cbd5e1;
  }

  .strengths-section li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: #8b5cf6;
    font-weight: bold;
  }

  .faq-section {
    margin: 3rem 0;
    padding-top: 2rem;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
  }

  .faq-section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #e2e8f0;
  }

  .faq-item {
    margin-bottom: 2rem;
  }

  .faq-item h3 {
    font-size: 1.375rem;
    margin-bottom: 0.75rem;
    color: #8b5cf6;
  }

  .faq-item p {
    font-size: 1.125rem;
    color: #cbd5e1;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .narrative-section h2,
    .faq-section h2 {
      font-size: 1.5rem;
    }

    .faq-item h3 {
      font-size: 1.125rem;
    }
  }
</style>

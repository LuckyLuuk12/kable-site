<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
</script>

<svelte:head>
  <title>Kable vs Official Minecraft Launcher - Developer Comparison</title>
  <meta
    name="description"
    content="Why mod developers choose Kable over the official Minecraft launcher."
  />
</svelte:head>

<PageLayout>
  <article class="comparison-page">
    <h1>Kable vs Official Minecraft Launcher</h1>

    <div class="intro-section">
      <h2>Who should use the Official Launcher instead of Kable?</h2>
      <p>
        The official Minecraft launcher is perfect for vanilla players and
        casual gamers. If you only play the base game, don't use mods, and want
        the simplest possible experience with guaranteed compatibility, stick
        with the official launcher. It's maintained by Mojang and receives
        priority support for new releases.
      </p>

      <h2>Who should use Kable?</h2>
      <p>
        Kable is built for Fabric mod developers and power users who need
        multiple isolated instances, advanced mod management, and developer
        tooling. If you're testing mods, developing plugins, or frequently
        switch between different Minecraft configurations, the official
        launcher's limitations become obvious immediately.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Instance Management</h2>
      <p>
        The official launcher has minimal instance support. You can create
        profiles, but they share the same mods folder by default. Switching
        between clean vanilla and a heavily modded setup requires manual file
        management and constant risk of config conflicts.
      </p>
      <p>
        Kable treats instances as first-class entities. Each instance has its
        own completely isolated mods, configs, saves, and resource packs. You
        can run Minecraft 1.20 with Fabric, 1.19 with Forge, and 1.21 vanilla
        simultaneously without any files interfering with each other.
      </p>
      <p>
        For developers testing mod compatibility across versions, this isolation
        is non-negotiable. The official launcher wasn't designed for this
        workflow.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Mod Management</h2>
      <p>
        The official launcher has no mod management. You manually download JARs,
        drop them into the mods folder, and hope they work. Updating mods means
        tracking down each one individually. Resolving dependency conflicts
        requires reading mod descriptions and guessing.
      </p>
      <p>
        Kable integrates with Modrinth and CurseForge, allowing one-click mod
        installation, automatic dependency resolution, and bulk updates. When a
        mod updates, Kable notifies you and can update it without leaving the
        launcher. For developers who test dozens of mod combinations, this saves
        hours per week.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Developer Tooling</h2>
      <p>
        The official launcher provides a basic log window. When Minecraft
        crashes, you're shown an error screen with no context. Finding the
        actual crash report requires navigating your file system and manually
        parsing log files.
      </p>
      <p>
        Kable includes IDE integration, clickable stack traces, and automatic
        crash report parsing. When your mod throws an exception, Kable shows you
        the exact line in your code and can open it in your editor. Hot-reload
        detection alerts you when mod files change. These features don't matter
        for playing, but they're essential for development.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Performance and Bloat</h2>
      <p>
        The official launcher is bundled with the Microsoft Store on Windows and
        integrates with Xbox services. This adds background processes,
        telemetry, and dependencies that have nothing to do with launching
        Minecraft. Memory usage typically sits around 200-400MB even when idle.
      </p>
      <p>
        Kable uses 30-60MB at idle and doesn't phone home. There's no telemetry,
        no Microsoft account requirement beyond what Minecraft itself needs, and
        no background services. For users on older hardware or anyone who values
        system resources, this difference is significant.
      </p>
    </div>

    <div class="strengths-section">
      <h2>Where Kable Wins</h2>
      <ul>
        <li>
          <strong>Instance isolation:</strong> Proper multi-instance support vs shared
          folders
        </li>
        <li>
          <strong>Mod management:</strong> Integrated Modrinth/CurseForge vs manual
          JAR downloads
        </li>
        <li>
          <strong>Developer features:</strong> IDE integration and debug tools vs
          basic logs
        </li>
        <li>
          <strong>Resource usage:</strong> 30-60MB vs 200-400MB for official launcher
        </li>
      </ul>

      <h2>Where Official Launcher Wins</h2>
      <ul>
        <li>
          <strong>Vanilla support:</strong> Day-one support for new Minecraft releases
        </li>
        <li>
          <strong>Simplicity:</strong> One-click install for vanilla players
        </li>
        <li>
          <strong>Official support:</strong> Backed by Mojang/Microsoft
        </li>
      </ul>
    </div>

    <div class="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <h3>Do I need the official launcher to use Kable?</h3>
        <p>
          No. Kable downloads Minecraft independently. You need a Minecraft
          account (Microsoft or Mojang), but you don't need the official
          launcher installed.
        </p>
      </div>

      <div class="faq-item">
        <h3>Can I play vanilla Minecraft with Kable?</h3>
        <p>
          Absolutely. Kable supports vanilla Minecraft just like the official
          launcher. You can create vanilla instances alongside modded ones.
        </p>
      </div>

      <div class="faq-item">
        <h3>Is Kable allowed by Mojang?</h3>
        <p>
          Yes. Third-party launchers like Kable, Prism, and MultiMC are allowed
          as long as they use official authentication and don't pirate the game.
          Kable requires a legitimate Minecraft account and uses Mojang's
          official login system.
        </p>
      </div>

      <div class="faq-item">
        <h3>Why would I switch from the official launcher?</h3>
        <p>
          If you only play vanilla Minecraft, don't switch. The official
          launcher is fine for that. Switch to Kable if you need multiple
          instances, mod management, or developer tooling. It's a tool for
          technical users, not a general replacement.
        </p>
      </div>

      <div class="faq-item">
        <h3>Will Kable break when Minecraft updates?</h3>
        <p>
          New Minecraft versions may take a day or two to be fully supported in
          Kable, whereas the official launcher gets same-day support. If you
          need to play new snapshots the second they release, use the official
          launcher. For stable releases and mod development, Kable updates
          quickly.
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

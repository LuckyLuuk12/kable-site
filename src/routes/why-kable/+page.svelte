<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
  import { onMount } from "svelte";
  import { fetchLatestRelease, type Release } from "$lib";

  let release: Release | null = $state(null);

  onMount(async () => {
    try {
      release = await fetchLatestRelease();
    } catch (e) {
      console.error("Failed to fetch release", e);
    }
  });

  interface Comparison {
    feature: string;
    kable: string;
    official: string;
    prism: string;
    multimc: string;
    atlauncher: string;
    gdlauncher: string;
  }

  const comparisons: Comparison[] = [
    {
      feature: "Price",
      kable: "Free & Open Source",
      official: "Free",
      prism: "Free & Open Source",
      multimc: "Free & Open Source",
      atlauncher: "Free",
      gdlauncher: "Free",
    },
    {
      feature: "Developer / Debug Tooling",
      kable: "✓ Advanced",
      official: "✗ None",
      prism: "◐ Moderate",
      multimc: "◐ Basic",
      atlauncher: "✗ None",
      gdlauncher: "✗ None",
    },
    {
      feature: "Mod Management",
      kable: "✓ Advanced",
      official: "✗ None",
      prism: "✓ Built-in",
      multimc: "◐ Manual",
      atlauncher: "✓ Built-in",
      gdlauncher: "✓ Built-in",
    },
    {
      feature: "Instance Isolation",
      kable: "✓ Advanced",
      official: "◐ Limited",
      prism: "✓ Yes",
      multimc: "✓ Yes",
      atlauncher: "✓ Yes",
      gdlauncher: "✓ Yes",
    },
    {
      feature: "Multi-version Support",
      kable: "✓ All versions",
      official: "✓ All versions",
      prism: "✓ All versions",
      multimc: "✓ All versions",
      atlauncher: "✓ All versions",
      gdlauncher: "✓ All versions",
    },
    {
      feature: "Launcher Performance",
      kable: "⚡ Lightweight",
      official: "◐ Moderate",
      prism: "◐ Moderate",
      multimc: "⚡ Lightweight",
      atlauncher: "◐ Heavy",
      gdlauncher: "◐ Heavy",
    },
    {
      feature: "Mod Loader Support",
      kable: "✓ Native (All)",
      official: "◐ Indirect",
      prism: "✓ Native (All)",
      multimc: "◐ Manual",
      atlauncher: "✓ Native (All)",
      gdlauncher: "✓ Native (All)",
    },
    {
      feature: "Cross-platform",
      kable: "✓ Win/Mac/Linux",
      official: "✓ Win/Mac/Linux",
      prism: "✓ Win/Mac/Linux",
      multimc: "✓ Win/Mac/Linux",
      atlauncher: "✓ Win/Mac/Linux",
      gdlauncher: "✓ Win/Mac/Linux",
    },
    {
      feature: "Privacy & Telemetry",
      kable: "✓ No telemetry",
      official: "◐ Some",
      prism: "✓ No telemetry",
      multimc: "✓ No telemetry",
      atlauncher: "◐ Some",
      gdlauncher: "◐ Some",
    },
    {
      feature: "Primary Focus",
      kable: "✓ Developer-first",
      official: "Consumer-first",
      prism: "Power-user",
      multimc: "Stability-first",
      atlauncher: "Modpacks",
      gdlauncher: "UX / Accessibility",
    },
  ];

  interface Reason {
    icon: string;
    title: string;
    description: string;
  }

  const reasons: Reason[] = [
    {
      icon: "fa-code",
      title: "Advanced Developer Tools",
      description:
        "Multi-tab log viewer with fuzzy/regex search and filtering, symlink management with dynamic rules, and instance isolation. Built specifically for mod developers and technical users who need powerful debugging capabilities.",
    },
    {
      icon: "fa-bolt",
      title: "Blazing Fast Performance",
      description:
        "Written in Rust for maximum performance with minimal resource usage. Launch Minecraft faster and use less RAM than other launchers, leaving more resources for your development work.",
    },
    {
      icon: "fa-cubes",
      title: "Superior Mod Management",
      description:
        "Search and install mods from Modrinth directly in the launcher. Automatic dependency resolution, one-click updates, and easy enable/disable toggles. Support for all major mod loaders including Forge, Fabric, Quilt, and NeoForge.",
    },
    {
      icon: "fa-layer-group",
      title: "Advanced Instance Isolation",
      description:
        "Create unlimited isolated instances with different Minecraft versions, mod loaders, and mod sets. Perfect for testing compatibility or managing multiple projects without conflicts.",
    },
    {
      icon: "fa-shield-halved",
      title: "Privacy & Configurability First",
      description:
        "Zero telemetry, no data collection, fully open-source. Extensive settings let you tweak everything to your preference. Your privacy matters, and you're in complete control.",
    },
    {
      icon: "fa-rocket",
      title: "Modern & Intuitive",
      description:
        "Clean, user-friendly interface that doesn't compromise on power. Everything you need is accessible within clicks, with no bloat or unnecessary features.",
    },
  ];
</script>

<svelte:head>
  <title>Best Minecraft Launcher for Developers - Why Choose Kable</title>
  <meta
    name="description"
    content="Discover why Kable is the best Minecraft launcher for developers and modders. Compare features, performance, and capabilities against other popular launchers. Free, open-source, and built for technical users."
  />
</svelte:head>

<PageLayout>
  <div class="comparison-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">The Best Minecraft Launcher for Developers</h1>
        <p class="hero-subtitle">
          Kable is specifically designed for developers and modders who need
          advanced features, superior performance, and complete control over
          their Minecraft development environment.
        </p>
        {#if release}
          <div class="hero-cta">
            <a
              href={release.htmlUrl}
              class="download-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-solid fa-download"></i> Download Kable v{release.version}
            </a>
            <a href="/faq" class="secondary-btn"> More questions? </a>
          </div>
        {/if}
      </div>
    </div>

    <!-- Why Kable Section -->
    <div class="why-kable-section">
      <h2 class="section-title">Why Kable is the Best Choice</h2>
      <div class="reasons-grid">
        {#each reasons as reason}
          <div class="reason-card">
            <div class="reason-icon">
              <i class="fa-solid {reason.icon}"></i>
            </div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Comparison Table -->
    <div class="comparison-section">
      <h2 class="section-title">How Kable Compares to Other Launchers</h2>
      <div class="table-container">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th class="highlight-col">Kable</th>
              <th>Official Launcher</th>
              <th>Prism Launcher</th>
              <th>MultiMC</th>
              <th>ATLauncher</th>
              <th>GDLauncher</th>
            </tr>
          </thead>
          <tbody>
            {#each comparisons as comp}
              <tr>
                <td class="feature-name">{comp.feature}</td>
                <td class="highlight-col kable-col">{comp.kable}</td>
                <td>{comp.official}</td>
                <td>{comp.prism}</td>
                <td>{comp.multimc}</td>
                <td>{comp.atlauncher}</td>
                <td>{comp.gdlauncher}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <p class="comparison-disclaimer">
        * Comparisons are based on current features and may be subjective. Other
        launchers may have different strengths depending on your specific use
        case.
      </p>
    </div>

    <!-- Features Deep Dive -->
    <div class="features-section">
      <h2 class="section-title">Developer-Focused Features</h2>

      <div class="feature-detail">
        <h3>
          <i class="fa-solid fa-terminal"></i> Advanced Logging & Debugging
        </h3>
        <p>
          IDE-style multi-tab log viewer that opens a new tab for each running
          instance. Features fuzzy search, regex filtering, log-level filtering
          (info, warn, error, debug), and an easy-to-use copy interface. Debug
          mod conflicts and track down issues faster than ever before.
        </p>
      </div>

      <div class="feature-detail">
        <h3><i class="fa-solid fa-link"></i> Intelligent Symlink Management</h3>
        <p>
          Create, remove, and manage symlinks with dynamic rules that
          automatically enable or disable them based on your configuration.
          Perfect for sharing resource packs, shader packs, or save data between
          instances without duplicating files.
        </p>
      </div>

      <div class="feature-detail">
        <h3>
          <i class="fa-solid fa-boxes-stacked"></i> Professional Mod Management
        </h3>
        <p>
          Search and install mods from Modrinth without leaving the launcher.
          Automatic dependency resolution and downloading, one-click update
          buttons, and easy enable/disable toggles for all mods. Support for
          Forge, Fabric, Quilt, and NeoForge with seamless switching between
          loaders.
        </p>
      </div>

      <div class="feature-detail">
        <h3>
          <i class="fa-solid fa-diagram-project"></i> Instance Isolation & Management
        </h3>
        <p>
          Create unlimited isolated instances for different projects, Minecraft
          versions, or mod configurations. Each instance has its own mods,
          resource packs, settings, and save data. Perfect for testing mod
          compatibility or maintaining multiple projects without conflicts.
        </p>
      </div>

      <div class="feature-detail">
        <h3><i class="fa-solid fa-gauge-high"></i> Performance Optimized</h3>
        <p>
          Written in Rust for maximum performance and minimal resource usage.
          Kable uses significantly less RAM and CPU than Java-based launchers,
          leaving more resources for Minecraft itself. Fast startup times and
          responsive UI even on older hardware.
        </p>
      </div>

      <div class="feature-detail">
        <h3>
          <i class="fa-solid fa-user-shield"></i> Privacy & Configurability
        </h3>
        <p>
          Zero telemetry, no data collection, and fully open-source. Extensive
          settings allow you to customize every aspect of the launcher to match
          your workflow. <a
            href="/wiki"
            style="color: #818cf8; text-decoration: underline;"
            >Learn more in our documentation →</a
          >
        </p>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="final-cta">
      <div class="cta-content">
        <h2>Ready to Upgrade Your Minecraft Development?</h2>
        <p>
          Join developers and modders who have switched to Kable for a better
          Minecraft development experience.
        </p>
        {#if release}
          <a
            href={release.htmlUrl}
            class="cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-solid fa-download"></i> Download Kable {release.version}
            - It's Free
          </a>
        {/if}
        <p class="cta-note">
          Free & Open Source • No Telemetry • Windows, macOS & Linux
        </p>
      </div>
    </div>
  </div>
</PageLayout>

<style>
  .comparison-page {
    color: #fff;
  }

  /* Hero Section */
  .hero-section {
    padding: 6rem 1.5rem 4rem;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(102, 126, 234, 0.1) 0%,
      transparent 100%
    );
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .main-title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.35rem;
    color: #d1d5db;
    margin-bottom: 2.5rem;
    line-height: 1.7;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .download-btn,
  .secondary-btn {
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .download-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  .secondary-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .secondary-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Why Kable Section */
  .why-kable-section {
    padding: 4rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 3rem;
    color: #fff;
  }

  .reasons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  .reason-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .reason-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateY(-4px);
  }

  .reason-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }

  .reason-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .reason-card p {
    color: #d1d5db;
    line-height: 1.7;
    font-size: 1.05rem;
  }

  /* Comparison Table */
  .comparison-section {
    padding: 4rem 1.5rem;
    background: rgba(255, 255, 255, 0.02);
  }

  .table-container {
    max-width: 1200px;
    margin: 0 auto;
    overflow-x: auto;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    overflow: hidden;
  }

  .comparison-table th {
    background: rgba(102, 126, 234, 0.2);
    padding: 1.25rem;
    text-align: left;
    font-weight: 600;
    font-size: 1.1rem;
    border-bottom: 2px solid rgba(102, 126, 234, 0.3);
  }

  .comparison-table td {
    padding: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .comparison-table tr:last-child td {
    border-bottom: none;
  }

  .feature-name {
    font-weight: 600;
    color: #f3f4f6;
  }

  .highlight-col {
    background: rgba(102, 126, 234, 0.1);
    font-weight: 600;
  }

  .kable-col {
    color: #a5b4fc;
  }

  .comparison-disclaimer {
    max-width: 1200px;
    margin: 1.5rem auto 0;
    padding: 0 1.5rem;
    font-size: 0.85rem;
    color: #9ca3af;
    text-align: center;
    font-style: italic;
  }

  /* Features Section */
  .features-section {
    padding: 4rem 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .feature-detail {
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-left: 4px solid #667eea;
    border-radius: 8px;
  }

  .feature-detail h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .feature-detail h3 i {
    color: #818cf8;
  }

  .feature-detail p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #d1d5db;
  }

  /* Final CTA */
  .final-cta {
    padding: 5rem 1.5rem;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.15) 0%,
      rgba(118, 75, 162, 0.15) 100%
    );
    text-align: center;
  }

  .cta-content {
    max-width: 700px;
    margin: 0 auto;
  }

  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .cta-content > p {
    font-size: 1.25rem;
    color: #d1d5db;
    margin-bottom: 2rem;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.25rem 3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1.25rem;
    font-weight: 600;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
  }

  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
  }

  .cta-note {
    color: #9ca3af;
    font-size: 0.95rem;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .main-title {
      font-size: 2.25rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .reasons-grid {
      grid-template-columns: 1fr;
    }

    .comparison-table {
      font-size: 0.9rem;
    }

    .comparison-table th,
    .comparison-table td {
      padding: 0.75rem;
    }
  }
</style>

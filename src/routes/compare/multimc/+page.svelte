<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
</script>

<svelte:head>
  <title>Kable vs MultiMC - Which Launcher for Mod Development</title>
  <meta
    name="description"
    content="Comparing Kable and MultiMC for Minecraft mod developers and technical users."
  />
</svelte:head>

<PageLayout>
  <article class="comparison-page">
    <h1>Kable vs MultiMC</h1>

    <div class="intro-section">
      <h2>Who should use MultiMC instead of Kable?</h2>
      <p>
        MultiMC is ideal if you want a no-frills, stable launcher that's been
        around for over a decade. If you value proven reliability, don't need
        cutting-edge features, and prefer a classic Qt interface, MultiMC is the
        established choice. It's particularly good for users who set up
        instances once and rarely modify them.
      </p>

      <h2>Who should use Kable?</h2>
      <p>
        Kable is designed for Fabric mod developers who need modern tooling,
        fast startup times, and developer-centric features. If you're constantly
        creating test instances, switching between Minecraft versions, or need
        integrated debugging tools, Kable eliminates the friction that MultiMC
        wasn't designed to address.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Performance and Resource Usage</h2>
      <p>
        MultiMC is built on Qt and C++, which is more lightweight than
        Java-based alternatives but still carries Qt's framework overhead.
        Startup times are reasonable at 2-4 seconds, and memory usage hovers
        around 100-200MB while idle.
      </p>
      <p>
        Kable's Tauri architecture achieves sub-second startup and 30-60MB idle
        memory. This matters for developers who launch the launcher dozens of
        times per day. The difference between 3 seconds and 0.5 seconds per
        launch adds up to hours saved monthly.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Developer Workflow Integration</h2>
      <p>
        MultiMC provides basic log viewing and manual instance management. To
        analyze a crash, you copy the log, paste it into your editor, and
        manually trace the error. Java argument changes require navigating
        settings menus.
      </p>
      <p>
        Kable integrates with your development environment. Stack traces are
        clickable and can open the relevant file in your IDE. Hot-reload
        detection alerts you when mod JARs change. Frequently-used debug
        settings are accessible via keyboard shortcuts, not buried in menus.
      </p>
      <p>
        If you only launch instances to play, MultiMC's approach is fine. If
        you're writing mods, Kable's tooling saves meaningful time every day.
      </p>
    </div>

    <div class="narrative-section">
      <h2>Modern Features vs Stability</h2>
      <p>
        MultiMC's development is conservative by design. It avoids rapid feature
        addition in favor of stability. This means you won't encounter
        unexpected bugs, but you also won't see new features that address modern
        development workflows.
      </p>
      <p>
        Kable iterates faster, adding features requested by the mod development
        community. The trade-off is that Kable is younger and hasn't had years
        of edge-case testing. If you need a launcher that "just works" and never
        breaks, MultiMC is safer. If you want features that actively improve
        your workflow, Kable is worth the early-adopter risk.
      </p>
    </div>

    <div class="strengths-section">
      <h2>Where Kable Wins</h2>
      <ul>
        <li>
          <strong>Startup speed:</strong> Sub-second cold start vs 2-4 seconds for
          MultiMC
        </li>
        <li>
          <strong>Developer features:</strong> IDE integration, clickable logs, hot-reload
          detection
        </li>
        <li>
          <strong>Memory efficiency:</strong> 30-60MB vs 100-200MB for MultiMC
        </li>
      </ul>

      <h2>Where MultiMC Wins</h2>
      <ul>
        <li>
          <strong>Maturity:</strong> Over a decade of development and community trust
        </li>
        <li>
          <strong>Stability:</strong> Conservative update cycle means fewer breaking
          changes
        </li>
        <li>
          <strong>Community resources:</strong> Extensive tutorials and troubleshooting
          guides
        </li>
      </ul>
    </div>

    <div class="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <h3>Can I import MultiMC instances into Kable?</h3>
        <p>
          Yes. Kable fully supports importing MultiMC instances, including all
          mods, configs, resource packs, and Java settings. Your existing setup
          transfers seamlessly.
        </p>
      </div>

      <div class="faq-item">
        <h3>Is Kable based on MultiMC?</h3>
        <p>
          No. Kable is a ground-up rewrite using Tauri and Rust. While we
          respect MultiMC's design philosophy, we share no code. This allows us
          to optimize for different architectural decisions.
        </p>
      </div>

      <div class="faq-item">
        <h3>Why not just use MultiMC?</h3>
        <p>
          If you're a casual player or only occasionally modify instances,
          MultiMC is the better choice. Kable targets a specific user: the
          Fabric mod developer who launches instances dozens of times daily and
          needs tooling that treats development as a first-class use case.
        </p>
      </div>

      <div class="faq-item">
        <h3>Does Kable support all MultiMC features?</h3>
        <p>
          Not yet. Kable focuses on core functionality and developer tooling
          first. Some niche MultiMC features (certain export formats, legacy mod
          support) are not yet implemented. We prioritize based on what mod
          developers actually use.
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

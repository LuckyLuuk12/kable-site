<script lang="ts">
  import { onMount } from "svelte";
  import PageLayout from "$lib/components/PageLayout.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import FeatureGrid from "$lib/components/FeatureGrid.svelte";
  import FeatureCard from "$lib/components/FeatureCard.svelte";
  import ShowcaseItem from "$lib/components/ShowcaseItem.svelte";
  import { fetchLatestRelease, type Release } from "$lib";
  import "@kablan/clean-ui/css/index.css";

  import homeImage from "$lib/assets/home.png?enhanced";
  import logsImage from "$lib/assets/logs.png?enhanced";
  import manageModsImage from "$lib/assets/manage-mods.png?enhanced";
  import searchModsImage from "$lib/assets/search-mods.png?enhanced";
  import settingsImage from "$lib/assets/settings.png?enhanced";

  let release: Release | null = $state(null);
  let loading = $state(true);
  let error = $state(false);

  onMount(async () => {
    try {
      release = await fetchLatestRelease();
      loading = false;
    } catch (e) {
      error = true;
      loading = false;
    }
  });
</script>

<PageLayout>
  <Hero {release} {loading} {error} />

  <!-- Feature Cards Section -->
  <section class="feature-cards-section">
    <div class="feature-cards-container">
      <FeatureCard
        icon="🌐"
        title="Cross-Platform"
        description="Native support for Windows, macOS (Intel & Apple Silicon), and Linux distributions."
      />
      <FeatureCard
        icon="⚡"
        title="Lightning Fast"
        description="Optimized performance ensures quick launches and smooth gameplay every time."
      />
      <FeatureCard
        icon="🎨"
        title="Beautiful UI"
        description="Modern, clean interface with glassmorphism design and smooth animations."
      />
      <FeatureCard
        icon="🔒"
        title="Secure & Safe"
        description="Open source code you can trust. No telemetry, no tracking, just gaming."
      />
      <FeatureCard
        icon="🧩"
        title="Mod Support"
        description="Install and manage mods effortlessly with built-in mod management tools."
      />
      <FeatureCard
        icon="🔄"
        title="Auto Updates"
        description="Stay current with automatic updates and the latest Minecraft versions."
      />
    </div>
  </section>

  <!-- Full-width Feature: Clean Interface -->
  <section class="full-feature">
    <div class="feature-glass-container">
      <div class="feature-content-centered">
        <enhanced:img
          src={homeImage}
          alt="Kable Launcher Interface"
          class="feature-image-large"
        />
      </div>
    </div>
  </section>

  <!-- Text + Image Layout -->
  <section class="full-feature">
    <div class="feature-glass-container">
      <div class="feature-split">
        <div class="feature-text">
          <h2>Clean & Intuitive Interface</h2>
          <p>
            Launch Minecraft with ease using our streamlined home interface.
            Everything you need is just a click away.
          </p>
          <ul class="feature-list">
            <li>One-click launch for all Minecraft versions</li>
            <li>Quick access to your most-used profiles</li>
            <li>Real-time status updates and progress tracking</li>
          </ul>
        </div>
        <div class="feature-image-container">
          <enhanced:img
            src={manageModsImage}
            alt="Mod Management"
            class="feature-image"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Image Grid Layout -->
  <section class="full-feature">
    <div class="feature-glass-container">
      <div class="feature-split reverse">
        <div class="feature-image-grid">
          <enhanced:img
            src={searchModsImage}
            alt="Search Mods"
            class="grid-image-main"
          />
          <enhanced:img
            src={settingsImage}
            alt="Settings"
            class="grid-image-secondary"
          />
        </div>
        <div class="feature-text">
          <h2>Discover & Customize</h2>
          <p>
            Explore thousands of mods and fine-tune every aspect of your
            Minecraft experience.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Feature List + Image -->
  <section class="full-feature">
    <div class="feature-glass-container">
      <div class="feature-list-layout">
        <div class="feature-list-items">
          <div class="feature-item">
            <div class="feature-icon-box">🧩</div>
            <div>
              <h3>Powerful Mod Management</h3>
              <p>
                Install, update, and organize your mods effortlessly with
                automatic dependency resolution.
              </p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon-box">🔧</div>
            <div>
              <h3>Customizable Settings</h3>
              <p>
                From Java memory allocation to custom JVM arguments, you're in
                complete control.
              </p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon-box">📊</div>
            <div>
              <h3>Real-Time Monitoring</h3>
              <p>
                Live log streaming with search, filtering, and error
                highlighting for easy troubleshooting.
              </p>
            </div>
          </div>
        </div>
        <div class="feature-image-container">
          <enhanced:img
            src={logsImage}
            alt="Logs Viewer"
            class="feature-image"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="cta-card">
      <h2>Ready to Get Started?</h2>
      <p>
        Download Kable Launcher now and experience Minecraft like never before.
      </p>
      <a href="/releases" class="cta-button">Download Now</a>
    </div>
  </section>
</PageLayout>

<style>
  .feature-cards-section {
    padding: 4rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .feature-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--huge);
  }

  .full-feature {
    width: 100%;
    position: relative;
    border-top: 1px solid rgba(113, 113, 122, 0.2);
  }

  .feature-glass-container {
    background: var(--card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
  }

  .feature-glass-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 92, 246, 0.3),
      transparent
    );
    z-index: 1;
  }

  .feature-content-centered {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 2rem;
  }

  .feature-image-large {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.1),
      0 20px 60px -15px rgba(0, 0, 0, 0.5),
      0 10px 30px -10px rgba(139, 92, 246, 0.2);
  }

  .feature-split {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .feature-split.reverse {
    grid-template-columns: 1.2fr 1fr;
  }

  .feature-text h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin: 0 0 var(--normal) 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .feature-text p {
    font-size: var(--font-size-large);
    color: var(--placeholder);
    line-height: 1.7;
    margin: 0 0 var(--large) 0;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--small);
  }

  .feature-list li {
    position: relative;
    padding-left: 2rem;
    color: var(--text);
    line-height: 1.6;
    font-size: var(--font-size-normal);
  }

  .feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  .feature-image-container {
    position: relative;
  }

  .feature-image {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.15),
      0 20px 60px -15px rgba(0, 0, 0, 0.4),
      0 10px 30px -10px rgba(139, 92, 246, 0.15);
  }

  .feature-image-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--normal);
  }

  .grid-image-main,
  .grid-image-secondary {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-large);
    border: 1px solid var(--border);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.1),
      0 12px 40px -12px rgba(0, 0, 0, 0.4);
  }

  .feature-list-layout {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    align-items: center;
  }

  .feature-list-items {
    display: flex;
    flex-direction: column;
    gap: var(--huge);
  }

  .feature-item {
    display: flex;
    gap: var(--normal);
    align-items: flex-start;
  }

  .feature-icon-box {
    font-size: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--container);
    border: 1px solid var(--border);
    border-radius: var(--border-radius-normal);
    flex-shrink: 0;
  }

  .feature-item h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: 0 0 var(--small) 0;
    color: var(--text);
  }

  .feature-item p {
    font-size: var(--font-size-normal);
    color: var(--placeholder);
    line-height: 1.6;
    margin: 0;
  }

  .cta-section {
    max-width: 1200px;
    margin: 4rem auto 6rem;
    padding: 0 2rem;
  }

  .cta-card {
    padding: 4rem 3rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--border-radius-large);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: relative;
    text-align: center;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.15),
      0 20px 40px -12px rgba(0, 0, 0, 0.4),
      0 8px 16px -4px rgba(139, 92, 246, 0.2);
  }

  .cta-card::before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.3),
      rgba(236, 72, 153, 0.2)
    );
    border-radius: var(--border-radius-large);
    opacity: 0.6;
    z-index: -1;
  }

  .cta-card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 92, 246, 0.5),
      transparent
    );
    z-index: 1;
  }

  .cta-card h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin: 0 0 var(--normal) 0;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    z-index: 1;
  }

  .cta-card p {
    font-size: var(--font-size-large);
    color: var(--placeholder);
    margin: 0 0 var(--huge) 0;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 1;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.125rem 3rem;
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-500)
    );
    color: white;
    text-decoration: none;
    font-size: var(--font-size-large);
    font-weight: 600;
    border-radius: var(--border-radius-normal);
    position: relative;
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.4),
      0 8px 16px -4px rgba(139, 92, 246, 0.4),
      0 4px 8px -2px rgba(0, 0, 0, 0.3);
  }

  .cta-button::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    border-radius: var(--border-radius-normal);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .cta-button:hover::before {
    opacity: 1;
  }

  .cta-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow:
      0 0 0 1px rgba(139, 92, 246, 0.5),
      0 16px 32px -8px rgba(139, 92, 246, 0.5),
      0 8px 16px -4px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 640px) {
    .cta-card {
      padding: 2.5rem 1.5rem;
    }
  }
</style>

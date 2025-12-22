<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";
  import "@kablan/clean-ui/css/index.css";
</script>

<PageLayout>
  <div class="wiki-page">
    <section class="wiki-hero">
      <h1>Wiki & Documentation</h1>
      <p class="tagline">Everything you need to know about Kable Launcher</p>
    </section>

    <section class="wiki-content">
      <div class="wiki-card">
        <h2>🚀 Getting Started</h2>
        <h3>Installation</h3>
        <p>
          Download the appropriate installer for your operating system from the <a
            href="/releases">Releases page</a
          >.
        </p>
        <ul>
          <li>
            <strong>Windows:</strong> Run the .msi or .exe installer and follow the
            prompts
          </li>
          <li>
            <strong>macOS:</strong> Open the .dmg file and drag Kable Launcher to
            your Applications folder
          </li>
          <li>
            <strong>Linux:</strong> Make the .AppImage executable or install the
            .deb package
          </li>
        </ul>

        <h3>First Launch</h3>
        <p>
          When you first launch Kable Launcher, it will automatically download
          the necessary Minecraft files. This may take a few minutes depending
          on your internet connection.
        </p>
      </div>

      <div class="wiki-card">
        <h2>🎮 Using Kable Launcher</h2>
        <h3>Launching Minecraft</h3>
        <ol>
          <li>Select your desired Minecraft version from the dropdown</li>
          <li>Click the "Launch" button</li>
          <li>
            Wait for Minecraft to start - progress is shown in the launcher
          </li>
        </ol>

        <h3>Managing Profiles</h3>
        <p>
          Profiles allow you to maintain different Minecraft configurations.
          Each profile can have:
        </p>
        <ul>
          <li>Different Minecraft versions</li>
          <li>Unique mod configurations</li>
          <li>Separate save folders</li>
          <li>Custom Java arguments</li>
        </ul>
      </div>

      <div class="wiki-card">
        <h2>🧩 Mod Management</h2>
        <h3>Installing Mods</h3>
        <ol>
          <li>Navigate to the "Mods" section in Kable Launcher</li>
          <li>Search for the mod you want to install</li>
          <li>Click "Install" next to the mod</li>
          <li>The mod will be downloaded and installed automatically</li>
        </ol>

        <h3>Enabling/Disabling Mods</h3>
        <p>
          Toggle mods on or off in the "Manage Mods" tab without deleting them.
          This makes it easy to test different mod combinations.
        </p>

        <h3>Mod Dependencies</h3>
        <p>
          Kable Launcher automatically handles mod dependencies. When you
          install a mod that requires other mods (like Fabric API), they will be
          installed automatically.
        </p>
      </div>

      <div class="wiki-card">
        <h2>⚙️ Settings & Configuration</h2>
        <h3>Game Settings</h3>
        <ul>
          <li>
            <strong>Java Memory:</strong> Allocate more RAM for better performance
          </li>
          <li>
            <strong>Java Version:</strong> Select which Java installation to use
          </li>
          <li>
            <strong>Game Directory:</strong> Choose where Minecraft files are stored
          </li>
          <li>
            <strong>Resolution:</strong> Set the window size for Minecraft
          </li>
        </ul>

        <h3>Launcher Settings</h3>
        <ul>
          <li><strong>Theme:</strong> Customize the launcher's appearance</li>
          <li>
            <strong>Auto-Update:</strong> Keep Kable Launcher up to date automatically
          </li>
          <li>
            <strong>Close on Launch:</strong> Minimize or close the launcher when
            Minecraft starts
          </li>
        </ul>
      </div>

      <div class="wiki-card">
        <h2>📋 Logs & Troubleshooting</h2>
        <h3>Viewing Logs</h3>
        <p>
          Access game logs directly in the launcher to troubleshoot issues. The
          "Logs" tab shows real-time output from Minecraft.
        </p>

        <h3>Common Issues</h3>
        <div class="faq-item">
          <h4>Minecraft won't launch</h4>
          <p>
            Check that you have Java installed and that your system meets
            Minecraft's minimum requirements. Try allocating more memory in the
            settings.
          </p>
        </div>

        <div class="faq-item">
          <h4>Mods not working</h4>
          <p>
            Ensure you're using compatible mod versions for your Minecraft
            version. Check that Fabric or Forge is installed if required.
          </p>
        </div>

        <div class="faq-item">
          <h4>Performance issues</h4>
          <p>
            Try allocating more RAM in settings, reduce render distance in
            Minecraft, or remove resource-intensive mods.
          </p>
        </div>
      </div>

      <div class="wiki-card">
        <h2>❓ Frequently Asked Questions</h2>
        <div class="faq-item">
          <h4>Is Kable Launcher free?</h4>
          <p>
            Yes! Kable Launcher is completely free and open source. You can view
            the source code on
            <a
              href="https://github.com/LuckyLuuk12/kable"
              target="_blank"
              rel="noopener">GitHub</a
            >.
          </p>
        </div>

        <div class="faq-item">
          <h4>Do I need to own Minecraft?</h4>
          <p>
            Yes, you need a valid Minecraft Java Edition account to play. Kable
            Launcher is just a launcher - it doesn't provide the game itself.
          </p>
        </div>

        <div class="faq-item">
          <h4>Can I use Kable Launcher with modpacks?</h4>
          <p>
            Yes! Kable Launcher supports modpacks and makes it easy to install
            and manage them.
          </p>
        </div>

        <div class="faq-item">
          <h4>How do I report bugs or request features?</h4>
          <p>
            Please open an issue on our
            <a
              href="https://github.com/LuckyLuuk12/kable/issues"
              target="_blank"
              rel="noopener">GitHub repository</a
            >.
          </p>
        </div>
      </div>

      <div class="wiki-card">
        <h2>🆘 Need More Help?</h2>
        <p>
          If you can't find the answer you're looking for, check out our <a
            href="https://github.com/LuckyLuuk12/kable"
            target="_blank"
            rel="noopener">GitHub repository</a
          >
          or open an
          <a
            href="https://github.com/LuckyLuuk12/kable/issues"
            target="_blank"
            rel="noopener">issue</a
          > for help.
        </p>
      </div>
    </section>
  </div>
</PageLayout>

<style>
  .wiki-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
    min-height: 100vh;
  }

  .wiki-hero {
    text-align: center;
    margin-bottom: 4rem;
  }

  .wiki-hero h1 {
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

  .wiki-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .wiki-card {
    background: var(--container);
    border: 1px solid var(--dark-600);
    border-radius: var(--border-radius-large);
    padding: var(--huge);
    transition: all 0.3s ease;
  }

  .wiki-card:hover {
    border-color: var(--primary-500);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .wiki-card h2 {
    font-size: var(--font-size-large);
    font-weight: 800;
    margin: 0 0 var(--large) 0;
    color: var(--text);
  }

  .wiki-card h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    margin: var(--large) 0 var(--normal) 0;
    color: var(--text);
  }

  .wiki-card h3:first-of-type {
    margin-top: 0;
  }

  .wiki-card h4 {
    font-size: var(--font-size);
    font-weight: 700;
    margin: 0 0 var(--normal) 0;
    color: var(--primary-500);
  }

  .wiki-card p {
    color: var(--placeholder);
    line-height: 1.7;
    margin: 0 0 var(--large) 0;
  }

  .wiki-card p:last-child {
    margin-bottom: 0;
  }

  .wiki-card ul,
  .wiki-card ol {
    margin: 0 0 var(--large) 0;
    padding-left: 2rem;
    color: var(--placeholder);
    line-height: 1.7;
  }

  .wiki-card ul {
    list-style: none;
    padding-left: 0;
  }

  .wiki-card li {
    margin-bottom: var(--normal);
    padding-left: 2rem;
    position: relative;
  }

  .wiki-card ul li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: 900;
    font-size: 1.2rem;
  }

  .wiki-card ol {
    padding-left: 2rem;
  }

  .wiki-card ol li {
    padding-left: 0.5rem;
  }

  .wiki-card strong {
    color: var(--text);
  }

  .wiki-card a {
    color: var(--primary-500);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .wiki-card a:hover {
    text-shadow: 0 0 20px var(--primary-500);
  }

  .faq-item {
    margin-bottom: var(--large);
    padding: var(--large);
    background: var(--card);
    border-radius: var(--border-radius);
  }

  .faq-item:last-child {
    margin-bottom: 0;
  }

  .faq-item h4 {
    margin-top: 0;
  }

  .faq-item p {
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    .wiki-page {
      padding: 6rem 1rem 2rem;
    }

    .wiki-card {
      padding: var(--large);
    }

    .faq-item {
      padding: var(--normal);
    }
  }
</style>

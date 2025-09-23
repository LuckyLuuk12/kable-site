<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import '@kablan/clean-ui/css/index.css';
  
  // Import screenshot assets with enhanced image support
  import favicon from '$lib/assets/favicon.png?enhanced';
  import homeImage from '$lib/assets/home.png?enhanced';
  import logsImage from '$lib/assets/logs.png?enhanced';
  import manageModsImage from '$lib/assets/manage-mods.png?enhanced';
  import searchModsImage from '$lib/assets/search-mods.png?enhanced';
  import settingsImage from '$lib/assets/settings.png?enhanced';

  // Type definitions
  interface Release {
    version: string;
    platforms: Record<string, { url: string; size: number; filename: string }>;
  }

  // State variables
  let release: Release | null = null;
  let loading = true;
  let error = false;
  let scrollY = 0;
  let innerHeight = 0;
  // Controls visibility of the download dropdown
  let dropdownOpen = false;
  // Respect user's reduced motion preference
  let prefersReducedMotion = false;
  let _reducedMotionMQ: MediaQueryList | null = null;
  let _reducedMotionHandler: ((ev: any) => void) | null = null;
  // (no debug-only variables)

  // Reactive platform detection
  $: userPlatform = browser ? detectPlatform() : '';
  $: recommendedKey = userPlatform && release?.platforms[userPlatform] 
    ? userPlatform 
    : Object.keys(release?.platforms || {})[0] || null;

  // Elements for intersection observation
  let floatingElements: HTMLElement[] = [];

  // Reactive hook: elements may be bound after render

  // Check visibility of floating elements
  function checkElementVisibility() {
    if (!browser) {
      return;
    }
    floatingElements.forEach((element, index) => {
      if (!element) {
        return;
      }
      
      const rect = element.getBoundingClientRect();
      const elementVisible = rect.top < innerHeight * 0.8 && rect.bottom > innerHeight * 0.2;
      const isAlreadyVisible = element.classList.contains('visible');
      
      if (elementVisible && !isAlreadyVisible) {
        element.classList.add('visible');
        if (prefersReducedMotion) {
          // Immediately show without animations; keep child image rotation intact
          element.style.transition = 'none';
          element.style.opacity = '1';
          // set container to final position without animation
          element.style.transform = 'translateY(0)';
          element.style.visibility = 'visible';
        } else {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          element.style.visibility = 'visible';
        }
      } else if (!elementVisible && isAlreadyVisible) {
        element.classList.remove('visible');
        // Hide it (respect reduced motion by not animating)
        if (prefersReducedMotion) {
          element.style.transition = 'none';
          element.style.opacity = '0';
          // move container back to off-screen position without animation
          element.style.transform = 'translateY(50px)';
          element.style.visibility = 'hidden';
        } else {
          element.style.opacity = '0';
          element.style.transform = 'translateY(50px)';
          element.style.visibility = 'hidden';
        }
      }
    });
  }

  // Reactive statement to check visibility when scroll changes
  $: if (browser && scrollY !== undefined && innerHeight > 0) checkElementVisibility();

  // Platform detection and labeling
  function detectPlatform(): string {
    if (typeof window === 'undefined') return '';

    const ua = window.navigator.userAgent.toLowerCase();
    const platform = (window.navigator.platform || '').toLowerCase();

    // Prefer explicit mobile checks before generic "linux"
    if (ua.includes('android')) {
      // Most Android devices are ARM; fall back to x64 if x86 strings present
      return ua.includes('arm') || ua.includes('aarch64') ? 'linux-arm64' : 'linux-x64';
    }

    // iOS devices (iPhone/iPad/iPod)
    if (/\b(iphone|ipad|ipod)\b/.test(ua)) {
      // Modern iPhones/iPads use ARM
      return 'darwin-arm64';
    }

    // macOS desktops (check platform and UA)
    if (ua.includes('macintosh') || platform.includes('mac')) {
      return ua.includes('intel') ? 'darwin-x64' : 'darwin-arm64';
    }

    // Windows
    if (ua.includes('windows')) return 'windows-x64';

    // Generic Linux desktop (detect ARM if mentioned)
    if (ua.includes('linux')) {
      return ua.includes('arm') || ua.includes('aarch64') ? 'linux-arm64' : 'linux-x64';
    }

    return '';
  }

  function labelFor(platformKey: string): string {
    const labels: Record<string, string> = {
      'windows-x64': 'Windows',
      'darwin-arm64': 'macOS (Apple Silicon)',
      'darwin-x64': 'macOS (Intel)',
      'linux-x64': 'Linux (x64)',
      'linux-arm64': 'Linux (ARM64)'
    };
    return labels[platformKey] || platformKey;
  }

  // GitHub API fetch
  async function fetchLatestRelease() {
    try {
      const response = await fetch('https://api.github.com/repos/LuckyLuuk12/kable/releases/latest');
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();

      // Helper: detect obvious signature files so we don't pick them
      const isSignatureFile = (name: string) => {
        return /\.sig$|\.asc$|signature|\.sha256$|\.sha512$/i.test(name);
      };

      // Temporary map of platform -> asset candidates (non-signature)
      const candidates: Record<string, Array<any>> = {};

      // Parse assets into candidate lists, skipping signature files
      for (const asset of data.assets || []) {
        const name = (asset.name || '').toLowerCase();
        if (!name) continue;
        if (isSignatureFile(name)) continue; // skip signing files entirely

        let platformKey = '';

        if (name.includes('windows') || name.includes('.exe') || name.includes('.msi') ||
            name.includes('win32') || name.includes('win64') || name.includes('x86_64-pc-windows')) {
          platformKey = 'windows-x64';
        } else if (name.includes('darwin') || name.includes('macos') || name.includes('mac') ||
                   name.includes('.dmg') || name.includes('apple') || name.includes('x86_64-apple-darwin') ||
                   name.includes('aarch64-apple-darwin')) {
          platformKey = name.includes('arm64') || name.includes('aarch64') || name.includes('apple-silicon')
            ? 'darwin-arm64' : 'darwin-x64';
        } else if (name.includes('linux') || name.includes('.appimage') || name.includes('.deb') ||
                   name.includes('.rpm') || name.includes('x86_64-unknown-linux') ||
                   name.includes('gnu') || name.includes('musl')) {
          platformKey = 'linux-x64';
        }

        if (platformKey) {
          candidates[platformKey] = candidates[platformKey] || [];
          candidates[platformKey].push(asset);
        }
      }

      // Preference rules for each platform (regex patterns tested in order)
      const priorities: Record<string, string[]> = {
        'windows-x64': ['msi$', 'exe$', 'zip$', 'x64', 'installer'],
        'darwin-arm64': ['\.tar\.gz$', '\.dmg$', 'tar.gz$', 'zip$'],
        'darwin-x64': ['\.tar\.gz$', '\.dmg$', 'tar.gz$', 'zip$'],
        'linux-x64': ['appimage', '\.appimage$', '\.deb$', '\.tar\.gz$', 'tar.xz$', 'zip$']
      };

      const platforms: Record<string, { url: string; size: number; filename: string }> = {};

      for (const [key, list] of Object.entries(candidates)) {
        const prefs = priorities[key] || [];
        let chosen = null;

        // Try to pick by priority patterns
        for (const pat of prefs) {
          const re = new RegExp(pat, 'i');
          chosen = list.find((a: any) => re.test(a.name));
          if (chosen) break;
        }

        // Fallback: choose the largest non-signature asset (most likely the real binary)
        if (!chosen) {
          chosen = list.slice().sort((a: any, b: any) => (b.size || 0) - (a.size || 0))[0];
        }

        if (chosen) {
          platforms[key] = {
            url: chosen.browser_download_url,
            size: chosen.size,
            filename: chosen.name
          };
        }
      }

      release = {
        version: data.tag_name,
        platforms
      };

    } catch (err) {
      console.error('Error fetching release:', err);
      error = true;
    } finally {
      loading = false;
    }
  }

  function handlePrimaryDownload() {
    if (recommendedKey && release?.platforms[recommendedKey]) {
      window.open(release.platforms[recommendedKey].url, '_blank', 'noopener,noreferrer');
    }
  }

  // Dropdown handlers
  function toggleDropdown(e: MouseEvent | KeyboardEvent) {
    e.stopPropagation();
    dropdownOpen = !dropdownOpen;
  }

  function closeDropdown() {
    dropdownOpen = false;
  }

  function handleWindowClick() {
    // Close dropdown when clicking anywhere outside
    if (dropdownOpen) dropdownOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && dropdownOpen) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    // clear any stale reduced-motion attribute (HMR or previous runs)
    if (browser) {
      try { document.documentElement.removeAttribute('data-reduced-motion'); } catch (e) {}
    }
    fetchLatestRelease();
    
    // Initial visibility check with delay to ensure elements are rendered
    if (browser) {
      setTimeout(() => {
        checkElementVisibility();
      }, 500); // Increased delay to ensure elements are bound
    }

    // Setup prefers-reduced-motion. Default to motion-enabled unless reduce is explicitly reported.
    const mqSupported = !!(browser && typeof window.matchMedia === 'function');
    if (mqSupported) {
      _reducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

      // Handler updates state and sets/removes the data attribute only when reduce is true.
      const reducedChangeHandler = (mq: MediaQueryList | MediaQueryListEvent) => {
        // MediaQueryListEvent has 'matches', MediaQueryList also has 'matches'
        // @ts-ignore
        const matches = mq.matches === true;
        prefersReducedMotion = matches;
        try {
          if (matches) {
            document.documentElement.setAttribute('data-reduced-motion', 'true');
          } else {
            // Remove attribute so CSS won't match and motion remains enabled by default
            document.documentElement.removeAttribute('data-reduced-motion');
          }
        } catch (e) {
          // ignore
        }
      };

  // Initialize and log for debugging
  reducedChangeHandler(_reducedMotionMQ);

      // Register listener and keep reference for removal
      _reducedMotionHandler = reducedChangeHandler;
      if (typeof _reducedMotionMQ.addEventListener === 'function') {
        _reducedMotionMQ.addEventListener('change', _reducedMotionHandler as EventListener);
      } else if (typeof _reducedMotionMQ.addListener === 'function') {
        // @ts-ignore
        _reducedMotionMQ.addListener(_reducedMotionHandler as any);
      }
    } else {
      // No matchMedia support: ensure attribute is removed so motion remains enabled
      try { document.documentElement.removeAttribute('data-reduced-motion'); } catch (e) {}
      prefersReducedMotion = false;
    }
  });

  onDestroy(() => {
    if (_reducedMotionMQ) {
      try {
        if (_reducedMotionHandler) {
          if (typeof _reducedMotionMQ.removeEventListener === 'function') {
            _reducedMotionMQ.removeEventListener('change', _reducedMotionHandler as EventListener);
          } else if (typeof _reducedMotionMQ.removeListener === 'function') {
            // @ts-ignore
            _reducedMotionMQ.removeListener(_reducedMotionHandler as any);
          }
        }
      } catch (e) {
        // ignore
      }
    }
  });
</script>

<svelte:window bind:scrollY bind:innerHeight on:click={handleWindowClick} on:keydown={handleKeydown} />

<!-- Moving gradient background -->
<div class="bg-gradient"></div>
<div class="bg-orbs">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
</div>

<div class="page-root">
  <a href="/" class="logo" aria-label="Home">
    <enhanced:img src={favicon} alt="Kable Launcher Logo"  />
  </a>
  <nav>
    <!-- Navigation links - hidden when collapsed -->
    <div>
      <a href="#about" class="nav-item">Who are "we"?</a>
      <a href="https://github.com/LuckyLuuk12/kable" class="nav-item" target="_blank" rel="noopener">Source</a>
      <a href="https://github.com/LuckyLuuk12/kable/releases" class="nav-item" target="_blank" rel="noopener">All Releases</a>
    </div>
  </nav>

  <!-- Hero section with left-aligned content -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-left">
        <h1 class="hero-title">
          <span class="gradient-primary-secondary">Kable</span>
          <span class="gradient-primary-tertiary">Launcher</span>
        </h1>
        <p class="hero-subtitle">A lightweight, reliable Minecraft launcher designed to make launching and managing your game effortless.</p>
        
        <div class="version-badge">
          {#if release}
            <span class="version-label">Latest:</span>
            <span class="version-number">{release.version}</span>
          {/if}
        </div>

        <div class="download-section">
          {#if loading}
            <div class="loading-state">
              <div class="spinner"></div>
              <span>Fetching latest release...</span>
            </div>
          {:else if error}
            <a href="https://github.com/LuckyLuuk12/kable/releases" target="_blank" rel="noopener" class="download-fallback">
              <button class="primary-download-btn">View All Releases</button>
            </a>
          {:else if release}
            <div class="smart-download">
              <button class="primary-download-btn" on:click={handlePrimaryDownload}>
                <span class="download-icon">{recommendedKey?.includes('windows') ? '🪟' : recommendedKey?.includes('darwin') ? '🍎' : '🐧'}</span>
                <span class="download-text">
                  Download for {recommendedKey ? labelFor(recommendedKey) : 'Your Platform'}
                </span>
              </button>
              <div class="dropdown-container" on:click|stopPropagation on:keypress={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleDropdown(e); }} tabindex="0" role="button" aria-haspopup="true" aria-expanded={dropdownOpen} aria-label="Show download options for other platforms">
                <button
                  class="dropdown-toggle"
                  aria-label="Show download options for other platforms"
                  on:click={toggleDropdown}
                  class:active={dropdownOpen}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="dropdown-menu" class:open={dropdownOpen} on:click|stopPropagation on:keydown|stopPropagation role="button" tabindex="0">
                  {#each Object.entries(release.platforms) as [key, info]}
                    <a href={info.url} target="_blank" rel="noopener noreferrer" class="dropdown-item" on:click={closeDropdown}>
                      <span class="platform-icon">{key.includes('windows') ? '🪟' : key.includes('darwin') ? '🍎' : '🐧'}</span>
                      <span>{labelFor(key)}</span>
                      {#if key === recommendedKey}
                        <span class="recommended-badge">Recommended</span>
                      {/if}
                    </a>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <div class="hero-right">
        <div class="hero-image floating-element" bind:this={floatingElements[0]}>
          <enhanced:img src={homeImage} alt="Kable Launcher Home Interface" />
        </div>
      </div>
    </div>
  </section>

  <!-- Floating features -->
  <section class="features-section">
    <div class="features-grid">
      <div class="feature-card floating-element" bind:this={floatingElements[1]}>
        <div class="feature-icon">🌐</div>
        <h3>Cross-Platform</h3>
        <p>Native support for Windows, macOS (Intel & Apple Silicon), and Linux distributions.</p>
      </div>
      
      <div class="feature-card floating-element" bind:this={floatingElements[2]}>
        <div class="feature-icon">🔒</div>
        <h3>Secure & Verified</h3>
        <p>All releases are cryptographically signed and verified through GitHub's security infrastructure.</p>
      </div>
      
      <div class="feature-card floating-element" bind:this={floatingElements[3]}>
        <div class="feature-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Minimal resource footprint with instant startup and responsive interface.</p>
      </div>
      
      <div class="feature-card floating-element" bind:this={floatingElements[4]}>
        <div class="feature-icon">🔓</div>
        <h3>Open Source</h3>
        <p>Fully transparent codebase available on GitHub for inspection and contribution.</p>
      </div>
    </div>
  </section>

    <!-- Feature Showcase Section -->
  <section class="showcase-section">
    <h2 class="section-title gradient-primary-tertiary">Experience Kable</h2>
    
    <!-- Home Interface -->
    <div class="showcase-item floating-element" bind:this={floatingElements[5]}>
      <div class="showcase-content">
        <div class="showcase-text">
          <h3>Clean & Intuitive Interface</h3>
          <p>Launch Minecraft with ease using our streamlined home interface. Everything you need is just a click away - from selecting your favorite version to jumping straight into your world.</p>
          <ul class="feature-list">
            <li>One-click launch for all Minecraft versions</li>
            <li>Quick access to your most-used profiles</li>
            <li>Real-time status updates and progress tracking</li>
            <li>Beautiful, distraction-free design</li>
          </ul>
        </div>
        <div class="showcase-image">
          <enhanced:img src={homeImage} alt="Kable Launcher Home Interface" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Mod Management -->
    <div class="showcase-item floating-element reverse" bind:this={floatingElements[6]}>
      <div class="showcase-content">
        <div class="showcase-text">
          <h3>Powerful Mod Management</h3>
          <p>Take control of your Minecraft experience with our comprehensive mod management system. Install, update, and organize your mods effortlessly.</p>
          <ul class="feature-list">
            <li>Browse and install mods from popular repositories</li>
            <li>Automatic dependency resolution</li>
            <li>Easy mod enabling/disabling</li>
            <li>Profile-based mod configurations</li>
          </ul>
        </div>
        <div class="showcase-image">
          <enhanced:img src={manageModsImage} alt="Kable Launcher Mod Management" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Mod Discovery -->
    <div class="showcase-item floating-element" bind:this={floatingElements[7]}>
      <div class="showcase-content">
        <div class="showcase-text">
          <h3>Discover Amazing Mods</h3>
          <p>Find your next favorite mod with our integrated search and discovery system. Browse thousands of mods with detailed information and user reviews.</p>
          <ul class="feature-list">
            <li>Search mods by category, popularity, or keywords</li>
            <li>View detailed mod descriptions and screenshots</li>
            <li>Check compatibility with your Minecraft version</li>
            <li>Read community reviews and ratings</li>
          </ul>
        </div>
        <div class="showcase-image">
          <enhanced:img src={searchModsImage} alt="Kable Launcher Mod Search" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Settings & Configuration -->
    <div class="showcase-item floating-element reverse" bind:this={floatingElements[8]}>
      <div class="showcase-content">
        <div class="showcase-text">
          <h3>Flexible Configuration</h3>
          <p>Customize Kable to work exactly how you want. From memory allocation to mod loader preferences, every aspect is configurable.</p>
          <ul class="feature-list">
            <li>Adjust memory allocation for optimal performance</li>
            <li>Configure Java runtime settings</li>
            <li>Set up custom game directories</li>
            <li>Personalize the launcher appearance</li>
          </ul>
        </div>
        <div class="showcase-image">
          <enhanced:img src={settingsImage} alt="Kable Launcher Settings" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Logs & Debugging -->
    <div class="showcase-item floating-element" bind:this={floatingElements[9]}>
      <div class="showcase-content">
        <div class="showcase-text">
          <h3>Advanced Debugging Tools</h3>
          <p>When things go wrong, Kable has your back. Our comprehensive logging system helps you troubleshoot issues quickly and efficiently.</p>
          <ul class="feature-list">
            <li>Real-time log monitoring during gameplay</li>
            <li>Color-coded log levels for easy reading</li>
            <li>Export logs for sharing with support</li>
            <li>Built-in crash report analysis</li>
          </ul>
        </div>
        <div class="showcase-image">
          <enhanced:img src={logsImage} alt="Kable Launcher Debug Logs" loading="lazy" />
        </div>
      </div>
    </div>
  </section>

  <!-- About section -->
  <section id="about" class="about-section">
    <div class="about-content floating-element" bind:this={floatingElements[10]}>
      <h2 class="section-title gradient-primary-tertiary">Who are "we"?</h2>
      <div class="about-text">
        <p>Actually, it's just me! I'm <strong>Luuk Kablan</strong> (LuckyLuuk_), a passionate developer working on Kable Launcher in my spare time.</p>
        <p>I started this project because I wanted a simple, reliable way to launch Minecraft without the bloat of existing launchers. What began as a personal tool has grown into something I hope others will find useful too.</p>
        <p>When I'm not coding Kable, I work on various other projects and enjoy exploring new technologies. I believe in open source software and the power of community-driven development.</p>
        <div class="social-links">
          <a href="https://github.com/LuckyLuuk12" target="_blank" rel="noopener" class="social-link">
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/luuk-kablan" target="_blank" rel="noopener" class="social-link">
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-content">
      <span>© {new Date().getFullYear()} Luuk Kablan</span>
      <a href="https://github.com/LuckyLuuk12/kable" class="footer-link gradient-primary-tertiary">
        View on GitHub
      </a>
    </div>
  </footer>
</div>


<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: transparent;
    font-family: var(--font);
  }

  /* Override quaternary colors to match our blue/magenta/purple theme */
  :global(:root) {
    --quaternary-50: #eef2ff;
    --quaternary-100: #e0e7ff;
    --quaternary-200: #c7d2fe;
    --quaternary-300: #a5b4fc;
    --quaternary-400: #818cf8;
    --quaternary-500: #6366f1;
    --quaternary-600: #4f46e5;
    --quaternary-700: #4338ca;
    --quaternary-800: #3730a3;
    --quaternary-900: #312e81;
  }

  .page-root {
    position: relative;
    min-height: 100vh;
    background: transparent;
  }

  /* Animated background */
  .bg-gradient {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    /* Fallback background with alpha for glass effect */
    background: linear-gradient(
      45deg,
      rgba(76, 29, 149, 0.15) 0%,
      rgba(99, 102, 241, 0.13) 20%,
      rgba(131, 24, 67, 0.12) 40%,
      rgba(12, 74, 110, 0.10) 60%,
      rgba(99, 102, 241, 0.13) 80%,
      rgba(76, 29, 149, 0.15) 100%
    );
    /* CleanUI variables with alpha for glass effect */
    background: linear-gradient(
      45deg,
      color-mix(in srgb, var(--primary-500) 15%, transparent) 0%,
      color-mix(in srgb, var(--quaternary-500) 13%, transparent) 20%,
      color-mix(in srgb, var(--secondary-500) 12%, transparent) 40%,
      color-mix(in srgb, var(--tertiary-500) 10%, transparent) 60%,
      color-mix(in srgb, var(--quaternary-500) 13%, transparent) 80%,
      color-mix(in srgb, var(--primary-500) 15%, transparent) 100%
    );
    background-size: 200% 200%;
    background-repeat: no-repeat;
    animation: gradientShift 80s ease-in-out infinite;
    z-index: -1000;
    filter: blur(35px);
    backdrop-filter: blur(10px);
  }

  .bg-orbs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -999;
    pointer-events: none;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.3;
  }

  .orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #8b5cf6, transparent);
    background: radial-gradient(circle, var(--primary-500), transparent);
    top: 10%;
    left: -100px;
    animation: float 25s ease-in-out infinite;
    animation-delay: 0s;
  }

  .orb-2 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #06b6d4, transparent);
    background: radial-gradient(circle, var(--cyan-500), transparent);
    top: 60%;
    right: -150px;
    animation: float 30s ease-in-out infinite reverse;
    animation-delay: -10s;
  }

  .orb-3 {
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #d946ef, transparent);
    background: radial-gradient(circle, var(--magenta-500), transparent);
    bottom: 20%;
    left: 50%;
    animation: float 22s ease-in-out infinite;
    animation-delay: -15s;
  }

  @keyframes gradientShift {
    0% { 
      background-position: 0% 0%; 
    }
    25% { 
      background-position: 100% 0%; 
    }
    50% { 
      background-position: 100% 100%; 
    }
    75% { 
      background-position: 0% 100%; 
    }
    100% { 
      background-position: 0% 0%; 
    }
  }

  @keyframes float {
    0% { 
      transform: translate(0, 0) rotate(0deg) scale(1); 
    }
    12.5% { 
      transform: translate(80px, -60px) rotate(45deg) scale(1.15); 
    }
    25% { 
      transform: translate(120px, -40px) rotate(90deg) scale(1.1); 
    }
    37.5% { 
      transform: translate(100px, 40px) rotate(135deg) scale(0.85); 
    }
    50% { 
      transform: translate(-20px, 80px) rotate(180deg) scale(0.9); 
    }
    62.5% { 
      transform: translate(-100px, 60px) rotate(225deg) scale(1.2); 
    }
    75% { 
      transform: translate(-120px, -20px) rotate(270deg) scale(1.05); 
    }
    87.5% { 
      transform: translate(-60px, -80px) rotate(315deg) scale(0.95); 
    }
    100% { 
      transform: translate(0, 0) rotate(360deg) scale(1); 
    }
  }

  /* Top-left collapsible navigation */
  nav {
    position: fixed;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    width: 100vw;
    padding: 3rem 2rem;
    background: linear-gradient(to bottom, rgba(0,0,0, 0.3) 40%, rgba(0,0,0, 0.175), rgba(255, 255, 255, 0));
    z-index: 9999;
  }

  .logo {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    backdrop-filter: blur(10px);
    background: transparent !important;
    transition: all 0.3s ease;
    
  }

  :global(.logo img) {
    width: 100%;
    height: 100%;
    background: transparent !important
  }

  .nav-item {
    color: var(--text);
    text-decoration: none;
    font-weight: 900;
    padding: var(--normal) var(--large);
    border-radius: var(--border-radius);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .nav-item:hover {
    text-shadow: 0 0 50px var(--primary);
  }


  /* Hero section */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    width: 100%;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    font-family: var(--font-heading);
    line-height: 0.9;
    margin: 0;
  }

  .hero-subtitle {
    font-size: var(--font-size-large);
    color: var(--light-400);
    line-height: 1.6;
    margin: 0;
    max-width: 500px;
  }

  .version-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--normal);
    background: var(--card);
    border: 1px solid var(--primary-700);
    padding: var(--normal) var(--large);
    border-radius: 50px;
    backdrop-filter: blur(10px);
    font-size: var(--font-size-small);
    width: fit-content;
  }

  .version-label {
    color: var(--light-500);
    font-weight: 500;
  }

  .version-number {
    color: var(--primary-300);
    font-weight: 600;
    font-family: var(--font-code);
  }

  .download-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .smart-download {
    display: flex;
    align-items: center;
    gap: 0;
    width: fit-content;
  }

  .primary-download-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--button-text);
    border: none;
    padding: var(--large) calc(var(--large) * 2);
    border-radius: var(--border-radius-large) 0 0 var(--border-radius-large);
    font-size: var(--font-size-large);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 3.5rem;
    min-height: 3.5rem;
  }

  .primary-download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(10, 10, 10, 0.4);
  }

  .download-icon {
    font-size: 1.2rem;
  }

  .dropdown-container {
    position: relative;
  }

  .dropdown-toggle {
    color: var(--button-text);
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    padding: var(--large) var(--large);
    border-radius: 0 var(--border-radius-large) var(--border-radius-large) 0;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 3.5rem;
  }

  .dropdown-toggle svg {
    transition: transform 0.3s ease;
  }

  .dropdown-toggle.active svg {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + var(--normal));
    left: -200px;
    right: 0;
    background: var(--container);
    border: 1px solid var(--input);
    border-radius: var(--border-radius-large);
    backdrop-filter: blur(20px);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    min-width: 280px;
    z-index: 100;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .dropdown-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem var(--large);
    color: var(--text);
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: var(--border-radius);
    margin: var(--small);
    position: relative;
  }

  .dropdown-item:hover {
    background: var(--card);
    color: var(--text);
  }

  .platform-icon {
    font-size: var(--font-size-large);
  }

  .recommended-badge {
    margin-left: auto;
    background: var(--green-800);
    color: var(--green-300);
    padding: var(--small) var(--normal);
    border-radius: var(--border-radius-small);
    font-size: var(--font-size-tiny);
    font-weight: 600;
    border: 1px solid var(--green-700);
  }

  .hero-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-image {
    max-width: 100%;
    border-radius: var(--border-radius-small);
    backdrop-filter: blur(10px);
  }

  .hero-image :global(img) {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Loading and error states */
  .loading-state {
    display: flex;
    align-items: center;
    gap: var(--large);
    color: var(--light-400);
    font-weight: 500;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid var(--input);
    border-top: 3px solid var(--primary-500);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Floating elements - start invisible and animate in when visible */
  .floating-element {
    position: relative;
    opacity: 0.1;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.25, 0.25, 1);
  }

  /* Stagger animations for elements */
  .floating-element:nth-child(1) { transition-delay: 0.1s; }
  .floating-element:nth-child(2) { transition-delay: 0.2s; }
  .floating-element:nth-child(3) { transition-delay: 0.3s; }
  .floating-element:nth-child(4) { transition-delay: 0.4s; }
  .floating-element:nth-child(5) { transition-delay: 0.5s; }

  /* 3D card styling for images */
  .floating-element :global(img) {
    opacity: inherit;
    border-radius: 16px;
    width: 100%;
    height: auto;
    display: block;
    transform: rotateX(31deg) rotateZ(7deg);
    transform-style: preserve-3d;
    box-shadow: 
      3px 4px 0 1px rgba(32, 14, 34, 0.8),
      -1px 0 28px 0 rgba(81, 33, 75, 0.01),
      28px 28px 28px 0 rgba(70, 33, 81, 0.25);
    transition: 0.4s ease-in-out transform, 0.4s ease-in-out box-shadow;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .floating-element:hover :global(img) {
    transform: translate3d(0px, -16px, 0px) rotateX(21deg) rotateZ(3deg);
    box-shadow: 
      1px 1px 0 1px rgba(48, 8, 46, 0.8),
      -1px 0 28px 0 rgba(34, 33, 81, 0.01),
      54px 54px 28px -10px rgba(34, 33, 81, 0.15);
  }

  /* Features section */
  .features-section {
    padding: 6rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: var(--card);
    border: 1px solid var(--input);
    border-radius: var(--border-radius-large);
    padding: calc(var(--large) * 2.5);
    text-align: center;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .feature-card:hover {
    transform: translateY(-10px);
    background: var(--input);
    border-color: var(--primary-600);
  }

  .feature-icon {
    font-size: var(--font-size-huge);
    margin-bottom: var(--huge);
  }

  .feature-card h3 {
    font-size: var(--font-size-large);
    font-weight: 700;
    font-family: var(--font-heading);
    color: var(--text);
    margin: 0 0 var(--large) 0;
  }

  .feature-card p {
    color: var(--light-400);
    line-height: 1.6;
    margin: 0;
  }

  /* Showcase section */
  .showcase-section {
    padding: 6rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .showcase-item {
    margin-bottom: 8rem;
  }

  .showcase-item:last-child {
    margin-bottom: 0;
  }

  .showcase-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .showcase-item.reverse .showcase-content {
    direction: rtl;
  }

  .showcase-item.reverse .showcase-text {
    direction: ltr;
  }

  .showcase-text h3 {
    font-size: var(--font-size-huge);
    font-weight: 700;
    font-family: var(--font-heading);
    color: var(--text);
    margin: 0 0 var(--large) 0;
    background: linear-gradient(135deg, var(--primary-400), var(--tertiary-400));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .showcase-text p {
    color: var(--light-400);
    line-height: 1.7;
    margin: 0 0 var(--huge) 0;
    font-size: var(--font-size-large);
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .feature-list li {
    color: var(--light-300);
    padding: var(--normal) 0;
    border-bottom: 1px solid var(--input);
    position: relative;
    padding-left: 2rem;
    line-height: 1.5;
  }

  .feature-list li:last-child {
    border-bottom: none;
  }

  .feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--green-400);
    font-weight: bold;
    font-size: 1.1em;
  }

  .showcase-image {
    border-radius: var(--border-radius-large);
    overflow: visible;
    backdrop-filter: blur(10px);
    padding: 20px; /* Extra space for 3D effect */
    margin: -20px; /* Negative margin to maintain layout */
  }

  .showcase-image :global(img) {
    width: 100%;
    height: auto;
    display: block;
  }

  .section-title {
    font-size: var(--font-size-huge);
    font-weight: 800;
    font-family: var(--font-heading);
    text-align: center;
    margin: 0 0 calc(var(--huge) * 2.5) 0;
  }

  /* About section */
  .about-section {
    padding: 6rem 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .about-content {
    background: var(--card);
    border: 1px solid var(--input);
    border-radius: calc(var(--border-radius-large) * 1.5);
    padding: calc(var(--huge) * 2);
    backdrop-filter: blur(10px);
    text-align: center;
  }

  .about-text p {
    color: var(--light-400);
    line-height: 1.7;
    margin: 0 0 var(--huge) 0;
    font-size: var(--font-size-large);
  }

  .about-text strong {
    color: var(--text);
    background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .social-link {
    background: var(--card);
    border: 1px solid var(--input);
    border-radius: var(--border-radius-large);
    padding: 0.75rem var(--huge);
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .social-link:hover {
    background: var(--input);
    border-color: var(--primary-600);
    color: var(--text);
    transform: translateY(-2px);
  }

  /* Footer - Full width */
  .site-footer {
    background: var(--container);
    border-top: 1px solid var(--input);
    padding: var(--large) 0;
    margin-top: calc(var(--huge) * 2.5);
    backdrop-filter: blur(20px);
  }

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--large);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--placeholder);
  }

  .footer-link {
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .footer-link:hover {
    color: var(--primary-300);
  }

  /* Responsive design */
  @media (max-width: 768px) {

    .hero-content {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }

    .hero-left {
      order: 1;
    }

    .hero-right {
      order: 2;
    }

    .smart-download {
      flex-direction: column;
      width: 100%;
      align-items: stretch;
    }

    .primary-download-btn {
      border-radius: 12px 12px 0 0;
      justify-content: center;
      width: 100%;
      height: auto;
      min-height: 3.5rem;
    }

    .dropdown-toggle {
      border-radius: 0 0 12px 12px;
      border-left: none;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      width: 100%;
      height: auto;
      min-height: 3rem;
      padding: 0.75rem 1rem;
    }

    .dropdown-menu {
      left: 0;
      right: 0;
      min-width: auto;
      width: 100%;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .footer-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .about-content {
      padding: 2rem;
    }

    .social-links {
      flex-direction: column;
      gap: 0.5rem;
    }

    /* Showcase responsive design */
    .showcase-content {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }

    .showcase-item.reverse .showcase-content {
      direction: ltr;
    }

    .showcase-text {
      order: 1;
    }

    .showcase-image {
      order: 2;
    }

    .showcase-item.reverse .showcase-text {
      order: 1;
    }

    .showcase-item.reverse .showcase-image {
      order: 2;
    }

    .feature-list {
      text-align: left;
      max-width: 400px;
      margin: 0 auto;
    }
  }

  /* Respect user's reduced motion preference (set via JS attribute for broader support) */
  :root[data-reduced-motion='true'] .floating-element,
  :root[data-reduced-motion='true'] .primary-download-btn,
  :root[data-reduced-motion='true'] .primary-download-btn:hover,
  :root[data-reduced-motion='true'] .primary-download-btn:focus,
  :root[data-reduced-motion='true'] .dropdown-toggle svg,
  :root[data-reduced-motion='true'] .dropdown-menu,
  :root[data-reduced-motion='true'] .feature-card {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }

  /* Disable hover/active transforms for download button and images */
  :root[data-reduced-motion='true'] .primary-download-btn:hover {
    transform: none !important;
    box-shadow: none !important;
  }

  /* Keep base rotation but disable the hover movement/tilt when reduced-motion is on */
  :root[data-reduced-motion='true'] .floating-element:hover :global(img) {
    transform: rotateX(31deg) rotateZ(7deg) !important;
    box-shadow: none !important;
  }

  /* Native prefers-reduced-motion media query (preferred) */
  @media (prefers-reduced-motion: reduce) {
    .floating-element,
    .primary-download-btn,
    .primary-download-btn:hover,
    .primary-download-btn:focus,
    .dropdown-toggle svg,
    .dropdown-menu,
    .feature-card,
    .showcase-image {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }

    .primary-download-btn:hover {
      transform: none !important;
      box-shadow: none !important;
    }

    .floating-element:hover :global(img) {
      /* Preserve base rotation and prevent hover tilt/movement */
      transform: rotateX(31deg) rotateZ(7deg) !important;
      box-shadow: none !important;
    }
  }
</style>
// Kable Launcher - Shared Utilities

export interface Release {
  version: string;
  platforms: Record<string, { url: string; size: number; filename: string }>;
}

/**
 * Detects the user's platform based on user agent
 */
export function detectPlatform(): string {
  if (typeof window === 'undefined') return '';

  const ua = window.navigator.userAgent.toLowerCase();
  const platform = (window.navigator.platform || '').toLowerCase();

  // Prefer explicit mobile checks before generic "linux"
  if (ua.includes('android')) {
    return ua.includes('arm') || ua.includes('aarch64') ? 'linux-arm64' : 'linux-x64';
  }

  // iOS devices (iPhone/iPad/iPod)
  if (/\b(iphone|ipad|ipod)\b/.test(ua)) {
    return 'darwin-arm64';
  }

  // macOS desktops
  if (ua.includes('macintosh') || platform.includes('mac')) {
    return ua.includes('intel') ? 'darwin-x64' : 'darwin-arm64';
  }

  // Windows
  if (ua.includes('windows')) return 'windows-x64';

  // Generic Linux desktop
  if (ua.includes('linux')) {
    return ua.includes('arm') || ua.includes('aarch64') ? 'linux-arm64' : 'linux-x64';
  }

  return '';
}

/**
 * Returns human-readable label for platform key
 */
export function labelFor(platformKey: string): string {
  const labels: Record<string, string> = {
    'windows-x64': 'Windows',
    'darwin-arm64': 'macOS (Apple Silicon)',
    'darwin-x64': 'macOS (Intel)',
    'linux-x64': 'Linux (x64)',
    'linux-arm64': 'Linux (ARM64)'
  };
  return labels[platformKey] || platformKey;
}

/**
 * Checks if a filename is a signature file
 */
function isSignatureFile(name: string): boolean {
  return /\.sig$|\.asc$|signature|\.sha256$|\.sha512$/i.test(name);
}

/**
 * Fetches the latest release from GitHub
 */
export async function fetchLatestRelease(): Promise<Release | null> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/LuckyLuuk12/kable/releases/latest'
    );
    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();

    // Temporary map of platform -> asset candidates (non-signature)
    const candidates: Record<string, Array<any>> = {};

    // Parse assets into candidate lists, skipping signature files
    for (const asset of data.assets || []) {
      const name = (asset.name || '').toLowerCase();
      if (!name) continue;
      if (isSignatureFile(name)) continue;

      let platformKey = '';

      if (
        name.includes('windows') ||
        name.includes('.exe') ||
        name.includes('.msi') ||
        name.includes('win32') ||
        name.includes('win64') ||
        name.includes('x86_64-pc-windows')
      ) {
        platformKey = 'windows-x64';
      } else if (
        name.includes('darwin') ||
        name.includes('macos') ||
        name.includes('mac') ||
        name.includes('.dmg') ||
        name.includes('apple') ||
        name.includes('x86_64-apple-darwin') ||
        name.includes('aarch64-apple-darwin')
      ) {
        platformKey =
          name.includes('arm64') ||
            name.includes('aarch64') ||
            name.includes('apple-silicon')
            ? 'darwin-arm64'
            : 'darwin-x64';
      } else if (
        name.includes('linux') ||
        name.includes('.appimage') ||
        name.includes('.deb') ||
        name.includes('.rpm') ||
        name.includes('x86_64-unknown-linux') ||
        name.includes('gnu') ||
        name.includes('musl')
      ) {
        platformKey = 'linux-x64';
      }

      if (platformKey) {
        candidates[platformKey] = candidates[platformKey] || [];
        candidates[platformKey].push(asset);
      }
    }

    // Preference rules for each platform
    const priorities: Record<string, string[]> = {
      'windows-x64': ['msi$', 'exe$', 'zip$', 'x64', 'installer'],
      'darwin-arm64': ['\\.tar\\.gz$', '\\.dmg$', 'tar.gz$', 'zip$'],
      'darwin-x64': ['\\.tar\\.gz$', '\\.dmg$', 'tar.gz$', 'zip$'],
      'linux-x64': ['appimage', '\\.appimage$', '\\.deb$', '\\.tar\\.gz$', 'tar.xz$', 'zip$']
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

      // Fallback: choose the largest non-signature asset
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

    return {
      version: data.tag_name,
      platforms
    };
  } catch (err) {
    console.error('Error fetching release:', err);
    return null;
  }
}

/**
 * Gets the platform icon emoji
 */
export function getPlatformIcon(platformKey: string): string {
  if (platformKey.includes('windows')) return '🪟';
  if (platformKey.includes('darwin')) return '🍎';
  return '🐧';
}



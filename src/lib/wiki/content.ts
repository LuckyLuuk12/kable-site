export type WikiContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'feature-list'; features: Array<{ name: string; description: string }> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'note'; content: string; noteType?: 'info' | 'warning' | 'tip' };

export type WikiNode = {
  id: string;
  title: string;
  description?: string;
  paragraphs?: string[]; // Legacy support
  content?: WikiContentBlock[];
  children?: WikiNode[];
};

export const wikiContent: WikiNode[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Download and install Kable Launcher for your platform.",
    content: [
      {
        type: 'paragraph',
        content: "Welcome to Kable Launcher! This guide will walk you through the installation process for your operating system. Kable Launcher is a modern Minecraft launcher that makes managing multiple game versions, mods, and configurations simple and enjoyable."
      },
      {
        type: 'note',
        noteType: 'info',
        content: "First time using a custom launcher? Don't worry! Kable works just like the official Minecraft launcher, but with extra features to make your life easier."
      }
    ],
    children: [
      {
        id: "windows",
        title: "Windows Installation",
        description: "Step-by-step installation guide for Windows 10 and 11.",
        content: [
          {
            type: 'paragraph',
            content: "Installing Kable on Windows is straightforward using our MSI installer package. The installer handles everything automatically, from copying files to creating shortcuts."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Download the Installer",
                description: "Visit the <a href='/releases'>Releases page</a> and download the latest <code>.msi</code> file for Windows. Save it to a location you can easily find, like your Downloads folder."
              },
              {
                name: "Run the Installer",
                description: "Double-click the downloaded MSI file. The Windows installer wizard will guide you through the setup process. You can choose the installation location or use the default (Program Files)."
              },
              {
                name: "Handle Security Warnings",
                description: "Since Kable is not yet code-signed with a Microsoft certificate, Windows SmartScreen might show a warning. This is normal for new applications. Click 'More info' and then 'Run anyway' to proceed. Some antivirus software may also flag it—add Kable to your whitelist if needed."
              },
              {
                name: "Complete Installation",
                description: "The installer will create desktop and Start Menu shortcuts automatically. Once finished, launch Kable from either shortcut. The launcher will search for existing Minecraft installations in <code>%APPDATA%\\.minecraft</code>."
              }
            ]
          },
          {
            type: 'table',
            headers: ['Requirement', 'Minimum', 'Recommended'],
            rows: [
              ['Operating System', 'Windows 10 (64-bit)', 'Windows 11'],
              ['Java Version', 'Java 8 or newer', 'Java 25 or newer'],
              ['RAM', '2 GB available', '4 GB+ available'],
              ['Disk Space', '500 MB', '2 GB (with installations)']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Already have Minecraft installed? Kable will automatically detect your existing installations and make them available. Your worlds, resource packs, and settings are safe!"
          }
        ],
      },
      {
        id: "linux",
        title: "Linux Installation",
        description: "Installation guide for all major Linux distributions.",
        content: [
          {
            type: 'paragraph',
            content: "Kable Launcher supports all major Linux distributions through DEB packages and universal TAR.GZ archives. Choose the format that works best for your system."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Download for Your Distribution",
                description: "Visit the <a href='/releases'>Releases page</a>. For Debian/Ubuntu-based systems, download the <code>.deb</code> file. For other distributions (Fedora, Arch, etc.), download the <code>.tar.gz</code> archive."
              },
              {
                name: "Install DEB Package (Debian/Ubuntu)",
                description: "Open a terminal and navigate to your download directory. Run <code>sudo dpkg -i kable-launcher.deb</code> to install. Alternatively, double-click the file to install using your graphical package manager (like Software Center)."
              },
              {
                name: "Install TAR.GZ Archive (Other Distros)",
                description: "Extract the archive to your preferred location (e.g., <code>/opt/</code> or <code>~/.local/</code>). Run <code>chmod +x kable-launcher</code> to make it executable. You can create a desktop shortcut manually or run it from the terminal."
              },
              {
                name: "Launch and Configure",
                description: "Run Kable from your applications menu or terminal. The launcher integrates with your system's file manager and theme for a native Linux experience."
              }
            ]
          },
          {
            type: 'table',
            headers: ['Distribution', 'Package Type', 'Installation Command'],
            rows: [
              ['Ubuntu/Debian', '.deb', 'sudo dpkg -i kable-launcher.deb'],
              ['Fedora/RHEL', '.tar.gz', 'Extract and chmod +x'],
              ['Arch Linux', '.tar.gz', 'Extract and chmod +x'],
              ['openSUSE', '.tar.gz', 'Extract and chmod +x']
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Make sure you have Java installed! Most Linux distributions don't include Java by default. Install OpenJDK using your package manager: <code>sudo apt install openjdk-25-jre</code> (Ubuntu) or <code>sudo dnf install java-25-openjdk</code> (Fedora). For older Minecraft versions, you may also need Java 8 or 17."
          }
        ],
      },
      {
        id: "macos",
        title: "macOS Installation",
        description: "Installation guide for macOS Catalina (10.15) and newer.",
        content: [
          {
            type: 'paragraph',
            content: "Kable Launcher provides a native macOS experience through our DMG installer. The installation process follows standard macOS conventions."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Download the DMG",
                description: "Visit the <a href='/releases'>Releases page</a> and download the <code>.dmg</code> file for macOS. The file is compatible with both Intel and Apple Silicon Macs."
              },
              {
                name: "Install the Application",
                description: "Double-click the downloaded DMG file to mount it. A window will open showing the Kable Launcher icon. Drag the app icon to your Applications folder to install it."
              },
              {
                name: "Handle Gatekeeper",
                description: "macOS Gatekeeper will block the first launch because Kable is not signed with an Apple Developer certificate. Right-click (or Control-click) the Kable app in Applications, select 'Open', and confirm that you want to open it. You only need to do this once."
              },
              {
                name: "Launch and Enjoy",
                description: "After the first launch, you can open Kable normally from your Applications folder or Launchpad. The launcher provides full macOS integration including native menus and keyboard shortcuts."
              }
            ]
          },
          {
            type: 'table',
            headers: ['Requirement', 'Minimum', 'Recommended'],
            rows: [
              ['macOS Version', '10.15 (Catalina)', '12.0 (Monterey) or newer'],
              ['Architecture', 'Intel or Apple Silicon', 'Apple Silicon (M1/M2/M3)'],
              ['Java Version', 'Java 8 or newer', 'Java 25 or newer'],
              ['RAM', '2 GB available', '8 GB+ total system RAM']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Kable respects your system theme! If you use Dark Mode, Kable will automatically match. You can also override this in the Appearance settings."
          }
        ],
      },
    ],
  },

  {
    id: "settings",
    title: "Settings",
    description: "Customize every aspect of Kable Launcher to match your preferences.",
    content: [
      {
        type: 'paragraph',
        content: "The Settings panel is your control center for customizing Kable Launcher. All settings are automatically saved and persist across launcher restarts. Access settings by clicking the gear icon in the navigation sidebar."
      },
      {
        type: 'note',
        noteType: 'tip',
        content: "Settings are stored in JSON format and can be exported/imported for backup or sharing between computers. Look for the import/export buttons in the settings panel."
      }
    ],
    children: [
      {
        id: "general-settings",
        title: "General Settings",
        description: "Core launcher behavior and game launch options.",
        content: [
          {
            type: 'paragraph',
            content: "These settings control the fundamental behavior of Kable Launcher, including Java configuration, file paths, update behavior, and what happens when you launch, close, or crash Minecraft."
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>java_path</code>', '<span class="type-badge type-string">String</span> (path)', 'Auto-detect', 'Path to Java executable. Leave empty for auto-detection. Required: Java 8+ for old versions, Java 25+ for modern Minecraft.'],
              ['<code>game_directory</code>', '<span class="type-badge type-string">String</span> (path)', 'Auto-detect', 'Root directory for Minecraft files. Each installation can override this. Default: <code>%APPDATA%\\.minecraft</code> (Windows).'],
              ['<code>auto_update_launcher</code>', '<span class="type-badge type-boolean">Boolean</span>', 'true', 'Automatically check for and download launcher updates. Requires <code>update_mode</code> to control when updates apply.'],
              ['<code>update_mode</code>', '<span class="type-badge type-enum">Enum</span>', 'on_confirm', '<strong>instant</strong>: Apply immediately | <strong>on_restart</strong>: Next launch | <strong>on_confirm</strong>: Ask user each time'],
              ['<code>on_game_launch</code>', '<span class="type-badge type-enum">Enum</span>', 'open_logs', 'Action when starting Minecraft: <strong>keep_open</strong> | <strong>exit</strong> | <strong>minimize</strong> | <strong>open_logs</strong> | <strong>ask</strong>'],
              ['<code>on_game_close</code>', '<span class="type-badge type-enum">Enum</span>', 'open_home', 'Action when Minecraft closes normally: <strong>open_logs</strong> | <strong>open_home</strong> | <strong>exit</strong> | <strong>minimize</strong> | <strong>ask</strong>'],
              ['<code>on_game_crash</code>', '<span class="type-badge type-enum">Enum</span>', 'open_logs', 'Action when Minecraft crashes: <strong>restart</strong> | <strong>open_logs</strong> | <strong>open_home</strong> | <strong>exit</strong> | <strong>minimize</strong> | <strong>ask</strong>'],
              ['<code>show_ads</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Display advertisements in the launcher. Ads support development while keeping Kable free.']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "The <code>ask</code> option for launch behaviors will prompt you each time, perfect for users who want flexibility based on context."
          }
        ],
      },
      {
        id: "appearance-settings",
        title: "Appearance Settings",
        description: "Customize the visual theme, language, and UI layout.",
        content: [
          {
            type: 'paragraph',
            content: "Make Kable look exactly how you want. These settings control colors, spacing, sidebar width, icons, and more. Changes apply instantly without restarting the launcher."
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>theme</code>', '<span class="type-badge type-enum">Enum</span>', 'dark', '<strong>light</strong> | <strong>dark</strong> | <strong>system</strong> (matches OS theme)'],
              ['<code>selected_css_theme</code>', '<span class="type-badge type-string">String</span>', 'default', 'Name of active CSS theme file. Use "default" for built-in theme or specify custom CSS filename.'],
              ['<code>language</code>', '<span class="type-badge type-string">String</span>', 'en', 'Interface language code (e.g., "en", "de", "fr", "es"). Contribute translations on GitHub!'],
              ['<code>extra_spacing</code>', '<span class="type-badge type-number">Number</span>', '0', 'Additional UI padding in pixels. Increase for touch-friendly spacing, decrease for compact layouts. Range: -10 to 50.'],
              ['<code>sidebar_width</code>', '<span class="type-badge type-number">Number</span>', '250', 'Navigation sidebar width in pixels. Wider shows full names, narrower saves space. Range: 150-400.'],
              ['<code>selected_icon_template</code>', '<span class="type-badge type-string">String</span>', 'emoji', 'Icon pack name for installation icons. "emoji" is built-in, others can be downloaded.'],
              ['<code>icon_settings</code>', '<span class="type-badge type-object">JSON Object</span>', '{}', 'Advanced JSON configuration for icon appearance. Edit directly for pixel-perfect customization.']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Community themes and icon packs can be found on GitHub. Drop CSS files into the themes folder and icon zips into the icons folder!"
          }
        ],
      },
      {
        id: "sound-settings",
        title: "Sound Settings",
        description: "Configure audio levels for UI sounds and music.",
        content: [
          {
            type: 'paragraph',
            content: "Kable features a rich audio experience with UI sound effects and background music. All sound settings are nested under <code>appearance.sound</code> in the configuration."
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>enabled</code>', '<span class="type-badge type-boolean">Boolean</span>', 'true', 'Master toggle for all UI sound effects. Music is controlled separately.'],
              ['<code>music_enabled</code>', '<span class="type-badge type-boolean">Boolean</span>', 'true', 'Enable or disable background music while using the launcher.'],
              ['<code>master_volume</code>', '<span class="type-badge type-number">Number</span>', '50', 'Overall volume for all launcher audio (0-100). Affects both sounds and music.'],
              ['<code>sound_volume</code>', '<span class="type-badge type-number">Number</span>', '50', 'Volume for UI sound effects only (0-100). Plays on button clicks, hovers, notifications.'],
              ['<code>music_volume</code>', '<span class="type-badge type-number">Number</span>', '50', 'Volume for background music only (0-100). Independent from sound effects.'],
              ['<code>selected_soundpack</code>', '<span class="type-badge type-string">String</span>', 'default', 'Name of active soundpack. "default" uses built-in sounds. Import custom packs as ZIP files.']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Create custom soundpacks by organizing audio files in the correct structure. Check the soundpacks folder for examples!"
          }
        ],
      },
      {
        id: "logging-settings",
        title: "Logging Settings",
        description: "Control log storage, display, and retention.",
        content: [
          {
            type: 'paragraph',
            content: "Logging settings determine how Kable saves, displays, and manages diagnostic logs. Essential for troubleshooting crashes or reporting bugs to developers."
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>show_logs_page_in_nav</code>', '<span class="type-badge type-boolean">Boolean</span>', 'true', 'Show the Logs page in sidebar navigation. Hide to declutter if you rarely use logs.'],
              ['<code>enable_persistent_logging</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Save logs to disk for later review. Stored in launcher data directory.'],
              ['<code>enable_log_compression</code>', '<span class="type-badge type-boolean">Boolean</span>', 'true', 'GZIP-compress old log files to save disk space. Compressed logs remain readable.'],
              ['<code>log_file_size_limit_mb</code>', '<span class="type-badge type-union">Number | "disabled"</span>', '10', 'Maximum log file size in MB before rotation. Set to "disabled" for unlimited.'],
              ['<code>log_retention_days</code>', '<span class="type-badge type-union">Number | "disabled"</span>', '30', 'Auto-delete logs older than this many days. "disabled" keeps logs forever.'],
              ['<code>merge_log_tabs</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Combine launcher and game logs into single view instead of separate tabs.'],
              ['<code>default_log_levels</code>', '<span class="type-badge type-array">Array&lt;String&gt;</span>', '["error"]', 'Visible log levels: <strong>debug</strong>, <strong>info</strong>, <strong>warn</strong>, <strong>error</strong>. Example: <code>["info", "warn", "error"]</code>'],
              ['<code>max_memory_logs</code>', '<span class="type-badge type-number">Number</span>', '5000', 'Maximum log entries kept in RAM. Higher = scroll further back but use more memory.'],
              ['<code>enable_dedupe</code>', '<span class="type-badge type-boolean">Boolean</span>', 'true', 'Remove consecutive duplicate log messages. Reduces spam from repeated errors.'],
              ['<code>dedupe_window_size</code>', '<span class="type-badge type-number">Number</span>', '50', 'Number of recent log entries to check for duplicates. Higher catches more but uses slightly more CPU.']
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Unlimited log retention can fill your disk over time! Set reasonable limits or periodically clean the logs folder manually."
          }
        ],
      },
      {
        id: "network-settings",
        title: "Network Settings",
        description: "Configure download behavior and connection parameters.",
        content: [
          {
            type: 'paragraph',
            content: "Network settings control how Kable downloads mods, resource packs, game files, and other content from the internet. Tune these for your connection speed."
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>parallel_downloads</code>', '<span class="type-badge type-number">Number</span>', '3', 'Number of simultaneous downloads. Fast connections: 6-8. Slow connections: 2-4. Range: 1-16.'],
              ['<code>connection_timeout</code>', '<span class="type-badge type-number">Number</span>', '30', 'Network request timeout in seconds. Increase for slow connections, decrease for faster failure detection.'],
              ['<code>download_speed_limit</code>', '<span class="type-badge type-union">Number | "unlimited"</span>', '"unlimited"', 'Bandwidth throttle in MB/s. Set a number to limit or "unlimited" for max speed.']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "If downloads fail frequently, try increasing <code>connection_timeout</code> to 60 seconds and reducing <code>parallel_downloads</code> to 2."
          }
        ],
      },
      {
        id: "content-settings",
        title: "Content Settings",
        description: "Manage world backups and per-installation folder modes.",
        content: [
          {
            type: 'paragraph',
            content: "Content settings control automatic world backups and whether to use shared or per-installation folders for mods and resource packs. These settings affect how content is organized on disk."
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>auto_backup_worlds</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Automatically create world backups before launching Minecraft. Backups stored in <code>backups/</code> folder.'],
              ['<code>max_world_backups</code>', '<span class="type-badge type-union">Number | "disabled"</span>', '5', 'Maximum backup copies per world. Oldest deleted when limit reached. "disabled" keeps all backups.'],
              ['<code>use_per_installation_mods_folder</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Each installation gets its own <code>mods/</code> folder instead of sharing the global one.'],
              ['<code>use_per_installation_resource_packs</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Each installation gets its own <code>resourcepacks/</code> folder instead of sharing the global one.']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Per-installation folders prevent mod conflicts but use more disk space. Shared folders save space but require manual mod management for different Minecraft versions."
          }
        ],
      },
      {
        id: "advanced-settings",
        title: "Advanced Settings",
        description: "Power user features, experimental options, and developer tools.",
        content: [
          {
            type: 'paragraph',
            content: "Advanced settings unlock experimental features, debugging tools, and fine-grained control over launcher internals. Only modify these if you know what you're doing!"
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>enable_experimental_features</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Enable beta/experimental functionality. May be unstable. Great for testing and providing feedback!'],
              ['<code>check_nightly_updates</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Check for pre-release nightly builds instead of stable releases. Get newest features first (with potential bugs).'],
              ['<code>default_memory</code>', '<span class="type-badge type-number">Number</span>', '2048', 'Default RAM allocation in MB for new installations. Can be overridden per-installation. Modern modpacks: 4096-8192 MB.'],
              ['<code>separate_logs_window</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Open game logs in separate window instead of integrated tab. Useful for multi-monitor setups.'],
              ['<code>auto_save_interval</code>', '<span class="type-badge type-number">Number</span>', '30', 'Auto-save launcher state every N seconds. 0 disables auto-save. Prevents data loss on crashes.'],
              ['<code>show_advanced_page</code>', '<span class="type-badge type-boolean">Boolean</span>', 'false', 'Show the Advanced page in sidebar navigation. Contains symlink management and debug tools.'],
              ['<code>extra</code>', '<span class="type-badge type-object">JSON Object</span>', '{}', 'Free-form JSON object for custom key-value pairs. Used by plugins and extensions.']
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Experimental features can break at any time! Always keep stable backups of your installations before enabling experimental mode."
          }
        ],
      },
      {
        id: "misc-settings",
        title: "Miscellaneous Settings",
        description: "Other settings that don't fit in main categories.",
        content: [
          {
            type: 'paragraph',
            content: "Miscellaneous settings control window chrome and authentication preferences. These are less commonly modified but still important for specific use cases."
          },
          {
            type: 'table',
            headers: ['Setting', 'Type', 'Default', 'Description'],
            rows: [
              ['<code>use_titlebar</code>', '<span class="type-badge type-boolean">Boolean</span>', 'true', 'Use native OS window titlebar. Disable for frameless window (custom titlebar). Tauri-specific setting.'],
              ['<code>auth_preference</code>', '<span class="type-badge type-enum">Enum</span>', 'code', '<strong>code</strong>: Browser-based OAuth flow | <strong>device_code</strong>: Device code flow for headless systems']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Device code authentication is useful for servers or systems without a browser. You'll get a code to enter on another device."
          }
        ],
      },
    ],
  },

  {
    id: "account",
    title: "Account / Profile",
    description: "Manage your Minecraft accounts and view your profile statistics.",
    content: [
      {
        type: 'paragraph',
        content: "Kable supports multiple Microsoft and Mojang accounts with seamless switching and automatic token management. Your credentials are stored securely and tokens are refreshed automatically in the background."
      },
      {
        type: 'note',
        noteType: 'info',
        content: "Migrating from Mojang to Microsoft? Kable supports both account types, but Microsoft accounts are required for Minecraft 1.19.3 and newer."
      }
    ],
    children: [
      {
        id: "account-management",
        title: "Account Management",
        content: [
          {
            type: 'paragraph',
            content: "Add, switch, and manage multiple accounts with ease. Kable handles all authentication complexity behind the scenes."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Microsoft Account Integration",
                description: "Secure OAuth2 authentication flow connects to Microsoft's official servers. Your password never touches Kable—authentication happens entirely in your browser."
              },
              {
                name: "Multi-Account Support",
                description: "Manage unlimited Microsoft or Mojang accounts simultaneously. Perfect for families sharing a computer or content creators with multiple accounts."
              },
              {
                name: "Quick Account Switcher",
                description: "Switch between accounts instantly without re-entering credentials. Tokens are cached securely and refreshed automatically when needed."
              },
              {
                name: "Automatic Token Refresh",
                description: "Background token renewal runs before tokens expire, ensuring seamless gameplay. No more authentication interruptions mid-session!"
              },
              {
                name: "Account Validation",
                description: "Verify account status and ownership anytime. Kable checks for valid licenses and warns if accounts need re-authentication."
              },
              {
                name: "Active Account Selection",
                description: "Set a default account for quick launches, or choose per-installation which account to use. Great for testing mods on different accounts."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Removing an account from Kable deletes its cached tokens but doesn't affect your Microsoft account. You can re-add it anytime."
          }
        ],
      },
      {
        id: "profile-statistics",
        title: "Profile Statistics",
        content: [
          {
            type: 'paragraph',
            content: "Track your Minecraft journey with comprehensive statistics across all installations and accounts."
          },
          {
            type: 'table',
            headers: ['Statistic', 'Description'],
            rows: [
              ['Total Playtime', 'Cumulative time spent playing across all installations, tracked per-account'],
              ['Installation Count', 'Number of managed installations with breakdown by version type (vanilla, modded, snapshot)'],
              ['Mod Count', 'Total installed mods across all installations with active/disabled split'],
              ['Resource Pack Count', 'Number of installed resource packs with resolution distribution'],
              ['Shader Count', 'Total shader packs with compatibility breakdown'],
              ['World Statistics', 'Number of worlds, total disk usage, favorite worlds, and game mode distribution'],
              ['Storage Usage', 'Detailed breakdown showing installations, mods, packs, shaders, worlds, and logs'],
              ['Recent Activity', 'Last 10 played installations with timestamps and session duration']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Click any statistic to drill down into detailed views. For example, clicking 'Mod Count' shows a list of all installed mods sorted by size or usage frequency."
          }
        ],
      },
    ],
  },

  {
    id: "home-screen",
    title: "Home Screen",
    description: "Your quick access hub for launching games and managing content.",
    content: [
      {
        type: 'paragraph',
        content: "The Home Screen is your command center, providing one-click access to recently played installations, curated content recommendations, and essential actions."
      },
      {
        type: 'note',
        noteType: 'tip',
        content: "Customize which widgets appear on your home screen in Appearance Settings. Hide what you don't use to reduce clutter!"
      }
    ],
    children: [
      {
        id: "quick-launch",
        title: "Quick Launch",
        content: [
          {
            type: 'paragraph',
            content: "Your most-played installations at your fingertips. Launch games with a single click and monitor launch progress in real-time."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Recently Played Grid",
                description: "Up to 8 most recent installations displayed with custom icons and metadata. Automatically sorted by last played timestamp."
              },
              {
                name: "One-Click Launch",
                description: "Click any installation card to start Minecraft immediately. No need to navigate to the Installations page for your favorites."
              },
              {
                name: "Launch Progress Indicator",
                description: "Real-time progress display shows verification, download, and launch stages. Visual feedback ensures you know exactly what's happening."
              },
              {
                name: "Quick RAM Adjustment",
                description: "Hover over an installation to reveal a memory slider. Adjust RAM allocation without opening settings—changes persist automatically."
              },
              {
                name: "Installation Thumbnails",
                description: "Visual icons make identification instant. Choose from emoji templates, upload custom images, or use auto-generated version icons."
              },
              {
                name: "Context Menu Actions",
                description: "Right-click installations for quick access to edit, duplicate, export, or delete. Keyboard shortcuts supported for power users."
              }
            ]
          }
        ],
      },
      {
        id: "featured-content",
        title: "Featured Content",
        content: [
          {
            type: 'paragraph',
            content: "Discover popular mods, stunning shaders, and beautiful resource packs curated by the community and updated regularly."
          },
          {
            type: 'table',
            headers: ['Widget', 'Content Source', 'Update Frequency'],
            rows: [
              ['Featured Mods', 'Modrinth trending + editor picks', 'Daily'],
              ['Featured Resource Packs', 'Most downloaded + community favorites', 'Weekly'],
              ['Featured Shaders', 'Performance + visual quality balance', 'Weekly'],
              ['Community Highlights', 'User submissions + popular uploads', 'Daily']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Featured content is filtered based on your installation versions. You'll only see mods and packs compatible with what you have installed."
          }
        ],
      },
      {
        id: "quick-actions",
        title: "Quick Actions",
        content: [
          {
            type: 'paragraph',
            content: "Essential actions accessible without navigating away from the home screen. Get things done faster!"
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "New Installation",
                description: "Large, prominent button opens the installation creation wizard. Choose vanilla, modded, or snapshot versions with guided setup."
              },
              {
                name: "Import Installation",
                description: "Quick access to import from .minecraft folders, Kable ZIP files, or other launcher formats. Drag-and-drop supported!"
              },
              {
                name: "Account Switcher Widget",
                description: "Change active account without leaving the home screen. Displays current account with avatar and quick dropdown selector."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Keyboard shortcut: Press <code>Ctrl+N</code> (or <code>Cmd+N</code> on macOS) to create a new installation from anywhere in the launcher."
          }
        ],
      },
    ],
  },

  {
    id: "installations",
    title: "Installations",
    description: "Create, manage, and configure your Minecraft installations.",
    content: [
      {
        type: 'paragraph',
        content: "Installations are the heart of Kable Launcher. Each installation is a complete, isolated Minecraft setup with its own version, mods, settings, resource packs, shaders, and configurations. Think of them as profiles, but more powerful."
      },
      {
        type: 'note',
        noteType: 'info',
        content: "New to installations? Start simple! Create a vanilla installation first to get familiar, then experiment with mods and different versions."
      }
    ],
    children: [
      {
        id: "installation-management",
        title: "Installation Management",
        content: [
          {
            type: 'paragraph',
            content: "Comprehensive tools for creating, editing, and organizing your Minecraft installations."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Create New Installation",
                description: "Guided wizard walks you through version selection, mod loader choice, and initial configuration. Setup takes under a minute for vanilla versions."
              },
              {
                name: "Version Selection",
                description: "Choose from vanilla releases, snapshots, old alpha/beta versions, or modded versions. Complete version history from Classic 0.0.11a to latest release."
              },
              {
                name: "Mod Loader Selection",
                description: "Automatic installation of Fabric, Forge, Quilt, NeoForge, OptiFine, or Iris. Compatible versions detected automatically based on Minecraft version."
              },
              {
                name: "Installation Editing",
                description: "Modify name, version, icon, settings, Java arguments, and game directory after creation. No need to recreate from scratch!"
              },
              {
                name: "Installation Duplication",
                description: "Clone installations with selective content copying. Choose to copy mods, configs, resource packs, shaders, or worlds independently."
              },
              {
                name: "Installation Export/Import",
                description: "Export as ZIP archives for sharing or backup. Import from Kable ZIPs, vanilla launcher folders, or other launchers."
              },
              {
                name: "Installation Statistics",
                description: "Track playtime, last played date, total disk usage, and mod/pack counts per-installation."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Name your installations descriptively! Use names like 'Vanilla 1.21', 'Modded - Create Mod', or 'Skyblock Server' to quickly identify them."
          }
        ],
      },
      {
        id: "adding-installations",
        title: "Adding Installations",
        content: [
          {
            type: 'paragraph',
            content: "Multiple ways to create installations: build from scratch in the app, import from existing .minecraft folders, or restore from Kable ZIP exports."
          }
        ],
        children: [
          {
            id: "new-from-app",
            title: "New from App",
            content: [
              {
                type: 'paragraph',
                content: "The standard way to create installations. Perfect control over every aspect from version to mod loader."
              },
              {
                type: 'feature-list',
                features: [
                  {
                    name: "Version Browser",
                    description: "Browse complete Minecraft version history: releases, snapshots, old alpha, old beta, and experimental versions. Filter by type and search by version number."
                  },
                  {
                    name: "Mod Loader Detection",
                    description: "Kable automatically shows compatible mod loaders for your selected version. Fabric, Forge, Quilt, and NeoForge versions fetched from official APIs."
                  },
                  {
                    name: "Quick Setup",
                    description: "Minimal configuration needed! Just pick a version and go. Defaults are sensible: 2GB RAM, auto-detected Java, standard resolution."
                  },
                  {
                    name: "Advanced Configuration",
                    description: "Customize Java arguments, game directory, window resolution, JVM memory, launcher visibility, and more before first launch."
                  },
                  {
                    name: "From Template",
                    description: "Clone an existing installation as a starting point. Selectively copy mods, configs, resource packs, or worlds—great for testing mod combinations."
                  }
                ]
              },
              {
                type: 'note',
                noteType: 'info',
                content: "Version manifest updates automatically on launch. If you don't see a brand new snapshot, click the refresh button in the version browser."
              }
            ],
          },
          {
            id: "from-minecraft-folder",
            title: "From .minecraft Folder",
            content: [
              {
                type: 'paragraph',
                content: "Migrate from the vanilla launcher or other launchers by importing existing .minecraft folders. All your content comes with you!"
              },
              {
                type: 'table',
                headers: ['Import Step', 'What Happens'],
                rows: [
                  ['Folder Selection', 'Browse and select .minecraft folder from anywhere on your system'],
                  ['Profile Detection', 'Kable scans launcher_profiles.json and identifies all vanilla profiles'],
                  ['Version Detection', 'Analyzes versions/ folder to identify installed Minecraft versions and mod loaders'],
                  ['Content Discovery', 'Scans mods/, resourcepacks/, shaderpacks/, and saves/ folders'],
                  ['Import Preview', 'Shows what will be imported with size estimates and conflict warnings'],
                  ['Selective Import', 'Choose which content to import: mods, packs, shaders, worlds, or settings']
                ]
              },
              {
                type: 'note',
                noteType: 'warning',
                content: "Importing doesn't delete the original .minecraft folder. Your vanilla launcher profiles remain untouched and functional."
              }
            ],
          },
          {
            id: "from-kable-zip",
            title: "Import from Kable ZIP",
            content: [
              {
                type: 'paragraph',
                content: "Restore installations exported from Kable or shared by other users. Perfect for modpack distribution or cross-computer syncing."
              },
              {
                type: 'feature-list',
                features: [
                  {
                    name: "ZIP Archive Import",
                    description: "Drag-and-drop or browse for .zip files. Kable validates the archive structure and shows installation metadata before importing."
                  },
                  {
                    name: "Metadata Preservation",
                    description: "All installation details preserved: name, icon, version, mod loader, Java settings, RAM allocation, and custom configurations."
                  },
                  {
                    name: "Complete Restoration",
                    description: "Full installation recreation including mods (with version hashes), resource packs, shaders, worlds, configs, and save files."
                  },
                  {
                    name: "Version Matching",
                    description: "Kable downloads the exact Minecraft version from Mojang's servers if not already cached. No manual version management!"
                  }
                ]
              },
              {
                type: 'note',
                noteType: 'tip',
                content: "Share your modpack setups with friends! Export an installation, send the ZIP, and they get an identical setup with one click."
              }
            ],
          },
        ],
      },
      {
        id: "installation-configuration",
        title: "Installation Configuration",
        content: [
          {
            type: 'paragraph',
            content: "Fine-tune every aspect of how Minecraft runs for each installation. All settings are per-installation and don't affect others."
          },
          {
            type: 'table',
            headers: ['Configuration', 'Description', 'Example Values'],
            rows: [
              ['Game Directory', 'Custom location for installation data. Leave empty to use global directory.', '<code>D:\\Games\\MC-Modded</code>'],
              ['JVM Memory (-Xms/-Xmx)', 'Minimum and maximum heap size for Java. Higher = better performance for modded.', '2048MB min, 8192MB max'],
              ['Custom JVM Arguments', 'Advanced Java flags for GC tuning, performance, and debugging.', '<code>-XX:+UseG1GC</code>'],
              ['Window Resolution', 'Default game window dimensions on launch.', '1920x1080, 2560x1440'],
              ['Java Version', 'Specific Java executable path. Auto-detect finds best match.', '<code>C:\\Java\\jdk-25</code>'],
              ['Mod Loader Version', 'Pin specific Fabric/Forge version for stability.', 'Fabric 0.15.3, Forge 49.0.3']
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Allocating too much RAM (over 12GB) can actually hurt performance due to garbage collection pauses. 4-8GB is ideal for most modpacks."
          }
        ],
      },
    ],
  },

  {
    id: "mods",
    title: "Mods",
    description: "Discover, install, and manage Minecraft mods.",
    content: [
      {
        type: 'paragraph',
        content: "Kable's mod management system makes installing, organizing, and troubleshooting mods effortless. Browse thousands of mods from Modrinth, manage dependencies automatically, and detect conflicts before they cause crashes."
      },
      {
        type: 'note',
        noteType: 'info',
        content: "New to modding? Start with simple mods like JEI (Just Enough Items) or Sodium for performance. Avoid installing too many mods at once—add a few, test, then add more!"
      }
    ],
    children: [
      {
        id: "mod-manager",
        title: "Mods Manager (Installed)",
        content: [
          {
            type: 'paragraph',
            content: "Your installed mods dashboard. View, enable/disable, update, and troubleshoot mods all in one place."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Per-Installation Mod Lists",
                description: "Each installation has its own mod collection. Switch between installations to see different mod lists—no confusion, no conflicts."
              },
              {
                name: "Rich Mod Information",
                description: "See mod name, version, author, description, file size, and dependencies. Hover for full descriptions and links to mod pages."
              },
              {
                name: "Enable/Disable Toggle",
                description: "Quickly test without mods by toggling them off. Disabled mods move to <code>disabled/</code> folder and won't load. Perfect for troubleshooting crashes."
              },
              {
                name: "Conflict Detection",
                description: "Kable automatically identifies incompatible mod combinations based on known issues and version mismatches. Warnings appear with suggested fixes."
              },
              {
                name: "Dependency Resolution",
                description: "Missing dependencies highlighted with one-click install buttons. Kable downloads required libraries automatically from Modrinth."
              },
              {
                name: "Mod Metadata Parsing",
                description: "Automatic extraction from <code>fabric.mod.json</code>, <code>mods.toml</code> (Forge), and <code>quilt.mod.json</code>. No manual metadata entry needed!"
              },
              {
                name: "Update Indicators",
                description: "Badge indicators show when newer mod versions are available. Click to view changelog and update with one click."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Right-click any mod for quick actions: open in file explorer, view on Modrinth, check dependencies, or copy mod ID to clipboard."
          }
        ],
      },
      {
        id: "mod-browser",
        title: "Mod Browser",
        content: [
          {
            type: 'paragraph',
            content: "Discover and install mods directly from Modrinth without leaving the launcher. Search, filter, and download with automatic dependency handling."
          },
          {
            type: 'table',
            headers: ['Feature', 'Description'],
            rows: [
              ['Modrinth Integration', 'Official API integration for reliable, fast mod downloads from Modrinth\'s CDN'],
              ['Search', 'Search by mod name, author, or tags. Supports fuzzy matching for typo tolerance'],
              ['Category Filters', 'Filter by type: Technology, Magic, Utility, Adventure, Decoration, Food, Optimization, Library, and more'],
              ['Version Compatibility', 'Shows only mods compatible with your installation\'s Minecraft version. No manual checking needed!'],
              ['Mod Loader Filtering', 'Fabric, Forge, Quilt, or NeoForge. Incompatible loaders automatically hidden'],
              ['Mod Details View', 'Full description, screenshots, changelog, gallery, dependencies, and version history'],
              ['Download Statistics', 'See download counts, popularity rankings, and update frequency to judge mod quality'],
              ['One-Click Install', 'Download and install with dependencies in one click. Progress tracked in real-time'],
              ['Version Selection', 'Choose specific mod versions for compatibility or rollback to older releases']
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Always read mod descriptions and requirements! Some mods require specific configurations or are incompatible with others."
          }
        ],
      },
    ],
  },

  {
    id: "resourcepacks",
    title: "Resource Packs",
    description: "Customize Minecraft's textures and sounds with resource packs.",
    content: [
      {
        type: 'paragraph',
        content: "Transform Minecraft's visual and audio experience with resource packs. Change textures, models, sounds, music, fonts, and more without modifying game code."
      },
      {
        type: 'note',
        noteType: 'tip',
        content: "Resource packs can be layered! Higher packs in the list override lower ones, letting you mix textures from multiple packs."
      }
    ],
    children: [
      {
        id: "rp-manager",
        title: "Resource Packs Manager (Installed)",
        content: [
          {
            type: 'paragraph',
            content: "Manage installed resource packs with drag-and-drop ordering, preview thumbnails, and instant enable/disable toggles."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Per-Installation & Global Packs",
                description: "Choose whether packs are installation-specific or shared globally. Global packs save disk space, per-installation packs prevent conflicts."
              },
              {
                name: "Pack Ordering",
                description: "Drag packs to reorder priority. Top packs override bottom packs—perfect for combining textures from multiple packs."
              },
              {
                name: "Pack Information",
                description: "View name, version, pack format, resolution (16x, 32x, 64x, etc.), file size, and compatibility with your Minecraft version."
              },
              {
                name: "Pack Preview Thumbnails",
                description: "Visual previews extracted from <code>pack.png</code> for instant identification. No more guessing which pack is which!"
              },
              {
                name: "Enable/Disable Toggle",
                description: "Test packs individually by toggling them on/off. Disabled packs moved to <code>disabled/</code> folder automatically."
              },
              {
                name: "Resolution Detection",
                description: "Automatically detect pack resolution and warn if your GPU may struggle with high-res textures (512x+)."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "High-resolution packs (128x and above) require significantly more VRAM. Use 64x or lower on systems with less than 4GB VRAM."
          }
        ],
      },
      {
        id: "rp-browser",
        title: "Resource Pack Browser",
        content: [
          {
            type: 'paragraph',
            content: "Browse and download resource packs from Modrinth with advanced filtering by resolution, style, and version compatibility."
          },
          {
            type: 'table',
            headers: ['Filter', 'Options'],
            rows: [
              ['Resolution', '16x (Vanilla+), 32x, 64x, 128x, 256x, 512x, 1024x'],
              ['Style', 'Realistic, Cartoon, Medieval, Modern, Sci-Fi, Fantasy, Pixel Art'],
              ['Content Type', 'Textures Only, Sounds Only, Models, Complete Overhaul'],
              ['Minecraft Version', 'Automatic filtering based on your installation version'],
              ['Pack Format', 'Latest format versions with backward compatibility indicators']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Most resource packs work across multiple Minecraft versions! Pack format changes are rare, so a 1.19 pack often works fine in 1.21."
          }
        ],
      },
    ],
  },

  {
    id: "shaders",
    title: "Shaders",
    description: "Enhance Minecraft's graphics with shader packs.",
    content: [
      {
        type: 'paragraph',
        content: "Shader packs transform Minecraft's visuals with realistic lighting, shadows, water reflections, and atmospheric effects. Powered by Iris (Fabric) or OptiFine (Forge)."
      },
      {
        type: 'note',
        noteType: 'warning',
        content: "Shaders require Iris or OptiFine to be installed! Install the appropriate mod loader first, then add your shader pack."
      }
    ],
    children: [
      {
        id: "shader-manager",
        title: "Shaders Manager (Installed)",
        content: [
          {
            type: 'paragraph',
            content: "Manage shader packs with automatic compatibility detection and performance profiling."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Iris/OptiFine Detection",
                description: "Kable automatically detects which shader mod is installed and shows compatible shaders. Warns if neither Iris nor OptiFine is present."
              },
              {
                name: "Shader Information",
                description: "View shader name, version, author, description, and performance profile (High/Medium/Low impact)."
              },
              {
                name: "Performance Profiling",
                description: "Kable estimates FPS impact based on shader features. High-end shaders marked with warning for low-spec systems."
              },
              {
                name: "Shader Configuration Access",
                description: "Quick links to shader settings files for advanced tweaking. Edit directly or use in-game shader settings."
              },
              {
                name: "Per-Installation & Global Modes",
                description: "Install to specific installation or make globally available. Great for testing shaders across different Minecraft versions."
              },
              {
                name: "Shader Preview Screenshots",
                description: "Visual previews show lighting, water, and atmosphere effects so you know what to expect before enabling."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Start with lightweight shaders like Sildur's Enhanced Default or BSL if you have a mid-range GPU. SEUS PTGI is gorgeous but requires high-end hardware!"
          }
        ],
      },
      {
        id: "shader-browser",
        title: "Shader Browser",
        content: [
          {
            type: 'paragraph',
            content: "Browse popular shader packs from Modrinth with filtering by performance impact and visual style."
          },
          {
            type: 'table',
            headers: ['Performance Level', 'Description', 'Popular Shaders'],
            rows: [
              ['Low Impact', 'Subtle improvements, 60+ FPS on most systems', 'Vanilla Plus, Sildur\'s Enhanced Default'],
              ['Medium Impact', 'Balanced visuals and performance, 40-60 FPS', 'BSL, Complementary, MakeUp Ultra Fast'],
              ['High Impact', 'Stunning graphics, requires powerful GPU (30-60 FPS)', 'Complementary Reimagined, Continuum'],
              ['Ultra Impact', 'Photorealistic, ray-traced (RTX/high-end GPU needed)', 'SEUS PTGI, Continuum RT']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Shader performance varies by scene complexity! Dense forests and underwater areas are more demanding than plains or deserts."
          }
        ],
      },
    ],
  },

  {
    id: "worlds",
    title: "Worlds (Maps)",
    description: "Manage your Minecraft worlds and saves.",
    content: [
      {
        type: 'paragraph',
        content: "Centralized world management across all installations. View, backup, import, export, and organize your Minecraft worlds from one convenient dashboard."
      },
      {
        type: 'note',
        noteType: 'tip',
        content: "Enable auto-backups in Content Settings to automatically save world copies before each launch. Protects against corruption and accidental deletions!"
      }
    ],
    children: [
      {
        id: "world-management",
        title: "World Management",
        content: [
          {
            type: 'paragraph',
            content: "Comprehensive world browser with search, filtering, backup/restore, and cross-installation world transfer."
          },
          {
            type: 'table',
            headers: ['Feature', 'Description'],
            rows: [
              ['Multi-Installation Detection', 'Automatically scans all installation saves/ folders and aggregates worlds in one list'],
              ['World Information', 'Name, game mode, difficulty, last played date, Minecraft version, seed, file size'],
              ['Game Mode Detection', 'Icons and badges for Survival, Creative, Adventure, Spectator, and Hardcore'],
              ['Search & Filter', 'Search by world name, filter by game mode, sort by name/date/size'],
              ['World Backup (Export)', 'Create ZIP archives of worlds for safekeeping or sharing. Includes level.dat and all region files'],
              ['World Import', 'Import from ZIP files, other launchers, or manual world folders. Validates structure before importing'],
              ['World Transfer', 'Copy/move worlds between installations with one click. Automatic version compatibility checking'],
              ['Favorite Worlds', 'Star your favorite worlds for quick filtering and priority sorting'],
              ['World Statistics', 'Total world count, cumulative size, playtime per-world (if tracked)'],
              ['Directory Access', 'Open world folder directly in file explorer for manual editing or backup']
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Moving worlds between major Minecraft versions (e.g., 1.12 → 1.21) may cause issues. Always backup before upgrading world versions!"
          }
        ],
      },
    ],
  },

  {
    id: "skins",
    title: "Skins",
    description: "Customize your Minecraft character appearance.",
    content: [
      {
        type: 'paragraph',
        content: "Upload, manage, and preview your Minecraft skins with an interactive 3D viewer. Support for both Steve (classic) and Alex (slim) models."
      },
      {
        type: 'note',
        noteType: 'info',
        content: "Skin changes upload directly to Mojang's servers, so your skin appears in all launchers and on multiplayer servers automatically!"
      }
    ],
    children: [
      {
        id: "skin-selection",
        title: "Skin Selection",
        content: [
          {
            type: 'paragraph',
            content: "Full-featured skin manager with 3D preview, model selection, and upload/download functionality."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Interactive 3D Preview",
                description: "Real-time 3D skin viewer with mouse/touch rotation controls. See your skin from every angle before uploading."
              },
              {
                name: "Model Selection",
                description: "Choose between Steve (classic 4px arms) or Alex (slim 3px arms) models. Preview updates instantly to show the difference."
              },
              {
                name: "Skin Upload",
                description: "Upload custom skins from PNG files (64x64 or 64x32 formats). Automatic validation ensures correct dimensions and format."
              },
              {
                name: "Skin Download",
                description: "Download your current skin as PNG for editing in external tools. Perfect for making small tweaks and re-uploading."
              },
              {
                name: "Recent Skins History",
                description: "Keep a history of previously used skins for quick switching. No need to re-upload skins you've used before!"
              },
              {
                name: "Skin Library",
                description: "Save favorite skins to a personal library. Organize by category and apply with one click."
              },
              {
                name: "Reset to Default",
                description: "Restore to the default Steve or Alex skin anytime. Useful for troubleshooting or returning to vanilla appearance."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Create skins using free tools like Skindex, Minecraft Skin Editor, or Novaskin. Import PNGs directly into Kable!"
          }
        ],
      },
      {
        id: "skin-editor",
        title: "Skin Editor (Planned)",
        content: [
          {
            type: 'paragraph',
            content: "In-app skin editor coming soon! Edit skins without external tools, right inside Kable Launcher."
          },
          {
            type: 'table',
            headers: ['Planned Feature', 'Description'],
            rows: [
              ['Layer-Based Editing', 'Edit head, body, arms, legs independently with layer visibility toggles'],
              ['Color Picker', 'Advanced HSL color picker with palette saving and color history'],
              ['Brush Tools', 'Pencil, fill bucket, eraser, eyedropper, and selection tools'],
              ['Template Library', 'Pre-made skin templates to start from (casual, medieval, fantasy, etc.)'],
              ['Import/Export', 'Load existing skins, edit, and save as new files']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Vote for this feature on GitHub! Community feedback helps prioritize development."
          }
        ],
      },
    ],
  },

  {
    id: "logs",
    title: "Logs",
    description: "View and manage launcher and game logs for troubleshooting.",
    content: [
      {
        type: 'paragraph',
        content: "Comprehensive logging system with real-time streaming, filtering, search, and export capabilities. Essential for troubleshooting crashes, bugs, and performance issues."
      },
      {
        type: 'note',
        noteType: 'tip',
        content: "When reporting bugs, always include logs! Use the Export button to save logs as text files for sharing on GitHub or Discord."
      }
    ],
    children: [
      {
        id: "launcher-logs",
        title: "Launcher Logs",
        content: [
          {
            type: 'paragraph',
            content: "Monitor Kable Launcher's internal operations, API calls, file operations, and errors."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Real-Time Streaming",
                description: "Logs appear instantly as events occur. Watch downloads, authentications, and file operations happen live."
              },
              {
                name: "Log Level Filtering",
                description: "Filter by DEBUG (verbose), INFO (normal), WARN (potential issues), or ERROR (critical problems). Hide noise, see what matters."
              },
              {
                name: "Search with Regex",
                description: "Search logs with plain text, regular expressions, or fuzzy matching. Find specific errors or patterns quickly."
              },
              {
                name: "Auto-Scroll Toggle",
                description: "Auto-scroll to latest entries (on by default). Disable to read historical logs without jumping to bottom."
              },
              {
                name: "Virtual Scrolling",
                description: "Handles thousands of log lines without performance degradation. Smooth scrolling even with 10,000+ entries."
              },
              {
                name: "Export Functionality",
                description: "Copy logs to clipboard or save to file (.txt or .log). Includes timestamps and log levels for context."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Enable persistent logging in Settings to save logs to disk. Great for tracking down intermittent issues that don't happen every launch."
          }
        ],
      },
      {
        id: "game-logs",
        title: "Game Logs",
        content: [
          {
            type: 'paragraph',
            content: "Capture and display Minecraft's console output (STDOUT/STDERR) with crash detection and error highlighting."
          },
          {
            type: 'table',
            headers: ['Feature', 'Description'],
            rows: [
              ['Per-Instance Logs', 'Separate log tabs for each running Minecraft instance. Perfect for testing multiple versions simultaneously'],
              ['Output Capture', 'Real-time capture of game console output with line buffering for accuracy'],
              ['Crash Detection', 'Automatically identifies crash reports and highlights them with red badges'],
              ['Error Highlighting', 'Errors and warnings color-coded for quick visual scanning'],
              ['Log Parsing', 'Formatted display of Minecraft log entries with timestamp extraction'],
              ['Exit Code Display', 'Shows process exit codes (0 = success, non-zero = crash/error)'],
              ['Multi-Instance Support', 'Run and monitor logs from multiple Minecraft instances at once']
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Minecraft crash logs are also saved to <code>crash-reports/</code> in your game directory. Kable displays them, but files persist separately."
          }
        ],
      },
      {
        id: "log-management",
        title: "Log Management",
        content: [
          {
            type: 'paragraph',
            content: "Control how logs are stored, compressed, and cleaned up to save disk space and maintain performance."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Log Compression",
                description: "GZIP compression reduces log file size by 80-90%. Compressed logs remain searchable and readable."
              },
              {
                name: "Retention Policies",
                description: "Auto-delete logs older than N days or when size exceeds limit. Configurable in Logging Settings."
              },
              {
                name: "Log Deduplication",
                description: "Collapses consecutive duplicate entries (e.g., '100 lines hidden'). Reduces noise from repeated errors."
              },
              {
                name: "Memory-Efficient Mode",
                description: "Limits in-memory log buffer to prevent RAM usage from growing indefinitely during long sessions."
              },
              {
                name: "Directory Access",
                description: "Open logs folder in file explorer for manual access, archiving, or sharing entire log histories."
              },
              {
                name: "Merged View Option",
                description: "Combine launcher and game logs into single chronological view. Perfect for correlating launcher actions with game events."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Set <code>max_memory_logs</code> to 10,000+ if you frequently scroll through long log histories. Lower it to 1,000-2,000 on systems with limited RAM."
          }
        ],
      },
    ],
  },

  {
    id: "advanced",
    title: "Advanced",
    description: "Advanced features for power users and developers.",
    content: [
      {
        type: 'paragraph',
        content: "Power user tools for symlink management, system diagnostics, debugging, Discord integration, and update control. These features are hidden by default—enable 'Show Advanced Page' in Settings to access them."
      },
      {
        type: 'note',
        noteType: 'warning',
        content: "Advanced features can affect launcher stability if misused. Only modify settings if you understand their impact!"
      }
    ],
    children: [
      {
        id: "symlink-management",
        title: "Symlink Management",
        content: [
          {
            type: 'paragraph',
            content: "Create and manage symbolic links for sharing mods, resource packs, and shaders between installations or linking to external folders."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Create Symlinks",
                description: "Link content folders to external locations. Perfect for syncing mods via Dropbox or pointing to a network drive."
              },
              {
                name: "Per-Installation & Global Links",
                description: "Create symlinks for specific installations or globally for all. Link <code>mods/</code> to a shared folder to save disk space."
              },
              {
                name: "Symlink Validation",
                description: "Automatic checking for broken links (target deleted/moved). Warnings appear with one-click fix options."
              },
              {
                name: "Toggle Symlinks",
                description: "Enable or disable symlinks without deleting them. Useful for temporarily using local content instead of linked."
              },
              {
                name: "Path Display",
                description: "Full source and destination paths shown with copy-to-clipboard buttons. Verify links point to correct locations."
              },
              {
                name: "Auto-Refresh",
                description: "Symlinks automatically update when installations change. No manual re-linking needed when moving game directories."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Symlinks require administrator privileges on Windows. Kable will prompt for elevation when creating links."
          }
        ],
      },
      {
        id: "system-information",
        title: "System Information",
        content: [
          {
            type: 'paragraph',
            content: "View system specs, installed Java versions, and real-time resource monitoring."
          },
          {
            type: 'table',
            headers: ['Information', 'Details'],
            rows: [
              ['Java Detection', 'Lists all installed JDKs/JREs with version numbers and installation paths'],
              ['Java Auto-Detection', 'Scans common installation directories (Program Files, JAVA_HOME, PATH)'],
              ['System Resources', 'Real-time RAM usage, CPU load, and disk space for all drives'],
              ['Platform Information', 'OS name, version, architecture (x64/ARM64), hostname'],
              ['Launcher Version', 'Current version, build date, and update channel (stable/nightly)']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Use system info when troubleshooting! Share OS version, Java version, and RAM info when reporting issues on GitHub."
          }
        ],
      },
      {
        id: "debug-tools",
        title: "Debug Tools",
        content: [
          {
            type: 'paragraph',
            content: "Developer-focused tools for troubleshooting, cache management, and network diagnostics."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Developer Mode",
                description: "Enable verbose logging, show all API responses, and display hidden debug UI elements. Logs every network request and file operation."
              },
              {
                name: "API Endpoint Testing",
                description: "Test connectivity to Mojang, Microsoft, and Modrinth APIs. Diagnose authentication failures and network issues."
              },
              {
                name: "Cache Management",
                description: "Clear version manifests, mod metadata, texture caches, or all caches. Fixes corruption issues and frees disk space."
              },
              {
                name: "Configuration Reset",
                description: "Reset all settings to defaults without uninstalling. Useful for recovering from misconfiguration."
              },
              {
                name: "Database Access",
                description: "View and modify launcher's internal SQLite database. Advanced users only—incorrect edits can break the launcher!"
              },
              {
                name: "Network Request Logging",
                description: "Monitor all HTTP/HTTPS requests with headers, payloads, and response codes. Debug download failures and API errors."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'warning',
            content: "Modifying the database directly can corrupt your installations! Always backup <code>launcher.db</code> before editing."
          }
        ],
      },
      {
        id: "discord-integration",
        title: "Discord Integration",
        content: [
          {
            type: 'paragraph',
            content: "Show your Minecraft activity in Discord with Rich Presence integration."
          },
          {
            type: 'table',
            headers: ['Display Element', 'What It Shows'],
            rows: [
              ['Status', 'Playing Minecraft via Kable Launcher'],
              ['Installation Name', 'Currently running installation (e.g., "Modded 1.21 - Create Mod")'],
              ['Mod Count', 'Number of active mods (e.g., "67 mods active")'],
              ['Session Time', 'Elapsed playtime for current session'],
              ['Launcher Icon', 'Kable Launcher logo as activity icon']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Privacy controls let you disable Rich Presence entirely or hide specific information like mod counts. Configure in Appearance Settings."
          }
        ],
      },
      {
        id: "update-management",
        title: "Update Management",
        content: [
          {
            type: 'paragraph',
            content: "Control when and how Kable Launcher updates itself."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Manual & Automatic Checking",
                description: "Check for updates on-demand or automatically on launch. Configure in General Settings."
              },
              {
                name: "Release Channels",
                description: "Choose stable releases (recommended) or nightly builds (cutting-edge features, potential bugs)."
              },
              {
                name: "In-App Updates",
                description: "Download updates directly in the launcher with progress indication. No manual download needed!"
              },
              {
                name: "Update Modes",
                description: "Install updates instantly, on next restart, or prompt each time. Controlled by <code>update_mode</code> setting."
              },
              {
                name: "Release Notes",
                description: "View detailed changelog for available updates. See what's new, what's fixed, and breaking changes."
              },
              {
                name: "Version Comparison",
                description: "Visual diff showing features added/changed between your version and latest release."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Stable releases are thoroughly tested. Only use nightly builds if you want to help test new features and report bugs!"
          }
        ],
      },
    ],
  },

  {
    id: "additional-features",
    title: "Additional Features",
    description: "More features that make Kable powerful and user-friendly.",
    content: [
      {
        type: 'paragraph',
        content: "Beyond the core features, Kable includes thoughtful touches that improve your Minecraft experience: import/export for sharing, performance optimizations for speed, and strong privacy protections."
      }
    ],
    children: [
      {
        id: "import-export",
        title: "Import/Export",
        content: [
          {
            type: 'paragraph',
            content: "Share installations, backup configurations, and sync setups between computers with comprehensive import/export tools."
          },
          {
            type: 'table',
            headers: ['Export Type', 'What\'s Included', 'Use Case'],
            rows: [
              ['Installation Export', 'Complete installation: version, mods, configs, packs, shaders, worlds, settings', 'Share modpack with friends, backup before updates'],
              ['Settings Export', 'All launcher preferences and configurations as JSON', 'Sync settings between computers, backup customizations'],
              ['Profile Sharing', 'Installation metadata without worlds (smaller files)', 'Distribute modpack setup without personal saves'],
              ['Selective Export', 'Choose which components to include: mods only, configs only, etc.', 'Share just mod list or resource packs']
            ]
          },
          {
            type: 'note',
            noteType: 'tip',
            content: "Create installation templates by exporting with worlds excluded. Others can import and add their own worlds!"
          }
        ],
      },
      {
        id: "performance-optimization",
        title: "Performance Optimization",
        content: [
          {
            type: 'paragraph',
            content: "Kable is built for speed and efficiency with multi-threaded operations, intelligent caching, and memory-conscious design."
          },
          {
            type: 'feature-list',
            features: [
              {
                name: "Parallel Downloads",
                description: "Multi-threaded content downloading with configurable concurrency. Download mods, packs, and game files simultaneously for 5-10x faster installation."
              },
              {
                name: "Intelligent Caching",
                description: "Version manifests, mod metadata, and texture data cached locally. Reduces network requests and speeds up repeated operations."
              },
              {
                name: "Virtual Scrolling",
                description: "Efficiently render large lists (thousands of mods, logs, worlds) by only rendering visible items. Smooth 60fps scrolling even with 10,000+ items."
              },
              {
                name: "Lazy Loading",
                description: "Content loaded on-demand as you navigate. Launcher starts instantly without loading everything upfront."
              },
              {
                name: "Memory Management",
                description: "Configurable memory limits prevent the launcher from consuming excessive RAM during long sessions."
              },
              {
                name: "Binary Diffing",
                description: "Only download changed portions of updated files instead of full re-downloads. Saves bandwidth and time."
              }
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Kable typically uses 100-300MB RAM while idle and 200-500MB during active downloads—far less than browser-based launchers!"
          }
        ],
      },
      {
        id: "security-privacy",
        title: "Security & Privacy",
        content: [
          {
            type: 'paragraph',
            content: "Your privacy is paramount. Kable is designed with privacy-first principles and transparent security practices."
          },
          {
            type: 'table',
            headers: ['Privacy Feature', 'Implementation'],
            rows: [
              ['Local Data Storage', 'All installations, mods, configs, and settings stored locally. No cloud storage or syncing'],
              ['Secure Token Storage', 'Microsoft authentication tokens encrypted with OS-level security (DPAPI on Windows)'],
              ['No Analytics', 'Zero telemetry, tracking, or usage data collection. Kable never phones home except for updates'],
              ['Open Source', 'Full source code available on GitHub for security audits and transparency'],
              ['Network Transparency', 'All network requests logged in debug mode. See exactly what Kable communicates'],
              ['No Third-Party Scripts', 'No advertising networks, tracking pixels, or external scripts embedded']
            ]
          },
          {
            type: 'note',
            noteType: 'info',
            content: "Kable only connects to: Mojang (version manifests), Microsoft (authentication), and Modrinth (mod downloads). That's it!"
          }
        ],
      },
    ],
  },
];

export function findNodeByPath(path: string[]): WikiNode | null {
  if (!path || path.length === 0) return wikiContent[0] || null;
  let nodes: WikiNode[] = wikiContent;
  let current: WikiNode | undefined;
  for (const segment of path) {
    current = nodes.find((n) => n.id === segment);
    if (!current) return null;
    nodes = current.children || [];
  }
  return current || null;
}

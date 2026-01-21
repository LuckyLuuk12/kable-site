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
    paragraphs: [
      "Kable supports multiple Microsoft and Mojang accounts with seamless switching and automatic token management.",
    ],
    children: [
      {
        id: "account-management",
        title: "Account Management",
        paragraphs: [
          "Microsoft Account Integration: Secure OAuth2 authentication flow for Microsoft accounts.",
          "Multi-Account Support: Manage multiple Microsoft or Mojang accounts simultaneously.",
          "Quick Account Switcher: Rapidly switch between accounts without re-authentication.",
          "Automatic Token Refresh: Background token renewal ensures seamless gameplay without interruption.",
          "Account Validation: Verify account status and ownership.",
          "Account Removal: Delete accounts from the launcher when no longer needed.",
          "Active Account Selection: Set which account to use as default for game launches.",
          "Account Statistics Display: View per-account playtime and usage statistics.",
        ],
      },
      {
        id: "profile-statistics",
        title: "Profile Statistics",
        paragraphs: [
          "Total Playtime: View cumulative time spent across all installations.",
          "Installation Count: See total number of managed installations.",
          "Mod Count: Track total installed mods across all installations.",
          "Resource Pack Count: Monitor total installed resource packs.",
          "Shader Count: View total installed shader packs.",
          "World Statistics: Number of worlds, total world size, and favorite world tracking.",
          "Storage Usage: Detailed disk space breakdown by content type.",
          "Recent Activity: Review last played installations and gaming sessions.",
        ],
      },
    ],
  },

  {
    id: "home-screen",
    title: "Home Screen",
    description: "Your quick access hub for launching games and managing content.",
    paragraphs: [
      "The Home Screen provides quick access to your recently played installations, featured content, and important actions.",
    ],
    children: [
      {
        id: "quick-launch",
        title: "Quick Launch",
        paragraphs: [
          "Recently Played Installations: Up to 8 most recent installations displayed for quick access.",
          "One-Click Launch: Launch installations directly from the home screen.",
          "Launch Status Indicator: Real-time progress display during game launch.",
          "Installation Thumbnails: Visual icons for quick identification of your installations.",
          "RAM Allocation Widget: Quick memory adjustment for selected installation in MB or GB.",
          "Launch History Tracking: Automatic last_used timestamp updates for sorting.",
        ],
      },
      {
        id: "featured-content",
        title: "Featured Content",
        paragraphs: [
          "Featured Mods: Curated mod recommendations updated regularly.",
          "Featured Resource Packs: Popular and trending resource pack showcases.",
          "Featured Shaders: Highlighted shader packs for beautiful graphics.",
          "Community Content: User-generated content highlights from the community.",
        ],
      },
      {
        id: "quick-actions",
        title: "Quick Actions",
        paragraphs: [
          "New Installation Button: Rapid access to installation creation wizard.",
          "Import Installation: Quick access to import functionality for existing installations.",
          "Account Switcher: Quick account change widget without leaving the home screen.",
        ],
      },
    ],
  },

  {
    id: "installations",
    title: "Installations",
    description: "Create, manage, and configure your Minecraft installations.",
    paragraphs: [
      "Installations represent individual Minecraft setups with their own versions, mods, settings, and configurations.",
    ],
    children: [
      {
        id: "installation-management",
        title: "Installation Management",
        paragraphs: [
          "Create New Installation: Guided wizard for creating new installations.",
          "Version Selection: Choose from vanilla, snapshot, old alpha/beta, or modded versions.",
          "Mod Loader Selection: Support for Fabric, Forge, Quilt, NeoForge, OptiFine, and Iris.",
          "Installation Naming: Custom names for easy identification.",
          "Installation Icons: Assign custom icons from template library.",
          "Installation Editing: Modify name, version, settings, and Java arguments.",
          "Installation Deletion: Remove installations with confirmation dialog.",
          "Installation Duplication: Clone installations with selective content copying.",
          "Installation Export: Export installations as ZIP archives for sharing or backup.",
          "Installation Statistics: Track per-installation playtime, last played date, and disk usage.",
        ],
      },
      {
        id: "adding-installations",
        title: "Adding Installations",
        children: [
          {
            id: "new-from-app",
            title: "New from App",
            paragraphs: [
              "Version Browser: Browse all Minecraft versions including releases, snapshots, alpha, and beta versions.",
              "Mod Loader Detection: Automatic detection of compatible mod loaders for selected version.",
              "Version Manifest Refresh: Update available versions from Mojang servers.",
              "Quick Setup: Minimal configuration required for standard setups - just pick a version and go.",
              "Advanced Configuration: Customize Java arguments, game directory, resolution, and more.",
              "From Template: Create from an existing installation with selective copying of mods and settings.",
            ],
          },
          {
            id: "from-minecraft-folder",
            title: "From .minecraft Folder",
            paragraphs: [
              "Folder Selection Dialog: Browse and select existing .minecraft folders from your system.",
              "Profile Detection: Automatically detect vanilla launcher profiles.",
              "Version Detection: Identify installed Minecraft versions and mod loaders.",
              "Mod Migration: Import existing mods with automatic compatibility checking.",
              "Resource Pack Migration: Import existing resource packs into Kable's system.",
              "Shader Migration: Import existing shader packs.",
              "Settings Preservation: Maintain game options and keybindings from original installation.",
              "World Import: Optionally import saves/worlds from the .minecraft folder.",
            ],
          },
          {
            id: "from-kable-zip",
            title: "Import from Kable ZIP",
            paragraphs: [
              "ZIP Archive Import: Import previously exported Kable installations.",
              "Metadata Preservation: Maintain all installation metadata including icons and settings.",
              "Complete Restoration: Full installation recreation including mods, packs, configs, and settings.",
              "Perfect for sharing installations with friends or backing up your favorite setups.",
            ],
          },
        ],
      },
      {
        id: "installation-configuration",
        title: "Installation Configuration",
        paragraphs: [
          "Custom Game Directory: Set per-installation game data location.",
          "JVM Memory Allocation: Configure minimum and maximum heap size (-Xms/-Xmx).",
          "Custom JVM Arguments: Add advanced Java flags for garbage collection tuning and performance.",
          "Window Resolution: Set default game window dimensions.",
          "Java Version Selection: Choose specific Java executable path for each installation.",
          "Mod Loader Version: Pin specific mod loader versions for stability.",
        ],
      },
    ],
  },

  {
    id: "mods",
    title: "Mods",
    description: "Discover, install, and manage Minecraft mods.",
    paragraphs: [
      "Kable provides a powerful mod management system with browsing, installation, and conflict detection.",
    ],
    children: [
      {
        id: "mod-manager",
        title: "Mods Manager (Installed)",
        paragraphs: [
          "Per-Installation Mod Lists: View and manage mods for each installation separately.",
          "Mod Information Display: See name, version, author, description, and file size.",
          "Mod Enable/Disable Toggle: Quick mod activation without deletion.",
          "Mod Deletion: Remove unwanted mods permanently.",
          "Mod File Management: Direct access to mod JAR files in file explorer.",
          "Mod Conflict Detection: Identify incompatible mod combinations automatically.",
          "Mod Dependency Resolution: Automatic detection and installation of required dependencies.",
          "Disabled Mods Folder: Organized storage in disabled/ subfolder for easy re-enabling.",
          "Mod Metadata Parsing: Automatic extraction from fabric.mod.json, mods.toml, and other formats.",
          "Mod Version Detection: Display installed mod versions with update indicators.",
        ],
      },
      {
        id: "mod-browser",
        title: "Mod Browser",
        paragraphs: [
          "Modrinth Integration: Browse and download from the Modrinth mod repository.",
          "Search Functionality: Search mods by name, author, or tags.",
          "Category Filters: Filter by mod category like technology, magic, utility, adventure, and more.",
          "Version Compatibility Filtering: Show only mods compatible with your installation's version.",
          "Mod Loader Filtering: Filter by Fabric, Forge, Quilt, or NeoForge compatibility.",
          "Mod Details View: View description, screenshots, changelog, and dependencies.",
          "Download Statistics: See download counts and popularity metrics.",
          "Direct Installation: One-click download and install to selected installation.",
          "Dependency Auto-Install: Automatically download and install required dependencies.",
          "Version Selection: Choose specific mod versions for download.",
        ],
      },
    ],
  },

  {
    id: "resourcepacks",
    title: "Resource Packs",
    description: "Customize Minecraft's textures and sounds with resource packs.",
    paragraphs: [
      "Manage resource packs per-installation or globally across all installations.",
    ],
    children: [
      {
        id: "rp-manager",
        title: "Resource Packs Manager (Installed)",
        paragraphs: [
          "Per-Installation Packs: View and manage packs for specific installations.",
          "Global Resource Packs: Shared packs from .minecraft/resourcepacks available to all installations.",
          "Pack Enable/Disable: Toggle pack activation without deletion.",
          "Pack Deletion: Remove unwanted packs permanently.",
          "Pack Information: View name, version, description, resolution, and file size.",
          "Pack Order Management: Reorder packs for layering priority (top packs override lower ones).",
          "Pack Merging: Enable or disable resource pack merging.",
          "Disabled Packs Folder: Organized storage in disabled/ subfolder.",
          "Pack Preview: Display thumbnail/icon from pack.png for visual identification.",
        ],
      },
      {
        id: "rp-browser",
        title: "Resource Pack Browser",
        paragraphs: [
          "Modrinth Integration: Browse and download resource packs from Modrinth.",
          "Search and Filters: Find packs by name, resolution, or visual style.",
          "Minecraft Version Filtering: Show only packs compatible with your version.",
          "Pack Resolution Filtering: Filter by 16x, 32x, 64x, 128x, 256x, and higher resolutions.",
          "Pack Details View: View screenshots, description, and changelog.",
          "Direct Installation: One-click download to selected installation or global packs folder.",
          "Pack Version Selection: Choose specific pack versions for download.",
        ],
      },
    ],
  },

  {
    id: "shaders",
    title: "Shaders",
    description: "Enhance Minecraft's graphics with shader packs.",
    paragraphs: [
      "Shader packs require Iris or OptiFine to be installed. Manage shaders per-installation or globally.",
    ],
    children: [
      {
        id: "shader-manager",
        title: "Shaders Manager (Installed)",
        paragraphs: [
          "Per-Installation Shaders: View and manage shaders for specific installations.",
          "Global Shaders: Shared shaders from .minecraft/shaderpacks available to all installations.",
          "Shader Enable/Disable: Toggle shader activation without deletion.",
          "Shader Deletion: Remove unwanted shader packs.",
          "Shader Information: View name, version, author, and description.",
          "Dedicated vs Global Mode: Install to specific installation or make globally available.",
          "Shader Preview: Visual preview or screenshot display for shaders.",
          "Shader Settings Access: Quick access to shader configuration files.",
          "Iris/OptiFine Compatibility: Automatic detection of installed shader mod support.",
        ],
      },
      {
        id: "shader-browser",
        title: "Shader Browser",
        paragraphs: [
          "Modrinth Integration: Browse and download shader packs from Modrinth.",
          "Search and Filters: Find shaders by name, visual style, or performance.",
          "Minecraft Version Filtering: Show only compatible shaders for your version.",
          "Performance Category: Filter by performance impact (high/medium/low).",
          "Shader Type Filtering: Filter by popular types like BSL, Complementary, SEUS, and more.",
          "Shader Details View: View screenshots, description, and system requirements.",
          "Download to Installation or Global: Choose installation scope during download.",
          "Version Selection: Download specific shader pack versions.",
        ],
      },
    ],
  },

  {
    id: "worlds",
    title: "Worlds (Maps)",
    description: "Manage your Minecraft worlds and saves.",
    paragraphs: [
      "View, organize, and manage all your Minecraft worlds across all installations.",
    ],
    children: [
      {
        id: "world-management",
        title: "World Management",
        paragraphs: [
          "World List Display: View all detected Minecraft worlds from all installations.",
          "World Information: See name, game mode, last played date, file size, and version.",
          "Game Mode Detection: Identify Survival, Creative, Adventure, Spectator, and Hardcore worlds.",
          "World Search: Filter worlds by name or game mode.",
          "Category Filtering: Filter by game mode category for easy navigation.",
          "Sort Options: Sort by name, last played date, or size.",
          "World Deletion: Remove worlds with confirmation dialog to prevent accidents.",
          "World Statistics: View total worlds, cumulative size, and disk usage.",
          "World Backup: Export worlds as ZIP archives for safekeeping or sharing.",
          "World Import: Import worlds from ZIP files or other directories.",
          "World Directory Access: Open saves folder directly in file explorer.",
          "Multi-Installation World Detection: Scan all installation game directories automatically.",
          "Favorite Worlds: Mark and filter your favorite worlds for quick access.",
        ],
      },
    ],
  },

  {
    id: "skins",
    title: "Skins",
    description: "Customize your Minecraft character appearance.",
    paragraphs: [
      "Upload, manage, and preview your Minecraft skins with an interactive 3D viewer.",
    ],
    children: [
      {
        id: "skin-selection",
        title: "Skin Selection",
        paragraphs: [
          "Current Skin Display: 3D preview of your active Minecraft skin with rotation controls.",
          "Skin Model Selection: Choose between Steve (classic) or Alex (slim) model.",
          "Skin Upload: Upload custom skins from PNG files.",
          "Skin Reset: Restore to default Minecraft skin.",
          "Recent Skins: History of previously used skins for quick switching.",
          "Skin Library: Browse and apply saved skins from your collection.",
          "Skin Preview Rotation: Interactive 3D skin viewer with mouse or touch controls.",
        ],
      },
      {
        id: "skin-editor",
        title: "Skin Editor (Planned)",
        paragraphs: [
          "In-App Skin Editor: Create and modify skins without external tools (coming soon).",
          "Layer-Based Editing: Edit skin layers independently for advanced customization.",
          "Color Picker: Advanced color selection tools.",
          "Import/Export: Load and save skin files in various formats.",
          "Template Library: Pre-made skin templates to start from.",
        ],
      },
    ],
  },

  {
    id: "logs",
    title: "Logs",
    description: "View and manage launcher and game logs for troubleshooting.",
    paragraphs: [
      "Comprehensive logging system with real-time streaming, filtering, and search capabilities.",
    ],
    children: [
      {
        id: "launcher-logs",
        title: "Launcher Logs",
        paragraphs: [
          "Real-Time Log Streaming: Live log display during launcher operations.",
          "Log Level Filtering: Filter by debug, info, warn, or error levels.",
          "Search Functionality: Search logs with normal text, regex, or fuzzy matching.",
          "Auto-Scroll: Automatic scrolling to latest entries (toggleable).",
          "Virtual Scrolling: Efficient rendering of large log files without performance impact.",
          "Log Export: Copy logs to clipboard or save to file.",
          "Persistent Logging: Save logs to disk for later review.",
          "Log Rotation: Automatic log file rotation and compression.",
        ],
      },
      {
        id: "game-logs",
        title: "Game Logs",
        paragraphs: [
          "Per-Instance Logs: Separate logs for each running game instance.",
          "Minecraft Output Capture: Real-time STDOUT/STDERR capture from game process.",
          "Crash Detection: Automatic crash log detection and highlighting.",
          "Log Parsing: Formatted display of Minecraft log entries.",
          "Error Highlighting: Visual emphasis on errors and warnings.",
          "Game Instance Tracking: Monitor multiple simultaneous game instances.",
          "Exit Code Display: Show process exit codes for debugging crashes.",
        ],
      },
      {
        id: "log-management",
        title: "Log Management",
        paragraphs: [
          "Log Compression: GZIP compression for old logs to save disk space.",
          "Log Retention Policy: Automatic cleanup based on age or size limits.",
          "Log Directory Access: Open logs folder in file explorer for manual access.",
          "Log Deduplication: Remove consecutive duplicate entries to reduce noise.",
          "Memory-Efficient Logging: Configurable in-memory log limits for performance.",
          "Log Level Configuration: Set default visible log levels.",
          "Merge Log Views: Combined launcher and game log display in single view.",
        ],
      },
    ],
  },

  {
    id: "advanced",
    title: "Advanced",
    description: "Advanced features for power users and developers.",
    paragraphs: [
      "Advanced tools for symlink management, system information, debugging, and integrations.",
    ],
    children: [
      {
        id: "symlink-management",
        title: "Symlink Management",
        paragraphs: [
          "Symlink List Display: View all managed symbolic links in one place.",
          "Create Symlink: Create new symlinks for mods, packs, shaders, and other content.",
          "Edit Symlink: Modify source and destination paths of existing symlinks.",
          "Delete Symlink: Remove symbolic links safely.",
          "Toggle Symlink: Enable or disable symlinks without deletion.",
          "Per-Installation Symlinks: Link content to specific installations only.",
          "Global Symlinks: Link content accessible to all installations.",
          "Symlink Validation: Check symlink integrity and verify targets exist.",
          "Automatic Symlink Refresh: Update symlinks when installations change.",
          "Path Display: Full source and destination paths with copy to clipboard functionality.",
        ],
      },
      {
        id: "system-information",
        title: "System Information",
        paragraphs: [
          "Java Detection: List all installed Java versions on your system.",
          "Java Auto-Detection: Automatic Java path discovery for convenience.",
          "System Resource Monitoring: Real-time RAM, CPU, and disk usage display.",
          "Platform Information: OS version, architecture, and system details.",
          "Launcher Version: Current launcher version and update status.",
        ],
      },
      {
        id: "debug-tools",
        title: "Debug Tools",
        paragraphs: [
          "Developer Mode: Enable advanced debugging features and verbose output.",
          "API Endpoint Testing: Test Mojang and Microsoft authentication endpoints.",
          "Cache Management: Clear launcher caches (versions, installations, metadata).",
          "Configuration Reset: Reset all settings to defaults.",
          "Database Access: View and modify internal launcher database (advanced users only).",
          "Network Request Logging: Monitor all HTTP/HTTPS requests for debugging.",
        ],
      },
      {
        id: "discord-integration",
        title: "Discord Integration",
        paragraphs: [
          "Rich Presence: Show your playing status in Discord automatically.",
          "Installation Display: Show currently playing installation name.",
          "Mod Count Display: Show number of active mods in rich presence.",
          "Playtime Tracking: Display session playtime in Discord.",
          "Privacy Controls: Enable or disable Discord integration entirely.",
        ],
      },
      {
        id: "update-management",
        title: "Update Management",
        paragraphs: [
          "Update Checker: Manual and automatic update checking.",
          "Release Channel Selection: Choose between stable releases or nightly builds.",
          "Update Download: In-app update downloading with progress indication.",
          "Update Installation: Automatic or manual update application.",
          "Release Notes: View changelog for available updates.",
          "Version Comparison: Visual diff of current vs available version.",
        ],
      },
    ],
  },

  {
    id: "additional-features",
    title: "Additional Features",
    description: "More features that make Kable powerful and user-friendly.",
    children: [
      {
        id: "import-export",
        title: "Import/Export",
        paragraphs: [
          "Installation Export: Create ZIP archives of complete installations for backup or sharing.",
          "Installation Import: Restore installations from ZIP archives.",
          "Profile Sharing: Share your complete installation setup with other users.",
          "Settings Export/Import: Backup and restore launcher settings and preferences.",
        ],
      },
      {
        id: "performance-optimization",
        title: "Performance Optimization",
        paragraphs: [
          "Parallel Downloads: Multi-threaded content downloading for faster mod/pack installation.",
          "Caching System: Intelligent caching for versions, mods, and metadata.",
          "Virtual Scrolling: Efficient rendering for large lists without performance degradation.",
          "Lazy Loading: On-demand content loading to reduce memory usage.",
          "Memory Management: Configurable memory limits for the launcher itself.",
        ],
      },
      {
        id: "security-privacy",
        title: "Security & Privacy",
        paragraphs: [
          "Local Data Storage: All data stored locally on your machine, no cloud requirements.",
          "Secure Token Storage: Encrypted Microsoft authentication tokens.",
          "No Analytics: No data collection, tracking, or telemetry by the launcher.",
          "Open Source Transparency: Full source code available for security audit.",
          "Network Request Transparency: All network requests logged and visible in debug mode.",
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

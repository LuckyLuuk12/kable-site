export type WikiNode = {
  id: string;
  title: string;
  description?: string;
  paragraphs?: string[];
  children?: WikiNode[];
};

export const wikiContent: WikiNode[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Download and install Kable Launcher for your platform.",
    paragraphs: [
      "Welcome to Kable Launcher. This guide helps you install and get started quickly.",
    ],
    children: [
      {
        id: "windows",
        title: "Windows",
        paragraphs: [
          "Run the .msi or .exe installer and follow the prompts.",
          "After installation the launcher will attempt to locate existing Minecraft files in the default %APPDATA%\\.minecraft folder.",
        ],
      },
      {
        id: "linux",
        title: "Linux",
        paragraphs: [
          "Use the .AppImage or .deb package. Make .AppImage executable with `chmod +x`.",
        ],
      },
      {
        id: "macos",
        title: "macOS",
        paragraphs: [
          "Open the .dmg file and move the app to your Applications folder.",
        ],
      },
    ],
  },

  {
    id: "settings",
    title: "Settings",
    description: "Launcher and game settings.",
    paragraphs: [
      "Configure theme, Java paths, memory, and other launcher preferences here.",
    ],
  },

  {
    id: "account",
    title: "Account / Profile",
    paragraphs: [
      "Log in with your Mojang or Microsoft account. Profiles store credentials and per-profile settings.",
    ],
  },

  {
    id: "home-screen",
    title: "Home Screen",
    paragraphs: [
      "The launcher auto-detects Java installations and existing Minecraft folders if the .minecraft folder is present or specified in Settings.",
    ],
  },

  {
    id: "installations",
    title: "Installations",
    children: [
      {
        id: "adding-installations",
        title: "Adding Installations",
        children: [
          {
            id: "new-from-app",
            title: "New from App",
            paragraphs: ["Create a new installation using the built-in installer and select a Minecraft version."],
          },
          {
            id: "from-other-folder",
            title: "From other .minecraft folder",
            paragraphs: ["Point the launcher to another .minecraft folder to import an existing installation."],
          },
        ],
      },
    ],
  },

  {
    id: "mods",
    title: "Mods",
    children: [
      { id: "mod-manager", title: "Mod Manager" },
      { id: "mod-browser", title: "Mod Browser" },
    ],
  },

  {
    id: "resourcepacks",
    title: "Resourcepacks",
    children: [
      { id: "rp-manager", title: "Resourcepack Manager" },
      { id: "rp-browser", title: "Resourcepack Browser" },
    ],
  },

  { id: "shaders", title: "Shaders" },
  { id: "worlds", title: "Worlds" },
  { id: "skins", title: "Skins" },
  { id: "logs", title: "Logs" },
  { id: "advanced", title: "Advanced" },
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

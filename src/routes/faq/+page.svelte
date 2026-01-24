<script lang="ts">
  import PageLayout from "$lib/components/PageLayout.svelte";

  interface FAQ {
    question: string;
    answer: string;
  }

  const faqs: FAQ[] = [
    {
      question: "What is Kable Launcher?",
      answer:
        "Kable Launcher is a free, open-source Minecraft launcher designed specifically for developers and modders. It provides advanced features like mod management, instance isolation, multi-version support, and development tools integration, making it the best choice for Minecraft development and modding workflows.",
    },
    {
      question: "Is Kable Launcher free?",
      answer:
        "Yes! Kable Launcher is completely free and open-source. You can download it for Windows, macOS, and Linux at no cost. There are no premium features, subscriptions, or hidden fees.",
    },
    {
      question: "Why is Kable the best Minecraft launcher for developers?",
      answer:
        "Kable stands out with its developer-focused features including instance isolation for testing different mod configurations, advanced mod management tools, support for all Minecraft versions, lightweight performance, and seamless integration with development workflows. It's built by developers, for developers.",
    },
    {
      question: "How do I install Kable Launcher?",
      answer:
        "Download the latest version from our GitHub releases page for your operating system (Windows, macOS, or Linux). Run the installer and follow the setup wizard. Kable will automatically configure itself and you can start launching Minecraft immediately.",
    },
    {
      question: "Does Kable support mods and modpacks?",
      answer:
        "Absolutely! Kable has powerful built-in mod management features. You can easily search, download, install, and manage mods from popular sources like Modrinth. Create multiple instances with different mod configurations for easy testing and development.",
    },
    {
      question: "What Minecraft versions does Kable support?",
      answer:
        "Kable supports all Minecraft versions, from the oldest releases to the latest snapshots. You can create separate instances for different versions, making it perfect for mod development across multiple Minecraft versions.",
    },
    {
      question: "How is Kable different from other Minecraft launchers?",
      answer:
        "Unlike general-purpose launchers like the official Minecraft Launcher or Prism Launcher, Kable is specifically designed for developers and modders. It offers advanced instance management, better mod handling, development tools integration, and a cleaner, faster interface optimized for technical users.",
    },
    {
      question: "Is Kable Launcher safe to use?",
      answer:
        "Yes, Kable is completely safe. It's open-source, meaning the code is publicly available for anyone to audit. It doesn't collect any personal data, doesn't include telemetry, and only downloads official Minecraft files from Mojang's servers. Kable also uses the Modrinth API for mod downloads. While both Mojang and Modrinth are trusted sources, please note that third-party mods on Modrinth are community-created and may potentially contain malicious content. Always review mods before installing and never blindly click install on unfamiliar mods.",
    },
    {
      question: "Can I use Kable for regular Minecraft gameplay?",
      answer:
        "Of course! While Kable is optimized for developers and modders, it works perfectly for regular Minecraft gameplay too. Its lightweight design and fast launch times make it a great choice for any Minecraft player.",
    },
    {
      question: "Does Kable work with Forge, Fabric, and other mod loaders?",
      answer:
        "Yes! Kable supports all major mod loaders including Forge, Fabric, Quilt, and NeoForge. You can easily install and switch between different mod loaders for your instances.",
    },
    {
      question: "How do I create multiple Minecraft instances?",
      answer:
        "In Kable, simply click 'Create Instance' and configure your settings including Minecraft version, mod loader, and mods. Each instance is completely isolated, allowing you to test different configurations without conflicts.",
    },
    {
      question: "Where can I get help with Kable Launcher?",
      answer:
        "Check out our comprehensive wiki for guides and documentation. You can also report issues or ask questions on our GitHub repository. The Kable community is active and helpful!",
    },
  ];
</script>

<svelte:head>
  <title>FAQ - Kable Launcher | Frequently Asked Questions</title>
  <meta
    name="description"
    content="Frequently asked questions about Kable Launcher, the best open-source Minecraft launcher for developers and modders. Get answers about installation, features, mod support, and more."
  />

  <!-- FAQ Schema for rich snippets -->
  {@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [${faqs
        .map(
          (faq) => `
        {
          "@type": "Question",
          "name": "${faq.question}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${faq.answer}"
          }
        }`,
        )
        .join(",")}
      ]
    }
  <\/script>`}
</svelte:head>

<PageLayout>
  <div class="faq-container">
    <div class="faq-header">
      <h1>Frequently Asked Questions</h1>
      <p class="subtitle">Everything you need to know about Kable Launcher</p>
    </div>

    <div class="faq-list">
      {#each faqs as faq}
        <div class="faq-item">
          <h2 class="faq-question">{faq.question}</h2>
          <p class="faq-answer">{faq.answer}</p>
        </div>
      {/each}
    </div>

    <div class="cta-box">
      <h2>Still have questions?</h2>
      <p>
        Check out our <a href="/wiki">comprehensive wiki</a> or visit our
        <a
          href="https://github.com/LuckyLuuk12/kable"
          target="_blank"
          rel="noopener noreferrer">GitHub repository</a
        > to ask the community.
      </p>
    </div>
  </div>
</PageLayout>

<style>
  .faq-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 6rem 1.5rem;
  }

  .faq-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .faq-header h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #9ca3af;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .faq-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .faq-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
  }

  .faq-question {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #fff;
  }

  .faq-answer {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #d1d5db;
  }

  .cta-box {
    margin-top: 4rem;
    padding: 2.5rem;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.1) 0%,
      rgba(118, 75, 162, 0.1) 100%
    );
    border: 1px solid rgba(102, 126, 234, 0.2);
    border-radius: 16px;
    text-align: center;
  }

  .cta-box h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .cta-box p {
    font-size: 1.1rem;
    color: #d1d5db;
  }

  .cta-box a {
    color: #818cf8;
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  .cta-box a:hover {
    color: #a5b4fc;
  }

  @media (max-width: 768px) {
    .faq-header h1 {
      font-size: 2rem;
    }

    .faq-question {
      font-size: 1.25rem;
    }

    .faq-answer {
      font-size: 1rem;
    }

    .faq-item {
      padding: 1.5rem;
    }
  }
</style>

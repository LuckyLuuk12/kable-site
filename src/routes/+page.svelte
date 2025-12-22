<script lang="ts">
  import { onMount } from "svelte";
  import PageLayout from "$lib/components/PageLayout.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import FeaturesGrid from "$lib/components/FeaturesGrid.svelte";
  import FeatureCentered from "$lib/components/FeatureCentered.svelte";
  import FeatureSplit from "$lib/components/FeatureSplit.svelte";
  import FeatureListSection from "$lib/components/FeatureListSection.svelte";
  import CTASection from "$lib/components/CTASection.svelte";
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

  <FeaturesGrid />

  <!-- <FeatureCentered
    image={{ src: homeImage, alt: "Kable Launcher Interface" }}
  /> -->

  <FeatureSplit
    title="Clean & Intuitive Interface"
    description="Launch Minecraft with ease using our streamlined home interface. Everything you need is just a click away."
    listItems={[
      "One-click launch for all Minecraft versions",
      "Quick access to your most-used profiles",
      "Real-time status updates and progress tracking",
    ]}
    image={{ src: manageModsImage, alt: "Mod Management" }}
  />

  <FeatureSplit
    title="Discover & Customize"
    description="Explore thousands of mods and fine-tune every aspect of your Minecraft experience."
    imageGrid={[
      { src: searchModsImage, alt: "Search Mods" },
      { src: settingsImage, alt: "Settings" },
    ]}
    reverse={true}
  />

  <FeatureListSection
    items={[
      {
        title: "Powerful Mod Management",
        description: "Effortless mod installation and organization.",
        details:
          "Install, update, and organize your mods with automatic dependency resolution. Browse thousands of mods from CurseForge and Modrinth, with one-click installation and automatic updates.",
        image: { src: manageModsImage, alt: "Mod Management" },
      },
      {
        title: "Highly Customizable",
        description: "Fine-tune every aspect of your Minecraft experience.",
        details:
          "From Java memory allocation to custom JVM arguments, you're in complete control. Configure game settings, manage profiles, and customize the launcher interface to match your preferences.",
        image: { src: settingsImage, alt: "Settings" },
      },
      {
        title: "Developer Orientated",
        description: "Built for developers and power users.",
        details:
          "Live log streaming with search, filtering, and error highlighting for easy troubleshooting. Direct access to game files, mod configuration, and crash reports. Perfect for mod developers and advanced users.",
        image: { src: logsImage, alt: "Logs Viewer" },
      },
    ]}
  />

  <CTASection />
</PageLayout>

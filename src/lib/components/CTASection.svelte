<div class="cta-section">
  <div class="cta-card">
    <h2>Ready to Get Started?</h2>
    <p>
      Download Kable Launcher now and experience Minecraft like never before.
    </p>
    <a href="/releases" class="cta-button">Download Now</a>
  </div>
</div>

<style>
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

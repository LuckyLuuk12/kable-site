<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="main-footer">
  <p>&copy; {currentYear} Luuk Kablan. All rights reserved.</p>
  <a
    href="https://github.com/LuckyLuuk12/kable"
    target="_blank"
    rel="noopener"
    class="github-link">View on GitHub</a
  >
</footer>

<style>
  .main-footer {
    padding: var(--huge);
    background: var(--container);
    border-top: 1px solid var(--border);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--normal);
    align-items: center;
    position: relative;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .main-footer::before {
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
  }

  .main-footer p {
    margin: 0;
    color: var(--placeholder);
    font-size: var(--font-size-small);
  }

  .github-link {
    color: var(--primary-500);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .github-link::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--primary-500),
      var(--secondary-500)
    );
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .github-link:hover::after {
    width: 100%;
  }

  .github-link:hover {
    text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  }
</style>

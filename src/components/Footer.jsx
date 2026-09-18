import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-paper-dark/60">

      <div className="mx-auto max-w-6xl px-5 py-12 text-center">

        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
          Recipe No. &infin; &middot; filed by hand
        </p>

        <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
          ChefNova
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          A kitchen notebook, kept by React, Tailwind and Gemini &mdash;
          one recipe card at a time.
        </p>

        <div className="mt-6 flex justify-center gap-5 text-lg text-ink-soft">

          <a
            href="https://github.com/sharanusrk"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition hover:-translate-y-0.5 hover:text-paprika"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/sharanu-kumasgi/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:-translate-y-0.5 hover:text-paprika"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/sharanu_srk/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:-translate-y-0.5 hover:text-paprika"
          >
            <FaInstagram />
          </a>

        </div>

        <div className="mx-auto mt-7 h-px w-16 bg-twine/60" />

        <div className="mt-5 font-mono text-xs text-ink-soft">
          Developed by <span className="text-ink">Sharan Kumusagi</span>
        </div>

        <p className="mt-1 text-xs text-ink-soft/70">
          &copy; {new Date().getFullYear()} ChefNova AI. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;

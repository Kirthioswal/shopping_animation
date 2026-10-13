import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/jiffyworld/about/" },
  { label: "Facebook", href: "https://www.facebook.com/jiffy.world/" },
  { label: "Instagram", href: "https://www.instagram.com/jiffy.world/" },
];

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/[0.06] bg-night-900">
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-jiffy-500/60 to-transparent"
      aria-hidden="true"
    />
    <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <img src={logo} alt="Jiffy" className="h-8 w-auto" />
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
          Powering quick commerce from dark stores to doorsteps.
        </p>
        <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink">Contact Us</h3>
        <ul className="mt-4 space-y-3 text-sm text-ink-muted">
          <li className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-jiffy-400" />
            <a href="mailto:Hello@jiffy.world" className="transition-colors hover:text-ink">
              Hello@jiffy.world
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-jiffy-400" />
            <a href="tel:01141185353" className="transition-colors hover:text-ink">
              011-411-85353
            </a>
          </li>
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-jiffy-400" />
            <span>
              Corporate Office: 3rd Floor, Spring House Workspaces, JMD Regent Arcade mall, A Block, DLF Phase 1, Sector
              28, Gurugram, Haryana 122002
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink">Legal</h3>
        <ul className="mt-4 space-y-3 text-sm text-ink-muted">
          <li>
            <Link to="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="transition-colors hover:text-ink">
              Terms and Conditions
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink">Company</h3>
        <ul className="mt-4 space-y-3 text-sm text-ink-muted">
          <li>
            <Link to="/about" className="transition-colors hover:text-ink">
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/[0.06]">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-dim sm:flex-row">
        <p>© 2024 Jiffy. All rights reserved.</p>
        <div className="flex gap-6">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

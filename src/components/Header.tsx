import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { LOGIN_URL, SIGNUP_URL } from "@/story/content";
import { scrollToId, scrollToStory, scrollToY } from "@/story/scroll";
import { MOMENTS } from "@/story/timeline";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const go = (fn: () => void) => () => {
    if (onHome) fn();
    else {
      navigate("/");
      setTimeout(fn, 400);
    }
  };

  const links = [
    { label: "Home", fn: () => scrollToY(0) },
    { label: "Why Jiffy", fn: () => scrollToStory(MOMENTS.why) },
    { label: "Platform", fn: () => scrollToStory(MOMENTS.platform) },
    { label: "How it Works", fn: () => scrollToStory(MOMENTS.how) },
    { label: "FAQs", fn: () => scrollToId("faq-section") },
  ];

  return (
    <header data-header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-night-950/55 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between md:h-[72px]">
        <Link to="/" aria-label="Jiffy home" className="shrink-0">
          <img src={logo} alt="Jiffy" className="h-7 w-auto md:h-8" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={go(l.fn)}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={LOGIN_URL} target="_blank" rel="noreferrer" className="btn-ghost hidden px-5 py-2 text-sm sm:inline-flex">
            Log in
          </a>
          <a href={SIGNUP_URL} target="_blank" rel="noreferrer" className="btn-primary px-5 py-2 text-sm">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

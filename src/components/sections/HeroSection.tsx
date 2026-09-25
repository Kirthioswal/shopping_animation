import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { OrderPhoneMockup } from './OrderPhoneMockup';
import { DarkStoreTerminal } from './DarkStoreTerminal';

gsap.registerPlugin(ScrollTrigger);

/**
 * Interactive scroll-driven Hero Section:
 * 1. At start: Phone on left corner places order -> Order notification pops on top of phone.
 * 2. On scroll down: Notification travels across screen into the computer terminal on the right.
 * 3. Inside the computer: Notification lands on the screen, and the astronaut teammate appears reading it.
 */
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const notificationAnchorRef = useRef<HTMLDivElement>(null);

  // Use ref for scroll progress to avoid re-renders on every scroll tick
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [, forceUpdate] = useState(0);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const isOrderPlacedRef = useRef(false);

  // Typing effect state for headline
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lines = [
    { text: 'Need it now?', isOrange: false },
    { text: 'Get it in a ', isOrange: false },
    { text: 'Jiffy.', isOrange: true },
  ];

  // Headline typewriter effect
  useEffect(() => {
    let charIndex = 0;
    let lineIndex = 0;
    let fullText = '';

    const typeNext = () => {
      if (lineIndex >= lines.length) {
        timeoutRef.current = setTimeout(() => setShowCursor(false), 2000);
        return;
      }

      const currentLine = lines[lineIndex];

      if (charIndex < currentLine.text.length) {
        fullText += currentLine.text[charIndex];
        setDisplayText(fullText);
        charIndex++;
        timeoutRef.current = setTimeout(typeNext, 60);
      } else {
        lineIndex++;
        charIndex = 0;

        if (lineIndex === 1) {
          fullText += '\n';
          timeoutRef.current = setTimeout(typeNext, 350);
        } else if (lineIndex < lines.length) {
          timeoutRef.current = setTimeout(typeNext, 180);
        } else {
          timeoutRef.current = setTimeout(() => setShowCursor(false), 2000);
        }
      }
    };

    timeoutRef.current = setTimeout(typeNext, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Batched RAF update — only triggers React re-render at display refresh rate
  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return; // already scheduled
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      forceUpdate((c) => c + 1);
    });
  }, []);

  // GSAP ScrollTrigger to scrub the phone -> computer notification flight
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=520%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          // If user scrolls before the 2.4s timer, trigger order placed immediately
          if (self.progress > 0.05 && !isOrderPlacedRef.current) {
            isOrderPlacedRef.current = true;
            setIsOrderPlaced(true);
          }
          scheduleUpdate();
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdate]);

  const renderText = () => {
    const parts = displayText.split('\n');
    return parts.map((part, i) => {
      if (i === 1) {
        const jiffyIndex = part.indexOf('Jiffy.');
        if (jiffyIndex >= 0) {
          return (
            <span key={i}>
              <br />
              {part.substring(0, jiffyIndex)}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FF6B35]">
                {part.substring(jiffyIndex)}
              </span>
            </span>
          );
        }
        return (
          <span key={i}>
            <br />
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Read progress from ref (no state overhead)
  const heroProgress = progressRef.current;

  // Crossfade opacity between initial headline and storytelling stages
  const headlineOpacity = Math.max(0, 1 - heroProgress * 10);

  // Responsive calculations
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 900;
  const isTablet = viewportW >= 640 && viewportW < 1024;
  const isPhoneViewport = viewportW < 640;

  // =========================================================================
  // SCENE 1: PHONE ORDER PLACING CHOREOGRAPHY (ENTER -> CENTER HOLD -> EXIT -> BREATHING)
  // 0.00 -> 0.08: Slow glide from initial left offset (-16vw) to CENTER (0vw)
  // 0.08 -> 0.36: GENEROUS CENTER HOLD (Slider scrubs 0.09->0.18, Checkmark pops at 0.18)
  //               ORIGINAL MESSAGE APPEARS with spring pop (0.18->0.22) and HOLDS (0.22->0.36)
  // 0.36 -> 0.44: Phone exits gently to LEFT (0vw -> -24vw) with soft fade
  // 0.36 -> 0.50: Notification detaches and takes FLIGHT across dark canvas toward terminal on RIGHT
  // 0.44 -> 0.52: Breathing space before Seller Terminal arrives
  // =========================================================================
  let phoneX = 0;
  let phoneOpacity = 1;
  // Preserve the desktop composition while keeping the phone fully in view on
  // narrower desktop widths.
  const initialPhoneOffset = isDesktop
    ? -Math.min(25, (viewportW - 320) / viewportW * 50)
    : isTablet ? -30 : -22;

  if (heroProgress < 0.08) {
    const t = heroProgress / 0.08;
    phoneX = initialPhoneOffset;
    phoneOpacity = 1;
  } else if (heroProgress <= 0.36) {
    phoneX = initialPhoneOffset; // stays in the left lane beside the headline
    phoneOpacity = 1;
  } else if (heroProgress < 0.44) {
    const t = (heroProgress - 0.36) / 0.08;
    phoneX = initialPhoneOffset - t * 14; // exits farther left after the notification departs
    phoneOpacity = Math.max(0, 1 - t * 1.5);
  } else {
    phoneOpacity = 0;
    phoneX = initialPhoneOffset - 14;
  }

  // At phone widths, introduce the handset after the hero copy clears. At
  // tablet widths it shares the opening frame with the copy in a left/right
  // composition instead of covering the headline.
  const mobileEnter = isPhoneViewport ? 1 : Math.min(Math.max(heroProgress / 0.14, 0), 1);
  const mobileEnterEase = mobileEnter * mobileEnter * (3 - 2 * mobileEnter);
  const responsivePhoneY = 0;
  const responsivePhoneOpacity = phoneOpacity;

  // =========================================================================
  // ORIGINAL MESSAGE NOTIFICATION CHOREOGRAPHY (APPEAR -> CENTER HOLD -> FLIGHT)
  // 0.18 -> 0.22: MESSAGE POPS UP on top of phone (scale 0.6 -> 1.0, opacity 0 -> 1)
  // 0.22 -> 0.36: GENEROUS CENTER HOLD (Message clearly visible, storytelling moment)
  // 0.36 -> 0.50: Takes flight toward terminal on RIGHT (+26vw)
  // =========================================================================
  const showNotification = heroProgress >= 0.18 && heroProgress <= 0.58;

  let notificationAppearScale = 1;
  let notificationAppearOpacity = 1;
  let notificationAppearY = 0;

  if (heroProgress < 0.22) {
    const t = Math.min(Math.max((heroProgress - 0.18) / 0.04, 0), 1);
    // Smooth back-out easing for authentic physical pop-up
    const c1 = 1.70158;
    const c3 = c1 + 1;
    const easeOutBack = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    notificationAppearScale = 0.6 + 0.4 * easeOutBack;
    notificationAppearOpacity = Math.min(t * 1.6, 1);
    notificationAppearY = (1 - t) * 16;
  } else {
    notificationAppearScale = 1;
    notificationAppearOpacity = 1;
    notificationAppearY = 0;
  }

  const flightProgress = Math.min(Math.max((heroProgress - 0.36) / 0.14, 0), 1);
  const flightEase = flightProgress * flightProgress * (3 - 2 * flightProgress);
  const originRect = notificationAnchorRef.current?.getBoundingClientRect();
  const screenRect = typeof document !== 'undefined'
    ? document.getElementById('terminal-computer-screen')?.getBoundingClientRect()
    : undefined;
  const notificationOriginX = originRect ? originRect.left + originRect.width / 2 : viewportW / 2;
  const notificationOriginY = originRect ? originRect.top - (viewportW >= 640 ? 16 : 12) + 40 : viewportH / 2 - 210;
  const notificationTargetX = screenRect ? screenRect.left + screenRect.width / 2 : viewportW / 2 + (isDesktop ? viewportW * 0.26 : Math.min(viewportW * 0.3, 140));
  const notificationTargetY = screenRect ? screenRect.top + screenRect.height / 2 : notificationOriginY + viewportH * 0.12;
  const notificationFlightX = flightEase * (notificationTargetX - notificationOriginX);
  const notificationFlightY = flightEase * (notificationTargetY - notificationOriginY);
  const notificationFlightScale = flightProgress < 0.6
    ? 1 - flightProgress * 0.12
    : 1 - 0.6 * 0.12 - ((flightProgress - 0.6) / 0.4) * 0.35;
  // Dock on the actual monitor, hold through the terminal's final settle, and
  // fade as the received-order state takes over at 0.58.
  const notificationFlightOpacity = heroProgress > 0.55
    ? Math.max(0, 1 - (heroProgress - 0.55) / 0.03)
    : 1;

  const totalNotificationX = notificationFlightX;
  const totalNotificationY = notificationAppearY + notificationFlightY;
  const totalNotificationScale = notificationAppearScale * notificationFlightScale;
  const totalNotificationOpacity = notificationAppearOpacity * notificationFlightOpacity;

  // =========================================================================
  // SCENE 2: SELLER TERMINAL CHOREOGRAPHY (ENTER -> CENTER HOLD -> EXIT -> BREATHING)
  // 0.48 -> 0.58: Smooth glide from RIGHT (+30vw) to CENTER (0vw)
  // 0.58 -> 0.84: GENEROUS CENTER HOLD (Notification docks, astronaut reads, packing progress)
  // 0.84 -> 0.92: Terminal exits gently to LEFT (0vw -> -30vw) with soft fade
  // 0.92 -> 1.00: BREATHING SPACE before Stage 1 Package Transformation
  // =========================================================================
  const terminalSideOffset = isDesktop ? 19 : isTablet ? 15 : 0;
  let terminalX = terminalSideOffset;
  let terminalOpacity = 0;
  if (heroProgress < 0.48) {
    terminalX = terminalSideOffset;
    terminalOpacity = 0;
  } else if (heroProgress < 0.58) {
    const t = (heroProgress - 0.48) / 0.10;
    terminalX = terminalSideOffset;
    terminalOpacity = Math.min(1, t * 1.2);
  } else if (heroProgress <= 0.84) {
    terminalX = terminalSideOffset; // stays in the right lane
    terminalOpacity = 1;
  } else if (heroProgress < 0.92) {
    const t = (heroProgress - 0.84) / 0.08;
    terminalX = terminalSideOffset - t * (terminalSideOffset + 24); // exits left for the next scene
    terminalOpacity = Math.max(0, 1 - t * 1.5);
  } else {
    terminalOpacity = 0;
    terminalX = -24;
  }

  const isOrderReceivedInTerminal = heroProgress >= 0.58;

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none flex flex-col items-center justify-center"
    >
      {/* Subtle radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, rgba(249,115,22,0.09) 0%, #000000 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.06) 0%, transparent 60%)',
        }}
      />

      {/* LAYER 1: Initial Headline & CTAs (Visible at start, fades out as user scrolls) */}
      <div
        className="absolute inset-0 z-10 max-w-[1440px] mx-auto px-6 sm:px-12 w-full flex items-center justify-end pointer-events-none"
        style={{
          opacity: headlineOpacity,
          transform: `translate3d(0, ${-heroProgress * 80}px, 0)`,
          willChange: 'transform, opacity',
        }}
      >
        <div className="w-[54%] sm:w-full md:w-[55%] lg:w-[55%] text-left flex flex-col items-start md:pl-6 pointer-events-auto">
          <h1 className="text-xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 sm:mb-6 leading-tight tracking-tight min-h-[100px] sm:min-h-[180px] md:min-h-[220px]">
            {renderText()}
            {showCursor && (
              <span className="inline-block w-[3px] h-[0.8em] bg-[#F97316] ml-1 animate-pulse align-baseline" />
            )}
          </h1>

          <p className="text-[11px] sm:text-lg text-gray-400 mb-4 sm:mb-8 max-w-xl leading-relaxed">
            From dark stores to doorsteps, Jiffy makes quick commerce logistics
            effortless — delivering products to your customers in record time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto">
            <Button
              className="bg-gradient-to-r from-[#F97316] to-[#FF6B35] text-white hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl font-semibold shadow-lg shadow-orange-500/20 w-full sm:w-auto"
              onClick={() => window.open('https://my.jiffy.world/signup', '_blank')}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white transition-all text-lg px-8 py-6 rounded-xl bg-transparent w-full sm:w-auto"
              onClick={() => window.open('https://my.jiffy.world/login', '_blank')}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>

      {/* LAYER 2: SECTION 1 PHONE ORDER PLACING (SIDE -> CENTER -> OTHER SIDE) */}
      {responsivePhoneOpacity > 0.01 && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
          style={{
            transform: `translate3d(${phoneX}vw, ${responsivePhoneY}px, 0) scale(${isPhoneViewport ? 0.62 : 1})`,
            opacity: responsivePhoneOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <div className="relative pt-6 sm:pt-8">
            <OrderPhoneMockup
              onOrderPlaced={() => setIsOrderPlaced(true)}
              scrollProgress={heroProgress}
            />
          </div>
        </div>
      )}

      {/* LAYER 2.5: ORIGINAL ORDER NOTIFICATION MESSAGE (POPS ON PHONE -> CENTER HOLD -> FLIGHT TO RIGHT) */}
      {showNotification && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="relative pt-6 sm:pt-8">
              <div ref={notificationAnchorRef} className="relative w-[280px] sm:w-[310px] h-[500px] sm:h-[560px] max-h-[72vh] flex justify-center">
              <div
                className="absolute -top-3 sm:-top-4 left-1/2 origin-center"
                style={{
                  width: 'min(300px, calc(100vw - 32px))',
                  willChange: 'transform, opacity',
                  transform: `translate3d(calc(-50% + ${totalNotificationX}px), ${totalNotificationY}px, 0) scale(${totalNotificationScale})`,
                  opacity: totalNotificationOpacity,
                }}
              >
                <div className="bg-neutral-900/95 border-2 border-orange-500/70 shadow-[0_20px_50px_rgba(249,115,22,0.5)] rounded-2xl p-3 backdrop-blur-xl flex items-center gap-3">
                  {/* Message Icon with Pulsing Red Badge */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/40">
                      <MessageSquare className="w-5 h-5 fill-white/20" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-neutral-900 rounded-full flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-extrabold text-orange-400 uppercase tracking-wider">Jiffy Message</span>
                      <span className="text-neutral-500 font-medium">Just now</span>
                    </div>
                    <p className="text-[12px] font-extrabold text-white leading-snug truncate">
                      Order #JFY-9082 Placed! 🎉
                    </p>
                    <p className="text-[10px] text-neutral-300 leading-none truncate mt-0.5">
                      Transmitting to Dark Store #04...
                    </p>
                  </div>
                </div>

                {/* Glowing Trail Effect while flying */}
                {flightProgress > 0.05 && flightProgress < 0.85 && (
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-5 bg-gradient-to-r from-transparent to-orange-500/50 blur-sm rounded-full pointer-events-none" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAYER 3: SECTION 2 DARK STORE TERMINAL (SIDE -> CENTER -> OTHER SIDE) */}
      {terminalOpacity > 0.01 && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto px-4"
          style={{
            transform: `translate3d(${terminalX}vw, 0, 0)`,
            opacity: terminalOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <div className="w-full max-w-xl pt-6 sm:pt-8">
            <DarkStoreTerminal
              progress={heroProgress}
              orderReceived={isOrderReceivedInTerminal}
            />
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 z-10"
        style={{
          opacity: Math.max(0, 1 - heroProgress * 5),
          willChange: 'opacity',
        }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs tracking-[0.2em] uppercase font-mono">
            Scroll to follow the order
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-orange-400" />
        </div>
      </div>

      {/* Bottom gradient fade into journey sections */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;

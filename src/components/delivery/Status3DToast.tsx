import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface Status3DToastProps {
  show: boolean;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: string;
  theme?: 'emerald' | 'orange' | 'cyan' | 'sky' | 'amber';
  className?: string;
  topOffset?: string;
}

const THEME_STYLES = {
  emerald: {
    border: 'border-emerald-500/70',
    shadow: 'shadow-[0_20px_50px_rgba(16,185,129,0.4),0_0_30px_rgba(16,185,129,0.25)]',
    glow: 'from-emerald-500/25 via-teal-500/15 to-transparent',
    iconBg: 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/40',
    title: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    dot: 'bg-emerald-400',
  },
  orange: {
    border: 'border-orange-500/70',
    shadow: 'shadow-[0_20px_50px_rgba(249,115,22,0.4),0_0_30px_rgba(249,115,22,0.25)]',
    glow: 'from-orange-500/25 via-amber-500/15 to-transparent',
    iconBg: 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-orange-500/40',
    title: 'text-orange-400',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    dot: 'bg-orange-400',
  },
  cyan: {
    border: 'border-cyan-500/70',
    shadow: 'shadow-[0_20px_50px_rgba(6,182,212,0.4),0_0_30px_rgba(6,182,212,0.25)]',
    glow: 'from-cyan-500/25 via-blue-500/15 to-transparent',
    iconBg: 'bg-gradient-to-tr from-cyan-500 to-blue-400 text-white shadow-cyan-500/40',
    title: 'text-cyan-300',
    badge: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40',
    dot: 'bg-cyan-400',
  },
  sky: {
    border: 'border-sky-500/70',
    shadow: 'shadow-[0_20px_50px_rgba(14,165,233,0.4),0_0_30px_rgba(14,165,233,0.25)]',
    glow: 'from-sky-500/25 via-indigo-500/15 to-transparent',
    iconBg: 'bg-gradient-to-tr from-sky-500 to-indigo-500 text-white shadow-sky-500/40',
    title: 'text-sky-300',
    badge: 'bg-sky-500/20 text-sky-200 border-sky-500/40',
    dot: 'bg-sky-400',
  },
  amber: {
    border: 'border-amber-500/70',
    shadow: 'shadow-[0_20px_50px_rgba(245,158,11,0.4),0_0_30px_rgba(245,158,11,0.25)]',
    glow: 'from-amber-500/25 via-orange-500/15 to-transparent',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-amber-500/40',
    title: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
    dot: 'bg-amber-400',
  },
};

export const Status3DToast: React.FC<Status3DToastProps> = ({
  show,
  icon: Icon,
  title,
  subtitle,
  badge,
  theme = 'emerald',
  className = '',
  topOffset = 'top-[260px]',
}) => {
  const styles = THEME_STYLES[theme];

  return (
    <div
      className={`absolute ${topOffset} left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 ease-out ${
        show
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 -translate-y-8 scale-75 pointer-events-none'
      } ${className}`}
      style={{ perspective: 1200 }}
    >
      <div
        className="relative"
        style={{
          transform: show ? 'rotateX(0deg) translateZ(30px)' : 'rotateX(35deg) translateZ(-40px)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Backglow */}
        <div
          className={`absolute -inset-2 rounded-3xl bg-gradient-to-r ${styles.glow} blur-xl -z-10`}
        />

        {/* 3D Glass Container */}
        <div
          className={`relative bg-neutral-950/95 backdrop-blur-2xl border-2 ${styles.border} ${styles.shadow} rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4`}
          style={{
            boxShadow:
              '0 25px 50px -12px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top Gloss Reflection Line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />

          {/* 3D Icon Disc */}
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl ${styles.iconBg} flex items-center justify-center shrink-0 shadow-lg border-t border-white/40`}
            style={{
              transform: 'translateZ(20px)',
            }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Content */}
          <div className="text-left" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`w-2 h-2 rounded-full ${styles.dot} animate-ping`}
              />
              <span
                className={`text-[11px] sm:text-xs font-mono font-black tracking-wider uppercase ${styles.title}`}
              >
                {title}
              </span>
              {badge && (
                <span
                  className={`text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${styles.badge}`}
                >
                  {badge}
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-[12px] text-neutral-200 font-semibold leading-tight max-w-[280px] sm:max-w-[360px] truncate">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status3DToast;

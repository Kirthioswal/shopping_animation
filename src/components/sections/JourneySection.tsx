import { useRef, useEffect, useState } from 'react';
import type { JourneyStep } from '@/data/journeySteps';

interface JourneySectionProps extends JourneyStep {
  index: number;
}

/**
 * A single journey step section. Each occupies 200vh of scroll space
 * to give the 3D package animation room to play out.
 *
 * Layout: full-viewport background image with dark overlay,
 * step number badge, category label, headline, and description.
 */
const JourneySection = ({
  stepNumber,
  category,
  headlineWhite,
  headlineOrange,
  description,
  backgroundImage,
  imagePosition,
  index,
}: JourneySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isImageLeft = imagePosition === 'left';

  return (
    <section
      id={`journey-step-${index}`}
      ref={sectionRef}
      className="relative min-h-[200vh] flex items-start"
      style={{ background: '#000' }}
    >
      {/* Sticky inner container — stays pinned while section scrolls */}
      <div className="sticky top-0 w-full h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt={category}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVisible ? 'opacity-40' : 'opacity-0'
            }`}
            style={{
              objectPosition: isImageLeft ? 'left center' : 'right center',
            }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-16">
          <div
            className={`max-w-2xl ${
              isImageLeft ? 'ml-auto text-right' : 'mr-auto text-left'
            }`}
          >
            {/* Step number badge */}
            <div
              className={`inline-flex items-center gap-3 mb-6 transition-all duration-700 delay-100 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-[#F97316] font-mono text-lg font-bold tracking-wider">
                {stepNumber}
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-[#F97316] to-transparent" />
            </div>

            {/* Category label */}
            <p
              className={`text-gray-400 text-sm tracking-[0.25em] uppercase mb-4 font-medium transition-all duration-700 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {category}
            </p>

            {/* Headline */}
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-white">{headlineWhite}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FF6B35]">
                {headlineOrange}
              </span>
            </h2>

            {/* Description */}
            <p
              className={`text-gray-300 text-lg leading-relaxed max-w-lg transition-all duration-700 delay-[400ms] ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } ${isImageLeft ? 'ml-auto' : ''}`}
            >
              {description}
            </p>

            {/* Decorative light streak */}
            <div
              className={`mt-8 h-px transition-all duration-1000 delay-500 ${
                isVisible ? 'w-32 opacity-100' : 'w-0 opacity-0'
              }`}
              style={{
                background: 'linear-gradient(90deg, #F97316, transparent)',
                marginLeft: isImageLeft ? 'auto' : '0',
              }}
            />
          </div>
        </div>

        {/* Step progress indicator on the side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'h-8 bg-[#F97316]'
                  : i < index
                  ? 'h-2 bg-[#F97316]/40'
                  : 'h-2 bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;

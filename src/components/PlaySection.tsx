import { useState, useEffect } from 'react';
import slide1 from '@/assets/Slider/slide1.png';

const PlaySection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const sampleImages = [
    {
      src: slide1,
      alt: "Jiffy workspace slide"
    }
  ];

  // Auto-advance slider every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % sampleImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [sampleImages.length]);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              <span className="gradient-text">Track. Manage. Scale.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Quick commerce made effortless with Jiffy.
            </p>
          </div>

          {/* Image Slider */}
          <div className="relative">
            <div className="gradient-card rounded-2xl p-0 border border-border overflow-hidden">
              <div className="aspect-video overflow-hidden relative">
                {/* Image Container */}
                <div className="relative w-full h-full">
                  {sampleImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {sampleImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary rounded-full animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaySection;
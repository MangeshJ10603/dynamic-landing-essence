
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-multiply"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transition: "opacity 1s ease-in-out 0.5s" 
          }}
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029')] bg-cover bg-center animate-pulse-slow" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-16 mx-auto text-center">
        <div 
          className="max-w-3xl mx-auto"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: `translateY(${isLoaded ? '0px' : '30px'})`,
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out" 
          }}
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20">
            <p className="text-sm font-medium text-white">
              Welcome to our platform
            </p>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl text-white text-balance">
            Crafting Digital Experiences That Matter
          </h1>
          <p className="mb-8 text-lg md:text-xl text-white/90 text-balance">
            We build elegant solutions that solve real problems and deliver measurable results
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              className="px-8 py-3 text-base font-medium text-white bg-primary/90 backdrop-blur-sm hover:bg-primary/100 transition-all duration-300 rounded-lg shadow-lg hover:shadow-primary/20 hover:shadow-xl"
            >
              Get Started
            </a>
            <a 
              href="#services" 
              className="px-8 py-3 text-base font-medium text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg border border-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-white animate-bounce"
        style={{ 
          opacity: isLoaded ? 1 : 0, 
          transition: "opacity 1s ease-in-out 1.5s" 
        }}
      >
        <a href="#services" className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;

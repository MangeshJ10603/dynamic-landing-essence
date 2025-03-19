
import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, Code, Settings, Layers, Share2 } from "lucide-react";
import { ServiceItem } from "../types";

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Create modern, responsive websites that engage users and generate results.",
    icon: "web"
  },
  {
    id: 2,
    title: "Mobile Applications",
    description: "Build native and cross-platform mobile apps for iOS and Android.",
    icon: "mobile"
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Craft intuitive interfaces and seamless user experiences that delight.",
    icon: "design"
  },
  {
    id: 4,
    title: "API Integration",
    description: "Connect your systems with third-party services for enhanced functionality.",
    icon: "api"
  },
  {
    id: 5,
    title: "Cloud Infrastructure",
    description: "Deploy and manage your applications on scalable cloud platforms.",
    icon: "cloud"
  },
  {
    id: 6,
    title: "Digital Marketing",
    description: "Grow your online presence with strategic digital marketing campaigns.",
    icon: "marketing"
  }
];

const Services = () => {
  const [visibleItems, setVisibleItems] = useState<{ [key: number]: boolean }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start showing items one by one with delay
          services.forEach((service, index) => {
            setTimeout(() => {
              setVisibleItems(prev => ({ ...prev, [service.id]: true }));
            }, 150 * index);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "web":
        return <Monitor className="w-6 h-6" />;
      case "mobile":
        return <Smartphone className="w-6 h-6" />;
      case "design":
        return <Layers className="w-6 h-6" />;
      case "api":
        return <Code className="w-6 h-6" />;
      case "cloud":
        return <Settings className="w-6 h-6" />;
      case "marketing":
        return <Share2 className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Comprehensive Solutions for Your Digital Needs
          </h2>
          <p className="text-gray-600 text-lg text-balance">
            We offer a full spectrum of services to help your business thrive in the digital landscape
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`glass-card rounded-xl p-6 transition-all duration-700 ease-out ${
                visibleItems[service.id] 
                  ? "opacity-100 transform translate-y-0" 
                  : "opacity-0 transform translate-y-12"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

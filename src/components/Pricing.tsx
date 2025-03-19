
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { PricingPlan } from "../types";

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Basic",
    price: 49,
    features: [
      "1 project",
      "5 pages",
      "Basic analytics",
      "48-hour support",
      "1 revision round"
    ]
  },
  {
    id: 2,
    name: "Professional",
    price: 99,
    features: [
      "5 projects",
      "20 pages",
      "Advanced analytics",
      "24-hour support",
      "3 revision rounds",
      "Custom domain"
    ],
    isPopular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: 199,
    features: [
      "Unlimited projects",
      "Unlimited pages",
      "Premium analytics",
      "Priority support",
      "Unlimited revisions",
      "Custom domain",
      "SEO optimization",
      "Performance reports"
    ]
  }
];

const Pricing = () => {
  const [visibleItems, setVisibleItems] = useState<{ [key: number]: boolean }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start showing items one by one with delay
          pricingPlans.forEach((plan, index) => {
            setTimeout(() => {
              setVisibleItems(prev => ({ ...prev, [plan.id]: true }));
            }, 200 * index);
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

  return (
    <section id="pricing" className="section-padding bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Transparent Pricing for Every Need
          </h2>
          <p className="text-gray-600 text-lg text-balance">
            Choose the perfect plan that aligns with your project requirements and budget
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 transition-all duration-700 ease-out ${
                visibleItems[plan.id] 
                  ? "opacity-100 transform translate-y-0" 
                  : "opacity-0 transform translate-y-12"
              } ${
                plan.isPopular 
                  ? "border-blue-200 shadow-xl bg-blue-50/30" 
                  : "border-gray-200 shadow-lg"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">
                      <Check size={20} />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 rounded-lg transition-all duration-300 ${
                  plan.isPopular 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-800"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

'use client';

import { Service } from '@/types';

interface ServicesGridProps {
  services: Service[];
}

interface DefaultService {
  title: string;
  description: string;
}

// Default services based on the screenshot
const defaultServices: DefaultService[] = [
  {
    title: 'Visual Identity',
    description: 'We create distinctive visual systems that tell your brand\'s story through color, typography, and form. Every detail is thoughtfully crafted to make a lasting impression and build strong recognition.',
  },
  {
    title: 'Branding',
    description: 'From idea to identity — we build brands with character, tone, and attitude. Our focus is on strategy, emotion, and aesthetics to make your brand truly unforgettable.',
  },
  {
    title: 'Web Design',
    description: 'We design websites that merge aesthetics with functionality. Intuitive, fast, and visually striking — crafted to guide users through your story, not just your pages.',
  },
  {
    title: 'UI/UX Design',
    description: 'We create digital experiences that look great and work even better. With a focus on usability, clarity, rhythm, and the small details that make a big difference.',
  },
  {
    title: 'Social Media Design',
    description: 'Your brand, your voice — brought to life visually. We design content that stops the scroll and drives real engagement, not just likes.',
  },
  {
    title: 'Photography and Videography',
    description: 'This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.',
  },
];

export function ServicesGrid({ services }: ServicesGridProps) {
  // Use CMS services if available, otherwise use default
  const hasServices = services && services.length > 0;
  const displayServices = hasServices ? services : defaultServices;

  return (
    <section className="py-12">
      <h2 className="text-xl font-medium text-white mb-10 flex items-center gap-2">
        <span className="text-white">+</span> Things We Do
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayServices.map((service, index) => (
          <div
            key={'_id' in service ? service._id : `service-${index}`}
            className="group flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all duration-300 ease-out min-h-55"
            style={{
              background: 'linear-gradient(180deg, rgba(46, 51, 90, 0) 0%, rgba(28, 27, 51, 0.1) 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              boxShadow: 'inset 0px 0px 60px rgba(204, 215, 255, 0.08), 0px 8px 16px rgba(0,0,0,0.05), 0px 24px 48px rgba(0,0,0,0.05), 0px 48px 96px rgba(0,0,0,0.06)',
              backdropFilter: 'blur(23px)',
              WebkitBackdropFilter: 'blur(23px)',
              borderRadius: '40px',
            }}
          >
            <h3 className="text-white font-medium text-lg mb-3 transition-all duration-300 ease-out group-hover:scale-105">
              {service.title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed transition-all duration-300 ease-out group-hover:scale-[1.02]">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

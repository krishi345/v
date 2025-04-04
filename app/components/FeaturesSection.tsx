import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  reverse?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  imageSrc, 
  reverse = false 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className={`space-y-4 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-foreground/80">{description}</p>
      </div>
      <div className={`${reverse ? 'md:order-1' : 'md:order-2'}`}>
        <Image
          src={imageSrc}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-24">
          <FeatureCard
            title="Dynamic Planting Schedules"
            description="Adapt planting strategies based on local weather patterns, soil conditions, and historical data to maximize crop yield and minimize losses."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            imageSrc="/images/crop-monitoring.svg"
          />
          
          <FeatureCard
            title="AI Pest & Weed Identification"
            description="Smartphone-based detection and targeted intervention suggestions. Simply take a photo, and our AI will identify the problem and suggest organic and chemical solutions."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            imageSrc="/images/crop-monitoring.svg"
            reverse={true}
          />
          
          <FeatureCard
            title="Soil Health Management"
            description="Receive tailored recommendations based on soil tests or IoT sensor data. Monitor nutrient levels, pH, moisture, and more to keep your soil in optimal condition."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            }
            imageSrc="/images/soil-health.svg"
          />
          
          <FeatureCard
            title="Community Insights & Best Practices"
            description="Peer-to-peer sharing of success stories and local knowledge. Connect with fellow farmers, learn from their experiences, and share your own successes."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            imageSrc="/images/community-insights.svg"
            reverse={true}
          />
        </div>
      </div>
    </section>
  );
} 
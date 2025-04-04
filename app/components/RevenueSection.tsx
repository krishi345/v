import Image from 'next/image';

interface RevenueStreamProps {
  title: string;
  description: string;
  price?: string;
  icon: React.ReactNode;
  color: string;
}

const RevenueStream: React.FC<RevenueStreamProps> = ({ 
  title, 
  description, 
  price, 
  icon, 
  color 
}) => {
  return (
    <div className={`p-6 rounded-lg border-2 ${color} bg-background`}>
      <div className="flex items-start mb-4">
        <div className="p-2 rounded-lg bg-primary/10 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          {price && <p className="text-primary font-medium">{price}</p>}
        </div>
      </div>
      <p className="text-foreground/80">{description}</p>
    </div>
  );
};

export default function RevenueSection() {
  return (
    <section id="revenue" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Revenue <span className="text-primary">Model</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Our sustainable revenue streams ensure KrishiMitra AI can continue to serve farmers while growing our impact.
          </p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <RevenueStream
            title="Freemium Model"
            description="Basic features are free for all users, with advanced analytics, personalized recommendations, and premium content available for subscribers."
            price="Premium: ₹299/month"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="border-primary/20"
          />
          
          <RevenueStream
            title="B2B Partnerships"
            description="We provide valuable data insights to seed and fertilizer companies to help them improve their products and target specific regions effectively."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            color="border-secondary/20"
          />
          
          <RevenueStream
            title="Commissions"
            description="We earn commissions from soil testing laboratories and IoT equipment vendors when farmers use our platform to purchase their services or products."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
            color="border-primary/20"
          />
          
          <RevenueStream
            title="In-app Marketplace"
            description="Farmers can purchase agricultural supplies, equipment, and tools directly through our platform, creating a convenient one-stop solution."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
            color="border-secondary/20"
          />
        </div>
      </div>
    </section>
  );
} 
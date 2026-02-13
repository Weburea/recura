import Image from 'next/image';

const services = [
  {
    title: 'Growth & Revenue Focused',
    description: 'Scale Your Recurring RevenueContent: Define And Deploy Subscription Plans Instantly Without Technical Bottlenecks. Convert More Users By Offering Adaptable Pricing Tiers, Trial Periods, And A High-Converting Pricing Table Widget Designed To Maximize Subscribers.',
    image: '/images/landing/service_1.png',
  },
  {
    title: 'Convenient Payment Handling',
    description: 'Handle Partial And Bulk Payments Flexibly With Multiple Payment Methods And Automated Reminders. Benefit From Secure Transactions Through Payment Links And Hosted Payment Pages.',
    image: '/images/landing/service_2.png',
  },
  {
    title: 'Integrated Billing Workflow',
    description: 'Streamline Your Entire Revenue Cycle In One Place. Seamlessly Convert Quotes Into Invoices, Capture Billable Project Hours, And Track Expenses—Ensuring Every Transaction Is Fast, Accurate, And Fully Compliant With Regional Regulations.',
    image: '/images/landing/service_3.png',
  },
  {
    title: 'Powerful Business Insights',
    description: 'Make Informed Decisions With Powerful Metrics, Including Sales, Receivables, Revenue, And Churn Insights. Stay One Step Ahead With Comprehensive Business Analytics That Fuel Your Growth.',
    image: '/images/landing/service_4.png',
  },
];

export function Services() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[2rem] py-8  md:p-12 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
              
              <div className="mt-auto relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden">
                 <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

const businessTypes = [
  {
    title: "Small Businesses",
    description: "Manage customers, payments, and inventory without complexity",
    image: "/images/landing/Small.png",
    gradient: "from-cyan-200 via-cyan-300 to-pink-300",
  },
  {
    title: "SaaS Startups",
    description: "Handle recurring billing, plans and growth metrics in one dashboard",
    image: "/images/landing/Garage-1.png",
    gradient: "from-blue-200 via-indigo-300 to-purple-300",
  },
  {
    title: "Gyms & Fitness Clubs",
    description: "Manage membership, recurring payments, and customer activity easily",
    image: "/images/landing/Gas-station-1.png",
    gradient: "from-teal-200 via-emerald-300 to-pink-300",
  },
  {
    title: "Agencies",
    description: "Bill clients on recurring plans and track revenue effortlessly",
    image: "/images/landing/Garage-2.png",
    gradient: "from-indigo-200 via-purple-300 to-pink-300",
  },
  {
    title: "Subscription Box Companies",
    description: "Track subscriptions, inventory levels, and deliveries in one place",
    image: "/images/landing/Shoe-store-1.png",
    gradient: "from-blue-200 via-cyan-300 to-purple-300",
  },
  {
    title: "Digital Service Providers",
    description: "Automate billing for ongoing services and retain customers longer",
    image: "/images/landing/Garage-3.png",
    gradient: "from-cyan-200 via-blue-300 to-indigo-300",
  },
];

export function BusinessTypes() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
            One Platform For Every Subscription Business
          </h2>
          <div className="inline-block px-6 py-2 rounded-full text-md text-gray-300 mb-8">
            From startups to gyms and agencies, Recura adapts to your business model
          </div>
          <div>
            <h4 className=" px-4 py-1 rounded text-xl text-gray-300">
              Built For Recurring Revenue Businesses.
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessTypes.map((type, index) => (
            <div
              key={index}
              className={`group relative rounded-xl p-6 bg-gradient-to-br ${type.gradient} hover:scale-[1.02] transition-transform duration-300 flex items-center gap-4 h-full`}
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-contain drop-shadow-xl"
                  sizes="96px"
                />
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {type.title}
                </h3>
                <p className="text-slate-800 text-sm leading-snug">
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

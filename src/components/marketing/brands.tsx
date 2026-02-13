import Image from 'next/image';

const brands = [
  { name: 'Xiaomi', src: '/images/landing/xiaomi 1.png', width: 240, height: 100 },
  { name: 'Redragon', src: '/images/landing/redragon 1.png', width: 240, height: 100 },
  { name: 'OnePlus', src: '/images/landing/oneplus-2 1.png', width: 240, height: 100 },
  { name: 'Lenovo', src: '/images/landing/lenovo 1.png', width: 240, height: 100 },
  { name: 'Yamaha', src: '/images/landing/yamaha 1.png', width: 240, height: 100 },
];

export function Brands() {
  return (
    <section className="py-4 bg-white shadow-sm">
      <div className="container mx-auto px-2  flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border-y border-slate-200 bg-slate-50/50 ">
        <div className="md:w-auto shrink-0">
          <p className="text-slate-600 font-medium text-lg text-center md:text-left">
            Trusted by businesses <br className="hidden md:inline" />
            worldwide
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12 opacity-80 mix-blend-multiply">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="relative w-120 h-40 md:w-32 md:h-48 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={brand.src}
                alt={`${brand.name} logo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100px, 150px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

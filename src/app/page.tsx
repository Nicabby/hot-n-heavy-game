import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#f6f3e2'}}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #468675 0px, #468675 1px, transparent 1px, transparent 20px)`
        }}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Main logo/title section */}
          <div className="mb-12">
            <div className="w-48 h-48 mx-auto mb-8">
              <Image
                src="/images/TGOLbase.png"
                alt="The Game of Lifestyle Logo"
                width={192}
                height={192}
                className="mx-auto"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight font-sans" 
                style={{color: '#bb3309'}}>
              The Game of Lifestyle
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8" style={{color: '#5b5450'}}>
              Digital Version
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/lobby"
                className="px-12 py-4 rounded-full text-white text-xl font-bold transform hover:scale-105 transition-all duration-200 shadow-lg"
                style={{backgroundColor: '#bb3309'}}
              >
                Start Playing
              </Link>
              
              <button className="px-8 py-4 rounded-full border-2 text-lg font-semibold transition-all duration-200 hover:bg-opacity-20"
                      style={{
                        borderColor: '#468675',
                        color: '#468675',
                        backgroundColor: 'transparent'
                      }}>
                How to Play
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

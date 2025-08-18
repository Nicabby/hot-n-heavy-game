'use client'

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="viewport-container" style={{backgroundColor: '#f6f3e2'}}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #468675 0px, #468675 1px, transparent 1px, transparent 20px)`
        }}></div>
      </div>
      
      <div className="content-wrapper text-center z-10 relative">
        {/* Main logo/title section */}
        <div className="mb-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6">
            <Image
              src="/images/TGOLbase.png"
              alt="The Game of Lifestyle Logo"
              width={192}
              height={192}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-sans px-4" 
              style={{color: '#bb3309'}}>
            The Game of Lifestyle
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 px-4" style={{color: '#5b5450'}}>
            Digital Version
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 max-w-md mx-auto">
          <Link 
            href="/lobby"
            className="w-full px-8 py-4 rounded-full text-white text-lg font-bold transition-all duration-200 shadow-lg text-center hover:opacity-90 hover:scale-105"
            style={{backgroundColor: '#bb3309'}}
          >
            Start Playing
          </Link>
          
          <button 
            className="w-full px-8 py-4 rounded-full border-2 text-lg font-semibold transition-all duration-200 text-center hover:scale-105"
            style={{
              borderColor: '#468675',
              color: '#468675',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#468675';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#468675';
            }}
          >
            How to Play
          </button>
        </div>
      </div>
    </div>
  );
}
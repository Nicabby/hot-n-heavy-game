'use client'

import React from 'react'

interface TGOLLogoProps {
  variant?: 'corporate' | 'icebreaker' | 'hotAndHeavy' | 'extraHot' | 'wetAndWild' | 'threesome'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function TGOLLogo({ 
  variant = 'corporate', 
  size = 'md',
  className = '' 
}: TGOLLogoProps) {
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  }
  
  const getColors = () => {
    switch (variant) {
      case 'icebreaker':
        return {
          border: '#B9340B',
          topBg: '#498379',
          bottomBg: '#498379', 
          centerBg: '#F7F3E2',
          topText: '#F7F3E2',
          centerText: '#B9340B',
          bottomText: '#F7F3E2'
        }
      case 'hotAndHeavy':
        return {
          border: '#498379',
          topBg: '#B9340B',
          bottomBg: '#B9340B',
          centerBg: '#F7F3E2', 
          topText: '#F7F3E2',
          centerText: '#498379',
          bottomText: '#F7F3E2'
        }
      case 'extraHot':
        return {
          border: '#498379',
          topBg: '#B9340B',
          bottomBg: '#B9340B',
          centerBg: '#F7F3E2',
          topText: '#F7F3E2', 
          centerText: '#498379',
          bottomText: '#F7F3E2'
        }
      case 'wetAndWild':
        return {
          border: '#034078',
          topBg: '#05A2D6',
          bottomBg: '#05A2D6',
          centerBg: '#F7F3E2',
          topText: '#F7F3E2',
          centerText: '#034078', 
          bottomText: '#F7F3E2'
        }
      case 'threesome':
        return {
          border: '#DE6F20',
          topBg: '#7C812B',
          bottomBg: '#DE6F20',
          centerBg: '#F7F3E2',
          topText: '#F7F3E2',
          centerText: '#DE6F20',
          bottomText: '#F7F3E2'
        }
      default: // corporate
        return {
          border: '#B9340B',
          topBg: '#498379', 
          bottomBg: '#498379',
          centerBg: '#F7F3E2',
          topText: '#F7F3E2',
          centerText: '#B9340B',
          bottomText: '#F7F3E2'
        }
    }
  }
  
  const colors = getColors()
  const edition = variant === 'corporate' ? '' : 
    variant === 'icebreaker' ? 'Ice Breaker Edition' :
    variant === 'hotAndHeavy' ? "Hot 'n Heavy Edition" :
    variant === 'extraHot' ? 'Extra Hot Vol. 1' :
    variant === 'wetAndWild' ? "Wet 'n Wild Edition" :
    'Threesome Edition'
  
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer Border Circle */}
        <circle
          cx="100"
          cy="100" 
          r="95"
          fill={colors.border}
          stroke="none"
        />
        
        {/* Inner Cream Ring */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill={colors.centerBg}
          stroke="none"
        />
        
        {/* Top Arc Background */}
        <path
          d="M 15 100 A 85 85 0 0 1 185 100 L 160 100 A 60 60 0 0 0 40 100 Z"
          fill={colors.topBg}
        />
        
        {/* Bottom Arc Background */}
        <path
          d="M 40 100 A 60 60 0 0 0 160 100 L 185 100 A 85 85 0 0 1 15 100 Z"
          fill={colors.bottomBg}
        />
        
        {/* Top Text - "The game of" */}
        <text
          x="100"
          y="75"
          textAnchor="middle"
          className="font-mission text-[16px] fill-current"
          style={{ fill: colors.topText }}
        >
          The game of
        </text>
        
        {/* Center Text - "LIFESTYLE" */}
        <text
          x="100" 
          y="108"
          textAnchor="middle"
          className="font-futura-bold text-[28px] fill-current tracking-wider"
          style={{ fill: colors.centerText }}
        >
          LIFESTYLE
        </text>
        
        {/* Bottom Text - Edition name or star */}
        {edition ? (
          <text
            x="100"
            y="140"
            textAnchor="middle" 
            className="font-mission text-[12px] fill-current"
            style={{ fill: colors.bottomText }}
          >
            {edition}
          </text>
        ) : null}
        
        {/* Star */}
        <text
          x="100"
          y={edition ? "160" : "150"}
          textAnchor="middle"
          className="text-[20px] fill-current"
          style={{ fill: colors.bottomText }}
        >
          ★
        </text>
      </svg>
    </div>
  )
}
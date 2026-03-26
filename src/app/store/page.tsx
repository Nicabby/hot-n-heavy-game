'use client'

import Link from 'next/link'
import TGOLBrandLogo from '@/components/TGOLBrandLogo'

const products = [
  {
    id: 'starter-deck',
    name: 'TGOL Starter Deck',
    price: '$29.99',
    description: 'Perfect for couples new to the game. Includes 100 cards across all spice levels.',
    image: '/images/starter-deck.jpg',
    features: ['100 Premium Cards', 'Levels 1-3', 'Couples Focused', 'Discreet Packaging'],
    wixUrl: '#' // Placeholder - PM will provide
  },
  {
    id: 'party-pack',
    name: 'TGOL Party Pack',
    price: '$49.99',
    description: 'Designed for groups and parties. 200 cards with group dynamics and challenges.',
    image: '/images/party-pack.jpg',
    features: ['200 Premium Cards', 'All Levels 1-5', 'Group Activities', 'Party Instructions'],
    wixUrl: '#' // Placeholder - PM will provide
  },
  {
    id: 'ultimate-collection',
    name: 'TGOL Ultimate Collection',
    price: '$89.99',
    description: 'The complete TGOL experience. Every card, expansion packs, and premium accessories.',
    image: '/images/ultimate-collection.jpg',
    features: ['500+ Premium Cards', 'All Levels & Categories', 'Luxury Box', 'Bonus Accessories', 'Free Digital Access'],
    wixUrl: '#' // Placeholder - PM will provide
  }
]

export default function Store() {
  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: '#F7F3E2' }}
    >
      {/* Header */}
      <header className="w-full py-6">
        <TGOLBrandLogo />
      </header>
      
      <main className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center font-futura-medium text-lg hover:opacity-70 transition-opacity mb-6"
            style={{ color: '#B9340B' }}
          >
            ← BACK TO HOME
          </Link>
          <h1 
            className="text-4xl font-futura-bold tracking-wide mb-4"
            style={{ color: '#B9340B' }}
          >
            TGOL STORE
          </h1>
          <p 
            className="text-xl font-futura max-w-2xl mx-auto"
            style={{ color: '#555555' }}
          >
            Get the premium physical card experience delivered discreetly to your door
          </p>
        </div>

        {/* Trust Badges */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-12 border border-tgol-green/20">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📦</span>
              <div>
                <h3 className="font-semibold text-gray-800">Discreet Packaging</h3>
                <p className="text-sm text-gray-600">Plain brown boxes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚚</span>
              <div>
                <h3 className="font-semibold text-gray-800">Fast Shipping</h3>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-semibold text-gray-800">Secure Checkout</h3>
                <p className="text-sm text-gray-600">SSL encrypted</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold text-gray-800">Money Back</h3>
                <p className="text-sm text-gray-600">30-day guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-tgol-red/20 overflow-hidden hover:shadow-2xl transition-all">
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-tgol-red/10 to-rose-100 flex items-center justify-center">
                <div className="text-6xl">📚</div>
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-tgol-red">{product.name}</h3>
                  <span className="text-2xl font-bold text-tgol-green">{product.price}</span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => window.open(product.wixUrl, '_blank')}
                  className="w-full bg-tgol-red text-white py-3 px-6 rounded-full hover:bg-tgol-red/90 transition-colors font-semibold"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Physical Cards */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-rose-300/20">
          <h2 className="text-3xl font-bold text-rose-600 text-center mb-8">Why Choose Physical Cards?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-600">Luxurious card stock with beautiful Gil Elvgren-inspired artwork</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold text-lg mb-2">No Screens</h3>
              <p className="text-sm text-gray-600">Keep devices away for intimate, focused connection</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-semibold text-lg mb-2">Perfect Gift</h3>
              <p className="text-sm text-gray-600">Surprise your partner or friends with a unique experience</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="font-semibold text-lg mb-2">Romantic Ambiance</h3>
              <p className="text-sm text-gray-600">Candlelit evenings without screen glare</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-tgol-green/20">
          <h2 className="text-3xl font-bold text-tgol-green text-center mb-8">What Our Players Say</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-tgol-cream/50 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(star => <span key={star} className="text-yellow-400">⭐</span>)}
              </div>
              <p className="text-gray-700 italic mb-4">
                "TGOL brought so much fun and intimacy back to our relationship. The cards are beautifully designed!"
              </p>
              <p className="text-sm text-gray-600">- Sarah & Mike, married 7 years</p>
            </div>
            
            <div className="bg-tgol-cream/50 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(star => <span key={star} className="text-yellow-400">⭐</span>)}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Perfect for our couples' game night. Everyone had a blast and it broke the ice beautifully."
              </p>
              <p className="text-sm text-gray-600">- The Johnsons & friends</p>
            </div>
            
            <div className="bg-tgol-cream/50 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(star => <span key={star} className="text-yellow-400">⭐</span>)}
              </div>
              <p className="text-gray-700 italic mb-4">
                "High quality cards with tasteful, artistic design. Much better than similar games we've tried."
              </p>
              <p className="text-sm text-gray-600">- Alex & Jordan</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-lg mb-2">How discreet is the packaging?</h3>
              <p className="text-gray-600">All orders ship in plain brown boxes with no external branding or product descriptions. The return address is generic.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">What age range is this appropriate for?</h3>
              <p className="text-gray-600">TGOL is designed for adults 18+ only. The content ranges from flirty and romantic to more intimate, depending on the spice level.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Can we play with just two people?</h3>
              <p className="text-gray-600">Absolutely! While TGOL works great for groups, it's equally fun and intimate for couples.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">What if we don't like a particular card or category?</h3>
              <p className="text-gray-600">The golden rule is that anyone can skip any card without explanation. You're also free to remove cards from the deck that don't suit your preferences.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Do you offer international shipping?</h3>
              <p className="text-gray-600">Currently we ship within the US and Canada. International shipping coming soon!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
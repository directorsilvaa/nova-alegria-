import React, { useState } from 'react';
import { Search, ArrowLeft, Heart } from 'lucide-react';

// ... (keep all the existing categories and menuItems constants)

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('bolinhos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (itemName: string) => {
    setFavorites(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2 hover:text-primary transition-colors group">
                <ArrowLeft className="h-6 w-6 text-primary group-hover:-translate-x-1 transition-transform" />
                <span className="text-white group-hover:text-primary">Voltar</span>
              </a>
            </div>

            <div className="flex items-center">
              <img 
                src="/img/logo.png" 
                alt="Nova Alegria" 
                className="h-10 object-contain"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto relative z-10">
        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar no cardápio..."
            className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-sm rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-12 scrollbar-hide">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/20'
                    : 'bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border border-gray-800'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[selectedCategory]?.map((item, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-black/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 border border-gray-800"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(item.name)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/80 backdrop-blur-md hover:bg-black/60 transition-all group/btn"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors ${
                      favorites.includes(item.name)
                        ? 'text-primary fill-primary'
                        : 'text-white group-hover/btn:text-primary'
                    }`}
                  />
                </button>

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-black/80 backdrop-blur-md text-white border border-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-primary text-white font-bold">
                  R$ {item.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
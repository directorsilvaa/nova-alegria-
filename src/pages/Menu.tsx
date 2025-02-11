import React, { useState } from 'react';
import { Search, ArrowLeft, Heart } from 'lucide-react';

const categories = [
  { id: 'bolinhos', name: 'Bolinhos', icon: '🍘' },
  { id: 'carnes', name: 'Carnes', icon: '🥩' },
  { id: 'chapas', name: 'Na Chapa', icon: '🔥' },
  { id: 'frango', name: 'Frango', icon: '🍗' },
  { id: 'petiscos', name: 'Petiscos', icon: '🍢' },
  { id: 'bebidas', name: 'Bebidas', icon: '🍺' },
];

const menuItems = {
  bolinhos: [
    {
      name: 'Bolinhos Mistos',
      price: '31,00',
      description: 'Porção com 8 unidades de bolinhos variados',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Popular', 'Novo']
    },
    {
      name: 'Bolinhos de Bacalhau',
      price: '31,00',
      description: 'Porção com 8 unidades de bolinhos de bacalhau',
      image: 'https://images.unsplash.com/photo-1621841957884-1210fe19b48d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Clássico']
    },
  ],
  carnes: [
    {
      name: 'Carne de Sol na Chapa',
      price: '80,00',
      description: 'Carne de sol grelhada com acompanhamentos (350g)',
      image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Favorito']
    },
    {
      name: 'Costela Desfiada',
      price: '88,90',
      description: 'Costela desfiada com farofa especial (350g)',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Premium']
    },
  ],
  chapas: [
    {
      name: 'Chapão Misto',
      price: '98,90',
      description: 'Com carne do sol, frango, legumes e queijo (750g)',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Chef Choice']
    },
  ],
  frango: [
    {
      name: 'Asinha Crocante',
      price: '43,90',
      description: 'Com molho de mostarda e mel (1Kg)',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Porção']
    },
  ],
  petiscos: [
    {
      name: 'Polvo Vinagrete',
      price: '89,00',
      description: 'Polvo grelhado ao vinagrete',
      image: 'https://images.unsplash.com/photo-1599861543714-d1b4a2aa3241?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Premium']
    },
  ],
  bebidas: [
    {
      name: 'Cerveja Artesanal',
      price: '18,90',
      description: 'Long neck 355ml',
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Bebidas']
    },
  ],
};

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

  const filteredItems = menuItems[selectedCategory]?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Base black background */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Red gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-black"></div>
        
        {/* Restaurant image with reduced opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg shadow-sm border-b border-primary/10">
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
            className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-sm rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-primary/10"
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
                    : 'bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border border-primary/10'
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
          {filteredItems?.map((item, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-black/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 border border-primary/10"
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
                      className="px-3 py-1 text-xs font-medium rounded-full bg-black/80 backdrop-blur-md text-white border border-primary/10"
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
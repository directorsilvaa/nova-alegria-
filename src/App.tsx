import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Search, Instagram, MapPin, Clock, Phone } from 'lucide-react';
import Menu from './pages/Menu';
import About from './pages/About';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentWord, setCurrentWord] = useState(0);

  const descriptiveWords = [
    'Favorita',
    'Deliciosa',
    'Especial',
    'Saborosa',
    'Incrível'
  ];

  const featuredDishes = [
    {
      name: "Chapão Misto",
      description: "Com carne do sol, frango, legumes e queijo",
      price: "98,90",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Carne de Sol na Chapa",
      description: "Suculenta carne de sol grelhada com acompanhamentos",
      price: "80,00",
      image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Bolinhos de Bacalhau",
      description: "Crocantes por fora, macios por dentro",
      price: "31,00",
      image: "https://images.unsplash.com/photo-1621841957884-1210fe19b48d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDish((prev) => (prev + 1) % featuredDishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % descriptiveWords.length);
    }, 2000);
    return () => clearInterval(wordInterval);
  }, []);

  if (currentPage === 'menu') {
    return <Menu />;
  }

  if (currentPage === 'about') {
    return <About />;
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Restaurant Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/img/logo.png" 
                alt="Nova Alegria" 
                className="h-10 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Nossos Produtos', page: 'menu' },
                { name: 'Espera Digital', page: 'wait' },
                { name: 'Vale-Presente', page: 'gift' },
                { name: 'Delivery', page: 'delivery' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentPage(item.page)}
                  className="text-gray-800 hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-800 hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-800 hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4 px-4">
                {[
                  { name: 'Nossos Produtos', page: 'products' },
                  { name: 'Espera Digital', page: 'wait' },
                  { name: 'Vale-Presente', page: 'gift' },
                  { name: 'Delivery', page: 'delivery' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCurrentPage(item.page);
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-800 hover:text-primary transition-colors text-left py-2"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Sua Comida
                <span className="block h-[1.2em] relative">
                  <span 
                    key={currentWord}
                    className="absolute inset-0 text-primary animate-fade-in"
                  >
                    {descriptiveWords[currentWord]}
                  </span>
                </span>
                <span className="block">Mais Perto</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-md">
                Seu serviço perfeito para saborear os melhores pratos da culinária local.
                Peça agora e receba em casa!
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                {featuredDishes.map((dish, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      currentDish === index
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-110'
                    }`}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-20 relative z-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore o seu <span className="text-primary">#MomentoNovaAlegria</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra nossas promoções especiais e momentos únicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Promo Cards */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Happy Hour"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90">
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Happy Hour</h3>
                  <p className="text-gray-300">Segunda a Sexta, 17h às 20h</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Delivery"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90">
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Delivery</h3>
                  <p className="text-gray-300">Peça agora mesmo</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1621841957884-1210fe19b48d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Sobremesas"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90">
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Sobremesas</h3>
                  <p className="text-gray-300">Experimente nossas delícias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Venha nos <span className="text-primary">Visitar</span>
            </h2>
            <p className="text-xl text-gray-600">
              Estamos esperando por você com o melhor da gastronomia local
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px] group shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Location Map"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90"></div>
              
              {/* Info Cards */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Hours Card */}
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 p-3 rounded-xl">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-gray-900 font-semibold">Horário</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Segunda a Sexta: 11h - 23h<br />
                      Sábado e Domingo: 11h - 00h
                    </p>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 p-3 rounded-xl">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-gray-900 font-semibold">Contato</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      (75) 3333-3333<br />
                      contato@novaalegria.com.br
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="lg:pl-12">
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="bg-primary/10 p-4 rounded-2xl">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Nossa Localização</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Avenida Jorge Amado,<br />
                      Praça do Imbuí
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h4 className="text-gray-900 font-semibold mb-2">Como Chegar</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Estamos localizados em um ponto privilegiado da cidade, com fácil acesso 
                      e amplo estacionamento. Próximo aos principais pontos de referência da região.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center space-x-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors group shadow-lg shadow-primary/10"
                    >
                      <span>Ver no Google Maps</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                    <button className="flex-1 inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors shadow-lg">
                      <span>Fazer Reserva</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 relative z-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Bom mesmo é curtir um <span className="text-primary">#MomentoNovaAlegria</span> com quem a gente gosta.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Também queremos ver o seu! Poste usando nossa hashtag.
            </p>
          </div>

          {/* Instagram Feed Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              "https://images.unsplash.com/photo-1544025162-d76694265947",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
              "https://images.unsplash.com/photo-1621841957884-1210fe19b48d"
            ].map((img, index) => (
              <div key={index} className="group relative aspect-square overflow-hidden rounded-xl shadow-lg bg-white">
                <img
                  src={`${img}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`}
                  alt={`Momento ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 flex items-center text-white">
                    <Instagram className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">@novaalegria</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-3 text-white text-sm">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {Math.floor(Math.random() * 500) + 100}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"/>
                      </svg>
                      {Math.floor(Math.random() * 50) + 10}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram Follow Button */}
          <div className="text-center">
            <a 
              href="https://www.instagram.com/nova.alegria?igsh=MTQ2cDFvMWJ0ZTJ1Mw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-full hover:from-primary/90 hover:to-primary/70 transition-all group shadow-lg"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Siga-nos no Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Nova Alegria</h3>
              <p className="text-gray-400 leading-relaxed">
                O melhor da gastronomia local em um só lugar. Venha nos visitar e 
                descubra sabores únicos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cardápio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Reservas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Eventos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  Avenida Jorge Amado, Praça do Imbuí
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  (75) 3333-3333
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horário</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Segunda a Sexta: 11h - 23h</li>
                <li>Sábado e Domingo: 11h - 00h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 Nova Alegria. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
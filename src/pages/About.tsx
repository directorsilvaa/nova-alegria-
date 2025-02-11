import React from 'react';
import { ArrowLeft } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-white">
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
            <a href="/" className="flex items-center space-x-2 text-gray-800 hover:text-primary transition-colors">
              <ArrowLeft className="h-6 w-6" />
              <span>Voltar</span>
            </a>
            
            <div className="flex items-center">
              <img 
                src="/img/logo.png" 
                alt="Nova Alegria" 
                className="h-10 object-contain"
              />
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Sobre Nós</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Desde 2010, o Nova Alegria tem sido sinônimo de excelência gastronômica em Feira de Santana. 
                Nossa missão é proporcionar momentos únicos através de pratos excepcionais e um ambiente acolhedor.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cada prato é preparado com ingredientes selecionados e técnicas refinadas, 
                resultando em uma experiência gastronômica memorável para nossos clientes.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Nossa cozinha"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
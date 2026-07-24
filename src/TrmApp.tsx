import { useState, useRef } from 'react';

export default function TrmApp() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#F4F4F5', color: '#18181B' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-page-bg/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/trmapp/icon circulo.png" 
              alt="TRM App Logo" 
              className="w-10 h-10 object-contain rounded-xl border border-gray-300"
            />
            <span className="font-bold text-lg tracking-tight">Tu Recordatorio Médico APK descarga</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-12 md:py-20 max-w-5xl mx-auto flex flex-col items-center text-center">
        <img 
          src="/trmapp/banner.png" 
          alt="TRM App Banner" 
          className="w-full max-w-2xl h-48 sm:h-64 md:h-80 object-cover rounded-3xl mb-8 border border-gray-300 shadow-sm" 
        />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-ink">
          Tu Recordatorio Médico
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Una aplicación de recordatorio de medicamentos limpia y confiable, diseñada para mantenerte a ti y a tus seres queridos al día sin complicaciones.
        </p>
        <a 
          href="https://github.com/zizza13/portafolio-maqueta/releases/download/V1.0.0/app-release.apk"
          className="inline-block px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-transform transform active:scale-95 hover:shadow-xl"
          style={{ backgroundColor: '#ff1731' }}
        >
          Descargar APK
        </a>
      </section>

      {/* App Previews */}
      <section className="py-12 bg-white/40 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-6">
          <h2 className="text-2xl font-bold">Vistas Previas</h2>
        </div>
        
        <div className="max-w-6xl mx-auto relative group px-0 md:px-12">
          <button 
            onClick={() => scroll('left')} 
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all text-gray-800 items-center justify-center"
            aria-label="Anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={() => scroll('right')} 
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all text-gray-800 items-center justify-center"
            aria-label="Siguiente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Horizontal scroll container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 px-4 md:px-0 pb-6 snap-x snap-mandatory hide-scrollbar scroll-smooth w-full"
          >
            {[
              '/trmapp/SS playstore 01.png',
              '/trmapp/SS playstore 02.png',
              '/trmapp/SS playstore 03.png',
              '/trmapp/SS playstore 04.png',
              '/trmapp/SS playstore 05.jpg',
              '/trmapp/SS playstore 06.jpg',
              '/trmapp/SS playstore 07.png',
              '/trmapp/SS playstore 08.jpg'
            ].map((src, idx) => (
              <img 
                key={idx}
                src={src} 
                alt={`Screenshot ${idx + 1}`}
                onClick={() => setSelectedImage(src)}
                className="snap-center shrink-0 h-72 sm:h-80 md:h-96 w-auto object-contain rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity bg-white"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Installation Guide */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo Instalar</h2>
          <p className="text-gray-600">Sigue estos 4 sencillos pasos para instalar y empezar a usar TRM en tu dispositivo Android.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(255,23,49,0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff1731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Paso 1: Descargar</h3>
            <p className="text-gray-600 text-sm">Toca el botón de "Descargar APK" de arriba para guardar el archivo de instalación en tu dispositivo.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(255,23,49,0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff1731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Paso 2: Permitir Orígenes</h3>
            <p className="text-gray-600 text-sm">Ve a Configuración &gt; Seguridad y habilita "Permitir desde este origen" o fuentes desconocidas para autorizarlo.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(255,23,49,0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff1731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
                <path d="M9 11l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Paso 3: Instalar</h3>
            <p className="text-gray-600 text-sm">Abre el archivo APK descargado y toca "Instalar" para finalizar la configuración de forma segura.</p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(255,23,49,0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff1731" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Paso 4: Proteger</h3>
            <p className="text-gray-600 text-sm">Recuerda que después de hacer la instalación, vuelve a bloquear "Allow from this source" para que estés protegido.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Tu Recordatorio Médico. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Hide scrollbar styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Fullscreen Screenshot" 
            className="max-w-full max-h-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

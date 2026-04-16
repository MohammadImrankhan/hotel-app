
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
    }
  }

  const next = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length)
    }
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="relative py-28 px-6 bg-charcoal-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Gallery"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-4">Visual Journey</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Gallery</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
          <p className="font-body text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            A glimpse into the world that awaits you at Serenova — through light, texture, and unforgettable moments.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="sticky top-20 z-30 bg-ivory border-b border-charcoal-100 py-5 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto scrollbar-hide justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-charcoal-900 text-white border-charcoal-900'
                  : 'border-charcoal-200 text-charcoal-500 hover:border-gold-400 hover:text-gold-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-12 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <ScrollReveal key={${img.src}-${i}} delay={i * 40} className="break-inside-avoid">
                <div
                  className={relative overflow-hidden cursor-pointer group ${img.tall ? 'h-80' : 'h-56'}}
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.thumb}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <ZoomIn size={24} className="text-white mx-auto mb-2" />
                      <span className="font-body text-xs tracking-widest uppercase text-white">{img.title}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-body text-xs text-white/70 tracking-wider">{img.category}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 w-12 h-12 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 w-12 h-12 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <ChevronRight size={24} />
          </button>
          <div
            className="max-w-5xl w-full mx-12 md:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="mt-4 text-center">
              <p className="font-serif text-lg text-white">{filtered[lightboxIndex].title}</p>
              <p className="font-body text-xs tracking-wider uppercase text-white/40 mt-1">{filtered[lightboxIndex].category}</p>
            </div>
            <div className="mt-3 text-center">
              <p className="font-body text-xs text-white/30">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
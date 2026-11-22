import { useEffect } from 'react';
import { Phone, MapPin, X } from 'lucide-react';
import { BoutiqueItem, BUSINESS_INFO } from '../data/boutique';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  item: BoutiqueItem | null;
  onClose: () => void;
  onEnquire: (category: BoutiqueItem['category']) => void;
}

export function ProductModal({ item, onClose, onEnquire }: ProductModalProps) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#292522]/70 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#F8F5F0] border border-[#E8DCCB] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#F8F5F0]/90 text-[#292522] hover:text-[#641E32] border border-[#E8DCCB] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#641E32]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="aspect-[3/4] bg-[#E8DCCB]/40 overflow-hidden">
          <ResilientImage
            src={item.image}
            alt={item.alt}
            fallbackLabel={item.category}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-between bg-[#F8F5F0]">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-[#B89A65] font-medium mb-3">
              {BUSINESS_INFO.name}
            </p>
            <h3
              id="product-modal-title"
              className="font-serif text-3xl text-[#292522] font-normal mb-6"
            >
              {item.category}
            </h3>

            <div className="h-[1px] w-14 bg-[#B89A65] mb-6" />

            <p className="text-sm leading-relaxed text-[#292522]/80 mb-8">
              Available as part of our women&apos;s ready-made clothing selection at{' '}
              {BUSINESS_INFO.name} in {BUSINESS_INFO.city}. Visit the boutique or
              reach out directly for availability.
            </p>

            <div className="space-y-4 border-t border-[#E8DCCB] pt-6 text-xs text-[#292522]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#641E32] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#641E32] shrink-0" />
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="hover:text-[#641E32] transition-colors font-medium tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-[#E8DCCB] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                const cat = item.category;
                onClose();
                onEnquire(cat);
              }}
              className="flex-1 py-3.5 px-6 text-xs tracking-[0.15em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors text-center cursor-pointer"
            >
              Enquire Now
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="flex-1 py-3.5 px-6 text-xs tracking-[0.15em] uppercase font-medium border border-[#292522] text-[#292522] hover:bg-[#292522] hover:text-[#F8F5F0] transition-colors text-center whitespace-nowrap"
            >
              Call Boutique
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

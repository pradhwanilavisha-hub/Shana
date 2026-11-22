import { useState, useEffect, FormEvent } from 'react';
import { X, Check, Phone, MapPin, Copy } from 'lucide-react';
import { BUSINESS_INFO, GarmentCategory } from '../data/boutique';

interface EnquiryModalProps {
  isOpen: boolean;
  initialCategory?: GarmentCategory;
  onClose: () => void;
}

const GARMENT_OPTIONS: GarmentCategory[] = [
  'Crop Tops',
  'Garara',
  'Sharara',
  'Gowns',
  'Ready-Made Garments',
];

export function EnquiryModal({
  isOpen,
  initialCategory = 'Ready-Made Garments',
  onClose,
}: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<GarmentCategory>(initialCategory);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please enter your name and phone number.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
    setCopied(false);
    setError('');
  };

  const summaryText = `Enquiry for ${BUSINESS_INFO.name} (${BUSINESS_INFO.city})\nName: ${name}\nPhone: ${phone}\nCategory: ${category}${message ? `\nNote: ${message}` : ''}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#292522]/70 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#F8F5F0] border border-[#E8DCCB] shadow-2xl p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry dialog"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#292522] hover:text-[#641E32] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#641E32]"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-xs tracking-[0.18em] uppercase text-[#B89A65] font-medium mb-2">
          {BUSINESS_INFO.name}
        </p>
        <h3
          id="enquiry-modal-title"
          className="font-serif text-2xl sm:text-3xl text-[#292522] font-normal mb-6"
        >
          Enquire Now
        </h3>

        {submitted ? (
          <div className="space-y-6">
            <div className="p-5 bg-[#E8DCCB]/40 border border-[#B89A65]/40">
              <div className="flex items-center gap-2.5 text-[#641E32] font-medium text-sm mb-2">
                <Check className="w-4 h-4" />
                <span>Enquiry Prepared</span>
              </div>
              <p className="text-xs leading-relaxed text-[#292522]/85">
                Thank you, {name}. Connect directly with {BUSINESS_INFO.name} by
                calling {BUSINESS_INFO.phoneDisplay} or copying your enquiry summary below.
              </p>
            </div>

            <div className="p-4 bg-white/60 border border-[#E8DCCB] text-xs text-[#292522]/90 whitespace-pre-line leading-relaxed">
              {summaryText}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs tracking-[0.14em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs tracking-[0.14em] uppercase font-medium border border-[#292522] text-[#292522] hover:bg-[#292522] hover:text-[#F8F5F0] transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied' : 'Copy Details'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="text-xs tracking-[0.12em] uppercase text-[#292522]/70 hover:text-[#641E32] underline underline-offset-4 cursor-pointer"
            >
              Send Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-xs text-[#641E32] bg-[#641E32]/10 px-3 py-2 border border-[#641E32]/20">
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="modal-name"
                className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
              >
                Your Name
              </label>
              <input
                id="modal-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 text-sm bg-white/80 border border-[#E8DCCB] text-[#292522] focus:outline-none focus:border-[#641E32] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="modal-phone"
                className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
              >
                Phone Number
              </label>
              <input
                id="modal-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91"
                className="w-full px-4 py-3 text-sm bg-white/80 border border-[#E8DCCB] text-[#292522] focus:outline-none focus:border-[#641E32] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="modal-category"
                className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
              >
                Category
              </label>
              <select
                id="modal-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as GarmentCategory)}
                className="w-full px-4 py-3 text-sm bg-white/80 border border-[#E8DCCB] text-[#292522] focus:outline-none focus:border-[#641E32] transition-colors"
              >
                {GARMENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="modal-message"
                className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
              >
                Message
              </label>
              <textarea
                id="modal-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what you are looking for"
                className="w-full px-4 py-3 text-sm bg-white/80 border border-[#E8DCCB] text-[#292522] focus:outline-none focus:border-[#641E32] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 text-xs tracking-[0.15em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors cursor-pointer"
            >
              Enquire Now
            </button>

            <div className="pt-4 border-t border-[#E8DCCB] flex flex-col gap-2 text-xs text-[#292522]/75">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#641E32]" />
                <a href={BUSINESS_INFO.phoneHref} className="hover:text-[#641E32] tabular-nums">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#641E32] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

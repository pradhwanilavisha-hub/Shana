import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, ArrowRight, Check, Copy } from 'lucide-react';
import {
  ATELIER_IMAGE,
  BoutiqueItem,
  BUSINESS_INFO,
  CATALOG_ITEMS,
  CATEGORIES,
  FEATURED_COLLECTIONS,
  GarmentCategory,
  HERO_IMAGE,
} from './data/boutique';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { ProductModal } from './components/ProductModal';
import { EnquiryModal } from './components/EnquiryModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';

const GARMENT_OPTIONS: GarmentCategory[] = [
  'Crop Tops',
  'Garara',
  'Sharara',
  'Gowns',
  'Ready-Made Garments',
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | GarmentCategory>('All');
  const [activeProduct, setActiveProduct] = useState<BoutiqueItem | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState<GarmentCategory>('Ready-Made Garments');

  // Inline contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCategory, setContactCategory] = useState<GarmentCategory>('Ready-Made Garments');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');
  const [addressCopied, setAddressCopied] = useState(false);

  const filteredItems =
    selectedCategory === 'All'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === selectedCategory);

  const openEnquiry = (category: GarmentCategory = 'Ready-Made Garments') => {
    setEnquiryCategory(category);
    setEnquiryModalOpen(true);
  };

  const handleExploreCategory = (category: GarmentCategory) => {
    setSelectedCategory(category);
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.address);
      setAddressCopied(true);
      setTimeout(() => setAddressCopied(false), 2000);
    } catch {
      setAddressCopied(false);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      setContactError('Please enter your name and phone number.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#292522] flex flex-col">
      {/* A. Top Announcement Bar & B. Sticky Header and Navigation */}
      <Navbar onEnquire={() => openEnquiry()} />

      <main className="flex-1">
        {/* C. Hero Banner */}
        <section
          id="home"
          className="relative w-full min-h-[78vh] lg:min-h-[85vh] flex items-end bg-[#292522] overflow-hidden"
        >
          <div className="absolute inset-0">
            <ResilientImage
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fallbackLabel={BUSINESS_INFO.name}
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#292522]/85 via-[#292522]/35 to-[#292522]/15"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#292522]/60 via-[#292522]/20 to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-xs tracking-[0.24em] uppercase text-[#E8DCCB] font-medium mb-4">
                {BUSINESS_INFO.city} · West Bengal
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F8F5F0] tracking-tight leading-[1.1] mb-5">
                {BUSINESS_INFO.name}, {BUSINESS_INFO.city}
              </h1>
              <p className="text-sm sm:text-base text-[#E8DCCB] font-light tracking-wide leading-relaxed max-w-lg mb-5">
                {BUSINESS_INFO.category} — crop tops, garara, sharara, gowns and ready-made garments.
              </p>

              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F8F5F0]/90 mb-8 max-w-xl">
                <MapPin className="w-4 h-4 text-[#B89A65] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#collections"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs tracking-[0.16em] uppercase font-medium bg-[#F8F5F0] text-[#292522] hover:bg-[#E8DCCB] transition-colors duration-200 whitespace-nowrap shrink-0"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-xs tracking-[0.16em] uppercase font-medium border border-[#E8DCCB]/80 text-[#F8F5F0] hover:bg-[#641E32] hover:border-[#641E32] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Enquire Now
                </button>
                <a
                  href={BUSINESS_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Shana's Boutique directly on WhatsApp"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.16em] uppercase font-medium bg-[#1F7A4C] text-[#F8F5F0] hover:bg-[#17613b] transition-colors duration-200 whitespace-nowrap shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Shop Section */}
        <section id="shop" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#E8DCCB]">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#B89A65] font-medium mb-3">
                Ready-Made Selection
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292522]">
                Shop
              </h2>
            </div>

            {/* Interactive Category Filter Controls */}
            <div
              role="tablist"
              aria-label="Filter garments by category"
              className="flex flex-wrap items-center gap-2"
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#641E32] text-[#F8F5F0]'
                        : 'bg-[#E8DCCB]/45 text-[#292522] hover:bg-[#E8DCCB]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredItems.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setActiveProduct(item)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8DCCB]/35 border border-[#E8DCCB] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#641E32]"
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.alt}
                    fallbackLabel={item.category}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </button>

                <div className="pt-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl font-normal text-[#292522]">
                      {item.category}
                    </h3>
                    <span className="text-[11px] tracking-[0.14em] uppercase text-[#B89A65] whitespace-nowrap">
                      {BUSINESS_INFO.city}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveProduct(item)}
                      className="flex-1 py-2.5 px-4 text-xs tracking-[0.14em] uppercase font-medium border border-[#292522]/30 text-[#292522] hover:border-[#292522] hover:bg-[#292522] hover:text-[#F8F5F0] transition-colors duration-200 whitespace-nowrap cursor-pointer"
                    >
                      View Product
                    </button>
                    <button
                      type="button"
                      onClick={() => openEnquiry(item.category)}
                      className="flex-1 py-2.5 px-4 text-xs tracking-[0.14em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors duration-200 whitespace-nowrap cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Collections Section */}
        <section
          id="collections"
          className="py-20 lg:py-28 bg-[#E8DCCB]/35 border-y border-[#E8DCCB]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-xl mb-14">
              <p className="text-xs tracking-[0.2em] uppercase text-[#B89A65] font-medium mb-3">
                {BUSINESS_INFO.name}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292522] mb-4">
                Collections
              </h2>
              <p className="text-sm leading-relaxed text-[#292522]/80">
                Women&apos;s fashion clothing including crop tops, garara, sharara, gowns and
                other ready-made garments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {FEATURED_COLLECTIONS.map((collection, idx) => (
                <motion.div
                  key={collection.category}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative aspect-[3/4] overflow-hidden bg-[#292522]"
                >
                  <ResilientImage
                    src={collection.image}
                    alt={collection.alt}
                    fallbackLabel={collection.category}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#292522]/85 via-[#292522]/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start">
                    <h3 className="font-serif text-2xl font-normal text-[#F8F5F0] mb-3">
                      {collection.category}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleExploreCategory(collection.category)}
                      className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium text-[#E8DCCB] hover:text-[#F8F5F0] transition-colors cursor-pointer"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[340px] bg-[#E8DCCB]/40 border border-[#E8DCCB] overflow-hidden">
                <ResilientImage
                  src={ATELIER_IMAGE.src}
                  alt={ATELIER_IMAGE.alt}
                  fallbackLabel={BUSINESS_INFO.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center py-2">
              <p className="text-xs tracking-[0.2em] uppercase text-[#B89A65] font-medium mb-3">
                About Us
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292522] mb-6 leading-tight">
                {BUSINESS_INFO.name}
              </h2>

              <div className="h-[1px] w-16 bg-[#B89A65] mb-7" />

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#292522]/85 mb-9">
                <p>
                  {BUSINESS_INFO.name} is a women&apos;s ready-made clothing boutique located in{' '}
                  {BUSINESS_INFO.city}, West Bengal.
                </p>
                <p>
                  Our ready-made garment selection includes women&apos;s fashion clothing, crop
                  tops, garara, sharara, gowns and other ready-made garments.
                </p>
                <p className="text-sm text-[#292522]/75">
                  Visit us at {BUSINESS_INFO.address}.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-xs tracking-[0.15em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors whitespace-nowrap"
                >
                  Explore Collection
                </a>
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="inline-flex items-center justify-center px-7 py-3.5 text-xs tracking-[0.15em] uppercase font-medium border border-[#292522] text-[#292522] hover:bg-[#292522] hover:text-[#F8F5F0] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 lg:py-28 bg-[#E8DCCB]/30 border-t border-[#E8DCCB]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left: Verified Address & Phone */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#B89A65] font-medium mb-3">
                    Contact
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292522] mb-6">
                    Visit {BUSINESS_INFO.name}
                  </h2>
                  <div className="h-[1px] w-16 bg-[#B89A65] mb-8" />

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[#641E32] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-[#292522]/60 mb-1.5">
                          Boutique Address
                        </p>
                        <p className="text-sm leading-relaxed text-[#292522]">
                          {BUSINESS_INFO.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-[#641E32] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-[#292522]/60 mb-1.5">
                          Telephone
                        </p>
                        <a
                          href={BUSINESS_INFO.phoneHref}
                          className="text-base font-medium text-[#292522] hover:text-[#641E32] transition-colors tabular-nums"
                        >
                          {BUSINESS_INFO.phoneDisplay}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={BUSINESS_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-medium bg-[#1F7A4C] text-[#F8F5F0] hover:bg-[#17613b] transition-colors whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Boutique</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-medium border border-[#292522]/40 text-[#292522] hover:border-[#292522] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {addressCopied ? (
                      <Check className="w-3.5 h-3.5 text-[#641E32]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{addressCopied ? 'Address Copied' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>

              {/* Right: Boutique Enquiry Form */}
              <div className="lg:col-span-7 bg-[#F8F5F0] border border-[#E8DCCB] p-8 sm:p-10 lg:p-12">
                <h3 className="font-serif text-2xl font-normal text-[#292522] mb-2">
                  Enquire Now
                </h3>
                <p className="text-xs tracking-wide text-[#292522]/70 mb-8">
                  Women&apos;s ready-made clothing enquiries for {BUSINESS_INFO.name},{' '}
                  {BUSINESS_INFO.city}.
                </p>

                {contactSubmitted ? (
                  <div className="space-y-6">
                    <div className="p-5 bg-[#E8DCCB]/40 border border-[#B89A65]/40">
                      <div className="flex items-center gap-2.5 text-[#641E32] font-medium text-sm mb-2">
                        <Check className="w-4 h-4" />
                        <span>Enquiry Ready</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#292522]/85">
                        Thank you, {contactName}. To complete your enquiry for{' '}
                        {contactCategory}, please call us directly on{' '}
                        {BUSINESS_INFO.phoneDisplay}.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={BUSINESS_INFO.phoneHref}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{BUSINESS_INFO.phoneDisplay}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactName('');
                          setContactPhone('');
                          setContactMessage('');
                        }}
                        className="px-6 py-3.5 text-xs tracking-[0.15em] uppercase font-medium border border-[#292522]/40 text-[#292522] hover:border-[#292522] transition-colors cursor-pointer"
                      >
                        New Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    {contactError && (
                      <p className="text-xs text-[#641E32] bg-[#641E32]/10 px-3 py-2 border border-[#641E32]/20">
                        {contactError}
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 text-sm bg-white/80 border border-[#E8DCCB] text-[#292522] focus:outline-none focus:border-[#641E32] transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+91"
                          className="w-full px-4 py-3 text-sm bg-white/80 border border-[#E8DCCB] text-[#292522] focus:outline-none focus:border-[#641E32] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-category"
                        className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
                      >
                        Garment Category
                      </label>
                      <select
                        id="contact-category"
                        value={contactCategory}
                        onChange={(e) => setContactCategory(e.target.value as GarmentCategory)}
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
                        htmlFor="contact-message"
                        className="block text-xs tracking-[0.12em] uppercase text-[#292522]/80 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Share your enquiry"
                        className="w-full px-4 py-3 text-sm bg-white/80 border border-[#E8DCCB] text-[#292522] focus:outline-none focus:border-[#641E32] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.16em] uppercase font-medium bg-[#641E32] text-[#F8F5F0] hover:bg-[#4e1626] transition-colors cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#292522] text-[#F8F5F0] border-t border-[#B89A65]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#E8DCCB]/15">
            <div>
              <p className="font-serif text-2xl font-normal text-[#F8F5F0] mb-3">
                {BUSINESS_INFO.name}
              </p>
              <p className="text-xs tracking-wide text-[#E8DCCB]/80 leading-relaxed">
                {BUSINESS_INFO.category}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-[#B89A65] mb-3">
                Navigation
              </p>
              <ul className="space-y-2 text-xs tracking-[0.1em] uppercase text-[#E8DCCB]/85">
                <li>
                  <a href="#home" className="hover:text-[#F8F5F0] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#F8F5F0] transition-colors">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#collections" className="hover:text-[#F8F5F0] transition-colors">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#F8F5F0] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#F8F5F0] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-[#B89A65] mb-3">
                Address &amp; Contact
              </p>
              <p className="text-xs leading-relaxed text-[#E8DCCB]/85 mb-3">
                {BUSINESS_INFO.address}
              </p>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="text-xs font-medium text-[#F8F5F0] hover:text-[#B89A65] transition-colors tabular-nums"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.12em] uppercase text-[#E8DCCB]/60">
            <p>&copy; {new Date().getFullYear()} {BUSINESS_INFO.name}</p>
            <p>{BUSINESS_INFO.shortAddress}</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        item={activeProduct}
        onClose={() => setActiveProduct(null)}
        onEnquire={(category) => openEnquiry(category)}
      />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        initialCategory={enquiryCategory}
        onClose={() => setEnquiryModalOpen(false)}
      />

      {/* Floating Direct WhatsApp Contact Icon */}
      <a
        href={BUSINESS_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Shana's Boutique"
        title="Contact on WhatsApp"
        className="fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-[#1F7A4C] text-[#F8F5F0] shadow-lg hover:bg-[#17613b] hover:scale-105 transition-all duration-200 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F7A4C]"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </div>
  );
}

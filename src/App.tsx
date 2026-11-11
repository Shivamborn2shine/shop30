import React, { useState } from 'react';
import { JacketIntro } from './components/JacketIntro';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MinimalReviewStudio } from './components/MinimalReviewStudio';
import { WhatsAppCatalogue } from './components/WhatsAppCatalogue';
import { FeaturedDrops } from './components/FeaturedDrops';
import { StoreGallery } from './components/StoreGallery';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleReplayIntro = () => {
    sessionStorage.removeItem('vicecity_intro_seen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReplayKey((prev) => prev + 1);
    setIntroComplete(false);
  };

  const scrollToReviewStudio = () => {
    const el = document.getElementById('review-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#ECE8DF] text-[#141414] flex justify-center selection:bg-[#D5AF55] selection:text-black">
      {/* Leather Jacket Zipper Opening Overlay */}
      {!introComplete && (
        <JacketIntro
          key={replayKey}
          onComplete={() => setIntroComplete(true)}
        />
      )}

      {/* Mobile-First Luxury Editorial Container */}
      <main className="w-full max-w-[440px] min-h-screen bg-[#FAF9F6] border-x border-[#E2DDD2] shadow-xl relative overflow-x-hidden">
        <Header />

        <HeroBanner onImageClick={() => scrollToReviewStudio()} />

        {/* 3-Step Visual Review Studio */}
        <div id="review-studio">
          <MinimalReviewStudio onShowToast={showToast} />
        </div>

        {/* Shop on WhatsApp (Sage Card + 2x2 Quick Inquiry Pills) */}
        <WhatsAppCatalogue />

        {/* Featured In-Store Drops */}
        <FeaturedDrops onSelectCategory={() => scrollToReviewStudio()} />

        {/* Inside Vice City Store Gallery */}
        <StoreGallery />

        {/* Visit Our Store & Footer */}
        <Footer onReplayIntro={handleReplayIntro} />

        <Toast message={toastMessage} />
      </main>
    </div>
  );
};

export default App;

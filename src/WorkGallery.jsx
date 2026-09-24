
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const galleryData = {
  automotive: {
    title: "Automotive Stories",
    subtitle: "Engineering, detail, motion & aesthetics",
    folder: "automotive-stories",
  },

  events: {
    title: "Events & Culture",
    subtitle: "Crowds, cities, culture & atmosphere",
    folder: "events-culture",
  },

  cinematic: {
    title: "Cinematic Storytelling",
    subtitle: "Emotion, immersion & narrative",
    folder: "cinematic-storytelling",
  },
};

export default function WorkGallery({
  category,
  onClose,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const gallery = galleryData[category];

  const images = gallery
    ? Array.from({ length: 40 }, (_, index) => {
        const number = String(index + 1).padStart(2, "0");

        return `/images/galleries/${gallery.folder}/${number}.jpg`;
      })
    : [];

  const closeImage = () => setSelectedImage(null);

  const nextImage = () => {
    setSelectedImage((current) =>
      current === null ? null : (current + 1) % images.length
    );
  };

  const previousImage = () => {
    setSelectedImage((current) =>
      current === null
        ? null
        : (current - 1 + images.length) % images.length
    );
  };

  // Lock background scrolling while the gallery is open.

  useEffect(() => {
    if (!gallery) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [gallery]);

  // Keyboard navigation.

  useEffect(() => {
    if (!gallery) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (selectedImage !== null) {
          closeImage();
        } else {
          onClose();
        }
      }

      if (selectedImage !== null) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          nextImage();
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previousImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gallery, selectedImage, onClose, images.length]);

  if (!gallery) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${gallery.title} gallery`}
      className="fixed inset-0 z-[9999] overflow-y-auto bg-[#111111] text-white"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-12 md:py-12">

        {/* Gallery Header */}

        <div className="mb-10 flex items-start justify-between gap-6">

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">
              The Kapture Collection
            </p>

            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {gallery.title}.
            </h2>

            <p className="mt-3 text-sm text-white/60">
              {gallery.subtitle}
            </p>

            <p className="mt-2 text-xs text-white/40">
              40 photographs
            </p>
          </div>

          {/* Close Gallery */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="sticky top-4 z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-black"
          >
            <X size={22} />
          </button>

        </div>

        {/* Gallery Grid: 4 columns, 10 rows */}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">

          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View photograph ${index + 1}`}
              className="group relative aspect-[3/2] overflow-hidden rounded-xl bg-white/5"
            >
              <img
                src={image}
                alt={`${gallery.title} photograph ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}

        </div>

        {/* Gallery Footer */}

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs tracking-[0.2em] text-white/40">
            KAPTURE VISUALS © 2026
          </p>
        </div>

      </div>

      {/* Full-screen Image Viewer */}

      {selectedImage !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded photograph"
          className="fixed inset-0 z-[10000] flex flex-col bg-black/95 text-white"
        >

          {/* Top Navigation */}

          <div className="flex items-center justify-between px-4 py-4 md:px-8">

            {/* Back to Gallery */}

            <button
              type="button"
              onClick={closeImage}
              aria-label="Back to gallery"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm transition hover:bg-white hover:text-black"
            >
              <ArrowLeft size={18} />
              <span>Back to gallery</span>
            </button>

            {/* Close Button */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-black"
            >
              <X size={22} />
            </button>

          </div>

          {/* Image and Navigation Arrows */}

          <div className="flex min-h-0 flex-1 items-center justify-between gap-2 px-2 md:gap-6 md:px-8">

            {/* Previous Photograph */}

            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous photograph"
              className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-black md:h-14 md:w-14"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Expanded Photograph */}

            <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">

              <img
                key={images[selectedImage]}
                src={images[selectedImage]}
                alt={`${gallery.title} photograph ${selectedImage + 1}`}
                className="max-h-[75vh] max-w-full object-contain"
              />

            </div>

            {/* Next Photograph */}

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next photograph"
              className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-black md:h-14 md:w-14"
            >
              <ChevronRight size={28} />
            </button>

          </div>

          {/* Photograph Counter */}

          <div className="px-4 py-5 text-center">
            <p className="text-sm tracking-[0.2em] text-white/50">
              {String(selectedImage + 1).padStart(2, "0")}
              {" / "}
              {images.length}
            </p>
          </div>

        </div>
      )}

    </div>,
    document.body
  );
}
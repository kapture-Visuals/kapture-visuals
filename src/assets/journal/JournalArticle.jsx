import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";

import { getArticleContributors } from "./JournalData";

/* ----------------------------------------
   DATE HELPERS
---------------------------------------- */

const formatFullDate = (date) => {
  if (!date) return "";

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatEventDates = (article) => {
  const start = formatFullDate(article.eventStartDate);
  const end = formatFullDate(article.eventEndDate);

  if (!start) return "";

  if (!end || article.eventStartDate === article.eventEndDate) {
    return start;
  }

  return `${start} — ${end}`;
};

/* ----------------------------------------
   TEXT HELPERS
---------------------------------------- */

const getParagraphs = (text) => {
  if (!text) return [];

  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

function Paragraph({ children }) {
  return (
    <p className="mb-5 text-[15px] leading-[1.85] text-black/70 md:text-[16px]">
      {children}
    </p>
  );
}

/* ----------------------------------------
   GALLERY HELPERS
---------------------------------------- */

const getGallery = (article) =>
  (article?.gallery || []).filter((image) => image?.src);

const getAllArticleImages = (article) =>
  getGallery(article).map((image) => image.src);

const getGalleryAtPosition = (
  gallery,
  sectionNumber,
  position,
  side
) =>
  gallery.filter(
    (image) =>
      Number(image.section) === Number(sectionNumber) &&
      image.position === position &&
      image.side === side
  );

/* ----------------------------------------
   PHOTO GROUP
---------------------------------------- */

function PhotoGroup({
  images,
  side,
  allImages,
  onOpenImage,
}) {
  if (!images?.length) return null;

  const count = images.length;

  const gridClass =
    count === 1
      ? "grid-cols-1"
      : count === 2
        ? "grid-cols-2"
        : count === 3
          ? "grid-cols-3"
          : "grid-cols-2";

  return (
    <>
      {/* ----------------------------------
          DESKTOP RAIL
      ---------------------------------- */}

      <div
        className={`
          pointer-events-none
          absolute
          top-1/2
          z-10
          hidden
          w-[230px]
          -translate-y-1/2
          md:flex
          ${
            side === "left"
              ? "right-[calc(100%+76px)] justify-end"
              : "left-[calc(100%+76px)] justify-start"
          }
        `}
      >
        {/* ----------------------------------

        {/* ----------------------------------
            PHOTO GRID

            LEFT rail  -> right aligned
            RIGHT rail -> left aligned
        ---------------------------------- */}

        <div
          className={`
            pointer-events-auto
            grid
            ${gridClass}
            items-center
            gap-2
            ${
              side === "left"
                ? "justify-items-end"
                : "justify-items-start"
            }
          `}
        >
          {images.map((image, index) => {
            const globalIndex = allImages.indexOf(image.src);

            const isLandscape =
              image.orientation === "landscape";

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => onOpenImage(globalIndex)}
                className="
                  group
                  flex
                  min-w-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border-0
                  bg-transparent
                  p-0
                  shadow-none
                  outline-none
                "
                aria-label={`Open photograph ${globalIndex + 1}`}
              >
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  className={`
                    block
                    h-auto
                    w-auto
                    rounded-xl
                    object-contain
                    transition
                    duration-300
                    group-hover:scale-[1.025]
                    ${
                      count === 1
                        ? isLandscape
                          ? "max-h-[145px] max-w-[220px]"
                          : "max-h-[190px] max-w-[145px]"
                        : count === 2
                          ? isLandscape
                            ? "max-h-[105px] max-w-[110px]"
                            : "max-h-[155px] max-w-[105px]"
                          : count === 3
                            ? isLandscape
                              ? "max-h-[90px] max-w-[72px]"
                              : "max-h-[135px] max-w-[70px]"
                            : isLandscape
                              ? "max-h-[95px] max-w-[105px]"
                              : "max-h-[140px] max-w-[105px]"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------
          MOBILE
      ---------------------------------- */}

      <div className="my-5 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const globalIndex = allImages.indexOf(image.src);

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => onOpenImage(globalIndex)}
                className="
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  border-0
                  bg-transparent
                  p-0
                  shadow-none
                  outline-none
                "
                aria-label={`Open photograph ${globalIndex + 1}`}
              >
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  className="
                    block
                    h-auto
                    max-h-[145px]
                    w-auto
                    max-w-[145px]
                    rounded-xl
                    object-contain
                  "
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ----------------------------------------
   STORY SECTION
---------------------------------------- */

function StorySection({
  section,
  sectionNumber,
  gallery,
  allImages,
  onOpenImage,
  isLast,
}) {
  const paragraphs = getParagraphs(section.text);

  return (
    <section className={isLast ? "pb-2" : "pb-12 md:pb-16"}>
      {/* SECTION HEADING */}

      {section.heading && (
        <div className="relative mb-7">
          {/* LEFT RAIL HEADING DOT */}

          <div
            className="
              absolute
              -left-[42px]
              top-1/2
              hidden
              h-3
              w-3
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-black/30
              bg-white
              md:block
            "
          />

          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {section.heading}
          </h2>
        </div>
      )}

      {/* PARAGRAPHS */}

      {paragraphs.map((paragraph, index) => {
        const position = `after-${index + 1}`;

        const leftImages = getGalleryAtPosition(
          gallery,
          sectionNumber,
          position,
          "left"
        );

        const rightImages = getGalleryAtPosition(
          gallery,
          sectionNumber,
          position,
          "right"
        );

        const hasLeftImages = leftImages.length > 0;
        const hasRightImages = rightImages.length > 0;

        return (
          <div
            key={`${sectionNumber}-${index}`}
            className="relative"
          >
            <Paragraph>{paragraph}</Paragraph>

            {/* LEFT RAIL CONNECTION */}

            {hasLeftImages && (
              <>
                <div
                  className="
                    absolute
                    -left-[42px]
                    top-1/2
                    z-20
                    hidden
                    h-2.5
                    w-2.5
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-black/25
                    bg-white
                    md:block
                  "
                />

                <div
                  className="
                    absolute
                    right-[calc(100%+42px)]
                    top-1/2
                    hidden
                    h-px
                    w-[76px]
                    -translate-y-1/2
                    bg-black/15
                    md:block
                  "
                />
              </>
            )}

            {/* RIGHT RAIL CONNECTION */}

            {hasRightImages && (
              <>
                <div
                  className="
                    absolute
                    -right-[42px]
                    top-1/2
                    z-20
                    hidden
                    h-2.5
                    w-2.5
                    translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-black/25
                    bg-white
                    md:block
                  "
                />

                <div
                  className="
                    absolute
                    left-[calc(100%+42px)]
                    top-1/2
                    hidden
                    h-px
                    w-[76px]
                    -translate-y-1/2
                    bg-black/15
                    md:block
                  "
                />
              </>
            )}

            <PhotoGroup
              images={leftImages}
              side="left"
              allImages={allImages}
              onOpenImage={onOpenImage}
            />

            <PhotoGroup
              images={rightImages}
              side="right"
              allImages={allImages}
              onOpenImage={onOpenImage}
            />
          </div>
        );
      })}
    </section>
  );
}

/* ----------------------------------------
   LIGHTBOX
---------------------------------------- */

function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onChange,
}) {
  const isOpen =
    activeIndex !== null &&
    activeIndex >= 0 &&
    images[activeIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onChange(
          (activeIndex - 1 + images.length) %
            images.length
        );
      }

      if (event.key === "ArrowRight") {
        onChange(
          (activeIndex + 1) % images.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [
    isOpen,
    activeIndex,
    images,
    onClose,
    onChange,
  ]);

  if (!isOpen) return null;

  const previous = () => {
    onChange(
      (activeIndex - 1 + images.length) %
        images.length
    );
  };

  const next = () => {
    onChange(
      (activeIndex + 1) % images.length
    );
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/95
        p-4
        md:p-10
      "
      onClick={onClose}
    >
      {/* CLOSE */}

      <button
        type="button"
        onClick={onClose}
        className="
          absolute
          right-5
          top-5
          z-20
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-white/10
          text-white
          transition
          hover:bg-white/20
          md:right-8
          md:top-8
        "
        aria-label="Close photograph"
      >
        <X size={19} />
      </button>

      {/* PREVIOUS */}

      {images.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            previous();
          }}
          className="
            absolute
            left-3
            top-1/2
            z-20
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-white
            transition
            hover:bg-white/20
            md:left-8
            md:h-12
            md:w-12
          "
          aria-label="Previous photograph"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* IMAGE */}

      <img
        src={images[activeIndex]}
        alt=""
        className="max-h-[88vh] max-w-[88vw] object-contain"
        onClick={(event) => event.stopPropagation()}
      />

      {/* NEXT */}

      {images.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            next();
          }}
          className="
            absolute
            right-3
            top-1/2
            z-20
            flex
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-white
            transition
            hover:bg-white/20
            md:right-8
            md:h-12
            md:w-12
          "
          aria-label="Next photograph"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* COUNTER */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.18em] text-white/50 md:bottom-8">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}

/* ----------------------------------------
   FLOATING PROJECT CTA
---------------------------------------- */

function FloatingProjectCTA({ onBack }) {
  const handleClick = () => {
    // Close the article first
    onBack();

    // Wait for the homepage to render, then scroll to contact
    window.setTimeout(() => {
      const contactSection = document.getElementById("contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[180] rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:scale-[1.03] hover:bg-black/85 md:bottom-8 md:right-8"
      aria-label="Start a project"
    >
      Start a project →
    </button>
  );
}

/* ----------------------------------------
   ARTICLE
---------------------------------------- */

export default function JournalArticle({
  article,
  onBack,
}) {
  const [activeImage, setActiveImage] =
    useState(null);

  const contributors = article
    ? getArticleContributors(article)
    : [];

  const gallery = useMemo(
    () => (article ? getGallery(article) : []),
    [article]
  );

  const allImages = useMemo(
    () =>
      article
        ? getAllArticleImages(article)
        : [],
    [article]
  );

  if (!article) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white text-black">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Article not found.
          </h1>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 text-black/50 transition hover:text-black"
          >
            ← Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white text-black">

      {/* ==================================
          HERO
      ================================== */}

      <header className="relative min-h-[72vh] overflow-hidden bg-black text-white md:min-h-[82vh]">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/20" />

        {/* BACK */}

        <div className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto max-w-7xl px-6 py-7 md:px-10 md:py-9">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Journal
            </button>
          </div>
        </div>

        {/* HERO CONTENT */}

        <div className="relative z-[1] flex min-h-[72vh] items-end md:min-h-[82vh]">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:px-10 md:pb-16">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/60">
              KAPTURE / JOURNAL
            </p>

            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 md:text-xl md:leading-8">
                {article.excerpt}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/55">
              <span>
                {[article.city, article.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>

              <span>
                {formatEventDates(article)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================================
          STORY
      ================================== */}

      <main className="overflow-hidden px-6 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">

        {/*
          Entire editorial composition:

              LEFT RAIL
                  |
                  |    ARTICLE
                  |                 |
                                    RIGHT RAIL

          Text remains approximately 720px wide.

          The rails are absolute, so they NEVER
          modify paragraph height.
        */}

        <div className="mx-auto max-w-[1320px]">

          <div
            className="
              relative
              mx-auto
              pl-7
              md:max-w-[760px]
              md:px-[42px]
            "
          >

            {/* LEFT CONTINUOUS LINE */}

            <div
              className="
                absolute
                bottom-0
                left-0
                top-0
                hidden
                w-px
                bg-black/15
                md:block
              "
            />

            {/* RIGHT CONTINUOUS LINE */}

            <div
              className="
                absolute
                bottom-0
                right-0
                top-0
                hidden
                w-px
                bg-black/15
                md:block
              "
            />

            {/* MOBILE LINE */}

            <div
              className="
                absolute
                bottom-0
                left-0
                top-0
                w-px
                bg-black/15
                md:hidden
              "
            />

            {(article.sections || []).map(
              (section, index) => (
                <StorySection
                  key={`${section.heading}-${index}`}
                  section={section}
                  sectionNumber={index + 1}
                  gallery={gallery}
                  allImages={allImages}
                  onOpenImage={setActiveImage}
                  isLast={
                    index ===
                    article.sections.length - 1
                  }
                />
              )
            )}
          </div>
        </div>
      </main>

      {/* ==================================
          FILM
      ================================== */}

      {article.filmUrl && (
        <section className="bg-black px-6 py-20 text-white md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              KAPTURE / FILM
            </p>

            <a
              href={article.filmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 text-3xl font-semibold md:text-4xl"
            >
              Watch the film
              <ExternalLink size={26} />
            </a>
          </div>
        </section>
      )}

      {/* ==================================
          CONTRIBUTORS
      ================================== */}

      {contributors.length > 0 && (
        <section className="border-t border-black/10 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-10 text-xs uppercase tracking-[0.3em] text-black/40">
              CONTRIBUTORS
            </p>

            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              {contributors.map((person) => (
                <div
                  key={person.slug || person.id}
                >
                  {person.image && (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="mb-5 aspect-[3/4] w-full rounded-xl object-cover"
                    />
                  )}

                  <h3 className="text-lg font-semibold">
                    {person.name}
                  </h3>

                  <p className="mt-1 text-sm text-black/50">
                    {[
                      person.relationship ||
                        person.role,
                      person.brand,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>

                  {person.instagram && (
                    <a
                      href={
                        person.instagram.startsWith(
                          "http"
                        )
                          ? person.instagram
                          : `https://instagram.com/${person.instagram.replace(
                              "@",
                              ""
                            )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm text-black/40 transition hover:text-black"
                    >
                      Instagram ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================================
          LIGHTBOX
      ================================== */}

      <ImageLightbox
        images={allImages}
        activeIndex={activeImage}
        onClose={() => setActiveImage(null)}
        onChange={setActiveImage}
      />
      {/* FLOATING PROJECT CTA */}

      <FloatingProjectCTA onBack={onBack} />

    </div>
  );
}
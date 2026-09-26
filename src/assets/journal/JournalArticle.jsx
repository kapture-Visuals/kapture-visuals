import React from "react";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import {
  getArticleContributors,
} from "./JournalData";


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
   TEXT
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
    <p className="mb-7 text-[17px] leading-[1.9] text-black/70 md:text-[18px] text-justify">
      {children}
    </p>
  );
}


/* ----------------------------------------
   EDITORIAL IMAGE BLOCK
---------------------------------------- */

function EditorialBlock({ block }) {
  if (!block) return null;

  const images = (block.images || []).filter(Boolean);

  if (!images.length) return null;


  /* SINGLE FEATURE IMAGE */

  if (block.type === "image") {
    return (
      <figure className="my-12 md:my-16">

        <img
          src={images[0]}
          alt=""
          loading="lazy"
          className="w-full rounded-2xl object-cover"
        />

        {block.caption && (
          <figcaption className="mt-3 text-xs leading-5 text-black/40">
            {block.caption}
          </figcaption>
        )}

      </figure>
    );
  }


  /* TWO IMAGES */

  if (block.type === "pair") {
    return (
      <figure className="my-12 grid grid-cols-1 gap-4 md:my-16 md:grid-cols-2">

        {images.slice(0, 2).map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full rounded-2xl object-cover"
          />
        ))}

      </figure>
    );
  }


  /* FOUR IMAGE GRID */

  if (block.type === "grid-four") {
    return (
      <figure className="my-12 grid grid-cols-2 gap-3 md:my-16 md:gap-5">

        {images.slice(0, 4).map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={image}
              alt=""
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        ))}

      </figure>
    );
  }


  /* THREE IMAGE EDITORIAL */

  if (block.type === "editorial-three") {
    return (
      <figure className="my-12 grid gap-4 md:my-16 md:grid-cols-[1.5fr_1fr]">

        {images[0] && (
          <img
            src={images[0]}
            alt=""
            loading="lazy"
            className="h-full min-h-[360px] w-full rounded-2xl object-cover"
          />
        )}

        <div className="grid gap-4">

          {images.slice(1, 3).map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt=""
              loading="lazy"
              className="h-full min-h-[170px] w-full rounded-2xl object-cover"
            />
          ))}

        </div>

      </figure>
    );
  }


  return null;
}


/* ----------------------------------------
   SECTION
---------------------------------------- */

function StorySection({ section }) {
  const paragraphs = getParagraphs(section.text);
  const blocks = section.blocks || [];

  const blocksAt = (position) =>
    blocks.filter((block) => block.position === position);

  const splitAt = (position) =>
  blocks.find(
    (block) =>
      block.position === position &&
      block.type === "split"
  );

  return (
    <section className="mb-24 md:mb-32">

      {section.heading && (
        <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">
          {section.heading}
        </h2>
      )}

      {paragraphs.map((paragraph, index) => {
        const position = `after-${index + 1}`;

        const split = splitAt(position);

        const positionedBlocks = blocksAt(position).filter(
          (block) => block.type !== "split"
        );

        return (
          <React.Fragment key={index}>

            {split && split.images?.[0] ? (

              <div
                className={`my-12 grid items-center gap-8 md:my-16 md:grid-cols-2 md:gap-12 ${
                  split.imagePosition === "right"
                    ? ""
                    : "md:[&>*:first-child]:order-2"
                }`}
              >

                <div>
                  <Paragraph>
                    {paragraph}
                  </Paragraph>
                </div>

                <img
                  src={split.images[0]}
                  alt=""
                  loading="lazy"
                  className="w-full rounded-2xl object-cover"
                />

              </div>

            ) : (

              <Paragraph>
                {paragraph}
              </Paragraph>

            )}

            {positionedBlocks.map((block, blockIndex) => (
              <EditorialBlock
                key={`${position}-${blockIndex}`}
                block={block}
              />
            ))}

          </React.Fragment>
        );
      })}

      {blocksAt("end").map((block, index) => (
        <EditorialBlock
          key={`end-${index}`}
          block={block}
        />
      ))}

    </section>
  );
}


/* ----------------------------------------
   ARTICLE
---------------------------------------- */

export default function JournalArticle({
  article,
  onBack,
}) {
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


  const contributors =
    getArticleContributors(article);


  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white text-black">


      {/* ARTICLE HERO */}

      <header className="relative min-h-[72vh] overflow-hidden bg-black text-white md:min-h-[82vh]">

        {/* COVER IMAGE */}

        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}


        {/* CINEMATIC GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/20" />


        {/* BACK BUTTON */}

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

      {/* STORY */}

      <main className="mx-auto max-w-5xl px-6 pb-12 pt-16 md:px-10 md:pt-20">

        {(article.sections || []).map((section, index) => (
          <StorySection
            key={`${section.heading}-${index}`}
            section={section}
          />
        ))}

      </main>


      {/* FILM */}

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


      {/* CONTRIBUTORS */}

      {contributors.length > 0 && (
        <section className="border-t border-black/10 px-6 py-20 md:px-10">

          <div className="mx-auto max-w-5xl">

            <p className="mb-10 text-xs uppercase tracking-[0.3em] text-black/40">
              CONTRIBUTORS
            </p>

            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">

              {contributors.map((person) => (

                <div key={person.slug || person.id}>

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
                    {[person.relationship || person.role, person.brand]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>

                  {person.instagram && (
                    <a
                      href={
                        person.instagram.startsWith("http")
                          ? person.instagram
                          : `https://instagram.com/${person.instagram.replace("@", "")}`
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

    </div>
  );
}
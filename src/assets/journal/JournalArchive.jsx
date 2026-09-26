import React from "react";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

import {
  journalArticles,
  getArticleContributors,
} from "./JournalData";

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
};

const getLocation = (article) =>
  [article.city, article.country]
    .filter(Boolean)
    .join(", ");

const getCredits = (article) =>
  getArticleContributors(article)
    .map((person) => person.brand || person.name)
    .filter(Boolean)
    .join(" · ");

export default function JournalArchive({
  onOpenArticle,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black text-white">

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">

        {/* BACK */}

        <button
          type="button"
          onClick={onClose}
          className="mb-16 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Kapture Visuals
        </button>


        {/* HEADER */}

        <div className="mb-16">

          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/50">
            KAPTURE / JOURNAL
          </p>

          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Beyond the Frame.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            First-hand stories from the world of automotive culture.
          </p>

        </div>


        {/* ARTICLES */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {journalArticles.map((article) => {

            const credits = getCredits(article);

            return (
              <button
                key={article.slug}
                type="button"
                onClick={() =>
                  onOpenArticle?.(article.slug)
                }
                className="group text-left"
              >

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/10 md:aspect-[16/10]">

                  {/* IMAGE */}

                  <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />


                  {/* GRADIENT */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />


                  {/* CONTENT */}

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">

                    <div className="mb-3 flex items-center justify-between gap-4">

                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        {getLocation(article)}

                        {article.eventStartDate &&
                          ` · ${formatDate(
                            article.eventStartDate
                          )}`}
                      </p>

                      <ArrowUpRight
                        size={19}
                        className="shrink-0 text-white/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                      />

                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {article.title}
                    </h2>

                    {article.excerpt && (
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 md:text-base md:leading-7">
                        {article.excerpt}
                      </p>
                    )}

                    {credits && (
                      <p className="mt-4 text-xs text-white/45">
                        {credits}
                      </p>
                    )}

                  </div>

                </div>

              </button>
            );
          })}

        </div>

      </section>

    </div>
  );
}
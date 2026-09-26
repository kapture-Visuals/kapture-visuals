import React from "react";
import { ArrowUpRight } from "lucide-react";

import {
  latestJournalArticles,
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

const getCredits = (article) => {
  const contributors = getArticleContributors(article);

  return contributors
    .map((person) => person.brand || person.name)
    .filter(Boolean)
    .join(" · ");
};

function JournalSelection({
  onOpenArticle,
  onOpenJournal,
}) {
  const articles = latestJournalArticles;

  const [featured, ...secondary] = articles;

  if (!featured) return null;

  const openArticle = (article) => {
    onOpenArticle?.(article.slug);
  };

  return (
    <section
      id="journal"
      className="w-full bg-black py-20 text-white md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* SECTION HEADING */}

        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/60">
            KAPTURE / JOURNAL
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Beyond the Frame.
          </h2>

          <p className="mt-3 text-sm text-white/60 md:text-base">
            First-hand stories from the world of automotive culture.
          </p>
        </div>


        {/* FEATURED ARTICLE */}

        <button
          type="button"
          onClick={() => openArticle(featured)}
          className="group mb-12 block w-full text-left"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/10 md:aspect-[21/9]">

            <img
              src={featured.coverImage}
              alt={featured.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* GRADIENT */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />


            {/* CONTENT */}

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">

              <div className="mb-3 flex items-center justify-between gap-4">

                <p className="text-xs uppercase tracking-[0.2em] text-white/65">
                  {getLocation(featured)}
                  {featured.eventStartDate &&
                    ` · ${formatDate(featured.eventStartDate)}`}
                </p>

                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                />

              </div>

              <h3 className="text-2xl font-semibold tracking-tight md:text-4xl">
                {featured.title}
              </h3>

              {featured.excerpt && (
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75 md:text-base md:leading-7">
                  {featured.excerpt}
                </p>
              )}

              {getCredits(featured) && (
                <p className="mt-4 text-xs text-white/50">
                  {getCredits(featured)}
                </p>
              )}

            </div>

          </div>
        </button>


        {/* SECONDARY ARTICLES */}

        {secondary.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {secondary.map((article) => {

              const credits = getCredits(article);

              return (
                <button
                  key={article.slug}
                  type="button"
                  onClick={() => openArticle(article)}
                  className="group text-left"
                >

                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/10">

                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6">

                      <div className="mb-3 flex items-center justify-between gap-4">

                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                          {getLocation(article)}
                          {article.eventStartDate &&
                            ` · ${formatDate(article.eventStartDate)}`}
                        </p>

                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-white/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                        />

                      </div>

                      <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                        {article.title}
                      </h3>

                      {credits && (
                        <p className="mt-3 text-xs text-white/45">
                          {credits}
                        </p>
                      )}

                    </div>

                  </div>

                </button>
              );
            })}

          </div>
        )}


        {/* JOURNAL ARCHIVE BUTTON */}

        <div className="mt-14 flex justify-center">

          <button
            type="button"
            onClick={onOpenJournal}
            className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black"
          >
            Explore the Journal
            <ArrowUpRight size={16} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default JournalSelection;

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

function JournalSelection({ onOpenArticle, onOpenJournal }) {
  // Always select the three most recent events,
  // independently of their publication dates.

  const articles = latestJournalArticles;

  const [featured, ...secondary] = articles;

  if (!featured) return null;

  const openArticle = (article) => {
    if (onOpenArticle) {
      onOpenArticle(article.slug);
    }
  };

  return (
    <section
      id="journal"
      className="w-full bg-black text-white py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* SECTION HEADING */}

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
            KAPTURE / JOURNAL
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Beyond the Frame.
          </h2>

          <p className="text-sm md:text-base text-white/60 mt-3">
            First-hand stories from the world of automotive culture.
          </p>
        </div>

        {/* FEATURED ARTICLE */}

        <button
          type="button"
          onClick={() => openArticle(featured)}
          className="group block w-full text-left mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9] bg-white/10">

            <img
              src={featured.coverImage}
              alt={featured.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

          </div>

          <div className="mt-5">

            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
              Featured Story
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold group-hover:text-white/70 transition-colors">
              {featured.title}
            </h3>

            <p className="text-sm text-white/60 mt-2">
              {getLocation(featured)}
              {" · "}
              {formatDate(featured.eventStartDate)}
            </p>

            {featured.excerpt && (
              <p className="text-sm text-white/70 mt-3 max-w-3xl">
                {featured.excerpt}
              </p>
            )}

            {getCredits(featured) && (
              <p className="text-xs text-white/40 mt-3">
                {getCredits(featured)}
              </p>
            )}

          </div>
        </button>

        {/* TWO SECONDARY ARTICLES */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {secondary.map((article) => (

            <button
              key={article.slug}
              type="button"
              onClick={() => openArticle(article)}
              className="group text-left"
            >

              <div className="overflow-hidden rounded-xl aspect-[4/3] bg-white/10">

                <img
                  src={article.coverImage}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

              </div>

              <h3 className="text-xl font-semibold mt-4 group-hover:text-white/70 transition-colors">
                {article.title}
              </h3>

              <p className="text-sm text-white/60 mt-2">
                {getLocation(article)}
                {" · "}
                {formatDate(article.eventStartDate)}
              </p>

              {getCredits(article) && (
                <p className="text-xs text-white/40 mt-2">
                  {getCredits(article)}
                </p>
              )}

            </button>

          ))}

        </div>

        {/* JOURNAL ARCHIVE BUTTON */}

        <div className="flex justify-center mt-14">

          <button
            type="button"
            onClick={onOpenJournal}
            className="inline-flex items-center gap-3 border border-white/30 rounded-full px-7 py-3 text-sm hover:bg-white hover:text-black transition-all duration-300"
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
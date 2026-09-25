
/*
 * KAPTURE JOURNAL
 * Automatic content management
 *
 * Articles are loaded from content/journal.
 * Contributors are loaded from content/contributors.
 * Only published articles appear on the website.
 * Articles are sorted by event date, not publication date.
 */

// Import all Journal articles automatically
const journalFiles = import.meta.glob(
  "../../../content/journal/*.json",
  {
    eager: true,
    import: "default",
  }
);

// Import all contributor profiles automatically
const contributorFiles = import.meta.glob(
  "../../../content/contributors/*.json",
  {
    eager: true,
    import: "default",
  }
);

// Build the contributor directory
export const contributors = Object.values(
  contributorFiles
);


// Find a contributor using their ID, slug or name

export function getContributor(id) {
  if (!id) return undefined;

  const searchId = String(id).trim().toLowerCase();

  return contributors.find((contributor) => {
    return (
      contributor.slug?.toLowerCase() === searchId ||
      contributor.id?.toLowerCase() === searchId ||
      contributor.name?.toLowerCase() === searchId
    );
  });
}

// Load all Journal articles
const allArticles = Object.values(journalFiles);

console.log("ALL JOURNAL ARTICLES:", allArticles);

// Keep only published articles with valid event dates
export const journalArticles = allArticles
  .filter((article) => {
    return (
      article.status === "published" &&
      article.eventStartDate &&
      !Number.isNaN(
        Date.parse(article.eventStartDate)
      )
    );
  })
  .sort((a, b) => {
    // Newest event first
    const dateDifference =
      new Date(b.eventStartDate).getTime() -
      new Date(a.eventStartDate).getTime();

    // If two events have the same date,
    // sort them alphabetically
    if (dateDifference === 0) {
      return a.title.localeCompare(b.title);
    }

    return dateDifference;
  });

// Get the three most recent Journal articles
export const latestJournalArticles =
  journalArticles.slice(0, 3);

console.log("PUBLISHED ARTICLES:", journalArticles);

// Find a specific article using its slug
export function getJournalArticle(slug) {
  return journalArticles.find(
    (article) => article.slug === slug
  );
}

// Get the contributors associated with an article
export function getArticleContributors(article) {
  return (article.contributors || [])
    .map((id) => getContributor(id))
    .filter(Boolean);
}
export default function JournalCard({ article, onOpen }) {
  if (!article) return null;

  return (
    <article
      className="journal-card"
      onClick={() => onOpen?.(article)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={article.coverImage}
        alt={article.title}
        className="journal-card-image"
      />

      <div className="journal-card-content">
        <h3>{article.title}</h3>

        <p>
          {[
            article.city,
            article.country,
            article.eventStartDate?.slice(0, 4),
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {article.excerpt && (
          <p>{article.excerpt}</p>
        )}
      </div>
    </article>
  );
}
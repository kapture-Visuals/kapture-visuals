const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const journalDir = path.join(root, "content", "journal");
const eventsDir = path.join(root, "content", "events");

fs.mkdirSync(journalDir, { recursive: true });
fs.mkdirSync(eventsDir, { recursive: true });

const events = [
  {
    id: "24h-le-mans",
    name: "24 Hours of Le Mans",
    city: "Le Mans",
    country: "France",
    category: "Motorsport"
  },
  {
    id: "belgium-auto-show",
    name: "Belgium Auto Show",
    city: "",
    country: "Belgium",
    category: "Motor Show"
  },
  {
    id: "bfd",
    name: "BFD",
    city: "",
    country: "",
    category: ""
  },
  {
    id: "bimmerfest",
    name: "BimmerFest",
    city: "",
    country: "",
    category: "Automotive Gathering"
  },
  {
    id: "chantilly-arts-elegance",
    name: "Chantilly Arts & Élégance",
    city: "Chantilly",
    country: "France",
    category: "Concours"
  },
  {
    id: "hall-of-fame",
    name: "Hall of Fame",
    city: "",
    country: "",
    category: ""
  },
  {
    id: "hampton-court-palace",
    name: "Hampton Court Palace",
    city: "London",
    country: "United Kingdom",
    category: "Concours"
  },
  {
    id: "hasselt-concours-elegance",
    name: "Hasselt Concours d'Elegance",
    city: "Hasselt",
    country: "Belgium",
    category: "Concours"
  },
  {
    id: "hypercastle",
    name: "Hypercastle",
    city: "",
    country: "",
    category: ""
  },
  {
    id: "london-concours-elegance",
    name: "London Concours",
    city: "London",
    country: "United Kingdom",
    category: "Concours"
  },
  {
    id: "motor-valley-fest",
    name: "Motor Valley Fest",
    city: "Modena",
    country: "Italy",
    category: "Automotive Festival"
  },
  {
    id: "risenation-allstars",
    name: "RiseNation Allstars",
    city: "",
    country: "",
    category: ""
  },
  {
    id: "rupture2",
    name: "Rupture 2.0",
    city: "",
    country: "",
    category: ""
  },
  {
    id: "supercar-madness",
    name: "Supercar Madness",
    city: "",
    country: "",
    category: "Automotive Gathering"
  }
];

function writeIfMissing(filename, data) {

  if (fs.existsSync(filename)) {

    const existingContent = fs.readFileSync(
      filename,
      "utf8"
    ).trim();

    // Preserve files that already contain content
    if (existingContent.length > 0) {
      console.log(`Skipped existing content: ${filename}`);
      return;
    }

    console.log(`Populating empty file: ${filename}`);

  } else {

    console.log(`Creating new file: ${filename}`);

  }

  fs.writeFileSync(
    filename,
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );

}

for (const event of events) {

  const eventRecord = {
    name: event.name,
    slug: event.id,
    city: event.city,
    country: event.country,
    category: event.category,
    description: "",
    website: ""
  };

  writeIfMissing(
    path.join(eventsDir, `${event.id}.json`),
    eventRecord
  );

  const articleSlug = `${event.id}-2026`;

  const articleRecord = {
    title: `${event.name} 2026`,
    slug: articleSlug,

    event: event.id,

    eventStartDate: "",
    eventEndDate: "",

    city: event.city,
    country: event.country,

    coverImage:
      `/images/journal/${articleSlug}/cover.jpg`,

    excerpt: "",

    contributors: [],

    status: "draft",
    publishedAt: "",

    featured: false,

    sections: [],
    gallery: [],

    filmUrl: ""
  };

  writeIfMissing(
    path.join(journalDir, `${articleSlug}.json`),
    articleRecord
  );
}

console.log("Journal content generation complete.");
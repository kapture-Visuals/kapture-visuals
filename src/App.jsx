import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Film, Mail, Sparkles } from "lucide-react";
import PortfolioViewer from "./PortfolioViewer";
import WorkGallery from "./WorkGallery";
import JournalSelection from "./assets/journal/JournalSelection";
import JournalArchive from "./assets/journal/JournalArchive";
import JournalArticle from "./assets/journal/JournalArticle";
import {
  getJournalArticle,
  journalArticles,
} from "./assets/journal/JournalData";


const content = {
  siteName: "KAPTURE VISUALS",
  logo: "/images/logo-white.jpg",
  heroVideo: "/videos/hero.mp4",

  work: [
    {
      id: "automotive",
      title: "Automotive Stories",
      type: "Engineering, detail & aesthetics",
      image: "/images/automotive.jpg",
    },
    {
      id: "events",
      title: "Events & Culture",
      type: "Crowds, cities & atmosphere",
      image: "/images/events.jpg",
    },
    {
      id: "cinematic",
      title: "Cinematic Storytelling",
      type: "Emotion, immersion & narrative",
      image: "/images/cinematic.jpg",
    },
  ],

  services: [
    {
      icon: "photo",
      title: "Photography",
      text: "High-end photography and cinematic social media visuals.",
    },
    {
      icon: "video",
      title: "Video Production",
      text: "Fast-paced cinematic edits built around rhythm and storytelling.",
    },
    {
      icon: "brand",
      title: "Cinematic Branding",
      text: "Premium content designed to strengthen identity and brand presence.",
    },
  ],

  aboutImage: "/images/about.jpg",

  aboutParagraphs: [
    "Kapture Visuals was born from the strong belief that automotive culture has always been more than cars objects. Behind every machine lies something deeply human: the pursuit of improvement, precision, ambition and self-expression.",
    "Cars and bikes hence become experiences, memories and gateways to new places and perspectives.",
    "Through cinematic and immersive content, Kapture Visuals explores the atmosphere surrounding automotive culture across Europe, documenting not only the machines themselves, but the emotion, energy and moments that exist around them.",
  ],

  email: "kapture.visuals.production@gmail.com",
  instagram: "https://www.instagram.com/kapturevisuals.eu/",
};

function ServiceIcon({ type }) {
  if (type === "photo") return <Camera className="h-5 w-5" />;
  if (type === "video") return <Film className="h-5 w-5" />;
  return <Sparkles className="h-5 w-5" />;
}

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
};

const stats = [
  {
    value: "15+",
    label: "Projects Captured",
  },
  {
    value: "3+",
    label: "Countries Explored",
  },
  {
    value: "60+",
    label: "Visuals Stories Told",
  },
  {
    value: "250+",
    label: "Hours Behind the Camera",
  },
];

const logos = [
  "/logos/logo-Hall of Fame.png",
  "/logos/logo-BAS.png",
  "/logos/logo-GR8.png",
  "/logos/logo-Rupteur2.0 Trackday.png",
  "/logos/logo-Motor Valley Fest.png",
  "/logos/logo-bfd.png",
  "/logos/logo-bimmerfest.png",
  "/logos/logo-London Concours.png",
  "/logos/logo-24H Le Mans.png", 
  "/logos/logo-Supercar Madness.png",
  "/logos/logo-Chantilly.png",
  "/logos/logo-autoworld.png",
  "/logos/logo-Zoute Grand Prix.png",
  "/logos/logo-eurocrew.png",
];

export default function KaptureVisualsWebsite() {
  const [activeGallery, setActiveGallery] = useState(null);
  const [activeJournal, setActiveJournal] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  // ----------------------------------------
// JOURNAL URL ROUTING
// ----------------------------------------

useEffect(() => {
  const syncJournalFromUrl = () => {
    const path = window.location.pathname;
    const match = path.match(/^\/journal\/([^/]+)\/?$/);

    if (match) {
      const slug = decodeURIComponent(match[1]);
      const article = getJournalArticle(slug);

      if (article) {
        setActiveArticle(slug);
        setActiveJournal("article");
        return;
      }
    }

    if (path === "/journal" || path === "/journal/") {
      setActiveArticle(null);
      setActiveJournal("archive");
      return;
    }

    setActiveArticle(null);
    setActiveJournal(null);
  };

  syncJournalFromUrl();

  window.addEventListener("popstate", syncJournalFromUrl);

  return () => {
    window.removeEventListener("popstate", syncJournalFromUrl);
  };
}, []);

const openJournalArticle = (slug) => {
  setActiveArticle(slug);
  setActiveJournal("article");

  window.history.pushState(
    {},
    "",
    `/journal/${encodeURIComponent(slug)}`
  );
};

const openJournalArchive = () => {
  setActiveArticle(null);
  setActiveJournal("archive");

  window.history.pushState({}, "", "/journal");
};

const closeJournal = () => {
  setActiveArticle(null);
  setActiveJournal(null);

  window.history.pushState({}, "", "/");
};

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > window.innerHeight - 120);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  const contactSection = document.getElementById("contact");

  if (!contactSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setContactVisible(entry.isIntersecting);
    },
    {
      threshold: 0.15,
    }
  );

  observer.observe(contactSection);

  return () => {
    observer.disconnect();
  };
}, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap');
        
        html { scroll-behavior: smooth;
        }
        
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-black/10 bg-white/90"
            : "border-white/10 bg-black/10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <a href="/" aria-label="Kapture Visuals home">
            <img
              src={
                scrolled
                  ? "/images/logo-black.jpg"
                  : "/images/logo-white.jpg"
              }
              alt={content.siteName}
              className="h-24 w-auto"
            />
          </a>

          <div
            className={`hidden items-center gap-8 text-sm font-semibold transition-colors duration-500 md:flex ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            <a
              href="#work"
              className="transition hover:opacity-60"
            >
              Work
            </a>

            <a
              href="#journal"
              className="transition hover:opacity-60"
            >
              Journal
            </a>

            <a
              href="#portfolio"
              className="transition hover:opacity-60"
            >
              Portfolio
            </a>

            <a
              href="#services"
              className="transition hover:opacity-60"
            >
              Services
            </a>

            <a
              href="#about"
              className="transition hover:opacity-60"
            >
              About
            </a>

            <a
              href="#contact"
              className="transition hover:opacity-60"
            >
              Contact
            </a>
          </div>

        </div>
      </motion.nav>
 
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover opacity-99"
          >
            <source src={content.heroVideo} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"/>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-7xl">
                Cinematic <br />
                stories built <br />
                around motion.
              </h1>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <motion.a
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/85"
              >
                View the work <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                onClick={() =>
                  trackEvent("cta_start_project_click", {
                    location: "hero",
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Start a project
              </motion.a>

              <motion.a
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={content.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("instagram_click", {
                  location: "hero",
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Instagram
            </motion.a>
          </div>
        </div>
      </div>
    </section>

      <motion.section
        id="work"
        className="mx-auto max-w-7xl px-6 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">
              A growing visual archive of automotive culture
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-black md:text-5xl">
              Three worlds. One identity.
            </h2>
          </div>
        </motion.div>


        <div className="grid gap-6 md:grid-cols-3">
          {content.work.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              variants={fadeUp}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveGallery(item.id)}
              aria-label={`Open ${item.title} gallery`}
              className="group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover opacity-99 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 z-20 p-6">
                <p className="text-sm text-white/70">
                  {item.type}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
        
        
      </motion.section>

      {/* KAPTURE JOURNAL */}

      <JournalSelection
        onOpenArticle={openJournalArticle}
        onOpenJournal={openJournalArchive}
      />

      {/* Portfolio Section */}

      <motion.section
        id="portfolio"
        className="border-b border-black/10 bg-white px-6 pt-12 pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">
              The Portfolio
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black md:text-5xl">
              The Kapture Collection.
            </h2>

          </motion.div>

          {/* Embedded PDF Viewer */}

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-neutral-100 shadow-xl"
          >
            
            <PortfolioViewer />
          </motion.div>

          {/* Portfolio Actions */}

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="/portfolio/Kapture-Visuals-Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              Open Full Portfolio ↗
            </a>

            <a
              href="/portfolio/Kapture-Visuals-Portfolio.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
            >
              Download Portfolio ↓
            </a>
          </motion.div>

        </div>
      </motion.section>

      <motion.section
        id="services"
        className="border-y border-black/10 bg-neutral-100 px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.35em] text-black/40">
            Creative Direction
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 max-w-3xl text-4xl font-semibold text-black md:text-5xl">
            Content for brands, creators and automotive culture.
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <ServiceIcon type={service.icon} />
                </div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="mt-4 leading-7 text-black/60">{service.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

            {/* Journey So Far */}

      <motion.section
        id="journey"
        className="mx-auto max-w-7xl px-6 pb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.15 }}
      >

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-12"
      >

        <h2 className="text-sm uppercase tracking-[0.35em] text-black/40">
          The Journey So Far
        </h2>

        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black md:text-5xl">
          Kapture Visuals In Numbers.
        </h2>

      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {stats.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className="rounded-[2rem] border border-black/10 bg-neutral-50 p-10"
          >
            <div className="text-5xl font-semibold tracking-tight text-black md:text-6xl">
              {item.value}
            </div>

            <div className="mt-4 text-xs uppercase tracking-[0.25em] text-black/40">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      </motion.section>

      <motion.section
        id="about"
        className="mx-auto grid max-w-7xl items-start gap-16 px-6 pt-12 pb-8 md:grid-cols-[0.85fr_1.15fr]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp} className="overflow-hidden rounded-[2rem] border border-white/10">
          <img
            src={content.aboutImage}
            alt="Cinematic road"
            className="h-[565px] w-full object-cover object-center opacity-99 transition duration-700 hover:scale-105"
          />
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}>
          <p className="text-sm uppercase tracking-[0.35em] text-black/40">
            The idea behind Kapture Visuals
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-black md:text-5xl">
            A cinematic vision of motion and culture.
          </h2>
          {content.aboutParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? "mt-6 text-lg leading-8 text-black/65" : "mt-5 text-lg leading-8 text-black/65"}
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-10 border-l-2 border-black/15 pl-6">
            <p className="text-2xl italic font-medium text-black/80 leading-relaxed">
              "While nature created the world around us,
              humans engineered the machines that keep it moving."
            </p>
          </div>
        </motion.div>
      </motion.section>


{/* THE PEOPLE BEHIND KAPTURE */}

<section className="bg-white px-6 pt-8 pb-16">
  <div className="mx-auto max-w-7xl">

    <p className="text-sm uppercase tracking-[0.35em] text-black/40">
      THE PEOPLE BEHIND THE IDEA
    </p>

    <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black md:text-5xl">
      Different Perspectives. One Vision.
    </h2>

    <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">

      {[
        {
          name: "Noah",
          role: "Founder",
          brand: "Kapture Visuals",
          image: "/images/team/noah.jpg",
          instagram: "https://www.instagram.com/kapturevisuals.eu"
        },
        {
          name: "Alessio",
          role: "Contributor",
          brand: "AR Visuals",
          image: "/images/team/alessio.jpg",
          instagram: "https://www.instagram.com/alssr.visuals"
        },
        {
          name: "Niko",
          role: "Contributor",
          brand: "NK Visuals",
          image: "/images/team/niko.jpg",
          instagram: "https://www.instagram.com/nk.visuals._"
        },
        {
          name: "Xavier",
          role: "Contributor",
          brand: "Apex Prods",
          image: "/images/team/xavier.jpg",
          instagram: "https://www.instagram.com/apex_prods"
        }
      ].map((person) => (

        <a
          key={person.name}
          href={person.instagram || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >

          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">

            <img
              src={person.image}
              alt={person.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

          </div>

          <div className="mt-4">

            <h3 className="text-lg font-semibold">
              {person.name}
            </h3>

            <p className="mt-1 text-sm text-black/60">
              {person.role} · {person.brand}
            </p>

            <p className="mt-2 text-xs text-black/40 transition-colors group-hover:text-black">
              Instagram ↗
            </p>

          </div>

        </a>

      ))}

    </div>

  </div>
</section>

{/* Featured At */}

      <section
        id="featured"
        className="overflow-hidden border-y border-black/10 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <p className="text-sm uppercase tracking-[0.35em] text-black/40">
            Featured At
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-black md:text-5xl">
            Events & Collaborations.
          </h2>

        </div>

        <div className="mt-12 overflow-hidden">

        <div className="flex w-max animate-marquee gap-20">

          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Partner Logo"
              className="
                h-16
                md:h-20
                w-auto
                object-contain
                opacity-100
                transition-all
                duration-300
                hover:scale-105
              "
               />
          ))}

        </div>

      </div>

    </section>

      <motion.section
        id="contact"
        className="px-6 pt-20 pb-20"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/10 bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/80">
                Let's create together
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
                Kapturing what moves.
              </h2>
              <p className="mt-5 max-w-2xl text-white/80">
                For cinematic shoots, event coverage, collaborations, early brand partnerships or any other creative projects built around motion and storytelling.
              </p>
              <p className="mt-4 text-sm text-white/50">
                Usually replying within one business day.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${content.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                <Mail className="h-4 w-4" /> Contact Us
              </motion.a>
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={content.instagram}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Instagram
              </motion.a>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            action="/thank-you.html"
            className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
          >
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid gap-6">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
                  Contact Information
                </p>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input type="radio" name="client_type" value="Business" required />
                    Business
                  </label>

                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input type="radio" name="client_type" value="Private individual" required />
                    Individual
                  </label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Company / Name"
                  required
                  className="rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/40"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/40"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number (optional)"
                  className="rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/40"
                />
              </div>

              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/50">
                  Project Information
                </p>
                  <p className="mb-2 text-xs text-white/40">
                  Select all that apply.
                </p>

                <div className="grid gap-3 md:grid-cols-3">
                  <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    <input type="checkbox" name="services" value="Photography" />
                    Photography
                  </label>

                  <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    <input type="checkbox" name="services" value="Video Production" />
                    Video Production
                  </label>

                  <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                    <input type="checkbox" name="services" value="Cinematic Branding" />
                    Cinematic Branding
                  </label>
                </div>
              </div>

              <textarea
                name="message"
                placeholder="Tell us about what you're looking to create. Include any details that will help us understand your vision."
                rows="5"
                className="rounded-xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/40"
              />

              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/90"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </motion.section>

      <footer className="border-t border-black/10 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center">

          <img
            src="/images/logo-black.jpg"
            alt="Kapture Visuals"
            className="mb-6 h-30 w-auto"
          />

          <div className="mb-5 flex items-center gap-8 text-sm text-black/50">
            <a
              href={content.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black"
            >
              Instagram
            </a>

            <a
              href={`mailto:${content.email}`}
              className="hover:text-black"
            >
              Contact
            </a>

            <a
              href="/privacy-policy.html"
              className="hover:text-black"
            >
              Privacy Policy
          </a>
 
            <a
              href="/cookie-policy.html"
              className="hover:text-black"
            >
              Cookie Policy
            </a>
          </div>

          <p className="text-sm text-black/40">
            © 2026 Kapture Visuals. All rights reserved.
          </p>
        </div>
      </footer>

      {/* FLOATING PROJECT CTA */}

      <motion.a
        href="#contact"
        initial={{ opacity: 0, y: 10 }}
        animate={
          scrolled && !contactVisible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 10 }
        }
        transition={{ duration: 0.3 }}
        onClick={() =>
          trackEvent("cta_start_project_click", {
            location: "floating",
          })
        }
        className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-black/80 md:bottom-7 md:right-7 ${
          scrolled && !contactVisible
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        Start a project
        <ArrowRight className="h-4 w-4" />
        </motion.a>

         {activeGallery && (
          <WorkGallery
            category={activeGallery}
            onClose={() => setActiveGallery(null)}
          />
        )}

      {activeJournal === "archive" && (
        <JournalArchive
          onOpenArticle={openJournalArticle}
          onClose={closeJournal}
        />
      )}

      {activeJournal === "article" && activeArticle && (
        <JournalArticle
          article={getJournalArticle(activeArticle)}
          articles={journalArticles}
          onBack={openJournalArchive}
          onHome={closeJournal}
          onOpenArticle={openJournalArticle}
        />
      )}

    </main>

  );
}
import React from "react";
import { ArrowRight, Camera, Film, MapPin, Mail, Play, Sparkles } from "lucide-react";

const content = {
  siteName: "KAPTURE VISUALS",
  location: "Somewhere in Europe",
  heroTitle: "{content.heroTitle}",
  heroSubtitle:
    "{content.heroSubtitle}",
  heroImage: "/images/hero.jpg",
  heroTagline: "Ride. Shoot. Repeat.",
  heroCardText:
    "{content.heroCardText}",
  workIntro: "{content.workIntro}",
  workTitle: "{content.workTitle}",
  workSubtitle:
    "{content.workSubtitle}",
  work: [
    {
      title: "Automotive Stories",
      type: "Cinematic reels & photo sets",
      image: "/images/automotive.jpg",
    },
    {
      title: "Events & Culture",
      type: "Cars, bikes, meets & movement",
      image: "/images/events.jpg",
    },
    {
      title: "Travel Visuals",
      type: "Europe through motion & atmosphere",
      image: "/images/travel.jpg",
    },
  ],
  servicesIntro: "{content.servicesIntro}",
  servicesTitle: "{content.servicesTitle}",
  services: [
    {
      icon: "photo",
      title: "Photography",
      text: "Automotive photo sets, social media carousels, event coverage and visual storytelling.",
    },
    {
      icon: "video",
      title: "Short-form Video",
      text: "Cinematic reels, TikToks and YouTube Shorts designed for movement, emotion and impact.",
    },
    {
      icon: "brand",
      title: "Brand Visuals",
      text: "Content for creators, automotive brands, events and lifestyle projects with a premium feel.",
    },
  ],
  aboutIntro: "{content.aboutIntro}",
  aboutTitle: "{content.aboutTitle}",
  aboutImage: "/images/about.jpg",
  aboutParagraphs: [
    "Kapture Visuals is a cinematic content project focused on automotive culture, travel, events and visual storytelling across Europe. The goal is to build a strong creative presence before expanding into media access, collaborations and client work.",
    "The style is premium, atmospheric and dynamic: less about simply showing machines, more about capturing the feeling around them.",
  ],
  contactIntro: "{content.contactIntro}",
  contactTitle: "{content.contactTitle}",
  contactText:
    "{content.contactText}",
  email: "hello@kapturevisuals.com",
  instagram: "https://instagram.com/kapturevisuals",
  footerText: "{content.footerText}",
};

function ServiceIcon({ type }) {
  if (type === "photo") return <Camera className="h-5 w-5" />;
  if (type === "video") return <Film className="h-5 w-5" />;
  return <Sparkles className="h-5 w-5" />;
}

export default function KaptureVisualsWebsite() {

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-[0.35em]">{content.siteName}</div>
          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
        <div className="absolute inset-0">
          <img
            src={content.heroImage}
            alt="Cinematic sports car"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
              <MapPin className="h-4 w-4" /> {content.location}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Cinematic automotive storytelling.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Kapture Visuals captures what moves: cars, bikes, culture, travel and moments built for motion.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#work" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/85">
                View the work <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Start a project
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3 text-white/70">
              <Play className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.25em]">{content.heroTagline}</span>
            </div>
            <p className="mt-6 text-2xl font-medium leading-snug">
              Building a visual identity around speed, emotion, atmosphere and European automotive culture.
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">Featured direction</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Visual worlds we capture</h2>
          </div>
          <p className="max-w-md text-white/60">
            A portfolio designed to grow with future shoots, events, collaborations and client work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.work.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <p className="text-sm text-white/45">{item.type}</p>
                <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="border-y border-white/10 bg-white/[0.03] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">Services</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold md:text-5xl">Content for brands, creators, events and automotive culture.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.services.map((service) => (
              <div key={service.title} className="rounded-[2rem] border border-white/10 bg-neutral-950 p-7 shadow-2xl shadow-black/20">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-950"><ServiceIcon type={service.icon} /></div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="mt-4 leading-7 text-white/60">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-[2rem] border border-white/10">
          <img
            src={content.aboutImage}
            alt="Cinematic road"
            className="h-[520px] w-full object-cover opacity-80"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">About</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">A visual project built around motion.</h2>
          {content.aboutParagraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "mt-6 text-lg leading-8 text-white/65" : "mt-5 text-lg leading-8 text-white/65"}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white p-8 text-neutral-950 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Contact</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Let’s kapture what moves.</h2>
              <p className="mt-5 max-w-2xl text-neutral-600">
                For shoots, event coverage, collaborations or early brand partnerships, reach out and tell us what you want to create.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a href={`mailto:${content.email}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white">
                <Mail className="h-4 w-4" /> Email us
              </a>
              <a href={content.instagram} className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-950">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        © 2026 Kapture Visuals. Cinematic automotive storytelling.
      </footer>
    </main>
  );
}

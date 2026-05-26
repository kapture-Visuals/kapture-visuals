import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Film, Mail, Repeat2, Sparkles } from "lucide-react";

const content = {
  siteName: "KAPTURE VISUALS",
  logo: "/images/logo.png",
  heroImage: "/images/hero.jpg",
  heroTagline: "Ride. Shoot. Repeat.",
  work: [
    { title: "Automotive Stories", type: "Engineering, detail & aesthetics", image: "/images/automotive.jpg" },
    { title: "Events & Culture", type: "Crowds, cities & atmosphere", image: "/images/events.jpg" },
    { title: "Cinematic Storytelling", type: "Emotion, immersion & narrative", image: "/images/cinematic.jpg" },
  ],
  services: [
    { icon: "photo", title: "Photography", text: "High-end photography and cinematic social media visuals." },
    { icon: "video", title: "Video Production", text: "Fast-paced cinematic edits built around rhythm and storytelling." },
    { icon: "brand", title: "Cinematic Branding", text: "Premium content designed to strengthen identity and brand presence." },
  ],
  aboutImage: "/images/about.jpg",
  aboutParagraphs: [
    "Kapture Visuals was born from the strong belief that automotive culture has always been more than cars objects. Behind every machine lies something deeply human: the pursuit of improvement, precision, ambition and self-expression.",
    "Cars and bikes hence become experiences, memories and gateways to new places and perspectives.",
    "Through cinematic and immersive content, Kapture Visuals explores the atmosphere surrounding automotive culture across Europe, documenting not only the machines themselves, but the emotion, energy and moments that exist around them.",
    "Because while nature created the world around us, humans engineered the machines that keep it moving.",
  ],
  email: "kapture.visuals.production@gmail.com",
  instagram: "https://instagram.com/kapturevisuals",
};

function ServiceIcon({ type }) {
  if (type === "photo") return <Camera className="h-5 w-5" />;
  if (type === "video") return <Film className="h-5 w-5" />;
  return <Sparkles className="h-5 w-5" />;
}

export default function KaptureVisualsWebsite() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
      `}</style>

      <main className="min-h-screen bg-white text-black">
        <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <img src={content.logo} alt={content.siteName} className="h-24 w-auto" />

            <div className="hidden items-center gap-8 text-sm text-white md:flex">
              <a href="#work" className="transition hover:opacity-70">Work</a>
              <a href="#services" className="transition hover:opacity-70">Services</a>
              <a href="#about" className="transition hover:opacity-70">About</a>
              <a href="#contact" className="transition hover:opacity-70">Contact</a>
            </div>
          </div>
        </nav>

        <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
          <div className="absolute inset-0">
            <img src={content.heroImage} alt="Cinematic sports car" className="h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                Cinematic stories built around motion.
              </h1>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
                >
                  View the work <ArrowRight className="h-4 w-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Start a project
                </motion.a>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="rounded-[2rem] border border-white/20 bg-black/30 p-5 text-white backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-white/70">
                <Repeat2 className="h-5 w-5 animate-spin-slow" />
                <span className="text-sm uppercase tracking-[0.25em]">{content.heroTagline}</span>
              </div>

              <p className="mt-6 text-2xl font-medium leading-snug text-white">
                Kapturing what moves : cars, bikes, culture, travel and the moments in between.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-black/40">
                A growing visual archive of automotive culture
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-black md:text-5xl">
                Three worlds. One identity.
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {content.work.map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="group relative aspect-[16/9] overflow-hidden rounded-[2rem]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 z-20 p-6">
                  <p className="text-sm text-white/70">{item.type}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="border-y border-black/10 bg-neutral-100 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">Creative Direction</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold text-black md:text-5xl">
              Content for brands, creators and automotive culture.
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {content.services.map((service) => (
                <motion.div
                  key={service.title}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-xl"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                    <ServiceIcon type={service.icon} />
                  </div>
                  <h3 className="text-2xl font-semibold text-black">{service.title}</h3>
                  <p className="mt-4 leading-7 text-black/60">{service.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-7xl items-start gap-16 px-6 py-24 md:grid-cols-[0.9fr_1.1fr]">
          <div className="group overflow-hidden rounded-[2rem]">
            <img
              src={content.aboutImage}
              alt="Cinematic road"
              className="h-[600px] w-full object-cover object-center transition duration-700 group-hover:scale-110"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">The idea behind Kapture Visuals</p>
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
          </div>
        </section>

        <section id="contact" className="px-6 pb-24">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/10 bg-black p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/40">Let's create together</p>
                <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Kapturing what moves.</h2>
                <p className="mt-5 max-w-2xl text-white/60">
                  For cinematic shoots, event coverage, collaborations, early brand partnerships or creative projects built around motion and storytelling.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </motion.a>

                <motion.a
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href={content.instagram}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
                >
                  Instagram
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-black/40">
          © 2026 Kapture Visuals. All rights reserved.
        </footer>
      </main>
    </>
  );
}
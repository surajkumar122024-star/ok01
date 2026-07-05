"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is OpticShift Pro really free to use?",
    answer:
      "Yes. All 26 tools on OpticShift Pro are completely free with no hidden charges, no subscriptions, and no sign-up required. You can use every tool as many times as you need.",
  },
  {
    question: "Do you upload or store my images and files?",
    answer:
      "No. Every tool runs entirely inside your browser using client-side processing. Your images, PDFs, and text never get uploaded to any server, which means your files stay completely private on your own device.",
  },
  {
    question: "What kind of tools does OpticShift Pro offer?",
    answer:
      "We offer a growing suite of 26+ tools across several categories — image tools (compress, resize, crop, rotate, watermark), format converters (JPG, PNG, WebP, HEIC, SVG), PDF tools (merge, split, image-to-PDF), text tools (word counter, case converter, slug generator), and developer utilities (Base64, JSON formatter, URL encoder).",
  },
  {
    question: "Do I need to install any software or create an account?",
    answer:
      "No installation and no account needed. Every tool works directly in your web browser on any device — just open the tool page and start using it immediately.",
  },
  {
    question: "Is there a file size or usage limit?",
    answer:
      "Most tools handle typical file sizes for everyday tasks smoothly. Since processing happens in your browser rather than on a server, very large files may take a little longer depending on your device's performance, but there are no artificial limits or paywalls.",
  },
  {
    question: "Does OpticShift Pro work on mobile devices?",
    answer:
      "Yes, every tool is fully responsive and works smoothly on smartphones, tablets, and desktops through any modern browser.",
  },
  {
    question: "Can I use these tools for commercial or business projects?",
    answer:
      "Yes, you're free to use OpticShift Pro's tools for personal, educational, or commercial projects at no cost.",
  },
  {
    question: "Why should I trust a free online tool with my files?",
    answer:
      "Because your files never leave your device. Unlike traditional online tools that upload your data to a server for processing, OpticShift Pro uses your browser's built-in capabilities to do all the work locally — so there's nothing to intercept, store, or leak.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about OpticShift Pro&apos;s free tools.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass border rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-base">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

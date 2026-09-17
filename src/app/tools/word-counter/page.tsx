import WordCounterClient from "./WordCounterClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter Online Free — Count Words, Characters & Sentences | OpticShift Pro",
  description:
    "Count words, characters, sentences, paragraphs and estimate reading time online for free, instantly.",
  keywords:
    "word counter online free, count words in text online, essay word counter tool, character and word count checker",
};

export default function WordCounterPage() {
  return <WordCounterClient />;
}

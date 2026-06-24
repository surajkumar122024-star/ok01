import WordCounterClient from "./WordCounterClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter - Count Words, Characters & More",
  description:
    "Free online word counter tool. Count words, characters, sentences, paragraphs and estimate reading time instantly.",
};

export default function WordCounterPage() {
  return <WordCounterClient />;
}

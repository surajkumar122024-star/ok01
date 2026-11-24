import type { Metadata } from "next";
import FormUploadCheckerClient from "./FormUploadCheckerClient";
import { RelatedTools } from "@/components/RelatedTools";
import { getRelatedTools } from "@/lib/related-tools";

export const metadata: Metadata = {
  title: "Indian Form Upload Checker — Photo & Signature | OLD TOOLS",
  description: "Check and prepare application photos and signatures by pixel dimensions, file size and format. Free browser-based tool.",
  keywords: ["form upload checker", "exam photo size checker", "signature size resizer", "photo signature checker India"],
  alternates: { canonical: "/tools/form-upload-checker" },
};

export default function FormUploadCheckerPage() {
  return <>
    <FormUploadCheckerClient />
    <RelatedTools tools={getRelatedTools("form-upload-checker")} />
  </>;
}

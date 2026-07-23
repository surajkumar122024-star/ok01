import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer — OpticShift Pro',
  description: 'Important information about the accuracy, limitations, and intended use of OpticShift Pro\'s free browser-based tools.',
};

const sections = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'general-information', label: '2. General Information' },
  { id: 'browser-processing', label: '3. Browser-Based Processing Disclaimer' },
  { id: 'accuracy', label: '4. Accuracy of Information' },
  { id: 'no-professional-advice', label: '5. No Professional Advice' },
  { id: 'external-links', label: '6. External Links Disclaimer' },
  { id: 'third-party-services', label: '7. Third-Party Services' },
  { id: 'copyright-trademarks', label: '8. Copyright & Trademarks' },
  { id: 'limitation-of-liability', label: '9. Limitation of Liability' },
  { id: 'changes', label: '10. Changes to This Disclaimer' },
  { id: 'contact', label: '11. Contact Information' },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Disclaimer</h1>
          <p className="text-muted-foreground">
            Important context on what OpticShift Pro's tools do, what they don't guarantee, and
            what you're responsible for checking yourself.
          </p>
          <p className="text-sm text-muted-foreground italic">Last Updated: July 2026</p>
        </div>

        {/* Table of Contents */}
        <nav className="glass rounded-2xl border p-6 md:p-8">
          <p className="font-semibold mb-4">Table of Contents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-6">

          <section id="introduction" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p className="leading-relaxed text-muted-foreground">
              This Disclaimer explains the limitations and intended use of OpticShift Pro
              (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) and the tools available at{' '}
              <strong className="text-foreground">ok01.vercel.app</strong>. It is meant to be read
              alongside our{' '}
              <Link href="/terms" className="text-primary underline underline-offset-2">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>
              , and covers what our tools can reasonably promise, and what you should always verify
              on your own before relying on a result for something important.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              By using this website, you acknowledge that you have read and understood this
              Disclaimer. If you do not agree with it, please do not use the site. This page is
              written in plain language wherever possible, since a disclaimer is only genuinely
              useful if people can actually read and understand it.
            </p>
          </section>

          <section id="general-information" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">2. General Information</h2>
            <p className="leading-relaxed text-muted-foreground">
              The information and tools provided on OpticShift Pro are for general informational
              and utility purposes only. While we aim to keep every tool accurate, functional, and
              genuinely useful, we make no representation or warranty of any kind, express or
              implied, regarding the completeness, reliability, or suitability of the site or its
              tools for any particular purpose.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Any action you take based on the output of a tool on this site — a resized image, a
              merged PDF, a generated password, a formatted piece of text — is strictly at your own
              discretion and risk. We provide these tools free of charge, without a service-level
              guarantee, and without any warranty that a specific tool will remain available,
              unchanged, or fault-free indefinitely.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              This Disclaimer applies to every page and tool on OpticShift Pro, including our blog
              content, document photo makers, PDF utilities, and text/developer tools, unless a
              more specific notice states otherwise.
            </p>
          </section>

          <section id="browser-processing" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">3. Browser-Based Processing Disclaimer</h2>
            <p className="leading-relaxed text-muted-foreground">
              All tools on OpticShift Pro process your files entirely within your own web browser,
              using JavaScript and the Canvas API running locally on your device.{' '}
              <strong className="text-foreground">
                No files are uploaded to our servers at any point during tool usage
              </strong>
              . Your images, PDFs, and text never leave your device — they are read into your
              browser's memory, transformed, and offered back to you as a download, without ever
              being transmitted anywhere.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Because processing depends entirely on your own device, the speed, reliability, and
              in some edge cases the correctness of a result can be affected by your browser
              version, available device memory, or an unstable page (such as closing a tab mid-way
              through processing). We are not able to see, recover, or assist with a file if it
              only ever existed in your browser's memory and was lost before you downloaded it.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              This architecture is a deliberate design choice, not an incidental detail — it means
              we structurally cannot access, store, or lose your files on our end, since they never
              reach us in the first place. It also means we recommend downloading and saving your
              result promptly after processing, and keeping a backup of any original file, since we
              have no copy to restore if something goes wrong on your device after the fact.
            </p>
          </section>

          <section id="accuracy" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">4. Accuracy of Information</h2>
            <p className="leading-relaxed text-muted-foreground">
              We make reasonable efforts to keep the specifications used in our tools — such as
              document photo dimensions for Aadhaar, PAN, Passport, Visa, and exam applications, or
              standard unit conversion factors — accurate and up to date. However, official
              requirements published by government bodies, exam boards, and other institutions can
              change without notice, and we cannot guarantee that every specification on this site
              reflects the very latest official update at the moment you use it.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              <strong className="text-foreground">
                You are responsible for independently verifying any important document, photo
                specification, or piece of information against the current official source before
                relying on it for an official submission.
              </strong>{' '}
              This applies especially to document photo tools, where a rejected application can
              cost real time — always cross-check the current requirement stated in your specific
              form or notification.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Similarly, our Unit Converter uses standard international conversion factors and our
              Password Generator follows widely accepted security guidance, but neither replaces
              a requirement specific to your situation — a scientific, legal, or regulated context
              may have its own precision or compliance standard that goes beyond general-purpose
              conversion or password strength.
            </p>
          </section>

          <section id="no-professional-advice" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">5. No Professional Advice</h2>
            <p className="leading-relaxed text-muted-foreground">
              Nothing on this website — including blog articles, tool descriptions, or FAQ
              content — constitutes legal, financial, medical, or other professional advice. Content
              such as our password security guidance or document photo guides is written to be
              genuinely useful and informative, but should not be treated as a substitute for advice
              from a qualified professional where one is warranted (for example, an immigration
              consultant for visa requirements, or a security professional for account protection
              beyond password strength).
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Our blog articles explain general concepts — how image compression works, why certain
              file formats behave differently, what a strong password looks like mathematically —
              and are intended to help you understand a topic well enough to make your own informed
              decision, not to replace the judgment of a licensed professional in situations where
              stakes are genuinely high.
            </p>
          </section>

          <section id="external-links" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">6. External Links Disclaimer</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our blog articles and pages occasionally reference or link to external websites,
              including official government portals, for context or further reading. These links
              are provided for convenience only. We do not control, and are not responsible for,
              the content, accuracy, or availability of any external site, and including a link does
              not imply our endorsement of that site or its content.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We recommend always navigating to official government or institutional websites
              directly (rather than through a third-party link) when submitting sensitive
              information or an official application. If you notice an outdated or broken external
              link on our site, we'd appreciate you letting us know through our{' '}
              <Link href="/contact" className="text-primary underline underline-offset-2">
                Contact page
              </Link>
              , so we can correct it.
            </p>
          </section>

          <section id="third-party-services" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">7. Third-Party Services</h2>
            <p className="leading-relaxed text-muted-foreground">
              This website uses Google AdSense to display advertisements. Ads are served by Google
              and its partners, and their content is not selected or controlled by us. We are not
              responsible for the products, services, or claims made in any third-party
              advertisement shown on this site, and clicking an ad takes you to a page governed by
              that advertiser's own terms, not ours.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Further detail on how advertising cookies are used is available in our{' '}
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>
              . We may also use standard hosting and analytics infrastructure to keep the site
              running reliably; none of these services receive the actual files you process through
              our tools, since that processing never leaves your browser.
            </p>
          </section>

          <section id="copyright-trademarks" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">8. Copyright &amp; Trademarks</h2>
            <p className="leading-relaxed text-muted-foreground">
              The OpticShift Pro name, logo, website design, and original blog content are the
              property of OpticShift Pro and are protected by applicable copyright and trademark
              law. Any references on this site to third-party names, document types, government
              programs (such as Aadhaar, PAN, or Passport Seva), or file formats are used solely to
              describe compatibility or context, and do not imply any affiliation, sponsorship, or
              endorsement by those respective owners or authorities.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              You retain full ownership of any file, image, or text you process using our tools,
              since that content is never uploaded to or stored on our servers. If you believe
              content on this site infringes on your copyright or trademark rights, please contact
              us with the details and we will review the matter promptly.
            </p>
          </section>

          <section id="limitation-of-liability" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">9. Limitation of Liability</h2>
            <p className="leading-relaxed text-muted-foreground">
              To the fullest extent permitted by law, OpticShift Pro and its operator will not be
              liable for any loss or damage of any kind arising from your use of, or reliance on,
              this website or its tools — including but not limited to a rejected document
              application, a lost file due to a browser crash, a business decision made based on
              information found on this site, or any indirect, incidental, or consequential damages
              of any kind.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              This limitation applies regardless of the legal theory relied upon, whether contract,
              tort, negligence, or otherwise, and even if we have been advised of the possibility of
              such damages. This Disclaimer works alongside the fuller liability terms in our{' '}
              <Link href="/terms" className="text-primary underline underline-offset-2">
                Terms of Service
              </Link>
              , which governs your use of the site more broadly.
            </p>
          </section>

          <section id="changes" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">10. Changes to This Disclaimer</h2>
            <p className="leading-relaxed text-muted-foreground">
              We may update this Disclaimer from time to time to reflect changes to our tools,
              new features, or legal requirements. When we do, we will update the &quot;Last
              Updated&quot; date at the top of this page so you can see at a glance whether
              anything has changed since your last visit.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We encourage you to review this page periodically, particularly before relying on a
              tool for an official or time-sensitive submission. Continued use of the site after a
              change becomes effective constitutes your acceptance of the revised Disclaimer.
            </p>
          </section>

          <section id="contact" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">11. Contact Information</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have questions about this Disclaimer, please reach out:
            </p>
            <div className="pt-2">
              <p className="text-foreground font-medium">Email: support@opticshift.pro</p>
            </div>
            <p className="leading-relaxed text-muted-foreground pt-2">
              You can also reach us through our{' '}
              <Link href="/contact" className="text-primary underline underline-offset-2">
                Contact page
              </Link>
              . For related policies, see our{' '}
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-primary underline underline-offset-2">
                Terms of Service
              </Link>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

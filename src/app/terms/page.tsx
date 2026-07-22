import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — OpticShift Pro',
  description: 'The terms and conditions governing your use of OpticShift Pro\'s free, browser-based image, PDF, and text tools.',
};

const sections = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'acceptance', label: '2. Acceptance of Terms' },
  { id: 'eligibility', label: '3. Eligibility' },
  { id: 'permitted-use', label: '4. Permitted Use' },
  { id: 'prohibited-activities', label: '5. Prohibited Activities' },
  { id: 'intellectual-property', label: '6. Intellectual Property' },
  { id: 'privacy', label: '7. Privacy' },
  { id: 'browser-processing', label: '8. Browser-Based Processing' },
  { id: 'disclaimer', label: '9. Disclaimer' },
  { id: 'limitation-of-liability', label: '10. Limitation of Liability' },
  { id: 'third-party-services', label: '11. Third-Party Services' },
  { id: 'changes-to-terms', label: '12. Changes to Terms' },
  { id: 'termination', label: '13. Termination' },
  { id: 'governing-law', label: '14. Governing Law' },
  { id: 'contact', label: '15. Contact Information' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground">
            The rules and conditions for using OpticShift Pro, written to be as clear and
            readable as a legal document can be.
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
              Welcome to OpticShift Pro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a free
              suite of browser-based image, PDF, and text tools available at{' '}
              <strong className="text-foreground">ok01.vercel.app</strong>. These Terms of Service
              (&quot;Terms&quot;) govern your access to and use of our website and tools. They exist
              to set clear, fair expectations for both you and us, and to explain what you can do
              here, what you can&apos;t, and what happens if something goes wrong.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We&apos;ve tried to write this document in plain language rather than dense legal
              jargon wherever possible, without sacrificing the legal protections both sides need.
              If anything here is unclear, you&apos;re welcome to reach out using the contact
              information in Section 15.
            </p>
          </section>

          <section id="acceptance" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">2. Acceptance of Terms</h2>
            <p className="leading-relaxed text-muted-foreground">
              By accessing or using OpticShift Pro in any way — browsing the site, using a tool,
              reading the blog — you agree to be bound by these Terms and by our{' '}
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>
              . If you do not agree with any part of these Terms, please discontinue use of the
              website immediately, since continued use signals your acceptance.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Continued use of the site after any update to these Terms constitutes your acceptance
              of the revised version, as described further in Section 12. These Terms apply
              equally whether you are a first-time visitor or a regular user of our tools, and
              regardless of whether you use the site for personal or commercial purposes.
            </p>
          </section>

          <section id="eligibility" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">3. Eligibility</h2>
            <p className="leading-relaxed text-muted-foreground">
              OpticShift Pro is intended for general audiences and does not knowingly collect
              personal information from anyone, including children, since our tools do not require
              account creation and process files locally in your browser rather than on a server.
              There is no age-verification step because there is no account system to verify
              against.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              If you are under the age of majority in your jurisdiction, you should use this site
              only with the involvement of a parent or guardian, and only for lawful purposes
              consistent with these Terms. Parents and guardians are encouraged to supervise their
              children&apos;s use of any website, including this one.
            </p>
          </section>

          <section id="permitted-use" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">4. Permitted Use</h2>
            <p className="leading-relaxed text-muted-foreground">
              We grant you a limited, non-exclusive, non-transferable license to access and use
              OpticShift Pro&apos;s tools for personal or commercial purposes, subject to these
              Terms. This is a license to use the service, not a transfer of ownership of the
              underlying website, code, or content.
            </p>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground">What you can do</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Use any tool on the site to process your own files or content, for personal or business use, without limit on how many times you use a tool.</li>
                <li>Use the tools in a professional or commercial context — for example, compressing images for a client project or generating documents for your business — without any licensing fee.</li>
                <li>Share links to our tools, blog posts, or homepage with others, including on social media or in your own written content.</li>
                <li>Use output files generated by our tools (compressed images, converted PDFs, generated passwords, formatted text, etc.) however you like, since that output belongs entirely to you.</li>
              </ul>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              This permissive approach reflects how the site is actually built: because we never
              see or store your files, there is no practical reason to restrict how you use a tool
              or what you do with your own results afterward.
            </p>
          </section>

          <section id="prohibited-activities" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-4">
            <h2 className="text-2xl font-bold">5. Prohibited Activities</h2>
            <p className="leading-relaxed text-muted-foreground">
              While using OpticShift Pro, you agree not to:
            </p>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground">Legal &amp; Security</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Use the site for any unlawful purpose or in violation of any applicable local, national, or international law.</li>
                <li>Attempt to gain unauthorized access to any part of the site, its infrastructure, or related systems.</li>
                <li>Introduce viruses, malware, or any other harmful code to the site or its users.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground">Technical Misuse</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Attempt to copy, modify, reverse-engineer, or decompile the source code of our tools beyond what is permitted by applicable law.</li>
                <li>Use automated systems (bots, scrapers, or crawlers) to access the site in a way that sends more requests than a human user could reasonably generate, or that disrupts normal service.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground">Content &amp; Conduct</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Use our tools to process content that infringes on someone else&apos;s intellectual property rights, or that is illegal to possess or distribute in your jurisdiction.</li>
                <li>Misrepresent your identity or affiliation in any communication with us.</li>
              </ul>
            </div>
          </section>

          <section id="intellectual-property" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">6. Intellectual Property</h2>
            <p className="leading-relaxed text-muted-foreground">
              The OpticShift Pro name, logo, website design, blog content, and underlying source
              code are the property of OpticShift Pro and are protected by applicable copyright and
              trademark laws. Nothing in these Terms grants you any right to use our branding,
              trademarks, blog articles, or proprietary code outside of normal use of the website
              as intended — for example, you may not republish our blog articles elsewhere without
              permission, or use our logo to imply an affiliation that doesn&apos;t exist.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              You retain full ownership of any files, images, or text you process using our tools.
              Since processing happens locally in your browser and nothing is uploaded to our
              servers, we never gain any claim to, copy of, or license over your content — we
              simply never see it. This is different from many other online tools, where the
              service provider&apos;s terms often include a broad license to any content you
              upload; because nothing is uploaded here, no such license is needed or granted.
            </p>
          </section>

          <section id="privacy" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">7. Privacy</h2>
            <p className="leading-relaxed text-muted-foreground">
              Your privacy matters to us, and how we handle data is explained in full in our{' '}
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. In short: we do not require
              accounts, we do not collect the files you process, and any standard technical data
              (like browser type or page visits) is handled as described in that policy.
            </p>
          </section>

          <section id="browser-processing" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">8. Browser-Based Processing</h2>
            <p className="leading-relaxed text-muted-foreground">
              A core part of how OpticShift Pro works — and an important term for you to understand
              — is that all file processing (compressing, resizing, converting, cropping, and so
              on) happens entirely within your own web browser using JavaScript and the Canvas API.
              Your files are never uploaded to, stored on, or transmitted through our servers.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Because of this architecture, the speed, quality, and reliability of any tool depends
              directly on your own device&apos;s processing power, available memory, and browser
              performance — not on anything we control server-side. We are not responsible for
              processing delays or failures caused by your device&apos;s limitations, an outdated
              browser, or an unstable internet connection while loading the page itself.
            </p>
          </section>

          <section id="disclaimer" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-4">
            <h2 className="text-2xl font-bold">9. Disclaimer</h2>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground">General Disclaimer</h3>
              <p className="leading-relaxed text-muted-foreground">
                OpticShift Pro and its tools are provided on an &quot;as is&quot; and &quot;as
                available&quot; basis, without warranties of any kind, whether express or implied,
                including but not limited to implied warranties of merchantability, fitness for a
                particular purpose, or non-infringement. We do not guarantee that the site will be
                uninterrupted, error-free, or free of viruses or other harmful components, nor do we
                guarantee that any specific tool will meet your particular requirements.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-foreground">Document Photo Tools</h3>
              <p className="leading-relaxed text-muted-foreground">
                Document photo tools (such as our Aadhaar, PAN, Passport, Visa, and Exam Photo
                makers) provide sizing based on commonly published specifications, but requirements
                can change without notice. You are responsible for verifying the current official
                requirement for your specific application before submitting any document.
              </p>
            </div>
          </section>

          <section id="limitation-of-liability" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">10. Limitation of Liability</h2>
            <p className="leading-relaxed text-muted-foreground">
              To the fullest extent permitted by applicable law, OpticShift Pro and its operator
              shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of data, loss of profits, or business
              interruption, arising out of or related to your use of, or inability to use, this
              website or its tools — even if we have been advised of the possibility of such
              damages.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Since processing happens on your own device, we are not liable for any loss of data
              that occurs due to your device running out of memory, your browser crashing, or your
              closing a tab before downloading a result. We recommend keeping a backup of any
              original file before processing it.
            </p>
          </section>

          <section id="third-party-services" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">11. Third-Party Services</h2>
            <p className="leading-relaxed text-muted-foreground">
              This website uses Google AdSense to display advertisements. Google, as a third-party
              vendor, may use cookies and similar technologies to serve ads based on your prior
              visits to this and other websites, as described in more detail in our{' '}
              <Link href="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>
              . We do not control the specific content of ads shown to any individual visitor.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              The site may also link to third-party websites or resources, such as external
              references in blog articles or citations to official government portals for document
              specifications. We do not control and are not responsible for the content, privacy
              practices, or availability of any third-party site, and linking to a resource does
              not imply our endorsement of it. Your interactions with third-party services,
              including any ads displayed on this site, are governed by that third party&apos;s own
              terms and privacy policy, not ours.
            </p>
          </section>

          <section id="changes-to-terms" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">12. Changes to Terms</h2>
            <p className="leading-relaxed text-muted-foreground">
              We may update these Terms from time to time to reflect changes in our tools, legal
              requirements, or business practices. When we do, we will update the &quot;Last
              Updated&quot; date at the top of this page. We encourage you to review this page
              periodically. Continued use of the site after a change becomes effective constitutes
              your acceptance of the revised Terms.
            </p>
          </section>

          <section id="termination" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">13. Termination</h2>
            <p className="leading-relaxed text-muted-foreground">
              Since OpticShift Pro does not require accounts, there is generally nothing for us to
              &quot;terminate&quot; on an individual basis. However, we reserve the right to block
              or restrict access to the website, in whole or in part, for any user or network found
              to be engaging in prohibited activities as described in Section 5, at our discretion
              and without prior notice.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Sections that by their nature should survive termination of your access — including
              Intellectual Property, Disclaimer, Limitation of Liability, and Governing Law — will
              remain in effect even after your access to the site ends.
            </p>
          </section>

          <section id="governing-law" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">14. Governing Law</h2>
            <p className="leading-relaxed text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of India,
              without regard to its conflict of law provisions. Any disputes arising out of or
              relating to these Terms or your use of the website shall be subject to the exclusive
              jurisdiction of the competent courts in India.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              If any provision of these Terms is found to be unenforceable or invalid under
              applicable law, that provision will be limited or eliminated to the minimum extent
              necessary, and the remaining provisions will continue in full force and effect. Our
              failure to enforce any right or provision of these Terms will not be considered a
              waiver of that right or provision.
            </p>
          </section>

          <section id="contact" className="rounded-3xl border bg-card/50 backdrop-blur-sm p-8 space-y-3">
            <h2 className="text-2xl font-bold">15. Contact Information</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have any questions about these Terms of Service, please reach out:
            </p>
            <div className="pt-2">
              <p className="text-foreground font-medium">Email: support@opticshift.pro</p>
            </div>
            <p className="leading-relaxed text-muted-foreground pt-2">
              You can also reach us through our{' '}
              <Link href="/contact" className="text-primary underline underline-offset-2">
                Contact page
              </Link>
              . We aim to respond to all inquiries as promptly as we can.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

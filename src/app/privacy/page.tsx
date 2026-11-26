import { Metadata } from "next";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";

export const metadata: Metadata = {
  title: 'Privacy Policy — OLD TOOLS',
  description: 'How OLD TOOLS handles your data. Every tool runs in your browser — files are never uploaded to a server.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-muted-foreground">
      <h1 className="text-4xl font-bold mb-2 text-foreground">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last Updated: June 27, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Introduction</h2>
        <p className="leading-relaxed">
          Welcome to <strong>OLD TOOLS</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting
          your privacy. This Privacy Policy explains how we collect, use, and safeguard information
          when you visit our website at <strong>oldtools.online</strong> and use our image processing tools.
          Please read this policy carefully. By using our site, you agree to the practices described here.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Information We DO NOT Collect</h2>
        <p className="leading-relaxed mb-3">
          OLD TOOLS is built on a privacy-first architecture. All image processing happens
          entirely within your web browser using HTML5 Canvas and JavaScript APIs.
          <strong> Your images are never uploaded to our servers.</strong> We do not collect, store,
          or transmit any image data you process using our tools.
        </p>
        <p className="leading-relaxed">
          We do not require you to create an account, and we do not collect personally identifiable
          information such as your name, email address, or phone number through our tools.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">3. Information We May Collect Automatically</h2>
        <p className="leading-relaxed mb-3">
          Like most websites, we may automatically receive and log standard technical information when
          you visit our site. This may include:
        </p>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li>Your browser type and version</li>
          <li>Your operating system</li>
          <li>Pages you visit on our site and time spent on them</li>
          <li>Your approximate geographic location (country/city level, not precise)</li>
          <li>Referring website (how you found us)</li>
        </ul>
        <p className="leading-relaxed mt-3">
          This information is collected in aggregate form and is used solely to improve our website
          performance and understand general usage trends.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Google AdSense and Advertising</h2>
        <p className="leading-relaxed mb-3">
          OLD TOOLS has integrated the <strong>Google AdSense</strong> advertising script. Whether advertisements
          are displayed depends on Google's site review, approval, and our ad configuration. If ads are
          served, Google and its advertising partners may use cookies, device identifiers, or similar
          technologies to deliver, measure, and personalize advertising where permitted. Ad personalization
          and data use are subject to your consent choices and applicable regional requirements.
        </p>
       
          <p className="leading-relaxed">
  For more information on how Google uses data from sites that use its services, please visit{' '}
  <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
    Google&apos;s Privacy &amp; Terms
       </a>.
       </p>
       </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Cookies</h2>
        <p className="leading-relaxed mb-3">
          Cookies and similar technologies may be used by third-party services on this site. OLD TOOLS also
          stores your cookie-consent choice in your browser's local storage so the consent banner can
          remember whether you accepted or declined non-essential storage. Google AdSense and Google
          Analytics may use cookies or similar technologies according to your consent choice and the
          settings available in your region.
        </p>
        <p className="leading-relaxed mb-4">
          You can change your choice using the cookie preferences control below or manage cookies and
          site data through your browser settings. Blocking storage may affect consent preferences and
          some site features.
        </p>
        <CookiePreferencesButton />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Analytics</h2>
        <p className="leading-relaxed mb-3">
          We use <strong>Google Analytics 4</strong> to understand website usage, including page views,
          interactions, browser and device information, and general traffic sources. Analytics storage
          is initially set to denied through Google Consent Mode and is updated when a visitor makes
          a choice in the consent banner. Google may process data under its own privacy terms. We do
          not send the files processed by our browser-based tools to Google Analytics.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Children&apos;s Privacy</h2>
        <p className="leading-relaxed">
          Our website is not directed at children under the age of 13. We do not knowingly collect
          any personal information from children. If you believe a child has provided us with personal
          information, please contact us and we will promptly delete it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Third-Party Links</h2>
        <p className="leading-relaxed">
          Our website may contain links to external websites. We are not responsible for the privacy
          practices or content of these third-party sites. We encourage you to review the privacy
          policies of any external sites you visit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Data Security</h2>
        <p className="leading-relaxed">
          Because we do not collect or store your image data, there is no image data at risk.
          For any standard website data (such as analytics), we use industry-standard practices
          to reasonably secure information. However, no method of transmission over the internet is 100% secure
          and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">10. Your Rights (GDPR &amp; CCPA)</h2>
        <p className="leading-relaxed mb-3">
          Depending on your location, you may have certain rights regarding your personal data, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li>The right to access data we hold about you</li>
          <li>The right to request deletion of your data</li>
          <li>The right to opt out of data selling (we do not sell data)</li>
          <li>The right to opt out of personalized advertising</li>
        </ul>
        <p className="leading-relaxed mt-3">
          Since we do not store personally identifiable image data, most of these rights are protected
          by our architecture by default. For any other requests, please contact us.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">11. Changes to This Policy</h2>
        <p className="leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page
          with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
          Continued use of our site after changes are posted constitutes your acceptance of the
          updated policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">12. Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions about this Privacy Policy or our privacy practices, please contact us:
        </p>
        <div className="mt-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
          <p className="font-medium text-foreground">OLD TOOLS</p>
          <p>Email: <a href="mailto:rrok86383@gmail.com" className="text-primary underline hover:text-primary/80">rrok86383@gmail.com</a></p>
          <p>Website: <a href="https://oldtools.online" className="text-primary underline hover:text-primary/80">oldtools.online</a></p>
        </div>
      </section>
    </main>
  );
}

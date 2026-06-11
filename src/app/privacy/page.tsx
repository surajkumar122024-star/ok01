export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto glass rounded-3xl border p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none shadow-xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground italic mb-8">Last Updated: October 2023</p>
        
        <h2>1. Privacy Commitment</h2>
        <p>
          At OpticShift Pro, we take your privacy extremely seriously. Our fundamental philosophy is that your personal data—especially your images—should remain under your control at all times.
        </p>

        <h2>2. No Server Processing</h2>
        <p>
          Unlike traditional image processing websites, OpticShift Pro performs all image manipulation entirely within your web browser. When you select an image to compress, resize, or convert, that image is never uploaded to our servers. All computational tasks are executed locally on your device's hardware.
        </p>

        <h2>3. Data Collection</h2>
        <p>
          We do not collect any personal identification information. We do not require account creation, and we do not store your IP address in connection with any image processing actions.
        </p>

        <h2>4. Analytics and Third Parties</h2>
        <p>
          We may use lightweight, privacy-respecting analytics tools to understand site traffic and usage patterns. We also serve advertisements through Google AdSense. These third-party services may use cookies to serve ads based on your visits to this and other websites.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          Since we do not store your data, there is no data for you to request, delete, or modify. Your privacy is protected by our architecture by design.
        </p>
      </div>
    </div>
  );
}
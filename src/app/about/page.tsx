import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About OpticShift Pro — Privacy-First Browser-Based Tools',
  description:
    'OpticShift Pro is an independently built suite of 33+ free image, PDF, and text tools that run entirely in your browser. Learn why founder Suraj Kumar built it and how the privacy-first architecture works.',
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">About OpticShift Pro</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Professional-grade file tools should be free, fast, and — above all — completely
          private. That belief is the reason OpticShift Pro exists.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Why I Built OpticShift Pro</h2>
        <p className="leading-relaxed mb-4 text-gray-700">
          I&apos;m Suraj Kumar, the founder and developer of OpticShift Pro. Like a lot of people,
          I regularly needed to compress a photo, convert a file format, or resize an image for a
          form — small, everyday tasks. What frustrated me was that almost every free tool online
          required uploading the file to an unknown server first, just to get a simple result back.
        </p>
        <p className="leading-relaxed mb-4 text-gray-700">
          For a quick screenshot that&apos;s a minor inconvenience. For a scanned ID document, a
          signed form, or a private photo, it&apos;s a real privacy concern — and it shouldn&apos;t
          be the trade-off you have to accept just to resize an image.
        </p>
        <p className="leading-relaxed text-gray-700">
          So I built OpticShift Pro around a different approach: every tool runs directly in your
          browser using standard web APIs, so your file is processed on your own device and never
          uploaded anywhere. What started as a handful of image tools has grown into a suite of{' '}
          <strong>33+ free tools</strong> covering images, PDFs, and text utilities.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
        <p className="leading-relaxed text-gray-700">
          The mission is simple: <strong>give people useful, professional-quality file tools
          without asking them to trade away their privacy.</strong> Your files belong to you, and
          no online tool should require you to hand over sensitive images or documents just to
          compress or convert them. Privacy here isn&apos;t a premium feature or a policy promise —
          it&apos;s built directly into how the tools work.
        </p>
      </section>

      {/* Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-1">Privacy by Design</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your files never leave your device. All processing happens locally in your browser —
              there are no uploads, no servers involved, and no data to breach.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">No Waiting on Uploads</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              By skipping the upload step entirely, results appear the moment you click convert —
              even on a slow connection.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
            <div className="text-2xl mb-2">🆓</div>
            <h3 className="font-semibold text-gray-900 mb-1">Always Free</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every tool on OpticShift Pro is free to use, with no account required, no file size
              paywalls, and no hidden charges.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-1">Works Everywhere</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Fully responsive and built to work smoothly on desktop, tablet, and mobile browsers.
            </p>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Technology</h2>
        <p className="leading-relaxed text-gray-700 mb-4">
          OpticShift Pro is built with modern web technologies including <strong>Next.js</strong>,{' '}
          <strong>React</strong>, <strong>TypeScript</strong>, and the browser&apos;s native{' '}
          <strong>Canvas and File APIs</strong>. These let the site perform image and document
          operations — compression, format conversion, resizing, cropping, watermarking, and
          more — directly on your device&apos;s hardware, with no server-side file processing
          involved.
        </p>
        <p className="leading-relaxed text-gray-700">
          This approach protects your privacy as a direct consequence of how the tools are built,
          not as an added-on promise, and it also means results appear almost instantly since
          there&apos;s no upload or server round-trip to wait for.
        </p>
      </section>

      {/* Founder */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Who We Are</h2>
        <p className="leading-relaxed text-gray-700 mb-6">
          OpticShift Pro is built and maintained independently by a single developer. It&apos;s
          not backed by outside investors or a larger company — just one person building tools
          they wanted to exist, and improving them based on how people actually use them.
        </p>
        <div className="flex items-start gap-4 p-5 border border-gray-200 rounded-xl bg-gray-50">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            S
          </div>
          <div>
            <p className="font-semibold text-gray-900">Suraj Kumar</p>
            <p className="text-sm text-gray-500 mb-2">Founder &amp; Developer</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              I build and maintain OpticShift Pro end to end — from the tools themselves to the
              privacy-first architecture behind them. My focus is on keeping every tool genuinely
              useful, fast, and free, without asking anyone to give up their privacy to use it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-10 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">
          Try any of our 33+ free tools — no account needed, no files uploaded.
        </p>
        <Link
          href="/tools"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
        >
          Explore All Tools →
        </Link>
      </section>
    </main>
  );
}

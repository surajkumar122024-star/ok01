export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">About OpticShift Pro</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          We believe that professional-grade image tools should be free, fast, and — above all —
          completely private. That belief is the foundation of everything we build.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Story</h2>
        <p className="leading-relaxed mb-4 text-gray-700">
          OpticShift Pro was founded in 2026 by a small team of web developers who were frustrated
          with the state of online image tools. Every tool we tried either demanded that we upload
          sensitive files to unknown servers, was cluttered with aggressive advertising, or was slow
          and unreliable.
        </p>
        <p className="leading-relaxed mb-4 text-gray-700">
          We decided to build a better alternative — one that leverages the full power of modern
          web browsers to process images locally, without ever sending your data to a third-party server.
          The result is OpticShift Pro: a suite of 11+ professional image tools that run entirely
          in your browser, completely free.
        </p>
        <p className="leading-relaxed text-gray-700">
          Today, OpticShift Pro serves thousands of users including designers, developers, content
          creators, and everyday people who need fast, reliable, and private image processing.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h2>
        <p className="leading-relaxed text-gray-700">
          Our mission is simple: <strong>empower every person with professional image tools,
          without compromising their privacy.</strong> We believe that your files belong to you,
          and no online service should require you to hand over sensitive images just to compress
          or convert them. Privacy is not a premium feature — it is a basic right, and we protect
          it through our architecture, not just our promises.
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
              Your images never leave your device. All processing happens locally in your browser.
              There are no uploads, no servers, no data breaches possible.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Lightning Performance</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              By eliminating uploads, we eliminate wait times. Our tools use optimized Canvas
              and WebAssembly APIs for instant, professional results.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
            <div className="text-2xl mb-2">🆓</div>
            <h3 className="font-semibold text-gray-900 mb-1">Always Free</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every tool on OpticShift Pro is free to use, with no account required, no file
              size paywalls, and no hidden charges. Ever.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-1">Works Everywhere</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Fully responsive and tested on all major browsers and devices — desktop, tablet,
              and mobile. Professional tools in your pocket.
            </p>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Our Technology</h2>
        <p className="leading-relaxed text-gray-700 mb-4">
          OpticShift Pro is built with modern web technologies including <strong>Next.js</strong>,
          <strong> TypeScript</strong>, <strong>HTML5 Canvas API</strong>, and
          <strong> WebAssembly</strong>. These technologies allow us to perform complex image
          manipulations — compression, format conversion, resizing, cropping, watermarking —
          entirely on your device&apos;s hardware, with no server infrastructure required.
        </p>
        <p className="leading-relaxed text-gray-700">
          This approach not only protects your privacy but also makes our tools significantly
          faster than server-based alternatives. There is zero upload time, and results appear
          in seconds.
        </p>
      </section>

      {/* Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Who We Are</h2>
        <p className="leading-relaxed text-gray-700 mb-6">
          OpticShift Pro is built and maintained by an independent team of developers passionate
          about privacy, performance, and open web standards. We are a bootstrapped team — not
          backed by venture capital — which means our only obligation is to our users.
        </p>
        <div className="flex items-start gap-4 p-5 border border-gray-200 rounded-xl bg-gray-50">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            S
          </div>
          <div>
            <p className="font-semibold text-gray-900">Jackson</p>
            <p className="text-sm text-gray-500 mb-2">Founder &amp; Lead Developer</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Full-stack developer with a focus on privacy-first web applications and
              performance optimization. Passionate about building tools that make people&apos;s
              lives easier without compromising their security.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-10 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">
          Try any of our 11+ free image tools — no account needed, no files uploaded.
        </p>
        <a
          href="/tools"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
        >
          Explore All Tools →
        </a>
      </section>
    </main>
  );
}

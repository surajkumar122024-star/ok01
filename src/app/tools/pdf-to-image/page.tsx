'use client';

export default function PDFToImage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">PDF to Image</h1>

      <p className="text-gray-600 mb-6">
        Convert PDF pages into images instantly.
      </p>

      <input
        type="file"
        accept=".pdf"
        className="border p-2 rounded"
      />

      <div className="mt-6 p-4 border rounded">
        PDF to Image tool coming soon...
      </div>
    </div>
  );
}

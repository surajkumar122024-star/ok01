'use client';
import { useState, useRef } from 'react';

export default function ImageToPDF() {
  const [images, setImages] = useState<string[]>([]);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const convertToPDF = async () => {
    setConverting(true);
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    
    for (let i = 0; i < images.length; i++) {
      if (i > 0) pdf.addPage();
      const img = new Image();
      img.src = images[i];
      await new Promise(resolve => { img.onload = resolve; });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;
      pdf.addImage(images[i], 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }
    
    pdf.save('images-to-pdf.pdf');
    setConverting(false);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Image to PDF</h1>
      <p className="text-muted-foreground mb-8">
        Convert your images to PDF. 100% free, no upload, works in browser.
      </p>

      <div
        className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-lg font-medium">Click to select images</p>
        <p className="text-muted-foreground text-sm mt-2">JPG, PNG supported</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
      </div>

      {images.length > 0 && (
        <div className="mt-8">
          <p className="font-medium mb-4">{images.length} image(s) selected</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {images.map((img, i) => (
              <img key={i} src={img} className="rounded-lg w-full h-32 object-cover" />
            ))}
          </div>
          <button
            onClick={convertToPDF}
            disabled={converting}
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            {converting ? 'Converting...' : 'Convert to PDF'}
          </button>
        </div>
      )}
    </main>
  );
}

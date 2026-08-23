import BarcodeGeneratorClient from './BarcodeGeneratorClient'

export const metadata = {
  title: 'Free Barcode Generator Online — No Sign-Up — OpticShift Pro',
  description: 'Generate a scannable barcode (CODE128, EAN-13, UPC, and more) instantly in your browser. Free, no sign-up, no watermark — download as PNG or SVG.',
  keywords: 'barcode generator, free barcode generator, generate barcode online, code128 generator, ean13 barcode, upc barcode generator',
}

export default function BarcodeGeneratorPage() {
  return <BarcodeGeneratorClient />
}

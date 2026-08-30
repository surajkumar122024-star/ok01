import GstCalculatorClient from './GstCalculatorClient'

export const metadata = {
  title: 'Free GST Calculator Online — Add or Remove GST — OpticShift Pro',
  description: 'Calculate GST amount, add GST to a price, or remove GST from a price — with CGST/SGST split. Free, instant, no sign-up.',
  keywords: 'gst calculator, gst calculator online, add gst, remove gst, cgst sgst calculator, gst amount calculator, reverse gst calculator',
}

export default function GstCalculatorPage() {
  return <GstCalculatorClient />
}

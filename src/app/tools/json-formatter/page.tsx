import JsonFormatterClient from './JsonFormatterClient'

export const metadata = {
  title: 'JSON Formatter — OpticShift Pro',
  description: 'Format, validate and minify JSON instantly in your browser. Free and private.',
}

export default function JsonFormatterPage() {
  return <JsonFormatterClient />
}

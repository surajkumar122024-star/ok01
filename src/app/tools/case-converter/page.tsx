import CaseConverterClient from './CaseConverterClient'

export const metadata = {
  title: 'Case Converter — OpticShift Pro',
  description: 'Convert text to UPPER, lower, Title, camelCase, snake_case and more instantly.',
}

export default function CaseConverterPage() {
  return <CaseConverterClient />
}

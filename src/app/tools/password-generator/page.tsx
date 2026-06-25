import PasswordGeneratorClient from './PasswordGeneratorClient'

export const metadata = {
  title: 'Password Generator — OpticShift Pro',
  description: 'Generate strong, secure passwords instantly. Free, private, nothing stored.',
}

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />
}

import AgeCalculatorClient from './AgeCalculatorClient'

export const metadata = {
  title: 'Free Age Calculator Online — OpticShift Pro',
  description: 'Calculate your exact age in years, months, and days from your date of birth. Free, instant, no sign-up.',
  keywords: 'age calculator, date of birth calculator, calculate age online, how old am i, age in years months days',
}

export default function AgeCalculatorPage() {
  return <AgeCalculatorClient />
}

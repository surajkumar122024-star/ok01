import UnitConverterClient from './UnitConverterClient'

export const metadata = {
  title: 'Unit Converter — OpticShift Pro',
  description: 'Convert length, weight, temperature, area, volume, speed, data storage and time instantly. 100% browser-based, no uploads.',
}

export default function UnitConverterPage() {
  return <UnitConverterClient />
}

import CharacterCounterClient from './CharacterCounterClient'

export const metadata = {
  title: 'Character Counter — OpticShift Pro',
  description: 'Count characters, words, sentences, reading time & check platform limits instantly.',
}

export default function CharacterCounterPage() {
  return <CharacterCounterClient />
}

export type Artist = {
  slug: string
  name: string
  alias?: string
  descriptor: string
  tags: string[]
  accent: string
  bio: string
  links: { label: string; url: string }[]
}

export const artists: Artist[] = [
  {
    slug: 'sham-parker',
    name: 'Sham Parker',
    descriptor: 'Ambient · Trapsoul · Cloud',
    tags: ['Ambient', 'Trapsoul', 'Cloud'],
    accent: '#A89EE0',
    bio: 'Moody and cathartic. Smooth melodies aligned with the cultural moment — a calm spiritual frequency somewhere between ambient and the edge of hyperpop.',
    links: [],
  },
  {
    slug: 'koro',
    name: 'Koro',
    alias: 'Wayfindersafe',
    descriptor: 'Funky Rap · Easygoing',
    tags: ['Funky Rap', 'Easygoing'],
    accent: '#F0A050',
    bio: 'Producer turned artist. Funky beats, a warm tongue, and an easygoing energy that makes everything feel lighter.',
    links: [],
  },
  {
    slug: 'mareso',
    name: 'Mareso',
    descriptor: 'Ethereal R&B · Ambient',
    tags: ['Ethereal R&B', 'Ambient'],
    accent: '#D4A0B8',
    bio: 'Smooth ambience meets ethereal R&B. Quiet but present — the space between the notes is where Mareso lives.',
    links: [],
  },
  {
    slug: 'allora',
    name: 'Alloraricci',
    descriptor: 'Dark R&B · Ambient · Ethereal',
    tags: ['Dark R&B', 'Ambient', 'Ethereal'],
    accent: '#7B5EA7',
    bio: 'Dark, still, and atmospheric. A sound that draws you into shadow — depth you fall into and don\'t want to leave.',
    links: [],
  },
  {
    slug: 'demo',
    name: 'Demo',
    descriptor: 'Punk · Funk · High Energy',
    tags: ['Punk', 'Funk', 'High Energy'],
    accent: '#D8F040',
    bio: 'Upbeat, creative, and alive. The highest frequency in the room — punk energy wrapped in inventive melodic instincts.',
    links: [],
  },
]

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug)
}

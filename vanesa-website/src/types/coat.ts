export type CoatRarity = 'común' | 'poco común' | 'raro'

export interface Coat {
  id: string
  name: string
  nameEnglish: string
  description: string
  image: string
  genetics: string[]
  rarity: CoatRarity
}

export interface Gene {
  name: string
  allele1: string
  allele2: string
}

export interface ParentGenotype {
  extension: Gene
  agouti: Gene
  cream: Gene
  gray: Gene
}

export interface CoatProbability {
  phenotype: string
  probability: number
  description: string
  image?: string
}

export type BloodType = 'fría' | 'caliente' | 'templada'

export type Temperament = 'dócil' | 'enérgico' | 'equilibrado'

export interface Horse {
  id: string
  name: string
  image: string
  country: string
  bloodType: string
  temperament: string
  height: number
  uses: string[]
  history: string
  additionalInfo?: string
}

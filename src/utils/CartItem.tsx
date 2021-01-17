import { Dose } from './Stores'

export interface CartItem {
  storeName: string,
  dose: Dose
  piece: number
}
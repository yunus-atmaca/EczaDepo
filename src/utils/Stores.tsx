
export interface Dose {
  fullName: string
  medicineType: string
  companyName: string
  atc: string
  activeIngredient: string
  labelPrice: number | string
  warehousePrice: number | string
  discount: string
  pharmacistProfitRate: string
  isInStock: boolean
}

export interface Medicine {
  name: string
  doses: Dose[]
}

export interface Store {
  storeName: string
  medicines: Medicine[]
}

const Store_1: Store = require('../../stores/Store_1.json')
const Store_2: Store = require('../../stores/Store_2.json')
const Store_3: Store = require('../../stores/Store_3.json')
const Store_4: Store = require('../../stores/Store_4.json')
const Store_5: Store = require('../../stores/Store_5.json')

export const stores: Store[] = [
  Store_1,
  Store_2,
  Store_3,
  Store_4,
  Store_5
]
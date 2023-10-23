import { proxy } from 'valtio'

interface Store {
  countries: Countries[] | []
  regionFilter: string
  darkmode: boolean
  query: string
}

export const store = proxy<Store>({
  countries: [],
  regionFilter: '',
  darkmode: true,
  query: ''

})

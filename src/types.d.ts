interface Countries {
  name: Name
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital: string
  altSpellings: string[]
  subregion: string
  region: string
  population: number
  latlng: number[]
  demonym: string
  area: number
  timezones: string[]
  borders: string[]
  nativeName: string[]
  numericCode: string
  flags: Flags
  currencies: Currency[]
  languages: Language[]
  translations: Translations
  flag: string
  regionalBlocs: RegionalBloc[]
  cioc: string
  cca3: string
  independent: boolean
  tld: string
}

interface Name {
  common: string
  nativeName: NativeName
}
interface NativeName {
  fra?: Official
}

interface Official {
  official: string
}
interface Currency {
  code: string
  name: string
  symbol: string
}

interface Flags {
  svg: string
  png: string
}

interface Language {
  iso639_1: string
  iso639_2: string
  name: string
  nativeName: string
}

interface RegionalBloc {
  acronym: string
  name: string
}

interface Translations {
  br: string
  pt: string
  nl: string
  hr: string
  fa: string
  de: string
  es: string
  fr: string
  ja: string
  it: string
  hu: string
}

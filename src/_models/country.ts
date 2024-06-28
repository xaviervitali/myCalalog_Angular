export interface Country {
  iso3166: string;
  countryName: string;
  languageTag: string;
}

export interface CountryGroup {
  letter: string;
  countries: string[];
}

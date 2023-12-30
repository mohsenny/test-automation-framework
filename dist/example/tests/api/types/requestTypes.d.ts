export type Country = {
    code: string;
    name: string;
};
export type CountryData = {
    country: Country;
};
export type CountriesData = {
    countries: Country[];
};
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export declare const sampleQueries: {
    getCountries: string;
    getCountry: string;
    invalidQuery: string;
};
export declare const sampleVariables: {
    countryVariables: {
        code: string;
    };
};

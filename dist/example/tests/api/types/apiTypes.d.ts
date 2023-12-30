export declare const countriesResponseSchema: {
    type: string;
    properties: {
        countries: {
            type: string;
            items: {
                type: string;
                properties: {
                    code: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export declare const countryResponseSchema: {
    type: string;
    properties: {
        country: {
            type: string;
            properties: {
                name: {
                    type: string;
                };
            };
            required: string[];
        };
    };
    required: string[];
};
export interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
}

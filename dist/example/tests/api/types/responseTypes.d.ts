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
export declare const postsResponseSchema: {
    type: string;
    items: {
        type: string;
        properties: {
            userId: {
                type: string;
            };
            id: {
                type: string;
            };
            title: {
                type: string;
            };
            body: {
                type: string;
            };
        };
        required: string[];
    };
};
export declare const postResponseSchema: {
    type: string;
    properties: {
        userId: {
            type: string;
        };
        id: {
            type: string;
        };
        title: {
            type: string;
        };
        body: {
            type: string;
        };
    };
    required: string[];
};

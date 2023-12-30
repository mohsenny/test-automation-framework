export declare const postEndpoints: {
    getPosts: string;
    getPost: string;
    invalidEndpoint: string;
};
export declare const postResponseSchema: {
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

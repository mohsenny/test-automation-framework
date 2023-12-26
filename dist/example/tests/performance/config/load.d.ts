export interface LoadStage {
    target: number;
    duration: string;
}
interface Scenario {
    getPostmanEcho?: LoadStage[];
    jsonPlaceholder?: {
        getPosts: LoadStage[];
        createPosts: LoadStage[];
    };
}
export interface Loads {
    performance: Scenario;
    sanity: Scenario;
}
export declare const loads: {
    performance: {
        getPostmanEcho: {
            target: number;
            duration: string;
        }[];
        jsonPlaceholder: {
            getPosts: {
                target: number;
                duration: string;
            }[];
            createPosts: {
                target: number;
                duration: string;
            }[];
        };
    };
    sanity: {
        getPostmanEcho: {
            target: number;
            duration: string;
        }[];
        jsonPlaceholder: {
            getPosts: {
                target: number;
                duration: string;
            }[];
            createPosts: {
                target: number;
                duration: string;
            }[];
        };
    };
};
export declare function get(env: keyof Loads): Scenario;
export {};

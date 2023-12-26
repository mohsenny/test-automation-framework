export declare const options: {
    ext: {
        loadimpact: {
            projectID: string | number | undefined;
            distribution: {
                "amazon:de:frankfurt": {
                    loadZone: string;
                    percent: number;
                };
            };
            apm: never[];
        };
    };
    thresholds: {
        http_req_failed: string[];
        http_req_duration: string[];
    };
    scenarios: {
        jsonPlaceholderPosts: {
            executor: string;
            gracefulStop: string;
            stages: import("../../config/load.js").LoadStage[] | undefined;
            gracefulRampDown: string;
        };
    };
};
export declare function setup(): void;
export default function (): void;

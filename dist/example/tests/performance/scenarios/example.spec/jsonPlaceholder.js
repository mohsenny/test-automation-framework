"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.options = void 0;
const k6_1 = require("k6");
// Configuration
const customConfig_js_1 = require("../../config/customConfig.js");
const load_js_1 = require("../../config/load.js"); // Import Loads type for casting
// Requests
const jsonPlaceholderRequests = __importStar(require("../../requests/jsonPlaceholder.js"));
// Ensure runType is a valid key of Loads
const runType = customConfig_js_1.customOptions.runType;
const load = (0, load_js_1.get)(runType);
// K6 Phase Options
exports.options = {
    ext: {
        loadimpact: {
            projectID: customConfig_js_1.customOptions.projectId, // Assuming projectId is defined in customOptions
            distribution: {
                "amazon:de:frankfurt": {
                    loadZone: "amazon:de:frankfurt",
                    percent: 100,
                },
            },
            apm: [],
        },
    },
    thresholds: {
        http_req_failed: ["rate < 0.01"], // http errors should be less than 1%
        http_req_duration: ["p(95) < 500"], // 95% of requests should be below 500ms
    },
    scenarios: {
        jsonPlaceholderPosts: {
            executor: "ramping-vus",
            gracefulStop: "30s",
            stages: (_a = load.jsonPlaceholder) === null || _a === void 0 ? void 0 : _a.getPosts, // Ensuring proper chaining
            gracefulRampDown: "30s",
        },
    },
};
function setup() {
    /*
    Prepare what is needed to run the tests like creating users, aquiring auth tokens, etc
    At the end you can return values which can be used inside the test, i.e.:
    return {
      token: authToken,
    };
    */
}
exports.setup = setup;
// Testcase
function default_1() {
    (0, k6_1.group)("Get all Posts", () => {
        jsonPlaceholderRequests.getPosts();
        (0, k6_1.sleep)(1);
    });
    (0, k6_1.group)("Create a Post", () => {
        const payload = {
            userId: 1,
            title: "Good post!",
            body: "This is a good post.",
        };
        jsonPlaceholderRequests.createPost(payload);
        (0, k6_1.sleep)(1);
    });
}
exports.default = default_1;

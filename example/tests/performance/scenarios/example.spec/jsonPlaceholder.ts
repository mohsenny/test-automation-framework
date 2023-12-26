import { sleep, group } from "k6";

// Configuration
import { customOptions } from "../../config/customConfig.js";
import { get, Loads } from "../../config/load.js";  // Import Loads type for casting

// Requests
import * as jsonPlaceholderRequests from "../../requests/jsonPlaceholder.js";

// Ensure runType is a valid key of Loads
const runType = customOptions.runType as keyof Loads;
const load = get(runType);

// K6 Phase Options
export const options = {
  ext: {
    loadimpact: {
      projectID: customOptions.projectId, // Assuming projectId is defined in customOptions
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
      stages: load.jsonPlaceholder?.getPosts,  // Ensuring proper chaining
      gracefulRampDown: "30s",
    },
  },
};


export function setup() {
  /* 
  Prepare what is needed to run the tests like creating users, aquiring auth tokens, etc
  At the end you can return values which can be used inside the test, i.e.:
  return {
    token: authToken,
  }; 
  */
}

// Testcase
export default function () {
  group("Get all Posts", () => {
    jsonPlaceholderRequests.getPosts();
    sleep(1);
  });

  group("Create a Post", () => {
    const payload = {
      userId: 1,
      title: "Good post!",
      body: "This is a good post.",
    };
    jsonPlaceholderRequests.createPost(payload);
    sleep(1);
  });
}

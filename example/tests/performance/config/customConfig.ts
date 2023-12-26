import {
  getEnvVariable,
  defaultOptions,
} from "../../../../src/perfomrance/config/configure"; // Import from the package

export const customOptions = {
  ...defaultOptions,
  host: getEnvVariable("MY_HOSTNAME"),
  runType: getEnvVariable("RUN_TYPE"),
  account: {
    ...defaultOptions.account,
    email: "custom@example.com", // Override default email
  },
  // Add or override other settings specific to the consumer
};
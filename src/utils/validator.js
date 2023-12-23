"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResponse = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
function validateResponse(response, schema) {
  const validate = ajv.compile(schema);
  return validate(response);
}
exports.validateResponse = validateResponse;

import Ajv from "ajv";
const ajv = new Ajv();

export function validateResponse(response: any, schema: any): boolean {
  const validate = ajv.compile(schema);
  return validate(response);
}
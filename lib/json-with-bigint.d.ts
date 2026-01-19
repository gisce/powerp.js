declare module "json-with-bigint" {
  export const JSONStringify: typeof JSON.stringify;
  export const JSONParse: typeof JSON.parse;
}

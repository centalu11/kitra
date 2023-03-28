import * as Validator from "validatorjs";

const validator = async (params, rules, customMessages, callback) => {
  const validation = new Validator(params, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

export default validator;

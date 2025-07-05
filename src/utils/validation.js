
import { VALIDATION_MSG } from "values/messages";
import { parseJsonObj } from "./parse";

export const validatefield = (rules, value) => {
  if (!rules) return { status: false };

  for (const [rule, key] of Object.entries(rules)) {

    const errorMsg = rulesCase(rule, { key, value, msgVariable: rules['msgVariable'] });
    if (errorMsg) {
      return { status: true, msg: errorMsg };
    }
  }

  return { status: false };
};

export const validateAll = (rules, credentials, isFormData = false) => {
  return new Promise((resolve, reject) => {
    const errors = {};

    Object.entries(rules).forEach(([field, rule]) => {
      const value = isFormData ? credentials.get(field) : credentials[field];
      const validation = validatefield(rule, value);
      if (validation.msg) {
        errors[field] = validation.msg;
      }
    });

    Object.keys(errors).length > 0 ? reject(errors) : resolve(true);
  });
};

const rulesCase = (rule, obj) => {
  switch (rule) {
    case "required":
      return isRequired(obj);
    case "email":
      return isEmail(obj);
    case "name_id":
      return validNameId(obj);
    case "url":
      return isUrl(obj);
    case "numeric":
      return isNumeric(obj);
    case "length":
      return validLength(obj);
    case "maxlength":
      return isMaxLength(obj);
    case "minlength":
      return isMinLength(obj);
    case "maxSize":
      return isMaxSize(obj);
    case "minSize":
      return isMinSize(obj);
    default:
      return null;
  }
};

const validLength = (obj) => {
  const { key, value, msgVariable } = obj
  return value.trim().length !== key ? formatMessage(VALIDATION_MSG.length, msgVariable) : null;
};

const isMinLength = (obj) => {
  const { key, value, msgVariable } = obj
  return value?.trim()?.length < key ? formatMessage(VALIDATION_MSG.minlength, msgVariable) : null;
};

const isMaxLength = (obj) => {
  const { key, value, msgVariable } = obj
  return value?.trim()?.length > key ? formatMessage(VALIDATION_MSG.maxlength, msgVariable) : null;
};

const isMaxSize = (obj) => {
  const { key, value, msgVariable } = obj
  return parseJsonObj(value).length > key ? formatMessage(VALIDATION_MSG.maxSize, msgVariable) : null;
};

const isMinSize = (obj) => {
  const { key, value, msgVariable } = obj
  return parseJsonObj(value).length < key ? formatMessage(VALIDATION_MSG.minSize, msgVariable) : null;
};

export const isNumeric = (obj) => {
  const { value, msgVariable } = obj
  const regex = /^[0-9]+$/;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.numeric, msgVariable);
};

export const validImg = (obj) => {
  const { value, msgVariable } = obj
  const regex = /\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.img, msgVariable);
};

const isUrl = (obj) => {
  const { value, msgVariable } = obj
  const urlRegex = new RegExp(
    "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
  );
  return urlRegex.test(value) ? null : formatMessage(VALIDATION_MSG.url, msgVariable);
};

export const validNameId = (obj) => {
  const { value, msgVariable } = obj
  const regex = /^(?=.{4,20}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.nameId, msgVariable);
};

const isEmail = (obj) => {
  const { value, msgVariable } = obj
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.email, msgVariable);
};

const isRequired = (obj) => {
  const { value, msgVariable } = obj
  return value?.toString().trim() ? null : formatMessage(VALIDATION_MSG.required, msgVariable);
};

function formatMessage(template, variables = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => variables[key] || '');
}

export const validateAutocomplete = (oldArr, val) => {
  return val.trim() && !oldArr.includes(val.trim().toLowerCase());
};


export function checkDataDuplication(newFiles, oldFiles, tag = "name") {
  let error = null;

  const filteredFiles = Object.values(newFiles)
    .slice(0, 10)
    .filter((file) => {
      const isDuplicate = oldFiles.some(
        (oldFile) => oldFile[tag] === file[tag]
      );
      if (isDuplicate) {
        error = VALIDATION_MSG.duplicateEntry;
        return false;
      }

      if (!/\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i.test(file.name)) {
        error = VALIDATION_MSG.invalidImageType;
        return false;
      }

      return true;
    });

  if (newFiles.length + oldFiles.length > 10) {
    error = VALIDATION_MSG.maxImageUpload;
  }

  return { filteredFiles, error };
}


import { VALIDATION_MSG } from "values/messages";
import { parseJsonObj } from "./parse";

export const validatefield = (rules, value) => {
  if (!rules) return { status: false };

  for (const [rule, key] of Object.entries(rules)) {
    const errorMsg = rulesCase(rule, key, value);
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

const rulesCase = (rule, key, value) => {
  switch (rule) {
    case "required":
      return isRequired(value);
    case "email":
      return isEmail(value);
    case "name_id":
      return validNameId(value);
    case "url":
      return isUrl(value);
    case "numeric":
      return isNumeric(value);
    case "length":
      return validLength(key, value);
    case "maxlength":
      return isMaxLength(key, value);
    case "minlength":
      return isMinLength(key, value);
    case "maxSize":
      return isMaxSize(key, value);
    case "minSize":
      return isMinSize(key, value);
    default:
      return null;
  }
};

const validLength = (key, value) => {
  return value.trim().length !== key ? VALIDATION_MSG.length : null;
};

const isMinLength = (key, value) => {
  return value?.trim()?.length < key ? VALIDATION_MSG.minlength : null;
};

const isMaxLength = (key, value) => {
  return value?.trim()?.length > key ? VALIDATION_MSG.maxlength : null;
};

const isMaxSize = (key, value) => {
  return parseJsonObj(value).length > key ? VALIDATION_MSG.maxSize : null;
};

const isMinSize = (key, value) => {
  return parseJsonObj(value).length < key ? VALIDATION_MSG.minSize : null;
};

export const isNumeric = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value) ? null : VALIDATION_MSG.numeric;
};

export const validImg = (value) => {
  const regex = /\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i;
  return regex.test(value) ? null : VALIDATION_MSG.img;
};

const isUrl = (value) => {
  const urlRegex = new RegExp(
    "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
  );
  return urlRegex.test(value) ? null : VALIDATION_MSG.url;
};

export const validateAutocomplete = (oldArr, val) => {
  return val.trim() && !oldArr.includes(val.trim().toLowerCase());
};

export const validNameId = (value) => {
  const regex = /^(?=.{4,20}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return regex.test(value) ? null : VALIDATION_MSG.nameId;
};

const isEmail = (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(value) ? null : VALIDATION_MSG.email;
};

const isRequired = (value) => {
  return value?.toString().trim() ? null : VALIDATION_MSG.required;
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

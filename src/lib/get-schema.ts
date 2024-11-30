import { FormType } from "@/types";
import { z } from "zod";

export const getSchema = (type?: FormType) => {
  if (!type) {
    return z.object({});
  }

  return type.fields.reduce((acc, field) => {
    switch (field.type) {
      case "number":
        return acc.extend({ [field.id]: field.required ? z.number() : z.optional(z.number()) });
      case "string":
        return acc.extend({ [field.id]: field.required ? z.string() : z.optional(z.string()) });
      case "email":
        return acc.extend({ [field.id]: field.required ? z.string().email() : z.optional(z.string().email()) });
      case "password":
        return acc.extend({ [field.id]: field.required ? z.string().min(8) : z.optional(z.string().min(8)) });
      case "date":
        return acc.extend({ [field.id]: field.required ? z.date() : z.optional(z.date()) });
      case "boolean":
        return acc.extend({ [field.id]: field.required ? z.boolean() : z.optional(z.boolean()) });
      default:
        return acc;
    }
  }, z.object({}));
}

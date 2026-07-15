import { NewPatientEntry, NewEntrySchema } from "./types.js";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};

import { unknown } from "zod";
import {
  NewPatientEntry,
  NewPatientSchema,
  NewEntry,
  NewEntrySchema,
} from "./types.js";

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

export const parseNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object);
};

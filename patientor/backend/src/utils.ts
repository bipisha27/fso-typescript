import { Gender, NewPatientEntry } from "./types.js";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object);

  const objectToCheck = object as {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
  };

  const newEntry: NewPatientEntry = {
    name: parseName(objectToCheck.name),
    dateOfBirth: parseDate(objectToCheck.dateOfBirth),
    ssn: parseSsn(objectToCheck.ssn),
    gender: parseGender(objectToCheck.gender),
    occupation: parseOccupation(objectToCheck.occupation),
  };

  return newEntry;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect format for name.");
  }
  return name;
};

const isDate = (date: string): Boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("incorrect format for ssn.");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("incorrect format for occupation.");
  }
  return occupation;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("incorrect or missing gender: " + gender);
  }
  return gender;
};

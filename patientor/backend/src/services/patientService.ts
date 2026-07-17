import patients from "../../data/patients.js";
import type {
  NonSensitivePatient,
  Patient,
  NewPatientEntry,
} from "../types.js";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
};

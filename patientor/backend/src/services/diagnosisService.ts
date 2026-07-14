import diagnoses from "../../data/diagnoses.js";
import type { Diagnosis } from "../types.js";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default { getDiagnoses };

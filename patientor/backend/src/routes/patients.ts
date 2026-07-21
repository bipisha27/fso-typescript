import express from "express";
import patientService from "../services/patientService.js";
import { parseNewPatientEntry, parseNewEntry } from "../utils.js";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient not found." });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = parseNewEntry(req.body);

    const addedEntry = patientService.addEntry(req.params.id, newEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;

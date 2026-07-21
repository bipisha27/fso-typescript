import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import AddEntryForm from "./components/AddEntryForm";

import { apiBaseUrl } from "./constants";
import { Patient, Gender, Diagnosis, NewEntry } from "./types";

import diagnosisService from "./services/diagnoses";

import EntryDetails from "./EntryDetails";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

import { useParams } from "react-router-dom";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      const patient = await patientService.get(id);
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography>loading...</Typography>;
  }

  const submitNewEntry = async (entry: NewEntry) => {
    if (!id || !patient) {
      return;
    }

    try {
      const addedEntry = await patientService.addEntry(id, entry);

      setPatient({
        ...patient,
        entries: patient.entries.concat(addedEntry),
      });

      setError("");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;

        if (data?.error && Array.isArray(data.error)) {
          setError(
            data.error
              .map((issue: { message: string }) => issue.message)
              .join(", "),
          );
        } else {
          setError("Failed to add entry.");
        }
      } else {
        setError("Unknown error.");
      }
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {patient.name}

        {patient.gender === Gender.Male && <MaleIcon />}
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Other && <TransgenderIcon />}
      </Typography>

      <Typography>ssn: {patient.ssn}</Typography>

      <Typography>occupation: {patient.occupation}</Typography>

      <Typography>date of birth: {patient.dateOfBirth}</Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <AddEntryForm
        onSubmit={submitNewEntry}
        onCancel={() => {
          console.log("Cancel");
        }}
      />

      <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 2 }}>
        Entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginBottom: "0.5em" }}
          >
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientPage diagnoses={diagnoses} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

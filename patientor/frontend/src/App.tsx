import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient, Gender } from "./types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

import { useParams } from "react-router-dom";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

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
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
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
            <Route path="/patients/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

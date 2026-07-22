import { useState } from "react";
import { NewEntry, HealthCheckRating, Diagnosis } from "../types";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ diagnoses, onSubmit, onCancel }: Props) => {
  const [type, setType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseFields = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 && { diagnosisCodes }),
    };

    let newEntry: NewEntry;

    switch (type) {
      case "HealthCheck":
        newEntry = {
          ...baseFields,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;

      case "Hospital":
        newEntry = {
          ...baseFields,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      case "OccupationalHealthcare":
        newEntry = {
          ...baseFields,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart &&
            sickLeaveEnd && {
              sickLeave: {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd,
              },
            }),
        };
        break;
    }

    onSubmit(newEntry);
  };

  return (
    <form
      onSubmit={submit}
      style={{
        border: "1px solid #cfcfcf",
        borderRadius: "8px",
        padding: "20px",
        margin: "20px 0",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          marginBottom: "14px",
        }}
      >
        Entry type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
        >
          <option value="HealthCheck">Health Check</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">
            Occupational Healthcare
          </option>
        </select>
      </div>

      <div
        style={{
          marginBottom: "14px",
        }}
      >
        <span style={{ marginRight: "8px" }}>Description:</span>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div
        style={{
          marginBottom: "14px",
        }}
      >
        <span style={{ marginRight: "8px" }}>Date:</span>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div
        style={{
          marginBottom: "14px",
        }}
      >
        <span style={{ marginRight: "8px" }}>Specialist:</span>
        <input
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
      </div>

      <div style={{ marginBottom: "14px" }}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Diagnosis Codes</InputLabel>

          <Select
            multiple
            value={diagnosisCodes}
            label="Diagnosis Codes"
            onChange={(event) =>
              setDiagnosisCodes(event.target.value as string[])
            }
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code} {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {type === "HealthCheck" && (
        <div
          style={{
            marginBottom: "14px",
          }}
        >
          Health Check Rating (0-3):
          <FormControl size="small">
            <InputLabel>Health Rating</InputLabel>

            <Select
              value={healthCheckRating}
              label="Health Rating"
              onChange={(e) =>
                setHealthCheckRating(
                  Number(e.target.value) as HealthCheckRating,
                )
              }
              style={{ minWidth: 220 }}
            >
              <MenuItem value={HealthCheckRating.Healthy}>0 - Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>
                1 - Low Risk
              </MenuItem>

              <MenuItem value={HealthCheckRating.HighRisk}>
                2 - High Risk
              </MenuItem>

              <MenuItem value={HealthCheckRating.CriticalRisk}>
                3 - Critical Risk
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      {type === "Hospital" && (
        <>
          <div>
            Discharge Date:
            <input
              type="date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
          </div>

          <div>
            Discharge Criteria:
            <input
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </div>
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <div
            style={{
              marginBottom: "14px",
            }}
          >
            <span style={{ marginRight: "8px" }}>Employer Name:</span>
            <input
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </div>
          <div
            style={{
              marginBottom: "14px",
            }}
          >
            <span style={{ marginRight: "8px" }}>
              Sick Leave Start (optional):
            </span>{" "}
            <input
              type="date"
              value={sickLeaveStart}
              onChange={(e) => setSickLeaveStart(e.target.value)}
            />
          </div>
          <div
            style={{
              marginBottom: "14px",
            }}
          >
            <span style={{ marginRight: "8px" }}>
              Sick Leave End (optional):
            </span>
            <input
              type="date"
              value={sickLeaveEnd}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
            />
          </div>
        </>
      )}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }}
          type="submit"
        >
          Add
        </button>
        <button
          style={{
            backgroundColor: "white",
            color: "#1976d2",
            border: "1px solid #1976d2",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEntryForm;

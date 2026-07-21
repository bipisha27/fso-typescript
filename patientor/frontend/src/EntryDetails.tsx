import { Box, Typography } from "@mui/material";

import { Entry } from "./types";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box
          sx={{
            border: 1,
            borderColor: "grey.400",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {entry.date}
            <LocalHospitalIcon />
          </Typography>

          <Typography fontStyle="italic">{entry.description}</Typography>

          <Typography>Discharge: {entry.discharge.date}</Typography>

          <Typography>{entry.discharge.criteria}</Typography>
        </Box>
      );

    case "OccupationalHealthcare":
      return (
        <Box
          sx={{
            border: 1,
            borderColor: "grey.400",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {entry.date}
            <WorkIcon />
          </Typography>

          <Typography>Employer: {entry.employerName}</Typography>

          <Typography fontStyle="italic">{entry.description}</Typography>
        </Box>
      );

    case "HealthCheck":
      return (
        <Box
          sx={{
            border: 1,
            borderColor: "grey.400",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {entry.date}

            <FavoriteIcon
              color={
                entry.healthCheckRating === 0
                  ? "success"
                  : entry.healthCheckRating === 1
                    ? "warning"
                    : entry.healthCheckRating === 2
                      ? "error"
                      : "error"
              }
            />
          </Typography>

          <Typography>Health Rating: {entry.healthCheckRating}</Typography>

          <Typography fontStyle="italic">{entry.description}</Typography>
        </Box>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

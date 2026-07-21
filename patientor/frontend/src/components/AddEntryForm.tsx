import { useState } from "react";
import { NewEntry, HealthCheckRating } from "../types";

interface Props {
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
    };

    onSubmit(newEntry);
  };

  return (
    <form onSubmit={submit}>
      <div>
        Description:
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div>
        Date:
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div>
        Specialist:
        <input
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
      </div>

      <div>
        Health Rating:
        <input
          type="number"
          value={healthCheckRating}
          onChange={(event) =>
            setHealthCheckRating(
              Number(event.target.value) as HealthCheckRating,
            )
          }
        />
      </div>

      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddEntryForm;

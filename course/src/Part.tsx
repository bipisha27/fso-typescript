import type { CoursePart } from "./types";

interface Props {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `unhandled undiscriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: Props) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );

    case "group":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>Group Projects: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>
            <em>{part.description}</em>
          </p>
          <p>{part.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>
            <em>{part.description}</em>
          </p>
          <p>Required Skills: {part.requirements.join(",")}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

export default Part;

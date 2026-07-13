import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(height) ||
    isNaN(weight)
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises.some((h: any) => isNaN(Number(h)))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    daily_exercises.map(Number),
    Number(target),
  );

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

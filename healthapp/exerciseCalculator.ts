interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number,
): ExerciseResult => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((h) => h > 0).length;
  const average = exerciseHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average > target) {
    rating = 3;
    ratingDescription = "excellent work, target reached.";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better.";
  } else {
    rating = 1;
    ratingDescription = "needs more effort.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Please provide target and exercise hours as arguments.");
} else {
  const allNumbers = args.every((arg) => !isNaN(Number(arg)));

  if (!allNumbers) {
    console.log("Error: all arguments must be numbers.");
  } else {
    const target = Number(args[0]);
    const exerciseHours = args.slice(1).map(Number);
    console.log(calculateExercises(exerciseHours, target));
  }
}

export {};

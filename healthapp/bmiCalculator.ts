const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = 703 * (weight / (heightInMeters * heightInMeters));

  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi > 25) {
    return "normal range";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log("Please provide height and weight as arguments.");
} else {
  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    console.log("Error: both arguments must be numbers.");
  } else {
    console.log(calculateBmi(height, weight));
  }
}

export {};

import { useState, useEffect } from "react";
import axios from "axios";

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

type Visibility = "great" | "good" | "ok" | "poor";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("good");
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      });
  }, []);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", {
        date,
        weather,
        visibility,
        comment,
      })
      .then((response) => {
        setDiaries(diaries.concat(response.data));
        setDate("");
        setWeather("sunny");
        setVisibility("good");
        setComment("");
        setErrorMessage("");
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const data = error.response?.data;

          if (data?.error?.length > 0) {
            setErrorMessage(data.error[0].message);
          } else {
            setErrorMessage("Failed to create diary entry");
          }
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      });
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      <h2>Add new entry</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          weather
          <label>
            <input
              type="radio"
              name="weather"
              value="sunny"
              checked={weather === "sunny"}
              onChange={(e) => setWeather(e.target.value as Weather)}
            />
            sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              checked={weather === "rainy"}
              onChange={(e) => setWeather(e.target.value as Weather)}
            />
            rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={(e) => setWeather(e.target.value as Weather)}
            />
            cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              checked={weather === "stormy"}
              onChange={(e) => setWeather(e.target.value as Weather)}
            />
            stormy
          </label>{" "}
          <label>
            <input
              type="radio"
              name="weather"
              value="windy"
              checked={weather === "windy"}
              onChange={(e) => setWeather(e.target.value as Weather)}
            />
            windy
          </label>
        </div>

        <div>
          visibility
          <label>
            <input
              type="radio"
              name="visibility"
              value="great"
              checked={visibility === "great"}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
            />
            great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="good"
              checked={visibility === "good"}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
            />
            good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              checked={visibility === "ok"}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
            />
            ok
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              checked={visibility === "poor"}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
            />
            poor
          </label>
        </div>

        <div>
          comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <button type="submit">add</button>
      </form>

      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          <p>Comment: {diary.comment}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;

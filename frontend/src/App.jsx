import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    // GET /
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error calling /:", err));

    // GET /api/example
    fetch("http://127.0.0.1:8000/api/example")
      .then((res) => res.json())
      .then((data) => setValue(data.value))
      .catch((err) => console.error("Error calling /api/example:", err));
  }, []);

  return (
    <div style={{ padding: "4rem", fontFamily: "sans-serif", color: "white" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "3rem" }}>
        FastAPI + Vite + React
      </h1>
      <p>Message from backend: {message}</p>
      <p>Value from /api/example: {value}</p>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";

function App() {
  const colorsArr = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  const [targetColor, setTargetColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [score, setScore] = useState(0);

  const startNewRound = () => {
    const newTargetColor =
      colorsArr[Math.floor(Math.random() * colorsArr.length)];

    const newOptions = [newTargetColor];
    while (newOptions.length < 6) {
      const randomColor =
        colorsArr[Math.floor(Math.random() * colorsArr.length)];
      if (!newOptions.includes(randomColor) && randomColor !== newTargetColor) {
        newOptions.push(randomColor);
      }
    }
    newOptions.sort(() => Math.random() - 0.5);

    setTargetColor(newTargetColor);
    setOptions(newOptions);
    setMessage("");
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleColorClick = (selectedColor) => {
    if (selectedColor === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setStatus("correct");
      setMessage("Correct! You're doing well!");
    } else {
      setStatus("incorrect");
      setMessage("Oops! Try again.");
      return;
    }

    setTimeout(() => {
      startNewRound();
    }, 1500);
  };

  const newGameClicked = () => {
    startNewRound();
    setScore(0);
  };

  return (
    <>
      <main>
        <div className="card">
          <h2 data-testid="gameInstructions">Guess the matching color!</h2>
          <span
            className="color-box"
            style={{ backgroundColor: targetColor }}
            data-testid="colorBox"
          ></span>
          <div
            className={`game-status ${
              status == "correct" ? "success" : "oops"
            } ${message ? "visible" : ""}`}
            data-testid="gameStatus"
          >
            {message}
          </div>
          <div className="options-container">
            {options.map((color, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: color,
                }}
                className="color-option"
                data-testid="colorOption"
                onClick={() => handleColorClick(color)}
              ></button>
            ))}
          </div>
          <p data-testid="score">
            Score: <strong>{score}</strong>
          </p>
          <button
            data-testid="newGameButton"
            className="new-game"
            onClick={() => newGameClicked()}
          >
            New Game
          </button>
        </div>
      </main>
    </>
  );
}

export default App;

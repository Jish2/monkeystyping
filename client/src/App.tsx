import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [words, setWords] = useState(
    "The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. "
  );
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState(new Array(words.length).fill(0));
  const [cursor, setCursor] = useState([0, 0]);

  const update = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    console.log(arr);
    console.log(key, index);
    if (key.length > 1) {
      if (key == "Backspace") {
        if (index == 0) return;
        let n = [...arr];
        n[index - 1] = 0;
        setArr(n);
        setIndex(index - 1);
      }
    } else if (key == words[index]) {
      let n = [...arr];
      n[index] = 1;
      setArr(n);
      setIndex(index + 1);
    } else {
      let n = [...arr];
      n[index] = 2;
      setArr(n);
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    const element = document
      .getElementById("" + index)
      ?.getBoundingClientRect();
    if (element) {
      setCursor([element.x, element.y]);
    }
  }, [index]);
  return (
    <div className="flex flex-col items-center">
      <div
        className="absolute w-1 h-12 bg-gray-300 transition-all duration-100 ease-out"
        style={{ top: cursor[1], left: cursor[0] }}
      ></div>
      <div className="flex flex-row flex-wrap w-1/2">
        {arr &&
          arr.map((i, index) => {
            return (
              <div
                className={`text-5xl ${
                  i === 0
                    ? "text-gray-500"
                    : i === 1
                    ? "text-green-500"
                    : "text-red-700"
                }`}
                id={"" + index}
              >
                {words[index] == " " ? (
                  <div className="w-4"> </div>
                ) : (
                  <div>{words[index]}</div>
                )}
              </div>
            );
          })}
      </div>
      <input type="text" onKeyDown={(e) => update(e)} autoFocus></input>
    </div>
  );
}

export default App;

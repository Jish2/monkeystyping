import React, { useEffect, useState } from "react";

type charcter = {
  letter: string;
  index: number;
};

type word = {
  word: charcter[];
  extra?: string;
};

function App() {
  const [string, setString] = useState("");
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState<number[]>([]);
  const [cursor, setCursor] = useState([0, 0]);

  // Run when client recieves prompt from server
  const updatePrompt = (prompt: string) => {
    setIndex(0);
    setString(prompt);
    setArr(new Array(prompt.length).fill(0));
  };

  const update = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    console.log(arr);
    console.log(key, index);
    if (key == " ") {
      if (index == 0) return;
      if (string[index - 1] == " ") return;
      if (string[index] == " ") {
        let n = [...arr];
        n[index] = 1;
        setArr(n);
        setIndex(index + 1);
        return;
      }
      let i = index + 1;
      console.log(string[i]);
      while (i < string.length && string[i] != " ") {
        console.log(string[i]);
        i++;
      }
      setIndex(i + 1);
      return;
    }
    if (key.length > 1) {
      if (key == "Backspace") {
        if (index == 0) return;
        if (arr[index - 1] == 0) {
          let i = index;
          while (i > 0 && arr[i] == 0) {
            i -= 1;
          }
          setIndex(i + 1);
          return;
        }
        let n = [...arr];
        n[index - 1] = 0;
        setArr(n);
        setIndex(index - 1);
      }
    } else if (key == string[index]) {
      if (index == string.length - 2) {
        console.log("success");
      }
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

  const updateCursor = () => {
    const element = document
      .getElementById("" + index)
      ?.getBoundingClientRect();
    if (element) {
      setCursor([element.x - 2, element.y]);
    }
  };

  useEffect(() => {
    updateCursor();
  }, [index, string]);

  useEffect(() => {
    const sentence =
      "The quick brown fox jumps over the lazy dog and the quick brown fox jumps over the lazy dog" +
      " ";
    updatePrompt(sentence);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="absolute w-1 h-12 bg-[#e2b711] transition-all duration-100 ease-out"
        style={{ top: cursor[1], left: cursor[0] }}
      ></div>
      <p>
        {arr &&
          arr.map((i, index) => {
            return (
              <span
                className={`text-5xl ${
                  i === 0
                    ? "text-[#606366]"
                    : i === 1
                    ? "text-[#d1d0c5]"
                    : "text-[#ca4754]"
                }`}
                id={"" + index}
              >
                {string[index]}
              </span>
            );
          })}
      </p>

      <input type="text" onKeyDown={(e) => update(e)} autoFocus></input>
    </div>
  );
}

export default App;

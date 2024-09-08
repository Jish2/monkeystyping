import './App.css'
import React, { useState } from 'react'

function App() {
  const [words, setWords] = useState("The quick brown fox jumped over the lazy dog")
  const [index, setIndex] = useState(0)
  const [arr, setArr] = useState(new Array(words.length).fill(0))
  const [cursor, setCursor] = useState([0, 0])

  const update = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key
    console.log(arr)
    console.log(key, index)
    if (key.length > 1) {
      return
    }
    if (key == words[index]) {
      let n = [...arr]
      n[index] = 1
      setArr(n)
      setIndex(index + 1)
    }
    else {
      let n = [...arr]
      n[index] = 2
      setArr(n)
      setIndex(index + 1)
    }
  }

  return (
    <div>
      <div className='flex flex-row'>
        {words && words.split("").map((char, i) => {
          return <div className={`text-5xl ${arr[i] === 0 ? "text-gray-500" : arr[i] === 1 ? "text-green-500" : "text-red-700"}`} id={"" + i}>{char}</div>
        })}
      </div>
      <input type='text' onKeyDown={(e) => update(e)}></input>
    </div>

  )
}

export default App

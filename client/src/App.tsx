import React from "react";
import Type from "./components/Type";
function App() {
  return (
    <div className="w-screen h-screen p-12 px-36 bg-[#333437] flex flex-col text-[#e2b711]">
      <div className="flex flex-col">
        <div className="font-semibold">monkeystyping.com/</div>
        <div className="text-3xl font-bold">E3DF4</div>
      </div>
      <div className="grow flex flex-col items-center justify-center pb-32">
        <Type />
      </div>
    </div>
  );
}

export default App;

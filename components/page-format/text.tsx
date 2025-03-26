import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsDemo() {
  const words = ["delicious", "flavorful", "appetizing", "yummy"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4 ml-96">
      <div className="text-4xl mx-auto font-normal text-neutral-600 ml-96 dark:text-neutral-400">
        Cook
        <FlipWords words={words} /> <br />
        With our app
      </div>
    </div>
  );
}

import { useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");

  const hanlder = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return [value, hanlder];
};

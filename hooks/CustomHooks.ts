import { useState } from "react";

export function useDebounce(time: number) {
  const [debounce, setDebounce] = useState<string>("");

  const handleDebounce = (value: string) => {
    setDebounce(value);
  };
  return { debounce, handleDebounce };
}

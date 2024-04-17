import { useEffect, useState } from "react";

export default function useLocalStorageState(key) {
  const [state, setState] = useState(function () {
    return JSON.parse(localStorage.getItem(key)) || [];
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(state));
    },
    [state, key]
  );

  return [state, setState];
}

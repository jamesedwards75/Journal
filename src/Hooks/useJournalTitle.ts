import { useEffect, useState } from "react";

const useJournalTitle = (setHasTitleLoaded: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [title, setTitle] = useState("");

  const fetchTitle = (): string => {
    const storedTitle = window.localStorage.getItem("journalTitle");
    if (storedTitle) return storedTitle;
    return "";
  };

  const saveTitle = (newTitle: string): void => {
    setTitle(newTitle);
    window.localStorage.setItem("journalTitle", newTitle);
  };

  useEffect(() => {
    const savedTitle = fetchTitle();
    setTitle(savedTitle);
    setHasTitleLoaded(true);
  }, [setHasTitleLoaded]);

  return [title, saveTitle] as const;
}

export default useJournalTitle;

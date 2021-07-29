import { useEffect, useState } from "react";
import { JournalEntryProps } from "../types";

type SaveJournalEntryState = {
  bodyText: string;
  date: string;
};

const useJournalEntries = () => {
  const [entries, setEntries] = useState<SaveJournalEntryState[]>([]);

  async function fetchEntries(): Promise<JournalEntryProps[]> {
    const storedEntries = window.localStorage.getItem("journalEntries");
    if (storedEntries) {
      return JSON.parse(storedEntries);
    }

    return [] as JournalEntryProps[];
  }

  async function saveEntries(
    journalEntries: SaveJournalEntryState[]
  ): Promise<void> {
    window.localStorage.setItem(
      "journalEntries",
      JSON.stringify(journalEntries)
    );
  }

  async function addEntry(newEntry: string): Promise<void> {
    const now = new Date();
    const entryDate = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    const formattedEntry: SaveJournalEntryState = {
      bodyText: newEntry,
      date: entryDate,
    };
    const newEntries = [formattedEntry, ...entries];
    setEntries(newEntries);
    saveEntries(newEntries);
  }

  async function deleteEntry(index: number): Promise<void> {
    const newEntries = [
      ...entries.slice(0, index),
      ...entries.slice(index + 1),
    ];
    setEntries(newEntries);
    saveEntries(newEntries);
  }

  async function editEntry(index: number, updatedEntry: string): Promise<void> {
    let newEntries = [...entries];
    newEntries[index].bodyText = updatedEntry;
    setEntries(newEntries);
    saveEntries(newEntries);
  }

  useEffect(() => {
    fetchEntries()
      .then((entries) => setEntries(entries))
      .catch((error) => console.log("error: ", error));
  }, []);

  return [entries, addEntry, deleteEntry, editEntry] as const;
};

export default useJournalEntries;

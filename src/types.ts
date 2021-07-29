export type JournalEntryProps = {
  bodyText: string;
  date: string;
  isDarkMode: boolean;
  index: number;
  setShowDeleteModal: (showModal: boolean) => void;
  setDeleteIndex: (deleteIndex: number) => void;
  editEntry: (index: number, updatedEntry: string) => void;
};

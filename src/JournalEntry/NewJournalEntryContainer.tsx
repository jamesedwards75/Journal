import { useState } from "react";
import {
  IconButton,
  makeStyles,
  Paper,
  TextareaAutosize,
  Tooltip,
} from "@material-ui/core";
import { Delete, Save } from "@material-ui/icons";

import "./JournalEntry.scss";

const useStyles = makeStyles({
  root: {
    background: "#cfd8dc",
  },
});

type NewJournalEntryProps = {
  addEntry: (bodyText: string) => void;
  isDarkMode: boolean;
  setShowNewEntry: (showNewEntry: boolean) => void;
  setShowDiscardNewEntryModal: (showModal: boolean) => void;
};

const NewJournalEntryContainer = ({
  addEntry,
  isDarkMode,
  setShowNewEntry,
  setShowDiscardNewEntryModal,
}: NewJournalEntryProps) => {
  const classes = useStyles();
  const [entryText, setEntryText] = useState("");

  const handleSave = (): void => {
    if (entryText !== "") {
      addEntry(entryText);
      setShowNewEntry(false);
    }
  };

  const handleDiscard = (): void => {
    setShowDiscardNewEntryModal(true);
  };

  return (
    <Paper
      variant="outlined"
      className={`${!isDarkMode && classes.root} entry-container`}
    >
      <div className="entry-details">
        <p>New Journal Entry</p>
        <div className="entry-actions">
          {entryText !== "" && (
            <div id="save-icon-wrapper-new-entry" className="icon-wrapper">
              <Tooltip title="Save">
                <IconButton aria-label="save" onClick={handleSave}>
                  <Save />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <div id="discard-new-entry-icon-wrapper" className="icon-wrapper">
            <Tooltip title="Discard">
              <IconButton aria-label="discard" onClick={handleDiscard}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <TextareaAutosize
        autoFocus
        minRows={4}
        aria-label="new journal entry input"
        placeholder="Write journal entry here..."
        value={entryText}
        onChange={(e) => setEntryText(e.target.value)}
        className="entry-input"
      />
    </Paper>
  );
};

export default NewJournalEntryContainer;

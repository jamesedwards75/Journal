import { useState } from "react";
import {
  IconButton,
  makeStyles,
  Paper,
  TextareaAutosize,
  Tooltip,
} from "@material-ui/core";
import { Delete, Edit, Save } from "@material-ui/icons";
import { JournalEntryProps } from "../types";

import "./JournalEntry.scss";

const useStyles = makeStyles({
  root: {
    background: "#cfd8dc",
  },
});

const JournalEntryContainer = ({
  bodyText,
  date,
  index,
  isDarkMode,
  setDeleteIndex,
  setShowDeleteModal,
  editEntry,
}: JournalEntryProps) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [entryText, setEntryText] = useState(bodyText);

  const handleSave = (): void => {
    editEntry(index, entryText);
    setIsEdit(false);
  };

  const handleEdit = (): void => {
    setEntryText(bodyText);
    setIsEdit(true);
  };

  const handleDelete = (deleteIndex: number): void => {
    setDeleteIndex(deleteIndex);
    setShowDeleteModal(true);
  };

  return (
    <Paper
      variant="outlined"
      className={`${!isDarkMode && classes.root} entry-container`}
    >
      <div className="entry-details">
        <p className="entry-date">{date}</p>
        <div className="entry-actions">
          {isEdit ? (
            <div id={`save-icon-wrapper-${index}`} className="icon-wrapper">
              <Tooltip title="Save">
                <IconButton aria-label="save" onClick={handleSave}>
                  <Save />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div id={`edit-icon-wrapper-${index}`} className="icon-wrapper">
              <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={handleEdit}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <div id={`delete-icon-wrapper-${index}`} className="icon-wrapper">
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(index)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <TextareaAutosize
        minRows={4}
        aria-label="journal entry text"
        placeholder="Write entry here..."
        value={isEdit ? entryText : bodyText}
        onChange={(e) => setEntryText(e.target.value)}
        disabled={!isEdit}
        className="entry-input"
      />
    </Paper>
  );
};

export default JournalEntryContainer;

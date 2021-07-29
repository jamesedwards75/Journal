import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TablePagination,
  Tooltip,
} from "@material-ui/core";
import { Edit, InfoRounded, NightsStay, WbSunny } from "@material-ui/icons";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import DiscardNewEntryModal from "../DiscardNewEntryModal/DiscardNewEntryModal";
import EditTitleModal from "../EditTitleModal/EditTitleModal";
import JournalEntryContainer from "../JournalEntry/JournalEntryContainer";
import NewJournalEntryContainer from "../JournalEntry/NewJournalEntryContainer";
import useJournalEntries from "../Hooks/useJournalEntries";
import useJournalTitle from "../Hooks/useJournalTitle";

import "./Journal.scss";

type JournalProps = {
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
};

const Journal = ({ isDarkMode, setDarkMode }: JournalProps) => {
  const [hasTitleLoaded, setHasTitleLoaded] = useState(false);
  const [savedTitle, saveTitle] = useJournalTitle(setHasTitleLoaded);
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [entries, addEntry, deleteEntry, editEntry] = useJournalEntries();
  const [showDiscardNewEntryModal, setShowDiscardNewEntryModal] =
    useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedEntries = entries.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const hasEntries = entries.length > 0;

  return (
    <Box>
      <Grid container direction="column" id="journal-grid">
        <header className="journal-header">
          <div className="journal-title">
            <h1>{savedTitle === "" ? "Your Name's Journal" : savedTitle}</h1>
            <div id="edit-icon-wrapper" className="icon-wrapper">
              <Tooltip title="Edit Journal Name">
                <IconButton
                  aria-label="edit journal name"
                  onClick={() => setShowEditTitleModal(true)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <Button
            id="new-entry-button"
            variant="outlined"
            onClick={() => setShowNewEntry(true)}
          >
            Add New Entry
          </Button>
          <div className="dark-mode-toggle">
            {isDarkMode ? (
              <div id="dark-mode-icon" className="icon-wrapper">
                <Tooltip title="Use Light Mode">
                  <IconButton
                    aria-label="use light mode"
                    onClick={() => setDarkMode(!isDarkMode)}
                  >
                    <WbSunny />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div id="light-mode-icon" className="icon-wrapper">
                <Tooltip title="Use Dark Mode">
                  <IconButton
                    aria-label="use dark mode"
                    onClick={() => setDarkMode(!isDarkMode)}
                  >
                    <NightsStay />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </header>
        {showNewEntry && (
          <div className="journal-entries">
            <NewJournalEntryContainer
              addEntry={addEntry}
              setShowNewEntry={setShowNewEntry}
              setShowDiscardNewEntryModal={setShowDiscardNewEntryModal}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {hasEntries ? (
          <div className="journal-entries">
            {paginatedEntries.map((entry, index) => {
              return (
                <JournalEntryContainer
                  key={entry.date}
                  bodyText={entry.bodyText}
                  date={entry.date}
                  index={index}
                  setShowDeleteModal={setShowDeleteModal}
                  setDeleteIndex={setDeleteIndex}
                  editEntry={editEntry}
                  isDarkMode={isDarkMode}
                />
              );
            })}
          </div>
        ) : (
          <div className="no-entries-message">
            <InfoRounded className="info-icon" />
            You have no journal entries. Add a new entry to start your journal.
          </div>
        )}
        {hasEntries && (
          <div className="pagination-bar">
            <TablePagination
              count={entries.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
        )}
        {hasTitleLoaded && (
          <EditTitleModal
            handleClose={() => setShowEditTitleModal(false)}
            open={showEditTitleModal}
            savedTitle={savedTitle}
            saveTitle={saveTitle}
          />
        )}
        <DeleteEntryModal
          handleClose={() => setShowDeleteModal(false)}
          open={showDeleteModal}
          deleteIndex={deleteIndex}
          deleteEntry={deleteEntry}
        />
        <DiscardNewEntryModal
          handleClose={() => setShowDiscardNewEntryModal(false)}
          open={showDiscardNewEntryModal}
          setShowNewEntry={setShowNewEntry}
        />
      </Grid>
    </Box>
  );
};

export default Journal;

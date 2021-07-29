import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

type DeleteEntryModalProps = {
  handleClose: () => void;
  open: boolean;
  deleteIndex: number;
  deleteEntry: (deleteIndex: number) => void;
};

const DeleteEntryModal = ({
  handleClose,
  open,
  deleteIndex,
  deleteEntry,
}: DeleteEntryModalProps) => {
  const handleDelete = (): void => {
    deleteEntry(deleteIndex);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      id="delete-entry-modal"
      closeAfterTransition
    >
      <DialogTitle id="delete-entry-title">Are you sure?</DialogTitle>
      <DialogContent>
        This will permanently delete the journal entry.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEntryModal;

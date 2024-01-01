import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'; // Import the CloseIcon

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

const BookmarkMenu = (props: SimpleDialogProps) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ p: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        // alignItems="center"
      >
        <DialogTitle>Save card to</DialogTitle>
        <CloseIcon onClick={handleClose} />
      </Stack>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('Save card to')}
          >
            <AddIcon />
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default BookmarkMenu;

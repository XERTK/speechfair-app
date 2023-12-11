import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Typography } from '@mui/material';
import { useGetPostCommentsCountQuery } from '@/store/comment';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
type CommentDrawerProps = {
  anchor: Anchor;
  open: boolean;
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  loggedInUser: boolean;
  postId: string;
};

const CommentDrawer: React.FC<CommentDrawerProps> = (props) => {
  const { anchor, open, toggleDrawer, loggedInUser, postId } = props;

  const {
    data: commentDataCount,
    isLoading,
    isError,
  } = useGetPostCommentsCountQuery({ postId });
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: '700px',
        m: 3,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          mb: 2,
          border: '3px solid #e3d914', // Adding a black border of 1px
          padding: '20px', // Adding padding for better visibility
        }}
      >
        <Typography
          variant="body2"
          sx={{ alignContent: 'center', fontSize: 12 }}
        >
          Speak freely, but do not threaten or plan any harm to an
          actual person, animal or their properties. Comments voted by
          majority as vulgar, obscene or violent will be deleted and
          users who post them will be issued a yellow card as warning
          or a red card as quit notice.
        </Typography>
      </Box>
      {loggedInUser ? (
        <></>
      ) : (
        <Button
          sx={{
            fontSize: '15px',
            borderRadius: '0px',
            width: { xs: '100%', md: 'auto', lg: 'auto' },
          }}
        >
          Login to comment
        </Button>
      )}
      <Typography
        sx={{
          alignContent: 'center',
          fontSize: 20,
          my: 2,
        }}
      >
        {typeof commentDataCount === 'object'
          ? commentDataCount.commentCount
          : commentDataCount || 0}{' '}
        Comments
      </Typography>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(anchor, false)}
      onOpen={toggleDrawer(anchor, true)}
    >
      {list(anchor)}
    </SwipeableDrawer>
  );
};
export default CommentDrawer;

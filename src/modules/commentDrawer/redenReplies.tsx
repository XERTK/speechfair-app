import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import StarRateIcon from '@mui/icons-material/StarRate';

import {
  Avatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import CustomField from '@/components/custom-field';
import { relative } from 'path';

export const renderReplies = (
  replies: any,
  commentId: string,
  replying: { [key: string]: boolean },
  toggleReply: (commentId: string) => void,
  handleCommentIdUpdate: (id: string) => void, // Add handleCommentIdUpdate
  handleReplyIdUpdate: (id: string) => void, // Add handleReplyIdUpdate
  handleReplySubmit: any,
  onReplySubmit: any,
  replyControl: any,
  replyErrors: any,
  depth = 0
) => {
  return (
    <>
      {replies.map((reply: any) => (
        <React.Fragment key={reply.replyId}>
          <ListItem disablePadding sx={{ pl: `${depth * 2}rem` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <div
                className="threadStyle"
                style={{
                  // height: `${depth * 1 + 1}rem`,
                  height: '5rem',
                  width: `3px`,
                  backgroundColor: 'blue',
                }}
              />
              <div
                className="corner"
                style={{
                  // position: 'absolute',
                  top: '-30px', // Move the corner element up to cover the borders
                  // left: '1px', // Move the corner element left to cover the border
                  // width: '10px',
                  // height: '10px',
                  borderTop: '10px solid transparent', // Increase size to cover the border
                  borderRight: '10px solid transparent', // Increase size to cover the border
                  // borderLeft: '10px solid blue',
                  // // borderBottom: '10px solid blue',
                  borderBottomLeftRadius: '10px', // Adjust to create a rounded corner

                  border: '2px solid #ca1c1e',
                  display: 'inline-block',
                  margin: '25px auto',
                  padding: '10px',
                  position: 'relative',
                  width: 'auto',
                }}
              />

              <Avatar alt="not found" />
              <Stack
                direction="column"
                alignItems="left"
                spacing={1}
                sx={{ px: 1 }}
              >
                <ListItemText primary={reply.text} />
                <Stack direction="row" alignItems="left" spacing={1}>
                  {!replying[reply.replyId] && (
                    <Typography
                      variant="body2"
                      sx={{
                        alignContent: 'center',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleReply(reply.replyId)}
                    >
                      Reply
                    </Typography>
                  )}
                  {replying[reply.replyId] && (
                    <Typography
                      variant="body2"
                      sx={{
                        alignContent: 'center',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleReply(reply.replyId)}
                    >
                      close Reply
                    </Typography>
                  )}

                  <StarRateIcon
                    sx={{
                      color: 'black',
                      fontSize: '19px',
                    }}
                  />
                </Stack>
                {replying[reply.replyId] && (
                  <>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <form
                        onSubmit={handleReplySubmit(onReplySubmit)}
                        noValidate
                      >
                        <CustomField
                          variant="filled"
                          name="reply"
                          control={replyControl}
                          error={replyErrors}
                        />
                        <Button
                          size="large"
                          sx={{ mb: 3 }}
                          type="submit"
                          onClick={() => {
                            handleCommentIdUpdate(commentId);
                            handleReplyIdUpdate(reply.replyId);
                          }}
                        >
                          comment
                        </Button>
                      </form>
                    </Stack>
                  </>
                )}
              </Stack>
            </Stack>
          </ListItem>

          {reply.replies && (
            <List sx={{ pl: `${(depth + 1) * 2}rem` }}>
              {renderReplies(
                reply.replies,
                commentId,
                replying,
                toggleReply,
                handleCommentIdUpdate, // Pass handleCommentIdUpdate
                handleReplyIdUpdate, // Pass handleReplyIdUpdate
                handleReplySubmit,
                onReplySubmit,
                replyControl,
                replyErrors,
                depth + 1
              )}
            </List>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

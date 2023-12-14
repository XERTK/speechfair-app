import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarRateIcon from '@mui/icons-material/StarRate';

import {
  Avatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import CustomField from '@/components/custom-field';
import { renderReplies } from './redenReplies';
import { borderLeft } from '@mui/system';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const list = (
  anchor: Anchor,
  commentDataCount: any,
  commentList: any,
  replying: { [key: string]: boolean },
  toggleReply: (commentId: string) => void,
  handleCommentIdUpdate: (id: string) => void, // Add handleCommentIdUpdate
  handleReplyIdUpdate: (id: string) => void, // Add handleReplyIdUpdate
  handleReplySubmit: any,
  onReplySubmit: any,
  replyControl: any,
  replyErrors: any
) => {
  return (
    <Box
      sx={{
        width: '700px',
        mx: 3,
      }}
      role="presentation"
    >
      <Typography
        sx={{
          alignContent: 'center',
          fontSize: 20,
        }}
      >
        {typeof commentDataCount === 'object'
          ? commentDataCount?.commentCount
          : commentDataCount || 0}{' '}
        Comments
      </Typography>
      <Divider />

      {commentList?.results?.map((comment: any, index: any) => (
        <React.Fragment key={comment.id}>
          <div
            style={{
              borderLeft: '2px solid black',
              paddingLeft: '8px',
            }}
          >
            <ListItem
              disablePadding
              sx={{
                borderLeft: '2px solid black',
                paddingLeft: '8px',
              }} // Add borderLeft style
            >
              <ListItemIcon>
                <Avatar
                  alt="not found"
                  // src="/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <Stack
                direction="column"
                alignItems="left"
                spacing={1}
                sx={{ p: 3 }}
              >
                <ListItemText primary={comment.Comment.comment} />
                <Stack direction="row" alignItems="left" spacing={1}>
                  {!replying[comment.id] && (
                    <Typography
                      variant="body2"
                      sx={{
                        alignContent: 'center',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleReply(comment.id)}
                    >
                      Reply
                    </Typography>
                  )}
                  {replying[comment.id] && (
                    <Typography
                      variant="body2"
                      sx={{
                        alignContent: 'center',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleReply(comment.id)}
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
                {replying[comment.id] && (
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
                          onClick={() =>
                            handleCommentIdUpdate(comment.id)
                          }
                        >
                          comment
                        </Button>
                      </form>
                    </Stack>
                  </>
                )}
              </Stack>
            </ListItem>
            {comment?.replies ? (
              <List sx={{ pl: 4 }}>
                {renderReplies(
                  comment.replies,
                  comment.id,
                  replying,
                  toggleReply,
                  handleCommentIdUpdate, // Pass handleCommentIdUpdate
                  handleReplyIdUpdate, // Pass handleReplyIdUpdate
                  handleReplySubmit,
                  onReplySubmit,
                  replyControl,
                  replyErrors
                )}{' '}
              </List>
            ) : (
              <></>
            )}
            {index !== commentList.results.length - 1 && <Divider />}{' '}
          </div>
        </React.Fragment>
      ))}
    </Box>
  );
};

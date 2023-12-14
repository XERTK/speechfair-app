import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

import {
  Avatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {
  useCreateCommentMutation,
  useCreateReplyMutation,
  useGetPostCommentsCountQuery,
  useGetPostCommentsQuery,
} from '@/store/comment';

import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/hooks/use-auth';
import CustomField from '@/components/custom-field';
import { renderReplies } from './redenReplies';
import { list } from './redenList';

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
interface FormData {
  comment: string;
}

interface ReplyData {
  reply: string;
}

const CommentDrawer: React.FC<CommentDrawerProps> = (props) => {
  const { anchor, open, toggleDrawer, loggedInUser, postId } = props;
  const { user }: any = useAuth();
  const [replying, setReplying] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [commentId, setCommentId] = React.useState<
    string | undefined
  >();
  const [replyId, setReplyId] = React.useState<string | undefined>();
  const handleCommentIdUpdate = (id: string) => {
    setCommentId(id);
  };
  const handleReplyIdUpdate = (id: string) => {
    console.log(replyId);
    setReplyId(id);
  };
  const toggleReply = (commentId: string) => {
    setReplying((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  const {
    data: commentDataCount,
    isLoading,
    isError,
  } = useGetPostCommentsCountQuery({ postId });

  const {
    data: commentList,
    isLoading: commentListLoading,
    isError: commentListError,
  } = useGetPostCommentsQuery({ postId });

  const replySchema = yup.object().shape({
    reply: yup.string().required('enter a reply to post'),
  });
  const schema = yup.object().shape({
    comment: yup.string().required(),
  });

  const [createPost, { isLoading: createLoading }] =
    useCreateCommentMutation();

  const [createReply, { isLoading: createReplyLoading }] =
    useCreateReplyMutation();

  const {
    control: replyControl,
    handleSubmit: handleReplySubmit,
    formState: { errors: replyErrors },
  } = useForm<ReplyData>({
    defaultValues: {
      reply: '',
    },
    resolver: yupResolver(replySchema),
  });

  const onReplySubmit = async (data: ReplyData) => {
    try {
      console.log(postId);
      console.log(user.id);
      console.log(commentId, 'commentID');
      console.log(replyId, 'replyID');
      const props = {
        body: {
          userId: user.id,
          name: user.firstName,
          commentId: commentId,
          replyId,
          ...data,
        },
      };
      console.log(props, 'props');
      await createReply(
        replyId
          ? {
              body: {
                userId: user.id,
                name: user.firstName,
                commentId: commentId,
                replyId,
                ...data,
              },
            }
          : {
              body: {
                userId: user.id,
                name: user.firstName,
                commentId: commentId,
                ...data,
              },
            }
      );
      toast.success('Reply added');
    } catch (err: any) {
      console.log('error', err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      comment: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(postId);
      console.log(user.id);
      await createPost({
        body: {
          userId: user.id,
          name: user.firstName,
          postId: postId,
          upVotes: 3,
          downVotes: 3,
          ...data,
        },
      });
      toast.success(
        'Comment added and refetching all comments again'
      );
    } catch (err: any) {
      console.log('error', err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(anchor, false)}
      onOpen={toggleDrawer(anchor, true)}
    >
      <CloseIcon
        onClick={toggleDrawer(anchor, false)} // Add this line to close the drawer
        sx={{
          fontSize: '35px',
        }}
      />
      <Box
        sx={{
          width: '700px',
          mt: 3,
          mx: 3,
        }}
        role="presentation"
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
            actual person, animal or their properties. Comments voted
            by majority as vulgar, obscene or violent will be deleted
            and users who post them will be issued a yellow card as
            warning or a red card as quit notice.
          </Typography>
        </Box>
        {loggedInUser ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CustomField
                variant="filled"
                name="comment"
                label="comment"
                control={control}
                error={errors.comment}
              />
              {}
              <Button size="large" sx={{}} type="submit">
                comment
              </Button>
            </form>
          </>
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
      </Box>
      {list(
        anchor,
        commentDataCount,
        commentList,
        replying,
        toggleReply,
        handleCommentIdUpdate, // Pass handleCommentIdUpdate
        handleReplyIdUpdate, // Pass handleReplyIdUpdate
        handleReplySubmit,
        onReplySubmit,
        replyControl,
        replyErrors
      )}
    </SwipeableDrawer>
  );
};
export default CommentDrawer;

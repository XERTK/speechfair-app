import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomField from '@/components/custom-field';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';
import {
  useCreateCommentMutation,
  // useUpdatePostMutation,
} from '@/store/comment';
import { useAuth } from '@/hooks/use-auth';

interface FormData {
  comment?: string;
  postTitle: string;
  device: string;
}
const schema = yup.object().shape({
  postTitle: yup.string().required('postTitle is required'),
  device: yup.string().required('device is required'),
  comment: yup.string(),
});

const CommentForm: React.FC<{ post: any }> = ({ post }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      postTitle: post?.postTitle || '',
      comment: post?.comment || '',
      device: post?.device || '',
    },
    resolver: yupResolver(schema),
  });

  // const [updatePost, { isLoading: updateLoading }] =
  // useUpdatePostMutation();
  const [createPost, { isLoading: createLoading }] =
    useCreateCommentMutation();
  const { user }: any = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createPost({
        body: {
          userId: user.id,
          ...data,
        },
      });
      toast.success('Comment updated');
      // router.replace(`/admin/comments`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ mt: 4 }} container spacing={1} direction="column">
        <Grid container direction={'row'} spacing={4}>
          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="comment"
              label="comment"
              placeholder="Enter your comment here"
              control={control}
              error={errors.comment}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="postTitle"
              label="Post Title"
              control={control}
              error={errors.postTitle}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="device"
              label="device"
              control={control}
              error={errors.device}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}></Grid>
      </Grid>
      <Button
        size="large"
        sx={{ mt: 3, float: 'right' }}
        type="submit"
        variant="contained"
        disabled={createLoading}
      >
        {createLoading ? <Loader /> : 'Update'}
      </Button>
    </form>
  );
};

export default CommentForm;

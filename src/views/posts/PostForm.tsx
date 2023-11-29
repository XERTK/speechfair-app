import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomField from '@/components/custom-field';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';
import CustomSelectField from '@/components/custom-select';
import {
  AUTH_URL,
  CONTENT_BRANDS,
  CONTENT_CATEGORY,
  CONTENT_REGIONS,
} from '@/configs/constants';
import Editor from '@/components/lexicalEditor';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/store/post';
import { useAuth } from '@/hooks/use-auth';

interface FormData {
  tags?: string;
  headline: string;
  brandTo: string;
  region: string;
  category: string;
  postBody?: string;
}
const schema = yup.object().shape({
  headline: yup.string().required('headline is required'),
  brandTo: yup.string().required('BRAND is required'),
  region: yup.string().required('REGION is required'),
  category: yup.string().required('CATEGORY is required'),
  tags: yup.string(),
  postBOdy: yup.string(),
});

const PostForm: React.FC<{ post: any }> = ({ post }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      headline: post?.headline || '',
      tags: post?.tags || '',
      brandTo: post?.brandTo || '',
      category: post?.category || '',
      region: post?.region || '',
    },
    resolver: yupResolver(schema),
  });

  const [updatePost, { isLoading: updateLoading }] =
    useUpdatePostMutation();
  const [createPost, { isLoading: createLoading }] =
    useCreatePostMutation();
  const { user }: any = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (post) {
        await updatePost({
          id: post.id,
          body: data,
        });
      } else {
        await createPost({
          body: {
            userId: user.id,
            ...data,
          },
        });
      }
      toast.success('Post updated');
      router.replace(`/admin/posts`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ mt: 4 }} container spacing={1} direction="column">
        <Grid container direction={'row'} spacing={4}>
          <Grid item xs={12} md={4}>
            <CustomSelectField
              name="brandTo"
              label="Switch Brand To"
              control={control}
              error={errors.brandTo}
              options={CONTENT_BRANDS}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomSelectField
              name="region"
              label="Region"
              control={control}
              error={errors.region}
              options={CONTENT_REGIONS}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomSelectField
              name="category"
              label="Category"
              control={control}
              error={errors.category}
              options={CONTENT_CATEGORY}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="tags"
              label="Tags"
              placeholder="Enter your tags here"
              control={control}
              error={errors.tags}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="headline"
              label="Headline"
              control={control}
              error={errors.headline}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Editor />
        </Grid>

        <Grid item xs={12} md={4}></Grid>
      </Grid>
      <Button
        size="large"
        sx={{ mt: 3, float: 'right' }}
        type="submit"
        variant="contained"
        disabled={updateLoading}
      >
        {updateLoading ? <Loader /> : 'Update'}
      </Button>
    </form>
  );
};

export default PostForm;

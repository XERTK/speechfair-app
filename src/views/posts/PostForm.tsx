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

import Editor from '@/components/lexicalEditor';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/store/post';
import { useAuth } from '@/hooks/use-auth';
import { useGetBrandsQuery } from '@/store/brand';
import error from 'next/error';
import { useGetRegionsQuery } from '@/store/region';
import { useGetCategoriesQuery } from '@/store/category';

interface FormData {
  tags?: string;
  headline: string;
  brand: string;
  region: string;
  category: string;
  postBody?: string;
}
const schema = yup.object().shape({
  headline: yup.string().required('headline is required'),
  brand: yup.string().required('BRAND is required'),
  region: yup.string().required('REGION is required'),
  category: yup.string().required('CATEGORY is required'),
  tags: yup.string(),
  postBOdy: yup.string(),
});

const PostForm: React.FC<{ post: any }> = ({ post }) => {
  const router = useRouter();

  const { data: brandsData } = useGetBrandsQuery<any>({});
  const { data: regionsData } = useGetRegionsQuery<any>({});
  const { data: categoriesData } = useGetCategoriesQuery<any>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      headline: post?.headline || '',
      tags: post?.tags || '',
      brand: post?.brand || '',
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
  const brandAccess =
    brandsData?.results.map((brand: any) => ({
      label: brand.name,
      value: brand.alias,
    })) || [];
  const regionAccess =
    regionsData?.results.map((region: any) => ({
      label: region.name,
      value: region.alias,
    })) || [];
  const categoryAccess =
    categoriesData?.results.map((category: any) => ({
      label: category.name,
      value: category.id,
    })) || [];
  console.log(categoryAccess, 'hello'); // This will give you an array of objects with 'name' and 'value' properties
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ mt: 4 }} container spacing={1} direction="column">
        <Grid container direction={'row'} spacing={4}>
          <Grid item xs={12} md={4}>
            <CustomSelectField
              name="brand"
              label="Switch Brand"
              control={control}
              error={errors.brand}
              options={brandAccess}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomSelectField
              name="region"
              label="Region"
              control={control}
              error={errors.region}
              options={regionAccess}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomSelectField
              name="category"
              label="Category"
              control={control}
              error={errors.category}
              options={categoryAccess}
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
        {/* <Grid item xs={12} md={4}>
          <Editor />
        </Grid> */}

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

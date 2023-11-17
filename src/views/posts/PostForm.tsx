import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomField from '@/components/custom-field';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '@/store/user';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';
import CustomSelectField from '@/components/custom-select';
import {
  CONTENT_BRANDS,
  CONTENT_CATEGORY,
  CONTENT_REGIONS,
} from '@/configs/constants';
import Editor from '@/components/lexicalEditor';

interface FormData {
  headline: string;
  tags?: string;
  email: string;
  brandTo?: [string];
  region?: [string];
  category?: [string];
  password?: string;
}

const schema = yup.object().shape({
  headline: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32),
});

const PostForm: React.FC<{ user: any }> = ({ user }) => {
  const router = useRouter();
  console.log('user', user);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: user?.email,
    },
    resolver: yupResolver(schema),
  });

  const [updateUser, { isLoading: updateLoading }] =
    useUpdateUserMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // try {
    //   console.log(data.name);
    //   if (user) {
    //     await updateUser({
    //       id: user.id,
    //       body: data,
    //     });
    //   }
    //   toast.success('User updated');
    //   router.replace('/users');
    // } catch (error: any) {
    //   toast.error(error?.data?.message || error.error);
    // }
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
          <Grid item>
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
              error={errors.tags} // Use errors.Tags?.message to display validation error
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="headline"
              label="Headline"
              control={control}
              error={errors.headline} // Use errors.name?.message to display validation error
            />
          </Grid>
        </Grid>
        <Editor />
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

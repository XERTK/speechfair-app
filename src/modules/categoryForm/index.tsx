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
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/store/category';

interface FormData {
  name?: string;
  alias: string;
}
const schema = yup.object().shape({
  alias: yup.string().required('alias is required'),
  name: yup.string(),
});

const CategoryForm: React.FC<{ category: any }> = ({ category }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      alias: category?.alias || '',
      name: category?.name || '',
    },
    resolver: yupResolver(schema),
  });

  const [createCategory, { isLoading: createLoading }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (category) {
        await updateCategory({
          body: data,
        });
      } else {
        await createCategory({
          body: {
            ...data,
          },
        });
      }
      toast.success('Post updated');
      router.replace(`/admin/categories`);
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
              name="name"
              label="name"
              placeholder="Enter your name here"
              control={control}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="alias"
              label="Alias"
              control={control}
              placeholder="Enter your alias here"
              error={errors.alias}
            />
          </Grid>
        </Grid>
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

export default CategoryForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomField from '@/components/custom-field';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/store/user';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';

interface FormData {
  name: string;
  email: string;
  password?: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32),
});

const UserForm = ({ user }: any) => {
  const router = useRouter();
  const [createUser, { isLoading: createLoading }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: updateLoading }] =
    useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (user) {
        await updateUser({
          id: user.id,
          body: data,
        }).unwrap();
      } else {
        await createUser(data).unwrap();
      }
      toast.success('User updated');
      router.replace('/users');
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ mt: 4 }} container spacing={1}>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="name"
            label="Name"
            control={control}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="email"
            label="Email"
            control={control}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="password"
            label="Password"
            type="password"
            control={control}
            error={errors.password}
          />
        </Grid>
      </Grid>
      <Button
        size="large"
        sx={{ mt: 3, float: 'right' }}
        type="submit"
        variant="contained"
        disabled={createLoading || updateLoading}
      >
        {createLoading || updateLoading ? (
          <Loader />
        ) : user ? (
          'Update'
        ) : (
          'Add'
        )}
      </Button>
    </form>
  );
};

export default UserForm;

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

const UserForm: React.FC<{ user: any }> = ({ user }) => {
  const router = useRouter();
  console.log('user', user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(schema),
  });

  const [updateUser, { isLoading: updateLoading }] =
    useUpdateUserMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data.name);
      if (user) {
        await updateUser({
          id: user.id,
          body: data,
        });
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
            error={errors.name} // Use errors.name?.message to display validation error
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="email"
            label="Email"
            control={control}
            error={errors.email} // Use errors.email?.message to display validation error
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="password"
            label="Password"
            type="password"
            control={control}
            error={errors.password} // Use errors.password?.message to display validation error
          />
        </Grid>
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

export default UserForm;

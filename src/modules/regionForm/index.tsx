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
  useCreateRegionMutation,
  useUpdateRegionMutation,
} from '@/store/region';
import { useAuth } from '@/hooks/use-auth';

interface FormData {
  name?: string;
  alias: string;
}
const schema = yup.object().shape({
  alias: yup.string().required('alias is required'),
  name: yup.string(),
});

const RegionForm: React.FC<{ region: any }> = ({ region }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      alias: region?.alias || '',
      name: region?.name || '',
    },
    resolver: yupResolver(schema),
  });

  const [createRegion, { isLoading: createLoading }] =
    useCreateRegionMutation();
  const [updateRegion, { isLoading: updateLoading }] =
    useUpdateRegionMutation();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (region) {
        await updateRegion({
          body: data,
        });
      } else {
        await createRegion({
          body: {
            ...data,
          },
        });
      }
      toast.success('Post updated');
      router.replace(`/admin/regions`);
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

export default RegionForm;

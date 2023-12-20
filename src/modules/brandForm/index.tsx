import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomField from '@/components/custom-field';
import { Button, Grid, Input } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import router, { useRouter } from 'next/router';
import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
} from '@/store/brand';
import { uploadImageToFirestore } from '@/components/imageUploader';
import CustomSelectField from '@/components/custom-select';
import { BRAND_ACCESS } from '@/configs/constants';

interface FormData {
  name: string;
  alias: string;
  caveat: boolean;
  access: string;
}
const schema = yup.object().shape({
  alias: yup.string().required('alias is required'),
  name: yup.string().required('name is required'),
  caveat: yup.boolean().required('caveat is required'),
  access: yup.string().required('access is required'),
});

const BrandForm: React.FC<{ brand: any }> = ({ brand }) => {
  const [logoFile, setLogoFile] = useState<File | null>(null); // State to hold the selected file

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      alias: brand?.alias || '',
      name: brand?.name || '',
      caveat: brand?.caveat || false,
      access: brand?.access || '',
    },
    resolver: yupResolver(schema),
  });
  const [createBrand, { isLoading: createLoading }] =
    useCreateBrandMutation();
  const [updateBrand, { isLoading: updateLoading }] =
    useUpdateBrandMutation();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (brand) {
        let imageUrl;
        if (logoFile) {
          try {
            imageUrl = await uploadImageToFirestore(
              logoFile,
              'image/logo'
            );
            console.log(imageUrl);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
        await updateBrand({
          body: {
            logo: imageUrl,
            ...data,
          },
        });
      } else {
        let imageUrl;
        if (logoFile) {
          try {
            imageUrl = await uploadImageToFirestore(
              logoFile,
              'image/logo'
            );
            console.log(imageUrl);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
        await createBrand({
          body: {
            logo: imageUrl,
            ...data,
          },
        });
      }
      toast.success('Brand updated');
      router.replace(`/admin/brands`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file); // Set the selected file to state
    }
  };

  return (
    <>
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
            <Grid item xs={12} md={4}>
              <CustomField
                type="checkbox"
                variant="filled"
                name="caveat"
                label="Caveat"
                control={control}
                placeholder="Enter your caveat here"
                error={errors.caveat}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomSelectField
                name="access"
                label="Access"
                control={control}
                error={errors.access}
                options={BRAND_ACCESS}
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

      <Input type="file" onChange={handleFileChange} />
    </>
  );
};

export default BrandForm;

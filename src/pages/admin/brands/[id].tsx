import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import AdminBreadcrumbs from '@/components/breadcrums';
import { useParams } from 'next/navigation';
import { useGetBrandQuery } from '@/store/brand';
import BrandForm from '@/modules/brandForm';

const AddBrandPage = () => {
  const params = useParams<any>();

  const { data } = useGetBrandQuery<any>(params?.id, {
    skip: !params || params?.id === 'add',
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Edit Brand</Typography>
          <AdminBreadcrumbs />
          <BrandForm brand={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

AddBrandPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddBrandPage;

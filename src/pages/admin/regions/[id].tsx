import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import AdminBreadcrumbs from '@/components/breadcrums';
import { useParams } from 'next/navigation';
import RegionForm from '@/modules/regionForm';
import { useGetRegionQuery } from '@/store/region';

const AddRegionPage = () => {
  const params = useParams<any>();

  const { data } = useGetRegionQuery<any>(params?.id, {
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
          <Typography variant="h4">Edit Region</Typography>
          <AdminBreadcrumbs />
          <RegionForm region={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

AddRegionPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddRegionPage;

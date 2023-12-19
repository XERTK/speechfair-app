import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import AdminBreadcrumbs from '@/components/breadcrums';
import { useParams } from 'next/navigation';
import CategoryForm from '@/modules/categoryForm';
import { useGetCategoryQuery } from '@/store/category';

const AddCategoryPage = () => {
  const params = useParams<any>();

  const { data } = useGetCategoryQuery<any>(params?.id, {
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
          <Typography variant="h4">Edit Category</Typography>
          <AdminBreadcrumbs />
          <CategoryForm category={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

AddCategoryPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddCategoryPage;

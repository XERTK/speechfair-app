import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import AdminBreadcrumbs from '@/components/breadcrums';
import { useParams } from 'next/navigation';
import { useGetUserQuery } from '@/store/user';
import PostForm from '@/views/posts/PostForm';

const AddStorePage = () => {
  const params = useParams<any>();

  const { data } = useGetUserQuery<any>(params?.id, {
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
          <Typography variant="h4">Edit Post</Typography>
          <AdminBreadcrumbs />
          <PostForm user={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

AddStorePage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddStorePage;

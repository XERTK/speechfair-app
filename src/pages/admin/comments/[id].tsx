import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import AdminBreadcrumbs from '@/components/breadcrums';
import { useParams } from 'next/navigation';
import CommentForm from '@/views/comments/CommentForm';
import { useGetPostQuery } from '@/store/post';

const AddCommentPage = () => {
  const params = useParams<any>();

  const { data } = useGetPostQuery<any>(params?.id, {
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
          <Typography variant="h4">Edit Comment</Typography>
          <AdminBreadcrumbs />
          <CommentForm post={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

AddCommentPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddCommentPage;

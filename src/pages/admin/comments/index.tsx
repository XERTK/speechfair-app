import { useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import DataTable from '@/components/data-table';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  useDeletePostMutation,
  useGetCommentsQuery,
} from '@/store/comment';

const columns = [
  { field: 'Name', flex: 1 },
  { field: 'Post Title', flex: 1 },
  { field: 'Comment', flex: 1 },
  { field: 'IP Address', flex: 1 },
  { field: 'Device', flex: 1 },
  { field: 'Date & Time', flex: 1 },
  { field: 'Edit History', flex: 1 },
  { field: 'Metrics', flex: 1 },
];

const CommentsPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetCommentsQuery<any>(query);
  const [deletePost] = useDeletePostMutation();

  console.log('data for the reult', data);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h4">Comments</Typography>
            <NextLink href="/admin/comments/add">
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                size="small"
              >
                Add
              </Button>
            </NextLink>
          </Stack>
          {/* // TODO: Fetch tolat row count */}
          {/* <DataTable
            rows={data?.results}
            rowCount={data?.totalResults}
            columns={columns}
            query={query}
            setQuery={setQuery}
            lastVisible={data?.lastVisible}
          /> */}
        </Stack>
      </Container>
    </Box>
  );
};

CommentsPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CommentsPage;

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
  useGetPostsQuery,
} from '@/store/post';
import { useGetCategoryQuery } from '@/store/category';

const columns = [
  {
    field: 'userId',
    flex: 1,
    headerName: 'User',
    renderCell: (params: any) => {
      return params.row.userId;
    },
  },
  {
    field: 'headline',
    flex: 1,
    headerName: 'headline',
    renderCell: (params: any) => {
      return params.row.headline;
    },
  },
  {
    field: 'region',
    flex: 1,
    headerName: 'region',
    renderCell: (params: any) => {
      return params.row.region.name;
    },
  },
  {
    field: 'brand',
    flex: 1,
    headerName: 'brand',
    renderCell: (params: any) => {
      return params.row.brand?.name;
    },
  },
  {
    field: 'status',
    flex: 1,
    headerName: 'status',
    renderCell: (params: any) => {
      return params.row.status;
    },
  },
  {
    field: 'matrix',
    flex: 1,
    headerName: 'matrix',
    renderCell: (params: any) => {
      return params.row.matrix;
    },
  },

  {
    field: 'category',
    flex: 1,
    headerName: 'category',
    renderCell: (params: any) => {
      return params.row.category.name;
    },
  },
];

const PostsPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetPostsQuery<any>({});
  // const { data: categoryData } = useGetCategoryQuery<any>({});
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
            <Typography variant="h4">Posts</Typography>
            <NextLink href="/admin/posts/add">
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
          <DataTable
            rows={data?.results}
            rowCount={data?.totalResults}
            columns={columns}
            query={query}
            setQuery={setQuery}
            lastVisible={data?.lastVisible}
            isActions={true}
            onEdit={(id: any) => {
              router.replace(`/admin/posts/${id}`);
            }}
            onDelete={(id: any) => {
              deletePost(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

PostsPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default PostsPage;

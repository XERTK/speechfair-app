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
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  useDeleteCategoryMutation,
  useGetCategorysQuery,
} from '@/store/category';

const columns = [
  {
    field: 'name',
    headerName: 'name',
    renderCell: (params: any) => {
      return params.row.name;
    },
  },
  {
    field: 'alias',
    headerName: 'Alias',
    renderCell: (params: any) => {
      return params.row.alias; // Replace 'Approved' and 'Pending' with your desired representations
    },
  },
];

const CategorysPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetCategorysQuery<any>(query);
  const [deleteCategory] = useDeleteCategoryMutation();

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
            <Typography variant="h4">Categorys</Typography>
            <NextLink href="/admin/categories/add">
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
            onEdit={(id: any) => {
              router.replace(`/admin/categories/${id}`);
            }}
            onDelete={(id: any) => {
              deleteCategory(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

CategorysPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CategorysPage;

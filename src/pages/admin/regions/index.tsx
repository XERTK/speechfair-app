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
  useDeleteRegionMutation,
  useGetRegionsQuery,
} from '@/store/region';

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

const RegionsPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetRegionsQuery<any>(query);
  const [deleteRegion] = useDeleteRegionMutation();

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
            <Typography variant="h4">Regions</Typography>
            <NextLink href="/admin/regions/add">
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
              router.replace(`/admin/regions/${id}`);
            }}
            onDelete={(id: any) => {
              deleteRegion(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

RegionsPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default RegionsPage;

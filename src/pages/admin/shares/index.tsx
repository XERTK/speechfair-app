import { useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import DataTable from '@/components/data-table';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import {
  useDeleteShareMutation,
  useGetSharesQuery,
} from '@/store/share';
import { format } from 'date-fns';

const columns = [
  {
    field: 'device',
    headerName: 'device',
    renderCell: (params: any) => {
      return params.row.device;
    },
  },
  {
    field: 'ip',
    headerName: 'ip',
    renderCell: (params: any) => {
      return params.row.ip;
    },
  },
  {
    field: 'platform',
    headerName: 'platform',
    renderCell: (params: any) => {
      return params.row.platform;
    },
  },
  {
    field: 'date',
    width: 150,
    headerName: 'Date & Time',
    renderCell: (params: any) => {
      const timestamp = params.row.timestamp;
      const date = new Date(timestamp);
      const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
      return formattedDate;
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

const SharesPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetSharesQuery<any>(query);
  const [deleteShare] = useDeleteShareMutation();

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
            <Typography variant="h4">Shares</Typography>
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
              router.replace(`/admin/shares/${id}`);
            }}
            onDelete={(id: any) => {
              deleteShare(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

SharesPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SharesPage;

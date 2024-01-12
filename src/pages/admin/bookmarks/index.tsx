import React, { useState } from 'react';
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
import { useGetBookmarksQuery } from '@/store/bookmark';
import { format } from 'date-fns';

const columns = [
  {
    field: 'postitle',
    headerName: 'Post Title',
    renderCell: (params: any) => {
      return params.row.postTitle;
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params: any) => {
      return params.row.status ? 'Active' : 'Deactivated'; // Replace 'Approved' and 'Pending' with your desired representations
    },
  },
  {
    field: 'date',
    headerName: 'Date',
    renderCell: (params: any) => {
      const dateTime = new Date(params.row.timestamp);
      const formattedDate = format(dateTime, 'yyyy-MM-dd');
      return formattedDate;
    },
  },
  {
    field: 'time',
    headerName: 'Time',
    renderCell: (params: any) => {
      const dateTime = new Date(params.row.timestamp);
      const formattedTime = format(dateTime, 'HH:mm:ss');
      return formattedTime;
    },
  },
  {
    field: 'device',
    headerName: 'Device',
    renderCell: (params: any) => {
      return params.row.device;
    },
  },
  {
    field: 'ip',
    headerName: 'IP',
    renderCell: (params: any) => {
      return params.row.ip;
    },
  },
];

const BookmarkPage = () => {
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetBookmarksQuery<any>(query);

  console.log('hello from the bookmarks API', data?.results);
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
            <Typography variant="h4">Bookmarks</Typography>
            <NextLink href="/admin/bookmarks/add">
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
          />
        </Stack>
      </Container>
    </Box>
  );
};

BookmarkPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default BookmarkPage;

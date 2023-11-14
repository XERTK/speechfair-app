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
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '@/store/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const columns = [
  { field: 'id', flex: 1 },
  { field: 'name', flex: 1 },
  { field: 'email', flex: 1 },
];

const UsersPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetUsersQuery<any>(query);
  const [deleteUser] = useDeleteUserMutation();

  console.log('data for the reult', data?.results);

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
            <Typography variant="h4">Users</Typography>
            <NextLink href="/admin/users/add">
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
              router.replace(`/admin/users/${id}`);
            }}
            onDelete={(id: any) => {
              deleteUser(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

UsersPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default UsersPage;

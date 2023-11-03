import { useCallback, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import DataTable from "src/components/data-table";
import { useGetUsersQuery } from "src/store/user.store";

const UsersPage = () => {
  const [query, setQuery] = useState({ limit: 10, page: 1 });
  const { data, isLoading, refetch } = useGetUsersQuery(query);

  const columns = [
    { field: "id", width: 250 },
    { field: "email", width: 250 },
  ];

  const handlePlusButtonClick = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" alignContent="center" spacing={2}>
              <Typography variant="h4">Users</Typography>
              <Button
                size="small"
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                // onClick={handlePlusButtonClick}
              >
                Add
              </Button>
            </Stack>
            <DataTable rows={data} columns={columns} setQuery={setQuery} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

UsersPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersPage;

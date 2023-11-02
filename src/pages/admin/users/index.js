import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import DataTable from "src/components/data-table";
import { useFetchUsersQuery } from "src/store/user";

const UsersPage = () => {
  const [query, setQuery] = useState("");

  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const columns = [
    { field: "col1", headerName: "Column 1", width: 150, cellModesModel: "is Awesome" },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];

  const { data } = useFetchUsersQuery();

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
              >
                Add
              </Button>
            </Stack>
            <DataTable rows={rows} columns={columns} setQuery={setQuery} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

UsersPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersPage;

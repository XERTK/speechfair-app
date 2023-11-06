import { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import DataTable from "src/components/data-table";
import { useGetUsersQuery } from "src/store/user.store";
import { UserfetchDataDocs } from "src/utils/fetchDataDocs";

import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  startAfter,
  doc,
} from "firebase/firestore";

const UsersPage = () => {
  const [query, setQuery] = useState({ limit: 5, page: 1 });
  const { data, isLoading, refetch } = useGetUsersQuery(query);

  const columns = [
    { field: "id", width: 250 },
    { field: "email", width: 250 },
  ];

  const handlePlusButtonClick = useCallback(() => {
    // refetch();
    // }, [refetch]);
  });
  // let last1 = data.docs[data.docs.length - 1];

  const [fdata, setFdata] = useState([]); // Initialize 'fdata' as an empty array
  useEffect(() => {
    if (!isLoading && data) {
      const fetchData = async () => {
        const fetchedData = await UserfetchDataDocs(data);
        setFdata(fetchedData.data);
      };
      fetchData();
    }
  }, [isLoading, data]);

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
            {isLoading ? (
              <CircularProgress />
            ) : (
              // Conditionally render when 'last' has a value
              <DataTable
                rows={fdata}
                columns={columns}
                query={query}
                setQuery={setQuery}
                lastVisible={data.docs[data.docs.length - 1]}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

UsersPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UsersPage;

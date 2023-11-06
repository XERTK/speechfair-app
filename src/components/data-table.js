import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
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
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import FunnelIcon from "@heroicons/react/24/solid/FunnelIcon";
import { buildURLQuery } from "src/utils/build-url-query";
const DataTable = (props) => {
  const { rows, rowCount, columns, query, setQuery, lastVisible } = props;
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: query.limit,
    page: query.page,
  });

  useEffect(() => {
    // if (paginationModel.page > query.page) {
    // }
    setQuery({ page: paginationModel.page, limit: paginationModel.pageSize });
  }, [paginationModel, setQuery]);
  if (!rows) {
    return <>NO data found</>;
  }
  console.log(lastVisible);

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <Card sx={{ p: 2 }}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <OutlinedInput
            size="small"
            defaultValue=""
            fullWidth
            placeholder="Search user"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 500 }}
          />
          <Button
            color="inherit"
            size="small"
            startIcon={
              <SvgIcon fontSize="small">
                <FunnelIcon />
              </SvgIcon>
            }
          >
            Filter
          </Button>
          <Button
            size="small"
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowDownOnSquareIcon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </Stack>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          pagination
          paginationMode="server"
          rowCount={rowCount || 0}
          sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 }, mt: 2 }}
        />
      </Card>
    </Stack>
  );
};
export default DataTable;

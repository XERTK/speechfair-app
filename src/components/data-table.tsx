import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import FunnelIcon from '@heroicons/react/24/solid/FunnelIcon';
import { debounce } from 'lodash';
import { filterNotNullOrEmptyFields } from '@/utils/filter-not-null-or-empty-fields';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import Swal from 'sweetalert2';
import { isNullOrEmpty } from '@/utils/helpers';

const DataTable = (props: any) => {
  const {
    rows,
    rowCount,
    columns,
    query,
    setQuery,
    lastVisible,
    onEdit,
    onDelete,
  } = props;

  const [paginationModel, setPaginationModel] = useState({
    pageSize: query.limit,
    page: query.page,
  });

  const [search, setSearch] = useState();

  useEffect(() => {
    let t: any = {
      page: paginationModel.page,
      limit: paginationModel.pageSize,
      lastVisible,
      search,
    };

    if (!isNullOrEmpty(search)) {
      t = {
        page: paginationModel.page,
        limit: paginationModel.pageSize,
        search,
      };
    }
    setQuery(filterNotNullOrEmptyFields(t));
  }, [paginationModel, setQuery, search]);

  const debouncedSearch = debounce(async (text) => {
    setSearch(text);
  }, 1000);

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <Card sx={{ p: 2 }}>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={{ mb: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 500 }}
            onChange={(e) => debouncedSearch(e.target.value)}
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
            color="inherit"
            size="small"
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
          rows={rows || []}
          columns={columns.concat({
            field: 'actions',
            renderCell: ({ id }: any) => {
              return (
                <>
                  {onEdit && (
                    <Tooltip title={`edit`} arrow>
                      <span
                        onClick={() => {
                          onEdit(id);
                        }}
                      >
                        <SvgIcon fontSize="small">
                          <PencilIcon />
                        </SvgIcon>
                      </span>
                    </Tooltip>
                  )}
                  {onDelete && (
                    <Tooltip title={`Delete`} arrow>
                      <span
                        style={{
                          marginLeft: 'auto',
                          marginRight: '20px',
                        }}
                        onClick={() => {
                          Swal.fire({
                            title: '<strong>Warning</strong>',
                            icon: 'warning',
                            html: 'Are you sure you want to delete this?',
                            showCloseButton: true,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                          }).then(async (result: any) => {
                            if (result.isConfirmed) {
                              onDelete(id);
                            }
                          });
                        }}
                      >
                        <SvgIcon fontSize="small">
                          <TrashIcon style={{ color: 'red' }} />
                        </SvgIcon>
                      </span>
                    </Tooltip>
                  )}
                </>
              );
            },
          })}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          pagination
          paginationMode="server"
          rowCount={rowCount || 0}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      </Card>
    </Stack>
  );
};
export default DataTable;

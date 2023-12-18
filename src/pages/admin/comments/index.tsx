import React, { useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import DataTable from '@/components/data-table';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useGetCommentsQuery } from '@/store/comment';
import { format } from 'date-fns';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    renderCell: (params: any) => {
      return params.row.Comment.name;
    },
  },
  {
    field: 'postitle',
    headerName: 'Post Title',
    renderCell: (params: any) => {
      return params.row.Comment.postTitle;
    },
  },
  {
    field: 'comment',
    headerName: 'Comment',
    renderCell: (params: any) => {
      return params.row.Comment.comment;
    },
  },
  {
    field: 'device',
    headerName: 'Device',
    renderCell: (params: any) => {
      return params.row.Comment.device;
    },
  },
  {
    field: 'date',
    width: 150,
    headerName: 'Date & Time',
    renderCell: (params: any) => {
      const timestamp = params.row.Comment.timestamp;
      const date = new Date(timestamp);
      const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
      return formattedDate;
    },
  },
  {
    field: 'history',
    headerName: 'History',
    renderCell: (params: any) => (
      <RenderHistoryCell comments={params.row.comments} />
    ),
  },
  // {
  //   field: 'history',
  //   headerName: 'History',
  //   renderCell: (params: any) => {
  //     const [open, setOpen] = React.useState(false);

  //     const handleClickOpen = () => {
  //       setOpen(true);
  //     };

  //     const handleClose = () => {
  //       setOpen(false);
  //     };

  //     const commentsJSON = params.row.comments || [];

  //     return (
  //       <React.Fragment>
  //         <Button variant="outlined" onClick={handleClickOpen}>
  //           View
  //         </Button>
  //         <Dialog
  //           open={open}
  //           keepMounted
  //           onClose={handleClose}
  //           aria-describedby="alert-dialog-slide-description"
  //         >
  //           <DialogTitle>{'Your previous History'}</DialogTitle>
  //           <DialogContent>
  //             {commentsJSON.map((comment: any, index: number) => (
  //               <div key={index}>
  //                 <p>
  //                   Date:{' '}
  //                   {new Date(
  //                     comment.timestamp.seconds * 1000
  //                   ).toLocaleString()}
  //                 </p>
  //                 <p>Comment: {comment.comment}</p>
  //                 {index < commentsJSON.length - 1 && <hr />}
  //               </div>
  //             ))}
  //           </DialogContent>

  //           <DialogActions>
  //             <Button onClick={handleClose}>Close</Button>
  //           </DialogActions>
  //         </Dialog>
  //       </React.Fragment>
  //     );
  //   },
  // },
  {
    field: 'upVotes',
    headerName: 'Up Votes',
    renderCell: (params: any) => {
      return params.row.Comment.upVotes;
    },
  },
  {
    field: 'downVotes',
    headerName: 'Down Votes',
    renderCell: (params: any) => {
      return params.row.Comment.downVotes;
    },
  },
];

const RenderHistoryCell = ({ comments }: { comments: any[] }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const commentsJSON = params.row.comments || [];

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Your previous History'}</DialogTitle>
        <DialogContent>
          {comments.map((comment: any, index: number) => (
            <div key={index}>
              <p>
                Date:{' '}
                {new Date(
                  comment.timestamp.seconds * 1000
                ).toLocaleString()}
              </p>
              <p>Comment: {comment.comment}</p>
              {index < comments.length - 1 && <hr />}
            </div>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const CommentsPage = () => {
  const [query, setQuery] = useState({
    page: 0,
    limit: 5,
  });

  const { data } = useGetCommentsQuery<any>(query);

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
            <Typography variant="h4">Comments</Typography>
            <NextLink href="/admin/comments/add">
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

CommentsPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CommentsPage;

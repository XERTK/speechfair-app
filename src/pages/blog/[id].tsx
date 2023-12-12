import { Button, Grid, Stack, Typography } from '@mui/material';
import { Layout } from '@/layouts/user/layout';

import { useParams } from 'next/navigation';
import StarRateIcon from '@mui/icons-material/StarRate';
import logoImg from '../../../public/assets/main.png';
import { useGetPostQuery } from '@/store/post';
import AbcIcon from '@mui/icons-material/Abc';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useGetPostCommentsCountQuery } from '@/store/comment';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReplyIcon from '@mui/icons-material/Reply';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import React from 'react';
import { countWords, summaryWordCountTime } from '@/utils/helpers';
import CommentDrawer from '@/components/drawer/commentDrawer';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const blogPage = () => {
  const params = useParams<any>();
  const loggedInUser = true;
  const { data: postData } = useGetPostQuery<any>(params?.id);
  const {
    data: commentDataCount,
    isLoading,
    isError,
  } = useGetPostCommentsCountQuery({ postId: params?.id });

  const [state, setState] = React.useState({
    right: false,
  });

  const summaryWordCount = postData
    ? countWords(postData.summary)
    : 0;

  const roundedTime = summaryWordCountTime(summaryWordCount);

  const anchor = 'right';
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <>
      <Grid
        maxWidth="xl"
        container
        justifyContent="center"
        sx={{
          py: 3,
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold', fontSize: '1.063rem' }}
        >
          Peeps, here is a Digest in under 250 words.
        </Typography>
      </Grid>

      <Grid
        maxWidth="xl"
        justifyContent="center"
        sx={{
          py: 3,
          px: 3,
          mx: 3,
          border: '3px solid #000', // Adding a black border of 1px
          padding: '20px', // Adding padding for better visibility
        }}
        id="grid2"
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <img src={logoImg.src} alt="Logo" width={'37.61px'} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <StarRateIcon
              sx={{
                color: 'black',
                fontSize: '19px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 16 }}
            >
              {postData?.brandTo}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <StarRateIcon
              sx={{
                color: 'black',
                fontSize: '19px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 16 }}
            >
              {postData?.region}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <StarRateIcon
              sx={{
                color: 'black',
                fontSize: '19px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 12 }}
            >
              Glb
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccessTimeIcon
              sx={{
                color: 'black',
                fontSize: '28px',
                display: { xs: 'none', sm: 'inline' },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                alignContent: 'center',
                fontSize: 12,
                display: { xs: 'none', sm: 'inline' },
              }}
            >
              {roundedTime}m
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" sx={{}}>
            <AbcIcon
              sx={{
                color: 'black',
                fontSize: '55px',
                display: { xs: 'none', sm: 'inline' },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                alignContent: 'center',
                fontSize: 12,
                display: { xs: 'none', sm: 'inline' },
              }}
            >
              {summaryWordCount}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Button
              sx={{
                color: 'white',
                fontSize: '15px',
                backgroundColor: 'blue',
                '&:hover': {
                  backgroundColor: 'darkblue',
                },
                padding: '2px 2px', // Adjust the padding value to decrease padding
              }}
            >
              A+
            </Button>
            <Button
              sx={{
                color: 'white',
                fontSize: '15px',
                backgroundColor: 'green',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                },
                padding: '2px 2px', // Adjust the padding value to decrease padding
              }}
            >
              A-
            </Button>
          </Stack>
        </Stack>

        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: 20, md: 25, lg: 50 },
            textDecoration: 'underline',
            mt: '15px',
            mb: '25px',
          }}
        >
          {postData?.headline}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            alignContent: 'center',
            fontSize: 16,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            '&::first-letter': {
              fontSize: '1.5em', // Change this value to your desired font size
              fontWeight: 'bold', // You can adjust other styles as needed
              marginRight: '4px', // Adding space after the enlarged first letter
            },
          }}
        >
          {postData?.summary}
        </Typography>

        <Stack
          direction="row-reverse"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Button
            sx={{
              fontSize: '15px',
              borderRadius: '0px',
              width: { xs: '100%', md: 'auto', lg: 'auto' },
            }}
          >
            for full story here peeps
          </Button>
        </Stack>
        <Stack
          direction="row-reverse"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            onClick={toggleDrawer(anchor, true)}
          >
            <ModeCommentOutlinedIcon
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ fontSize: 14, ml: -2.3 }}
            >
              {typeof commentDataCount === 'object'
                ? commentDataCount.commentCount
                : commentDataCount || 0}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <BookmarkBorderOutlinedIcon
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <ReplyIcon
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <ArrowDownwardIcon
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
            <Typography variant="body2" sx={{ fontSize: 14 }}>
              4
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <ArrowUpwardIcon
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
            <Typography variant="body2" sx={{ fontSize: 14 }}>
              6
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <CommentDrawer
        anchor={anchor}
        open={state[anchor]}
        toggleDrawer={toggleDrawer}
        loggedInUser={loggedInUser}
        postId={params?.id}
      />
    </>
  );
};

blogPage.getLayout = (page: any) => <Layout>{page}</Layout>;

export default blogPage;

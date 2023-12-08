import { Button, Grid, Stack, Typography } from '@mui/material';
import { Layout } from '@/layouts/user/layout';

import { useParams } from 'next/navigation';
import StarRateIcon from '@mui/icons-material/StarRate';
import logoImg from '../../../public/assets/main.png';
import { useGetPostQuery } from '@/store/post';

import AbcIcon from '@mui/icons-material/Abc';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const blogPage = () => {
  const params = useParams<any>();
  const { data: postData } = useGetPostQuery<any>(params?.id);

  const countWords = (text: string): number => {
    const words = text.split(/\s+/);
    return words.length;
  };

  const summaryWordCount = postData
    ? countWords(postData.summary)
    : 0;

  const summaryWordCountTime = summaryWordCount / 3.5 / 60;
  const roundedTime = summaryWordCountTime.toFixed(1);

  if (params.id) {
    console.log(params.id);
  }
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
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 12 }}
            >
              {roundedTime}m
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <AbcIcon
              sx={{
                color: 'black',
                fontSize: '55px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 12 }}
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
            fontSize: 50,
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
          }}
        >
          {postData?.summary}
        </Typography>
      </Grid>
    </>
  );
};

blogPage.getLayout = (page: any) => <Layout>{page}</Layout>;

export default blogPage;

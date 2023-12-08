import PropTypes from 'prop-types';
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import logoImg from '../../../public/assets/main.png';
import tempImg from '../../../public/assets/thumbnail.png';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AbcIcon from '@mui/icons-material/Abc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownOutlined';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useGetPostCommentsCountQuery } from '@/store/comment';

export const PostCard = (props: any) => {
  const {
    data: commentDataCount,
    isLoading,
    isError,
  } = useGetPostCommentsCountQuery({ postId: props.item.id });

  console.log(commentDataCount, props.item.id);

  let postData = null; // Initialize postData outside the conditional block

  if (props.item) {
    postData = props.item; // Assign props.item to postData if it exists
  }
  const countWords = (text: string): number => {
    const words = text.split(/\s+/); // Split by whitespace
    return words.length;
  };

  const summaryWordCount = postData
    ? countWords(postData.summary)
    : 0;

  const summaryWordCountTime = summaryWordCount / 3.5 / 60;
  const roundedTime = summaryWordCountTime.toFixed(1);

  return (
    <Card>
      <CardContent>
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
                fontSize: '12.61px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 12 }}
            >
              {postData.brandTo}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnIcon
              sx={{
                color: 'black',
                fontSize: '12.61px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 12 }}
            >
              {postData.region}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{ alignContent: 'center', fontSize: 12 }}
          >
            {postData.tags}
          </Typography>
        </Stack>
        <Typography
          variant="h3"
          sx={{
            fontSize: 25,
            textDecoration: 'underline',
            mt: '15px',
            mb: '25px',
          }}
        >
          {postData?.headline}
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
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
            <CalendarMonthIcon
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ alignContent: 'center', fontSize: 12 }}
            >
              Glb
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <ModeCommentOutlinedIcon
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ fontSize: 10, ml: -2.6 }}
            >
              {commentDataCount?.commentCount || 0}
            </Typography>
          </Stack>
        </Stack>

        <Box
          justifyContent="center"
          component="img"
          sx={{
            borderRadius: 2,
            height: '50%',
            maxWidth: '100%',
            objectFit: 'cover',
          }}
          alt="The house from the offer."
          src={tempImg.src}
        />
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

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={8}
          sx={{
            mt: 10,
          }}
        >
          <ThumbUpIcon
            sx={{
              color: 'black',
              fontSize: '28px',
            }}
          />

          <ThumbDownAltIcon
            sx={{
              color: 'black',
              fontSize: '28px',
            }}
          />

          <ReplyIcon
            sx={{
              color: 'black',
              fontSize: '28px',
            }}
          />

          <MoreVertIcon
            sx={{
              color: 'black',
              fontSize: '28px',
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

PostCard.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};

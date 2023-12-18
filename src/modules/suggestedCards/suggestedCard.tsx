import PropTypes from 'prop-types';
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import logoImg from '../../../public/assets/main.png';
import tempImg from '../../../public/assets/thumbnail.png';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AbcIcon from '@mui/icons-material/Abc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIconFilled from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownAltIconFilled from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { useGetPostCommentsCountQuery } from '@/store/comment';
import { useState } from 'react';
import { useRouter } from 'next/router';

export interface PostData {
  id: string;
  brandTo: string;
  region: string;
  tags: string;
  headline: string;
  summary: string;
}

export const SuggestedCard = (props: { item: PostData }) => {
  const {
    data: commentDataCount,
    isLoading,
    isError,
  } = useGetPostCommentsCountQuery({ postId: props.item?.id });
  const router = useRouter();

  let postData: PostData | null = null;

  if (props.item) {
    postData = props.item;
  }
  const countWords = (text: string): number => {
    const words = text.split(/\s+/);
    return words.length;
  };

  const summaryWordCount = postData
    ? countWords(postData.summary)
    : 0;

  const summaryWordCountTime = summaryWordCount / 3.5 / 60;
  const roundedTime = summaryWordCountTime.toFixed(1);

  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);

  const handleThumbUpClick = () => {
    setIsThumbUpClicked(
      (prevIsThumbUpClicked) => !prevIsThumbUpClicked
    );
    if (isThumbDownClicked) {
      setIsThumbDownClicked(false);
    }
  };

  const handleThumbDownClick = () => {
    setIsThumbDownClicked(
      (prevIsThumbDownClicked) => !prevIsThumbDownClicked
    );
    if (isThumbUpClicked) {
      setIsThumbUpClicked(false);
    }
  };

  const handleCardIdClick = () => {
    console.log('handleCardIdClick');
    router.push(`/blog/${postData?.id}`);
  };
  return (
    <Card
      sx={{
        height: '450px',
        borderRadius: 0,
        border: '3px solid #000', // Adding a black border of 1px
        minWidth: '200px',
        maxWidth: '300px',
      }}
    >
      <CardContent>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
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
              {postData?.brandTo}
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
              {postData?.region}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          onClick={handleCardIdClick}
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
            WebkitLineClamp: 2,
          }}
        >
          {postData?.summary}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={5}
          sx={{
            mt: 3,
          }}
        >
          <ShareIcon
            sx={{
              color: 'black',
              fontSize: '28px',
            }}
          />
          <Stack direction="row" alignItems="center">
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
              {commentDataCount?.commentCount || 0}
            </Typography>
          </Stack>
          {isThumbUpClicked ? (
            <ThumbUpIconFilled
              onClick={handleThumbUpClick}
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
          ) : (
            <ThumbUpIcon
              onClick={handleThumbUpClick}
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
          )}

          {isThumbDownClicked ? (
            <ThumbDownAltIconFilled
              onClick={handleThumbDownClick}
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
          ) : (
            <ThumbDownAltIcon
              onClick={handleThumbDownClick}
              sx={{
                color: 'black',
                fontSize: '28px',
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

SuggestedCard.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};

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
import ThumbUpIconFilled from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownAltIconFilled from '@mui/icons-material/ThumbDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ErrorIcon from '@mui/icons-material/Error';

import {
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  Menu,
  Button,
} from '@mui/material';
import { useGetPostCommentsCountQuery } from '@/store/comment';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { countWords } from '@/utils/helpers';
import BookmarkMenu from '@/modules/bookmarkMenu';

export interface PostData {
  id: string;
  brand: { alias: string };
  region: string;
  tags: string;
  headline: string;
  summary: string;
}

export const PostCard = (props: { item: PostData }) => {
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

  console.log(JSON.stringify(postData));

  const summaryWordCount = postData
    ? countWords(postData.summary)
    : 0;
  const summaryWordCountTime = summaryWordCount / 3.5 / 60;
  const roundedTime = summaryWordCountTime.toFixed(1);

  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false);
  const [isThumbDownClicked, setIsThumbDownClicked] = useState(false);
  const [showSaveCard, setShowSaveCard] = React.useState(false); // Add state to manage the SaveCard display
  const [openMenu, setOpenMenu] = React.useState(false);

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleBookmarkClick = () => {
    setAnchorEl(null);
    setShowSaveCard(!showSaveCard);
  };

  const handleFeedbackClick = () => {
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setShowSaveCard(false);
  };
  return (
    <Card
      sx={{
        minWidth: 420,
      }}
    >
      <CardContent>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Image
            src={logoImg.src}
            alt="Logo"
            width={38}
            height={38}
          />
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
              {postData?.brand?.alias || 'N/A'}
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
              {postData?.brand
                ? postData.brand.alias || 'N/A'
                : 'N/A'}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{ alignContent: 'center', fontSize: 12 }}
          >
            {postData?.tags}
          </Typography>
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
          <ReplyIcon
            sx={{
              color: 'black',
              fontSize: '28px',
            }}
          />
          <IconButton
            onClick={handleMoreClick}
            sx={{
              color: 'black',
              fontSize: '28px',
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMoreClose}
          >
            <MenuItem onClick={handleBookmarkClick}>
              <BookmarkIcon />
              Bookmark
            </MenuItem>
            <MenuItem onClick={handleFeedbackClick}>
              <ErrorIcon />
              Report
            </MenuItem>
          </Menu>
          <BookmarkMenu
            open={showSaveCard}
            onClose={handleMenuClose}
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

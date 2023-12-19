import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { GridMoreVertIcon } from '@mui/x-data-grid';
import ErrorIcon from '@mui/icons-material/Error';
import FolderIcon from '@mui/icons-material/Folder';

export const items = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Posts',
    path: '/admin/posts',
    icon: (
      <SvgIcon fontSize="small">
        <CreateIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Comments',
    path: '/admin/comments',
    icon: (
      <SvgIcon fontSize="small">
        <CommentIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Upvotes',
    path: '/admin/upvotes',
    icon: (
      <SvgIcon fontSize="small">
        <ThumbUpIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Downvotes',
    path: '/admin/downvotes',
    icon: (
      <SvgIcon fontSize="small">
        <ThumbDownAltIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Consumers',
    path: '/admin/consumers',
    icon: (
      <SvgIcon fontSize="small">
        <VisibilityIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Bookmarks',
    path: '/admin/bookmarks',
    icon: (
      <SvgIcon fontSize="small">
        <BookmarkIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Setup',
    icon: (
      <SvgIcon fontSize="small">
        <FolderIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: 'region',
        path: '/admin/regions',
      },
      {
        title: 'Category',
        path: '/admin/categories',
      },
      // Add more sub-items here as needed
    ],
  },
  {
    title: 'Feedback',
    path: '/admin/feedbacks',
    icon: (
      <SvgIcon fontSize="small">
        <ErrorIcon />
      </SvgIcon>
    ),
  },
];

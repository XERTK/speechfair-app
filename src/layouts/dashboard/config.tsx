import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';
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
];

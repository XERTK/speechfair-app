import PropTypes from 'prop-types';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

export const DashboardAdminNow = (props: any) => {
  const { sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Admin Now / Cummulative
            </Typography>
            <Typography variant="h4">1 / 7</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ShoppingBagIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardAdminNow.propTypes = {
  sx: PropTypes.object,
};

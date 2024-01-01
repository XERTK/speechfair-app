import PropTypes from 'prop-types';
import EqualizerIcon from '@mui/icons-material/Equalizer';

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

export const DashboardUserCommulativeCard = (props: any) => {
  const { value, sx } = props;

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
              Users Cummulative
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <EqualizerIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardUserCommulativeCard.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

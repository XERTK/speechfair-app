import PropTypes from 'prop-types';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

export const DashboardUserCommulativeCard = (props: any) => {
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
              Users Cummulative
            </Typography>
            <Typography variant="h4"> 2 </Typography>
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
  sx: PropTypes.object,
};

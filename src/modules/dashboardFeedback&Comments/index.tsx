import PropTypes from 'prop-types';
import DataUsageIcon from '@mui/icons-material/DataUsage';
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

export const DashboardFeedbackAndComments = (props: any) => {
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
              Feedback & Comments
            </Typography>
            <Typography variant="h4">0 / 0</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <DataUsageIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

DashboardFeedbackAndComments.propTypes = {
  sx: PropTypes.object,
};

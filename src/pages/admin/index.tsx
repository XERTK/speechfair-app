import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { DashboardLayout } from '@/layouts/dashboard/layout';
import { DashboardUserCard } from '@/modules/dashboardUserCard';
import { DashboardUserCommulativeCard } from '@/modules/dashboardUserCommulativeCard ';
import { DashboardAdminNow } from '@/modules/dashboardAdminNow ';
import { DashboardFeedbackAndComments } from '@/modules/dashboardFeedback&Comments';
import PostsPage from './posts';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>Overview | Fcorner Admin</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}>
            <DashboardUserCard sx={{ height: '100%' }} value={2} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <DashboardUserCommulativeCard sx={{ height: '100%' }} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <DashboardAdminNow sx={{ height: '100%' }} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <DashboardFeedbackAndComments sx={{ height: '100%' }} />
          </Grid>
        </Grid>
        <PostsPage />
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;

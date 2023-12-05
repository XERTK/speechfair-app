import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { OverviewBudget } from '@/views/overview/overview-budget';
import { Layout } from '@/layouts/user/layout';
import Carousel from 'react-material-ui-carousel';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
const now = new Date();

const HomePage = () => {
  var totalSteps = 4;

  function progressBar(e: any) {
    //   //update progress
    //   var step = $(e.relatedTarget).data('step');
    //   var percent = (parseInt(step) / totalSteps) * 100;
    //   $('.progress-bar').css({ width: percent + '%' });
    //   $('.progress-bar').text('Step ' + step);
  }
  return (
    <>
      <Head>
        <title>Overview | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
              type: 'progressbar',
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <SwiperSlide key={item}>
                <Grid xs={12} sm={6} key={item}>
                  <OverviewBudget />
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>
    </>
  );
};

HomePage.getLayout = (page: any) => <Layout>{page}</Layout>;

export default HomePage;

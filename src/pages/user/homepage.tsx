import Head from 'next/head';
import { Unstable_Grid2 as Grid } from '@mui/material';
import { PostCard } from '@/views/overview/postCard';
import { Layout } from '@/layouts/user/layout';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(7);
  const [perView, setPerView] = useState(1);
  console.log(activeIndex + ' active');
  const progress: number = activeIndex * (totalSlides * perView);
  const _progress = Math.min(Math.max(0, progress), 100);

  return (
    <>
      <div
        className="progress_bar"
        style={{
          width: `${_progress}%`,
          backgroundColor: 'red',
          height: '5px',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '9999',
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
      <Head>
        <title>Overview | Devias Kit</title>
      </Head>

      <Grid>
        <Swiper
          style={{
            padding: '20px',
          }}
          slidesPerView={1}
          breakpoints={{
            640: {
              width: 640,
              slidesPerView: 1,
            },

            768: {
              width: 768,
              slidesPerView: 2,
            },
          }}
          spaceBetween={170}
          navigation={true}
          modules={[Navigation]}
          onRealIndexChange={(element) => {
            setActiveIndex(element.activeIndex);
            if (typeof element.params.slidesPerView === 'number') {
              setPerView(element.params.slidesPerView);
            }
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
            console.log(index); // Logs the index of the slide
            return (
              <SwiperSlide key={item}>
                <Grid xs={12} sm={6} key={item}>
                  <PostCard />
                </Grid>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Grid>
    </>
  );
};

HomePage.getLayout = (page: any) => <Layout>{page}</Layout>;

export default HomePage;

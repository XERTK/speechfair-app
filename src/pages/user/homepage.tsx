import Head from 'next/head';
import { Unstable_Grid2 as Grid } from '@mui/material';
import { PostCard } from '@/views/overview/postCard';
import { Layout } from '@/layouts/user/layout';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { useState } from 'react';
import { useGetPostsQuery } from '@/store/post';
import { style } from '@mui/system';

const HomePage = () => {
  const {
    data: { results } = {},
    isLoading,
    isError,
  } = useGetPostsQuery({});
  const [perView, setPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(
    // results?.length ?? 0
    4
  );

  const progress: number =
    ((activeIndex + 1) / (totalSlides - 1)) * 100 || 0;
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
          autoplay={{
            delay: 22500,
            disableOnInteraction: false,
          }}
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
          modules={[Navigation, Autoplay]}
          onRealIndexChange={(element) => {
            setActiveIndex(element.activeIndex);
            if (typeof element.params.slidesPerView === 'number') {
              setPerView(element.params.slidesPerView);
            }
          }}
        >
          {results?.map((item, index) => {
            return (
              <SwiperSlide key={item.id}>
                <Grid xs={12} sm={6} key={item.id}>
                  <PostCard item={item} />
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

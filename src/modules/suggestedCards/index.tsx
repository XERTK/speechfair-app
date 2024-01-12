import { useGetPostsQuery } from '@/store/post';
import { Grid } from '@mui/material';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SuggestedCard } from './suggestedCard';

const SuggestedCards: React.FC<any> = (props: any) => {
  const category = props.category;
  const { data, isLoading, isError } = useGetPostsQuery({
    categoryName: category?.name,
  });

  const results = data?.results || [];

  console.log(results, 'suggested cards');

  return (
    <>
      <Grid>
        <Swiper
          slidesPerView={4}
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
          spaceBetween={1}
          navigation={true}
          modules={[Navigation]}
          onRealIndexChange={(element) => {
            // Your logic here
          }}
        >
          {results.map((item: any, index: number) => (
            <SwiperSlide key={item.id}>
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <SuggestedCard item={item} />
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </>
  );
};

export default SuggestedCards;

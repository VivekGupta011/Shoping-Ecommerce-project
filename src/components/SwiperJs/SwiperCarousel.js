
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../SwiperJs/SwiperCss.scss';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

function SwiperCarousel() {
    const { data } = useSelector(state => state.product);
    // console.log("productsss:");
    // console.log(obj);
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div className="container-fluid">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {
                    data.slice(0, 3).map(Item => (
                        <SwiperSlide key={data.id}>
                            <img style={{ width: "100%", height: "60%", objectFit: "cover" }} src="https://fashiontool.vercel.app/static/media/storeimg.c2db3f70ed33763bb949.png" alt="Slider Image" />
                        </SwiperSlide>
                    ))
                }
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>

            </Swiper>
        </div>
    )
}

export default SwiperCarousel;
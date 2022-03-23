import React, { useState } from 'react';
import InfoCard from '_molecules/InfoCard';
import './styles.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css/autoplay';
import 'swiper/css';

const images = [
  { id: 0, src: '/images/3.png', caption: 'Personal Assistant' },
  { id: 1, src: '/images/fashion_1.png', caption: 'Fashion model' },
  { id: 2, src: '/images/fitness_1.png', caption: 'Fitness trainer' },
];

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="hero-slider-container">
        <Swiper
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
          className="hero-slider"
        >
          {images.map((img) => (
            <SwiperSlide
              key={img.id}
            >
              <img
                src={img.src}
                alt="3D Model"
              />
              <span>
                <h2>AI HUMAN</h2>
                <div className="horizontal-divider" />
                <p>{img.caption}</p>
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="large-tagline">Deploy to Earn with AI Humans</p>
        <video autoPlay muted loop>
          <source src="videos/vid.mp4" type="video/mp4" />
        </video>
      </div>
      <InfoCard
        video="https://assets.mixkit.co/videos/download/mixkit-man-under-multicolored-lights-1237.mp4"
        headingText="Conversationally intelligent"
        paragraphText="Our AI humans can converse like a real person"
      />
      <InfoCard
        video="https://assets.mixkit.co/videos/download/mixkit-man-under-multicolored-lights-1237.mp4"
        headingText="Conversationally intelligent"
        paragraphText="Our AI humans can converse like a real person"
        reverse={true}
      />
    </div>
  );
}

import React, { useState } from 'react';
import './styles.css';
import TinySlider from 'tiny-slider-react';

const images = [
  { id: 0, src: 'https://www.internetmadenft.com/assets/images/hero/personaje-01.webp' },
  { id: 1, src: 'https://www.internetmadenft.com/assets/images/hero/personaje-02.webp' },
  { id: 2, src: 'https://www.internetmadenft.com/assets/images/hero/personaje-03.webp' },
  { id: 3, src: 'https://www.internetmadenft.com/assets/images/hero/personaje-04.webp' },
];

export default function WelcomePage() {
  const [heroImage, setHeroImage] = useState(images[3].src);

  const changeSlide = (slideClicked, info, event) => {
    setHeroImage(event.target.currentSrc);
  };

  const settings = {
    controls: false,
    loop: true,
    items: 1,
    slideBy: 'page',
    nav: false,
    speed: 400,
    gutter: 10,
    autoplayButtonOutput: false,
    mouseDrag: true,
    lazyload: true,
    axis: 'vertical',
    responsive: {
      640: {
        items: 2,
      },

      768: {
        items: 3,
      },
    },
  };

  return (
    <React.Fragment>
      <div className="hero-container">
        <div className="hero-image">
          <img src={heroImage} alt="3D Model" />
        </div>

        <div className="hero-slider-container">
          <TinySlider
            settings={settings}
            className="hero-slider"
            onClick={changeSlide}
          >
            {images.map((img) => (
              <div
                key={img.id}
                className="hero-slider-card"
              >
                <img
                  src={img.src}
                  alt="3D Model"
                />
              </div>
            ))}
          </TinySlider>
        </div>
      </div>
    </React.Fragment>
  );
}

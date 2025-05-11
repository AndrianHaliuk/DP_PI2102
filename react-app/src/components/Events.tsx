import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Events: React.FC = () => {
  return (
    <section className="our-events-section container">
      <div className="join-image">
        <h2>Ви можете зробити внесок, щоб створити місце для дітей з особливими потребами!</h2>
        <div>
          <a href="#" className="primary-btn">Приєднатися як волонтер</a>
          <a href="#" className="sec-btn">Пожертвувати</a>
        </div>
      </div>

      <div className="events-slider-title-container">
        <div className="events-slider-title">
          <h2>Наші події</h2>
          <div className="event-line"></div>
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: true,
        }}
        spaceBetween={20}
        loop={true}
        autoHeight={true}

        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
>
  {[
    {
      day: "13",
      month: "квіт",
      title: "День з нашими чудовими дітьми",
    },
    {
      day: "25",
      month: "квіт",
      title: "Семінар: Догляд за дітьми з аутизмом",
    },
    {
      day: "13",
      month: "квіт",
      title: "День з нашими чудовими дітьми",
    },
    {
      day: "25",
      month: "квіт",
      title: "Семінар: Догляд за дітьми з аутизмом",
    },
  ].map((event, idx) => (
    <SwiperSlide key={idx}>
      <div className="event">
        <div className="event-container">
          <div className="event-date">
            <p className="day">{event.day}</p>
            <p className="months">{event.month}</p>
          </div>
          <div className="event-text">
            <div className="line-container">Наступні події<div className="line" /></div>
            <div><h3>{event.title}</h3></div>
          </div>
          <a href="#" className="event-link">
            <div className="circle">
              <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.4571 8.70711C18.8476 8.31658 18.8476 7.68342 18.4571 7.29289L12.0931 0.928933C11.7026 0.538409 11.0695 0.538409 10.6789 0.928933C10.2884 1.31946 10.2884 1.95262 10.6789 2.34315L16.3358 8L10.6789 13.6569C10.2884 14.0474 10.2884 14.6805 10.6789 15.0711C11.0695 15.4616 11.7026 15.4616 12.0931 15.0711L18.4571 8.70711ZM0.25 9L17.75 9L17.75 7L0.25 7L0.25 9Z" fill="#1D2130" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </section>
  );
};

export default Events;
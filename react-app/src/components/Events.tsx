import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import client from '../api/client';
import { Campaign } from '../types';

const Events: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await client.get('/campaigns');
        console.log('Завантажені кампанії:', res.data);
        setCampaigns(res.data);
      } catch (err) {
        console.error('Помилка при завантаженні кампаній:', err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <section className="our-events-section container">
      <div className="join-image">
        <h2>
          Ви можете зробити внесок, щоб підтримати тих, хто цього потребує!
        </h2>
        <div>
          <a href="/campaigns" className="sec-btn">Задонатити</a>
        </div>
      </div>

      <div className="events-slider-title-container">
        <div className="events-slider-title">
          <h2>Актуальні кампанії та збори</h2>
          <div className="event-line"></div>
        </div>
      </div>
      {campaigns.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          spaceBetween={20}
          loop={campaigns.length > 1}
          autoHeight={true}
          className="mySwiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {campaigns.map(c => {
            const date = c.createdAt ? new Date(c.createdAt) : new Date();
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('uk-UA', { month: 'short' });

            return (
              <SwiperSlide key={c.id}>
                <div className="event">
                  <div className="event-container">
                    <div className="event-date">
                      <p className="day">{day}</p>
                      <p className="months">{month}</p>
                    </div>
                    <div className="event-text">
                      <div className="line-container">
                        Кампанія<div className="line" />
                      </div>
                      <h3>{c.title}</h3>
                      <p>Ціль: {c.goalAmount.toLocaleString()} грн</p>
                    </div>
                    <a href={`/campaigns/${c.id}`} className="event-link">
                      <div className="circle">
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.4571 8.70711C18.8476 8.31658 18.8476 7.68342 18.4571 7.29289L12.0931 0.928933C11.7026 0.538409 11.0695 0.538409 10.6789 0.928933C10.2884 1.31946 10.2884 1.95262 10.6789 2.34315L16.3358 8L10.6789 13.6569C10.2884 14.0474 10.2884 14.6805 10.6789 15.0711C11.0695 15.4616 11.7026 15.4616 12.0931 15.0711L18.4571 8.70711ZM0.25 9L17.75 9L17.75 7L0.25 7L0.25 9Z" fill="#1D2130" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          Наразі немає доступних кампаній.
        </p>
      )}
    </section>
  );
};

export default Events;

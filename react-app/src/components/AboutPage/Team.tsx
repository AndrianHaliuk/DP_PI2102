import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTeam } from '../../hooks/useTeam';

const Team: React.FC = () => {
  const team = useTeam();

  return (
    <section className="our-team-section">
      <div className="container">
        <h2 className="our-team-title">Наша команда</h2>
        <p className="our-team-sub-title">
          Ми — команда однодумців, об'єднаних спільною метою: допомагати тим, хто цього потребує. Кожен з нас докладає максимум зусиль для реалізації благодійних ініціатив.
        </p>
        <div className="team" id="team">
          {team.length > 0 ? (
            team.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.photo} alt={member.name} className="team-member-photo" />
                <div className="member-wrapper">
                  <p className="member-name">{member.name}</p>
                  <p className="member-role">{member.role}</p>
                  <div className="social-icons">
                    <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Завантаження команди...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;

import React, { useRef, useEffect, useState } from 'react';

type Donor = {
  name: string;
  amount: number;
};

type Props = {
  donors: Donor[];
};

const TopDonorsMarquee: React.FC<Props> = ({ donors }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const speedPxPerSec = 60; 
      const duration = contentWidth / speedPxPerSec;

      setAnimationDuration(duration);
    }
  }, [donors]);

  if (!donors || donors.length === 0) return null;

  const donorText = donors
    .map(d => `${d.name} — ${d.amount} грн`)
    .join('  •  ');

  return (
    <div ref={containerRef} className="marquee-container">
      <div
        ref={contentRef}
        className="marquee-content"
        style={{ animationDuration: animationDuration ? `${animationDuration}s` : '0s' }}
      >
        <span className="marquee-text">{donorText}</span>
        <span className="marquee-text sec-marquee-text">{donorText}</span>
      </div>
    </div>
  );
};

export default TopDonorsMarquee;

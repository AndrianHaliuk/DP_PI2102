import { useEffect, useState } from 'react';

interface TeamMember {
  name: string;
  photo: string;
  role: string;
  social: { facebook: string; twitter: string; linkedin: string };
}

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/json/team.json')
      .then(res => res.json())
      .then(setTeam)
      .catch(console.error);
  }, []);

  return team;
};

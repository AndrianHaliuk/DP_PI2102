import { useState } from 'react';
import { Donation } from '../types';
import '../assets/styles/_donation-table.scss';

type Props = { donations: Donation[] };
type SortKey = 'amount' | 'date' | 'title';

export default function DonationTable({ donations }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [asc, setAsc] = useState(false);

  const sorted = [...donations].sort((a, b) => {
    let v1: number | string, v2: number | string;
    if (sortKey === 'amount') {
      v1 = a.amount; v2 = b.amount;
    } else if (sortKey === 'title') {
      v1 = a.campaign.title.toLowerCase();
      v2 = b.campaign.title.toLowerCase();
    } else {
      v1 = new Date(a.createdAt).getTime();
      v2 = new Date(b.createdAt).getTime();
    }
    return asc ? (v1 < v2 ? -1 : v1 > v2 ? 1 : 0) : (v1 < v2 ? 1 : v1 > v2 ? -1 : 0);
  });

  const onHeaderClick = (key: SortKey) => {
    if (key === sortKey) setAsc(x => !x);
    else { setSortKey(key); setAsc(false); }
  };

  return (
    <table className="donation-table">
      <thead>
        <tr>
          <th
            className={sortKey === 'title' ? 'sorted' : ''}
            onClick={() => onHeaderClick('title')}
          >
            Кампанія {sortKey==='title' && (asc ? '↑':'↓')}
          </th>
          <th
            className={`amount ${sortKey === 'amount' ? 'sorted' : ''}`}
            onClick={() => onHeaderClick('amount')}
          >
            Сума {sortKey==='amount' && (asc ? '↑':'↓')}
          </th>
          <th
            className={sortKey === 'date' ? 'sorted' : ''}
            onClick={() => onHeaderClick('date')}
          >
            Дата {sortKey==='date' && (asc ? '↑':'↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(d => (
          <tr key={d.id}>
            <td>{d.campaign.title}</td>
            <td className="amount">{d.amount.toLocaleString()} ₴</td>
            <td>{new Date(d.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

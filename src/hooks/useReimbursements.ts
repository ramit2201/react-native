import { useState, useEffect } from 'react';
import { reimbursements } from '../data/reimbursements';

export const useReimbursements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(reimbursements);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(reimbursements);
    } else {
      const filtered = reimbursements.filter(item =>
        item.merchant.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, filteredData };
};

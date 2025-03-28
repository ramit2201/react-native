import React, { createContext, useContext, useState, useEffect } from 'react';
import { reimbursements as initialReimbursements } from '../data/reimbursements';

const ReimbursementsContext = createContext(null);

export const ReimbursementsProvider = ({ children }) => {
  const [reimbursements, setReimbursements] = useState(initialReimbursements);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(initialReimbursements);

  useEffect(() => {
    

    if (searchQuery.trim() === '') {
      setFilteredData(reimbursements);
    } else {
      const filtered = reimbursements.filter((item) =>
        item.merchant.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, reimbursements]);

  const addReimbursement = (newReimbursement) => {
    setReimbursements((prev) => [newReimbursement, ...prev]);
  };

  return (
    <ReimbursementsContext.Provider
      value={{ reimbursements, searchQuery, setSearchQuery, filteredData, addReimbursement }}
    >
      {children}
    </ReimbursementsContext.Provider>
  );
};

export const useReimbursements = () => {
  return useContext(ReimbursementsContext);
};

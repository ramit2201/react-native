import { View, FlatList, Text } from 'react-native';
import { ReimbursementCard } from '../components/ReimbursementCard';
import { reimbursements } from '../data/reimbursements';
import { CustomSearchBar } from '../components/CustomSearchBar';
import { useState, useEffect } from 'react';

export const ReimbursementsListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(reimbursements);

  useEffect(() => {
    let isMounted = true;

    if (searchQuery.trim() === '') {
      if (isMounted) setFilteredData(reimbursements);
    } else {
      const filtered = reimbursements.filter(item =>
        item.merchant.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (isMounted) setFilteredData(filtered);
    }

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-white px-2 pt-2">
      <View className="rounded-xl overflow-hidden border border-gray-300 mb-2">
      <CustomSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </View>

      {filteredData.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No reimbursements found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ReimbursementCard
              merchant={item.merchant}
              amount={item.amount}
              status={item.status}
              currency={item.currency}
              baseAmount={item.baseAmount}
            />
          )}
        />
      )}
    </View>
  );
};

import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import ReimbursementCard from '../components/ReimbursementCard';

const dummyData = [
  { id: '1', merchant: 'Uber', amount: 150, status: 'Pending' },
  { id: '2', merchant: 'Starbucks', amount: 50, status: 'Approved' },
];

const ListingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-black px-4 py-6">
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReimbursementCard item={item} />}
        ListEmptyComponent={() => (
          <View className="items-center justify-center mt-20">
            <Text className="text-white text-lg">No reimbursements yet</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ListingScreen;

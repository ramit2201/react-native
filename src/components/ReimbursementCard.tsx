import React from 'react';
import { View, Text } from 'react-native';
import generateColor from '../utils/generateColor';

const ReimbursementCard = ({ item }: any) => {
  const initials = item.merchant.slice(0, 2);
  const bgColor = generateColor();

  return (
    <View className="flex-row items-center bg-neutral-800 p-4 mb-3 rounded-xl">
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: `rgb(${bgColor})` }}
      >
        <Text className="text-white font-bold">{initials}</Text>
      </View>
      <View>
        <Text className="text-white text-base font-semibold">{item.merchant}</Text>
        <Text className="text-gray-400">${item.amount} - {item.status}</Text>
      </View>
    </View>
  );
};

export default ReimbursementCard;

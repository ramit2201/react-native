import {View, Text} from 'react-native';
import {getInitials} from '../utils/getInitials';
import {getMerchantColor} from '../utils/getRandomColor';

type Props = {
  merchant: string;
  amount: number;
  status: string;
  currency: string;
  baseAmount: number;
};

export const ReimbursementCard = ({
  merchant,
  amount,
  status,
  currency,
  baseAmount,
}: Props) => {
  const initials = getInitials(merchant);
  const bgColor = getMerchantColor(merchant);

  return (
    <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
      {/* Left Section: Avatar + Merchant Info */}
      <View className="flex-row items-center space-x-4 flex-1 gap-4">
        <View
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{backgroundColor: `rgb(${bgColor})`}}>
          <Text className="text-white font-bold text-lg">{initials}</Text>
        </View>
        <View>
          <Text className="text-base font-semibold">{merchant}</Text>
          <Text
            className={`text-sm ${
              status === 'Approved'
                ? 'text-green-600'
                : status === 'Pending'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}>
            {status}
          </Text>
        </View>
      </View>

      {/* Right Section: Amounts */}
      <View className="items-end">
        <View className="flex-row gap-1">
          <Text className="text-base font-semibold">{baseAmount}</Text>
          <Text className="text-base">{currency}</Text>
        </View>
        <View className="flex-row gap-1">
          <Text className="text-sm text-gray-500 ">{amount}</Text>
          <Text className="text-sm text-gray-500">{currency}</Text>
        </View>
      </View>
    </View>
  );
};

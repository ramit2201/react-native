import { View, FlatList, Text, Image } from 'react-native';
import { ReimbursementCard } from '../components/ReimbursementCard';
import { CustomSearchBar } from '../components/CustomSearchBar';
import { FloatingAddButton } from '../components/FloatingAddButton';
import { useReimbursements } from '../hooks/useReimbursements'; // ⬅️ Custom hook
import notFound from '../assets/images/notFound.png';
import { useNavigation } from '@react-navigation/native';

export const ReimbursementsListScreen = () => {
  const { searchQuery, setSearchQuery, filteredData } = useReimbursements(); // ⬅️ Clean logic
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white px-2 pt-2">
      <View className="rounded-xl overflow-hidden border border-gray-300 mb-2">
        <CustomSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>

      {filteredData.length === 0 ? (
        <View className="items-center mt-40">
          <Image
            source={notFound}
            style={{ width: 130, height: 130 }}
            resizeMode="contain"
          />
          <Text className="text-gray-500 text-lg mt-4">No claims yet!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReimbursementCard {...item} />}
        />
      )}

      <FloatingAddButton onPress={() => navigation.navigate('CreateClaim')} />
    </View>
  );
};

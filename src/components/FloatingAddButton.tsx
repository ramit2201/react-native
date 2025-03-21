import {  TouchableOpacity , Image } from 'react-native';
import plusIcon from '../assets/images/plus.png'; 

export const FloatingAddButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-6 right-6 bg-blue-600 rounded-xl p-4 "
      style={{ elevation: 5 }} // Android shadow
    >
      <Image
        source={plusIcon}
        style={{ width: 20, height: 20 }}
      />
    </TouchableOpacity>
  );
};

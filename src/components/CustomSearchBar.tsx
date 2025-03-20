import { View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import searchIcon from '../assets/images/search.png'; // Use PNG
type Props = {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
};


export const CustomSearchBar = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <View className="flex-row items-center  p-2 mx-4 my-2 rounded-xl">
      {/* <Icon name="search" size={20} color="gray" /> */}
      <Image
  source={searchIcon}
  style={{ width: 20, height: 20 }}
/>
      <TextInput
        className="ml-2 flex-1 text-base text-black"
        placeholder="Search"
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

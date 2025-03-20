import React from 'react';
import {ReimbursementsListScreen} from './screens/ReimbursementsListScreen';
import {SafeAreaView, Text, TextInput} from 'react-native';
import { SearchBar } from 'react-native-screens';

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <Text className=' text-3xl font-semibold m-4'>
        Reimbursement
      </Text>
      <ReimbursementsListScreen />
    </SafeAreaView>
  );
};

export default Index;

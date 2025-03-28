import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import uploadIcon from '../assets/images/upload-solid.png';
import trashIcon from '../assets/images/trash.png';
import CurrencyDropdown from '../components/CurrencyDropdown';
import MerchantDropdown from '../components/MerchantDropdown';
import Pdf from 'react-native-pdf';
import { useCreateClaim } from '../hooks/useCreateClaim';

const CreateClaimFormScreen = () => {
  const {
    selectedFiles,
    currency,
    merchant,
    amount,
    setCurrency,
    setMerchant,
    setAmount,
    pickFile,
    removeFile,
    handleSubmit,
    handleDraft,
    handleCancel,
  } = useCreateClaim();

  const isFormFilled = selectedFiles.length > 0 || currency || merchant || amount;

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="font-bold text-lg">Receipt(s)</Text>

      <View className="flex flex-col items-center mt-4 bg-gray-100 p-6 gap-4 rounded-lg">
        {selectedFiles.length < 2 && (
          <TouchableOpacity onPress={pickFile} className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mt-2">
            <Image source={uploadIcon} style={{ width: 24, height: 24, tintColor: 'white' }} resizeMode="contain" />
          </TouchableOpacity>
        )}

        {selectedFiles?.map((file, index) => (
          <View key={index} className="mt-2 flex flex-row items-center gap-4">
            {file?.type?.includes('image') && (
              <Image source={{ uri: file.uri }} style={{ width: 50, height: 50, marginTop: 10 }} resizeMode="contain" />
            )}
            {file?.type === 'application/pdf' && (
              <View style={{ width: 50, height: 75, borderWidth: 1, borderColor: '#ccc' }}>
                <Pdf source={{ uri: file.uri, cache: true }} style={{ flex: 1 }} />
              </View>
            )}
            <TouchableOpacity onPress={() => removeFile(index)} className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              <Image source={trashIcon} style={{ width: 20, height: 20, tintColor: 'white' }} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        ))}

        <Text className="text-gray-400 text-sm">Only PDFs & images, up to 5MB. Max 2 files.</Text>
      </View>

      <View className="mt-4">
        <Text className="font-bold text-lg mb-2">Currency</Text>
        <CurrencyDropdown selectedCurrency={currency} onCurrencyChange={setCurrency} />
      </View>

      <View className="mt-4">
        <Text className="font-bold text-lg mb-2">Merchant</Text>
        <MerchantDropdown selectedMerchant={merchant} onMerchantChange={setMerchant} />
      </View>

      <View className="mt-4">
        <Text className="font-bold text-lg mb-2">Amount</Text>
        <TextInput keyboardType="numeric" value={amount} onChangeText={setAmount} placeholder="Enter amount" className="border border-gray-300 bg-gray-100 rounded-lg p-4 text-black placeholder-black" />
      </View>

      <View className="flex-row justify-around mt-4">
        <TouchableOpacity onPress={isFormFilled ? handleDraft : handleCancel} className="border p-4 w-[40%] items-center rounded-lg">
          <Text className="font-bold text-lg">{isFormFilled ? 'Save as Draft' : 'Cancel'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} className="border p-4 w-[40%] items-center rounded-lg bg-blue-500">
          <Text className="font-bold text-lg text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateClaimFormScreen;

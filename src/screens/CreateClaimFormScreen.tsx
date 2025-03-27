import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf'; // PDF Viewer
import uploadIcon from '../assets/images/upload-solid.png';
import trashIcon from '../assets/images/trash.png';
import CurrencyDropdown from '../components/CurrencyDropdown';
import MerchantDropdown from '../components/MerchantDropdown';

const MAX_FILES = 2; // Maximum allowed files

const CreateClaimFormScreen = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currency, setCurrency] = useState('');
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');

  const isFormFilled = selectedFiles.length > 0 || currency || merchant || amount;

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images], // Allow PDFs & Images
      });

      const file = res[0]; // Get the first file

      // File Validation (5MB limit)
      if (file?.size > 5 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select a file under 5MB.');
        return;
      }

      if (selectedFiles.length >= MAX_FILES) {
        Alert.alert(
          'Limit Reached',
          `You can only upload up to ${MAX_FILES} files.`,
        );
        return;
      }

      setSelectedFiles([...selectedFiles, file]);
      console.log('Picked File:', file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the document picker');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  const removeFile = index => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="font-bold text-lg">Receipt(s)</Text>

      {/* File Upload Section */}
      <View className="flex flex-col justify-between items-center mt-4 bg-gray-100 p-6 gap-4 rounded-lg">
        {/* Upload Button */}
        {selectedFiles.length < MAX_FILES && (
          <TouchableOpacity
            onPress={pickFile}
            className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mt-2">
            <Image
              source={uploadIcon}
              style={{ width: 24, height: 24, tintColor: 'white' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {/* Display Selected Files */}
        {selectedFiles.map((file, index) => (
          <View key={index} className="mt-2 flex flex-row items-center gap-4">
            {/* Show Image Preview */}
            {file?.type?.includes('image') && (
              <Image
                source={{ uri: file.uri }}
                style={{ width: 50, height: 50, marginTop: 10 }}
                resizeMode="contain"
              />
            )}

            {/* Show PDF Preview */}
            {file?.type === 'application/pdf' && (
              <View
                style={{
                  width: 50,
                  height: 75,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}>
                <Pdf
                  source={{ uri: file.uri, cache: true }}
                  style={{ flex: 1 }}
                  onLoadComplete={numberOfPages => {
                    console.log(`PDF Loaded, total pages: ${numberOfPages}`);
                  }}
                  onError={error => {
                    console.error('PDF Load Error:', error);
                  }}
                />
              </View>
            )}

            {/* Remove File Button */}
            <TouchableOpacity
              onPress={() => removeFile(index)}
              className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              <Image
                source={trashIcon}
                style={{ width: 20, height: 20, tintColor: 'white' }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* File Upload Instructions */}
        <Text className="text-gray-400 text-sm">
          Only PDFs & images (JPEG, PNG), up to 5MB. Max {MAX_FILES} files.
        </Text>
      </View>

      {/* Currency Dropdown */}
      <View className="mt-4">
        <Text className="font-bold text-lg mb-2">Currency</Text>
        <CurrencyDropdown
          selectedCurrency={currency}
          onCurrencyChange={setCurrency}
        />
      </View>

      {/* Merchant Dropdown */}
      <View className="mt-4">
        <Text className="font-bold text-lg mb-2">Merchant</Text>
        <MerchantDropdown
          selectedMerchant={merchant}
          onMerchantChange={setMerchant}
        />
      </View>

      {/* Amount Input */}
      <View className="mt-4">
        <Text className="font-bold text-lg mb-2">Amount</Text>
        <TextInput
          keyboardType="numeric"
          value={amount}
          onChangeText={text => {
            // Allow only numbers (including decimals)
            const numericValue = text.replace(/[^0-9.]/g, '');
            setAmount(numericValue);
          }}
          placeholder="Enter amount"
          className="border border-gray-300 bg-gray-100 rounded-lg p-4 text-black placeholder-black"
        />
      </View>

      {/* Submit & Cancel/Save as Draft Buttons */}
      <View className="flex justify-around flex-row w-full gap-4 mt-4">
        {/* Conditional Button: Cancel OR Save as Draft */}
        {isFormFilled ? (
          <TouchableOpacity className="border p-4 w-[40%] items-center rounded-lg">
            <Text className="font-bold text-lg text-blue-500">Save as Draft</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="border p-4 w-[40%] items-center rounded-lg">
            <Text className="font-bold text-lg text-red-500">Cancel</Text>
          </TouchableOpacity>
        )}

        {/* Submit Button - Disabled when form is empty */}
        <TouchableOpacity
          className={`border p-4 w-[40%] items-center rounded-lg bg-blue-500 ${
            !isFormFilled ? 'opacity-50 ' : ' '
          }`}
          disabled={!isFormFilled}
        >
          <Text
            className={`font-bold text-lg ${
              !isFormFilled ? 'text-gray-400 ' : 'text-white '
            }`}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateClaimFormScreen;

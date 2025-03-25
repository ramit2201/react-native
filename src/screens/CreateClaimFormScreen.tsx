import React, { useState } from 'react';
import { ScrollView, Text, View, Button, Image, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import uploadIcon from '../assets/images/upload-solid.png';

const CreateClaimFormScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images], // Allow PDFs & Images
      });

      const file = res[0]; // Get the first file

      // File Validation (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select a file under 5MB.');
        return;
      }

      setSelectedFile(file);
      console.log('Picked File:', file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the document picker');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="font-bold text-lg">Receipt(s)</Text>
      
      <View className="flex flex-col justify-between items-center mt-4 bg-gray-100 p-6 gap-4 rounded-lg">
        {/* Upload Icon */}
        <Image source={uploadIcon} style={{ width: 24, height: 24 }} resizeMode="contain" />

        {/* Upload Button */}
        <Button title="Upload Receipt (PDF or Image)" onPress={pickFile} />

        {/* Show Selected File */}
        {selectedFile && (
          <View className="mt-2">
            <Text className="text-sm text-gray-500">Selected: {selectedFile.name}</Text>

            {/* Show Image Preview (if it's an image) */}
            {selectedFile?.type?.includes('image') && (
              <Image
                source={{ uri: selectedFile.uri }}
                style={{ width: 100, height: 100, marginTop: 10 }}
                resizeMode="contain"
              />
            )}
          </View>
        )}

        {/* File Type Instructions */}
        <Text className="text-gray-400 text-sm">
          Only PDFs & images (JPEG, PNG), up to 5MB
        </Text>
      </View>
    </ScrollView>
  );
};

export default CreateClaimFormScreen;

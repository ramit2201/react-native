import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from "react-native-document-picker";
import Pdf from "react-native-pdf";
import uploadIcon from "../assets/images/upload-solid.png";
import trashIcon from "../assets/images/trash.png";
import CurrencyDropdown from "./CurrencyDropdown";
import MerchantDropdown from "./MerchantDropdown";
import { useReimbursements } from "../context/ReimbursementsContext";
import { Status } from "../constants/Reimbursement";

const MAX_FILES = 2;

const CreateClaimForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currency, setCurrency] = useState("");
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();
  const { addReimbursement } = useReimbursements();

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      const file = res[0];

      if (file?.size > 5 * 1024 * 1024) {
        Alert.alert("File too large", "Please select a file under 5MB.");
        return;
      }

      if (selectedFiles.length >= MAX_FILES) {
        Alert.alert("Limit Reached", `You can only upload up to ${MAX_FILES} files.`);
        return;
      }

      setSelectedFiles([...selectedFiles, file]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled file picker");
      } else {
        console.error("File picking error:", err);
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles?.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!merchant || !amount || !currency) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newReimbursement = {
      id: Date.now(),
      merchant,
      amount: parseFloat(amount).toFixed(2),
      baseAmount: (parseFloat(amount) * 1.2).toFixed(2),
      status: Status.PENDING,
      currency,
    };

    addReimbursement(newReimbursement);
    Alert.alert("Success", "Reimbursement submitted successfully!", [
      { text: "OK", onPress: () => navigation.navigate("Reimbursements") },
    ]);
    resetForm();
  };

  const handleDraft = () => {
    if (!merchant || !amount || !currency) {
      Alert.alert("Error", "All fields are required to save as draft!");
      return;
    }

    const newReimbursement = {
      id: Date.now(),
      merchant,
      amount: parseFloat(amount).toFixed(2),
      baseAmount: (parseFloat(amount) * 1.2).toFixed(2),
      status: Status.DRAFT,
      currency,
    };

    addReimbursement(newReimbursement);
    Alert.alert("Saved", "Draft saved successfully!", [
      { text: "OK", onPress: () => navigation.navigate("Reimbursements") },
    ]);
    resetForm();
  };

  const handleCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: resetForm },
    ]);
  };

  const resetForm = () => {
    setMerchant("");
    setAmount("");
    setCurrency("");
    setSelectedFiles([]);
  };

  const isFormFilled = selectedFiles.length > 0 || currency || merchant || amount;

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="font-bold text-lg">Receipt(s)</Text>

      <View className="flex flex-col items-center mt-4 bg-gray-100 p-6 gap-4 rounded-lg">
        <TouchableOpacity
          onPress={pickFile}
          className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mt-2"
        >
          <Image
            source={uploadIcon}
            style={{ width: 24, height: 24, tintColor: "white" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex flex-row gap-4">
          {selectedFiles?.map((file, index) => (
            <View key={index} className="flex flex-col items-center">
              {file?.type?.includes("image") && (
                <Image
                  source={{ uri: file.uri }}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
              )}
              {file?.type === "application/pdf" && (
                <View style={{ width: 50, height: 75, borderWidth: 1, borderColor: "#ccc" }}>
                  <Pdf source={{ uri: file.uri, cache: true }} style={{ flex: 1 }} />
                </View>
              )}
              <TouchableOpacity
                onPress={() => removeFile(index)}
                className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <Image
                  source={trashIcon}
                  style={{ width: 20, height: 20, tintColor: "white" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

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
        <TextInput
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          className="border border-gray-300 bg-gray-100 rounded-lg p-4 text-black placeholder-black"
        />
      </View>

      <View className="flex-row justify-around mt-4">
        <TouchableOpacity
          onPress={isFormFilled ? handleDraft : handleCancel}
          className="border p-4 w-[40%] items-center rounded-lg"
          style={{
            borderColor: isFormFilled ? "#007AFF" : "#FF3B30",
            backgroundColor: isFormFilled ? "#E5F0FF" : "#FFE5E5",
          }}
        >
          <Text className="font-bold text-lg" style={{ color: isFormFilled ? "#007AFF" : "#FF3B30" }}>
            {isFormFilled ? "Save as Draft" : "Cancel"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} className="border p-4 w-[40%] items-center rounded-lg bg-blue-500">
          <Text className="font-bold text-lg text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateClaimForm;

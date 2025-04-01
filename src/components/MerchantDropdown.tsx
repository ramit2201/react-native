import React from "react";
import { View } from "react-native";
import CoreDropdown from "./core/CoreDropdown";
import { MERCHANT_OPTIONS } from "../constants/Reimbursement";

interface MerchantDropdownProps {
  selectedMerchant: string;
  onMerchantChange: (value: string) => void;
}

const MerchantDropdown: React.FC<MerchantDropdownProps> = ({ selectedMerchant, onMerchantChange }) => {
  return (
    <View>
      <CoreDropdown
        data={MERCHANT_OPTIONS}
        selectedValue={selectedMerchant}
        onChange={onMerchantChange}
        placeholder="Select a merchant..."
      />
    </View>
  );
};

export default MerchantDropdown;

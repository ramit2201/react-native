import React from "react";
import { View } from "react-native";
import CoreDropdown from "./core/CoreDropdown";

const merchantOptions = [
  { key: "amazon", value: "Amazon" },
  { key: "walmart", value: "Walmart" },
  { key: "uber", value: "Uber" },
  { key: "starbucks", value: "Starbucks" },
  { key: "mcdonalds", value: "McDonald’s" },
  { key: "apple", value: "Apple Store" },
  { key: "google", value: "Google Play" },
  { key: "airbnb", value: "Airbnb" },
  { key: "expedia", value: "Expedia" },
  { key: "costco", value: "Costco" },
  { key: "ikea", value: "IKEA" },
  { key: "netflix", value: "Netflix" },
  { key: "spotify", value: "Spotify" },
  { key: "shell", value: "Shell Gas Station" },
  { key: "delta", value: "Delta Airlines" },
  { key: "marriott", value: "Marriott Hotels" },
];

interface MerchantDropdownProps {
  selectedMerchant: string;
  onMerchantChange: (value: string) => void;
}

const MerchantDropdown: React.FC<MerchantDropdownProps> = ({ selectedMerchant, onMerchantChange }) => {
  return (
    <View>
      <CoreDropdown
        data={merchantOptions}
        selectedValue={selectedMerchant}
        onChange={onMerchantChange}
        placeholder="Select a merchant..."
      />
    </View>
  );
};

export default MerchantDropdown;

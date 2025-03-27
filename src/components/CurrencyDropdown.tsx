import React from "react";
import { View } from "react-native";
import CoreDropdown from "./core/CoreDropdown";

const currencyOptions = [
  { key: "INR", value: "INR" },
  { key: "USD", value: "USD" },
  { key: "SGD", value: "SGD" },
  { key: "IDR", value: "IDR" },
  { key: "AUD", value: "AUD" },
];

interface CurrencyDropdownProps {
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ selectedCurrency, onCurrencyChange }) => {
  return (
    <View>
      <CoreDropdown
        data={currencyOptions}
        selectedValue={selectedCurrency}
        onChange={onCurrencyChange}
        placeholder="Select a currency..."
      />
    </View>
  );
};

export default CurrencyDropdown;

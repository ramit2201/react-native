import React from "react";
import { View } from "react-native";
import CoreDropdown from "./core/CoreDropdown";
import { CURRENCY_OPTIONS } from "../constants/Reimbursement";


interface CurrencyDropdownProps {
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ selectedCurrency, onCurrencyChange }) => {
  return (
    <View>
      <CoreDropdown
        data={CURRENCY_OPTIONS}
        selectedValue={selectedCurrency}
        onChange={onCurrencyChange}
        placeholder="Select a currency..."
      />
    </View>
  );
};

export default CurrencyDropdown;

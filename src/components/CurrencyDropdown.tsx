import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

interface CurrencyDropdownProps {
  selectedCurrency: string;
  onCurrencyChange: (value: string) => void;
}

const currency = [
  { key: 'INR', value: 'INR' },
  { key: 'USD', value: 'USD' },
  { key: 'SGD', value: 'SGD' },
  { key: 'IDR', value: 'IDR' },
  { key: 'AUD', value: 'AUD' },
];

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  console.log('Rendered CurrencyDropdown with selectedCurrency:', selectedCurrency);

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={(value: string) => {
          console.log('Currency changed to:', value);
          onCurrencyChange(value);
        }}
        data={currency}
        save="value"
        placeholder="Select a currency..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default CurrencyDropdown;

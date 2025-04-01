import React from "react";
import { View, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

interface CoreDropdownProps {
  data: { key: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CoreDropdown: React.FC<CoreDropdownProps> = ({
  data,
  selectedValue,
  onChange,
  placeholder = "Select an option...",
}) => {
  return (
    <View style={styles.container}>
      <SelectList
        setSelected={onChange}
        data={data}
        save="value"
        defaultOption={{ key: selectedValue, value: selectedValue }}
        placeholder={placeholder}
        boxStyles={styles.dropdown}
        dropdownStyles={styles.dropdownList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  dropdownList: {
    backgroundColor: "#fff",
  },
});

export default CoreDropdown;

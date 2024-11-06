import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface NameInputProps {
  value: string;
  onChange: (text: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ value, onChange }) => {
  return (
    <PaperTextInput
      label="Digite seu nome"
      value={value}
      onChangeText={onChange}
      style={styles.input}
      keyboardType="default"
      autoComplete="name"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});

export default NameInput;
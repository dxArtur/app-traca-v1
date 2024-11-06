import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface EmailInputProps {
  value: string;
  onChange: (text: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  return (
    <PaperTextInput
      label="Digite seu email"
      value={value}
      onChangeText={onChange}
      style={styles.input}
      keyboardType="email-address"
      autoComplete="email"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});

export default EmailInput;
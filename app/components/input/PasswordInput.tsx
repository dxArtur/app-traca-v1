import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  return (
    <PaperTextInput
      label="Digite sua senha"
      value={value}
      onChangeText={onChange}
      style={styles.input}
      secureTextEntry
      autoComplete="password"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});

export default PasswordInput;
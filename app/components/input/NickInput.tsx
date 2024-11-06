import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface NickInputProps {
  value: string;
  onChange: (text: string) => void;
}

const NickInput: React.FC<NickInputProps> = ({ value, onChange }) => {
  return (
    <PaperTextInput
      label="Digite seu nome de usuário"
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

export default NickInput;
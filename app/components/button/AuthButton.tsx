import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface AuthButtonProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  onPress: () => void;
}
const AuthButton: React.FC<AuthButtonProps> = ({ title, backgroundColor = '#000', textColor = '#fff', onPress }) => {
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AuthButton;
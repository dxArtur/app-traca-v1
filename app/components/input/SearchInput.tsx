import { TextInput, StyleSheet } from 'react-native';
interface SearchInputProps {
    value: string;
    onChange: (text: string) => void;
  }


  const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {

return(
    <TextInput
        //activeUnderlineColor='#004080'
        //underlineColor= 'transparent' //'#004080'
        //mode='flat'
        style={styles.input}
        placeholderTextColor={'#6b7280'}
        placeholder="Pesquise aqui"
        clearButtonMode="always"
        value={value}
        onChangeText={onChange}
      />
)}

const styles = StyleSheet.create({
    input: {
        height: 44,
        margin:6,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 0.5,
        fontSize: 15,
        fontWeight: "500",
        color: '#222'
    },
  });
  
  export default SearchInput;
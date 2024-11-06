
import { searchUsers } from "@/app/api/apiUsers";
import SearchInput from "@/app/components/input/SearchInput";
import { UsersDto } from "@/app/dtos/UserDto";
import { useEffect, useRef, useState } from "react"
import { View, Text, TextInput, ActivityIndicator, FlatList, Pressable, SafeAreaView } from "react-native"
import { StyleSheet } from "react-native"


const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<UsersDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setData([]); // Limpa os dados se a consulta estiver vazia
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await searchUsers(searchQuery);
      setData(data);
    } catch (error) {
      //console.error("Erro ao buscar usuários:", error);
      if (error.response && error.response.status === 404) {
        setErrorMessage("Usuário não encontrado");
      } else {
        setErrorMessage("Erro ao buscar usuários");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Limpa o timeout anterior
    }

    debounceTimeout.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300); // 300 ms de debounce

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current); // Limpa o timeout ao desmontar
      }
    };
  }, [searchQuery]);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gostaria de pesquisar?</Text>
      <SearchInput
        
        value={searchQuery}
        onChange={(query) => handleSearch(query)}
      />
      <View style={styles.loading}>

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={'#cc66ff'} />
          </View>
        ) : data.length === 0 ? (
          searchQuery ? (
            <View>
              <Text style={styles.notFound}>
                Nenhum usuário encontrado
              </Text>
            </View>
          ) : null
        ) : (

          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={(item: UsersDto) => item.nick}
            renderItem={({ item }) => (
              <Pressable
                style={styles.element}
                onPress={() => {}}
              >
                <Text style={styles.username}>
                  {item.nick}
                </Text>
                <Text style={styles.name}>
                  {item.name}
                </Text>
              </Pressable>
            )}
          />
        )} 
      </View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 15,
  },

  title: {
    fontSize: 24,
    marginVertical: 25,
    padding:10,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#003366'
  }, 
  loading: {
    flex: 1,
    justifyContent: 'center',
  },

  name: {
    fontSize: 15,
    marginLeft: 10,
    color: '#6b7280'
  },

  username: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: '600'
  },

  list: {
    marginTop: 10,
    marginLeft: 10
  },

  element: {
    marginTop: 10,
  },

  notFound: {
    textAlign: "center",
    fontWeight: '800',
    fontSize: 17,
    marginTop: 20,
    color: '#222'
  }


})

export default SearchScreen
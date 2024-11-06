import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from '@/app/screens/signin/index'
import SignupScreen from '@/app/screens/signup/index'
import HomeScreen from '@/app/screens/home/index'
import SearchScreen from '@/app/screens/search/index'
import ProfileScreen from '@/app/screens/profile/index'
import NewPostScreen from '@/app/screens/newPost/index'
import { useAuth } from '@/app/hooks/useAuth';
import LibraryScreen from '../screens/library/index';
import EpubReader from '@/app/components/reader/EpubReader';
import { Ionicons } from '@expo/vector-icons';
import CommentsPage from '../screens/comments/index';
import RepliesScreen from '../screens/replies';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AuthRoutes: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signin" component={SigninScreen} />
            {/* Adicione outras telas públicas, como Cadastro */}
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
};




const MainRoutes: React.FC = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor:'#003366',
            tabBarInactiveTintColor:'gray',
            tabBarShowLabel:false,
            tabBarStyle: {
              margin:10,
              borderTopWidth: 1,
              borderRadius:6,
              height:55,
              backgroundColor:'#f8f8f8',
              
            }
        }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="home-outline" size={24} color={color} />
            )
            }}/>
            <Tab.Screen name="search" component={SearchScreen} 
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="search-outline" size={24} color={color} />
            )
            }}/>
            <Tab.Screen name="ler" component={LibraryScreen} 
             options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="book-outline" size={24} color={color} />
            )
            }}/>
          {/*  <Stack.Screen name="EpubReader" component={EpubReader} 
             */}
            <Tab.Screen name="New" component={NewPostScreen} 
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="add" size={24} color={color} />
            )
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="person-outline" size={24} color={color} />
            )
            }}/>
            {/* Adicione outras telas privadas aqui */}
        </Tab.Navigator>
    );
};
  export default function AppNavigator() {
    const { user } = useAuth(); 
    const isUserAuthenticated = !!user; // Verifica se o usuário está autenticado


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isUserAuthenticated ? (
            <>
                <Stack.Screen name="Main" component={MainRoutes} />
                <Stack.Screen name="EpubReader" component={EpubReader} />
                <Stack.Screen name="Comments" component={CommentsPage} />
                <Stack.Screen name="Replies" component={RepliesScreen} />
            </>
        ) : (
          <Stack.Screen name="Auth" component={AuthRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  }

/* 
  export default function AppNavigator() {
    const { user, tokenState, companyId } = useAuth();
  
    if (!tokenState) {
      // Se o usuário não estiver autenticado, exibe a AuthStack
      return (
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      );
    }
  
  
    // Se o usuário está autenticado e tem `companyId` ou `departmentId`, exibe o AppStack
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  } */
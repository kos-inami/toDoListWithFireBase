// Fonts ----------
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Packages ----------
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Navigation ----------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screen ----------
import { Homepage } from "./src/screens";

// Create stack navigator ----------
const Stack = createNativeStackNavigator()


export default function App() {

  // Font loading ----------
  let [fontsLoaded] = useFonts({
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* to pass additional props we have to change our Stack.screen component */}
        <Stack.Screen name="Welcome" options={{
          headerTitle: "Welcome!",
        }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

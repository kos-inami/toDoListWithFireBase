// Fonts ----------
import AppLoading from 'expo-app-loading';
import { React } from "react";
import { useFonts } from 'expo-font';

// Packages ----------
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

// Navigation ----------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screen ----------
import { WelcomeScreen, SignupScreen, SigninScreen, HomeScreen } from "./src/screens"
// import { WelcomeScreen } from "./src/screens/WelcomeScreen"
// import { SignupScreen } from "./src/screens/SignupScreen"
// import { SigninScreen } from "./src/screens/SigninScreen"
// import { HomeScreen } from "./src/screens/HomeScreen"
import { SignoutButton } from './componests/SignoutButton'

// Create stack navigator ----------
const Stack = createNativeStackNavigator()

// Firebase config ----------
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const FBapp = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
const db = getFirestore( FBapp )  // initialize Firestore



export default function App() {

  // // Font loading ----------
  // let [fontsLoaded] = useFonts({
  //   'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
  //   'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
  // });
  // if (!fontsLoaded) {
  //   return null;
  // }

  const [ user, setUser ] = useState()

  const authObj = getAuth()
  onAuthStateChanged( authObj, (user) => {
    if(user) {
      setUser( user )
    }
    else {
      setUser( null )
    }
  })

  const register = (email, password) => {
    createUserWithEmailAndPassword(authObj, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const signin = ( email, password) => {
    signInWithEmailAndPassword(authObj, email, password )
      .then((userCredential) => setUser(userCredential.user) )
      .catch((error) => console.log(error) )
  }

  const signout = () => {
    signOut( authObj )
    .then( () => {
      // sign out successful
    } )
    .catch( () => {
      // sign out errors
    } )
  }

  // Add date into firebase ---------
  const addData = async (FScollection, data) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db, FScollection), data )
    console.log(ref.id);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* to pass additional props we have to change our Stack.screen component */}
        <Stack.Screen name="WelcomeScreen" options={{
          headerTitle: "Welcome!",
          headerTitleAlign: "center",
          }} component={WelcomeScreen}>
        </Stack.Screen>
        <Stack.Screen name="SignupScreen" options={{
          headerTitle: "Sign up",
          headerTitleAlign: "center",
          }}>
          { ( props) => <SignupScreen {...props} signup={register} auth={user} /> }
        </Stack.Screen>

        <Stack.Screen name="SigninScreen" options={{
          headerTitle: "Sign in",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <SigninScreen {...props} signin={signin} auth={user} /> }
        </Stack.Screen>

        <Stack.Screen name="HomeScreen" options={{
          headerTitle: "Home",
          headerTitleAlign: "center",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
          { ( props ) => <HomeScreen {...props} add={addData} auth={user} /> }
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

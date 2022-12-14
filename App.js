// Fonts ----------
import AppLoading from 'expo-app-loading';
import { React } from "react";
import { useFonts } from 'expo-font';

// Packages ----------
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';

// Navigation ----------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screen ----------
import { WelcomeScreen, SignupScreen, SigninScreen, HomeScreen, DetailScreen } from "./src/screens"
import { SignoutButton, BottomPopup } from './componests/SignoutButton'

// Create stack navigator ----------
const Stack = createNativeStackNavigator()

// Firebase config ----------
import { firebaseConfig } from './config/Config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, query, onSnapshot, orderBy, doc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth'

const FBapp = initializeApp( firebaseConfig ) // initialize Firebase app and store ref in a variable
const db = getFirestore( FBapp )  // initialize Firestore
// const provider = new GoogleAuthProvider() // initialize Google auth



export default function App() {

  // // Font loading ----------
  // let [loaded] = useFonts({
  //   RalewaySemiBold: require('./assets/fonts/Raleway-SemiBold.ttf'),
  //   RalewayRegular: require('./assets/fonts/Raleway-Regular.ttf'),
  // });
  // if (!loaded) {
  //   return <AppLoading />;
  // }

  const [ user, setUser ] = useState()

  // State to stare data
  const [appData, setAppData] = useState()

  const authObj = getAuth()
  onAuthStateChanged( authObj, (user) => {
    if(user) {
      setUser( user )
      // when auth get data ---------
      if(!appData) {
        getData(`list/${user.uid}/items`)
      }
    }
    else {
      setUser( null )
    }
  })

  // Google Auth ---------
  // signInWithRedirect(authObj, provider);
  // getRedirectResult(authObj)
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access Google APIs.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;

  //   // The signed-in user info.
  //   const user = result.user;
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });

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
      .catch((error) => {
        console.log(error)
        Alert.alert(
          "Email or password are wrong.",
          "Please try again!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ])
      })
  }

  const signout = () => {
    signOut( authObj )
    .then( () => {
      // sign out successful
    })
    .catch( () => {
      // sign out errors
    })
  }

  // Add date into firebase ---------
  const addData = async (FScollection, data) => {
    // add data to a collection with FS generated id
    const ref = await addDoc( collection(db, FScollection), data )
    console.log(ref.id);
  }

  // Get data to display ----------
  const getData = ( FScollection ) => {
    const FSquery = query( collection(db, FScollection), orderBy("date", "desc") )
    const unsubscribe = onSnapshot(FSquery, (querySnapshot) => {
      let FSdata = []
      querySnapshot.forEach((doc) => {
        let item = {}
        item = doc.data()
        item.id = doc.id
        FSdata.push( item )
      })
      setAppData( FSdata )
    })
  }
  
  // Delete date into firebase ---------
  const deleteData = async (del) => {
    console.log("deleted:" + del)
    await deleteDoc(doc(db, `list/${user.uid}/items`, del));
  }

  // Update name date in firebase ---------
  const updateData = async (upd, itemId) => {
    console.log("updated:" + upd + " itemId: " + itemId)
    const updateDocRef = doc(db, `list/${user.uid}/items`, itemId)
    await updateDoc(updateDocRef, {
      "name": upd
    })
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
          { ( props ) => <SignupScreen {...props} signup={register} auth={user} /> }
        </Stack.Screen>

        <Stack.Screen name="SigninScreen" options={{
          headerTitle: "Sign in",
          headerTitleAlign: "center",
          }}>
          { ( props ) => <SigninScreen {...props} signin={signin} auth={user} /> }
        </Stack.Screen>

        <Stack.Screen name="HomeScreen" options={{
          headerTitle: "To Do List",
          headerTitleAlign: "center",
          headerRight: ( props ) => <SignoutButton {...props} signout={signout} />
          }}>
          { ( props ) => <HomeScreen {...props} add={addData} auth={user} data={appData} /> }
        </Stack.Screen>
        <Stack.Screen name="Detail" options={{
          headerTitle: "Item Detail"
        }}>
          { (props ) => <DetailScreen {...props} del={deleteData} update={updateData}/> }
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

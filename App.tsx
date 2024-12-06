import React, { useEffect, } from 'react';

import homeI from './assets/images/home.png'

import type { PropsWithChildren } from 'react';
import {

  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import BootSplash from "react-native-bootsplash";
import Shows from './components/Shows';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Details from './src/screens/Details';


export type RootStackParamList = {
  Home: undefined;
  Details: { productId: string }
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';


  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#141414' : '#2E2E2E',

  };


  //splash
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });


  }, []);
  //splash


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={TabNavigator}
          options={{
            headerShown: false
            //title: "Home"
          }}
        />
        <Stack.Screen
          name='Search'
          component={Search}
          options={{
            headerShown: false
            //title: "Search"
          }}
        />
        <Stack.Screen
          name='Details'
          component={Details}
          options={{
            headerShown: false
            //title: "Details"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown:false
          //title: "Movie Corn",
          //tabBarLabelStyle: styles.tabBarLabel
          
        }} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          //title: 'Search',
          //tabBarLabelStyle: styles.tabBarLabel
        }} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8
  },
  cardEleveted: {
    backgroundColor: '#dd4727',
    elevation: 15,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: '#EF5354',
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  container: { padding: 10 },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 4,
    margin: 8,
    color: '#dd4727'
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  image: { width: 100, height: 150, marginBottom: 10 },
});

export default App;

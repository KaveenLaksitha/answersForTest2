import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './Components/List';
import SplashScreen from './Components/SplashScreen';

const Stack = createNativeStackNavigator();

const defaultTheme = {
  ...DefaultTheme,
  // dark: false,
  colors: {
    card: '#823aa8',
    primary: '#823aa8',
    text: 'white',
    background: 'white',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={defaultTheme}>
      <Stack.Navigator initialRouteName="SplashScreen" >
        <Stack.Screen
          name="Home"
          component={List}
          options={{ title: 'All Users' }}
        />

        <Stack.Screen name="SplashScreen" component={SplashScreen}
          options={{ title: '', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


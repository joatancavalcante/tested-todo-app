import { StatusBar, ActivityIndicator } from 'react-native';
import { Home } from './src/pages/Home';
import {  useFonts, 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_700Bold } from '@expo-google-fonts/inter';

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="transparent" 
      />
      <Home />
    </>
  );
}

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Rotas from './Rotas';

export default function App() {
  return (
   <NavigationContainer>
    <StatusBar backgroundColor="#0097B2" barStyle="light"/>
    <Rotas/>
   </NavigationContainer>
  );
}
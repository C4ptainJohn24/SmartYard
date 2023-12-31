import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from './Variaveis/Icons';
import Colors from './Variaveis/Colors';
import * as Animatable from 'react-native-animatable';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

// Importe seus componentes aqui
import Noticias from './Noticias';
import Hortas from './Vegetais';
import Perfil from './Perfil';


const TabArr = [
  { route: 'Noticias', label: 'Notícias', type: Icons.FontAwesome, icon: 'newspaper-o', component: Noticias },
  { route: 'Hortas', label: 'Hortas', type: Icons.Entypo, icon: 'leaf', component: Hortas },
  { route: 'Perfil', label: 'Mais', type: Icons.FontAwesome, icon: 'gear', component: Perfil},
];

const Tab = createBottomTabNavigator();



const animate1 = { 0: { scale: 0.5, translateY: 7 }, 0.92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } };
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } };
const circle1 = { 0: { scale: 0 }, 0.9: { scale: 0.9 }, 0.5: { scale: 0.2 }, 0.8: { scale: 0.7 }, 1: { scale: 1 } };
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.black} />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};


export default function AnimTab1() {

  let [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.label}
          component={item.component}
          options={{
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green2,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
    fontFamily:'Quicksand_400Regular'
  },
});

import { createStackNavigator } from '@react-navigation/stack';

import Home from './Menu';
import Alface from './Vegetais/FA'
import Hortelã from './Vegetais/FH'
import Tomate from './Vegetais/FT'
import Selec from './Selecao'
import AddKit from './AddKit';


export default function Hortas() {
    const Stack = new createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Alface"
                component={Alface}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Hortela"
                component={Hortelã}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Tomate"
                component={Tomate}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddKit"
                component={AddKit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Selecao"
                component={Selec}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
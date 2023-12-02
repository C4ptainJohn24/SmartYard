import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import React, { useEffect, useState, useContext, createContext } from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase';
import Alface from './Vegetais/FA'


export default function AddKit() {
    const navigation = useNavigation();
    console.log(url);
    const [url, setUrl] = useState('');
    return (
        <KeyboardAvoidingView style={styles.container}>
         
            <LinearGradient
                colors={['#0097B2', '#7ED957']}
                style={styles.background}
            />
            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Animatable.View
                    animation="fadeInLeft"
                    delay={500}
                    style={styles.containerHeader}>
                    <Image
                        resizeMode="stretch"
                        style={styles.imglogo2}
                        source={require('../assets/logoofc.png')}
                    />
                </Animatable.View>
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '70%', borderRadius: 20, flexDirection: 'column', marginBottom: '5%' }}>
                    <Text style={styles.title}> Adicionar Kit </Text>
                    <Text style={styles.text}>Insira abaixo a URL do seu Kit SmartYard disponibilizado após a compra. Caso tenha perdido a Url do seu Kit, entre em contato com nossa equipe através das redes sociais.</Text>
                    <View
                        style={styles.caixatexto}>
                        <TextInput
                            placeholder="Url do seu Kit SmartYard"
                            fontFamily='Quicksand_700Bold'
                            style={styles.input}
                            value={url}
                            onChangeText={text => setUrl(text)}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '20%', }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Selecao')}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerHeader: {
        marginBottom: '15%',
        paddingStart: '5%',
        height: '20%',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerForm: {
        backgroundColor: 'transperent',
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: '5%',
        alignContent: 'center',
        alignItems: 'center',
    },
    imglogo3: {
        width: 125,
        height: 125,
        borderColor: 'white',
        borderRadius: 10,
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Quicksand_400Regular',
        color: 'white',
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'justify',
    },
    caixatexto: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'left',
        borderRadius: 10,
        marginTop: '10%',
        marginBottom: '7%',
        width: '85%',
        height: 48,
        alignItems: 'center',
        marginRight: '5%',
        marginLeft: '5%',

    },
    title: {
        fontSize: 30,
        marginTop: 28,
        alignSelf: 'center',
        color: 'white',
        height: 'auto',
        width: 'auto',
        fontFamily: 'Quicksand_700Bold',
        marginBottom:'8%'

    },
    image: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: 'auto',

    },
    input: {
        height: 40,
        fontSize: 14,
        marginLeft: 3,
        color: 'black',
        width: '100%',
        marginLeft: '10%'
    },
    imglogo3: {
        width: 20,
        height: 20,
        borderColor: 'white',
        margin: 5,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 15,
    },
    imglogo2: {
        width: 200,
        height: 200,
        borderColor: 'white',
        margin: 10,
        borderRadius: 10,
        marginBottom: '15%'
    },
    button: {
        justifyContent: "flex-end",
        width: 140,
        height: 50,
        backgroundColor: 'white',
        marginTop: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:'5%'
    },
    buttonText: {
        color: '#198F8F',
        fontSize: 18,
        fontFamily: 'Quicksand_700Bold',

    },

    background: {
        height: '100%',
        width: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },

    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    },
    registerText: {
        color: 'white',
        fontFamily: 'Quicksand_400Regular'
    },
});
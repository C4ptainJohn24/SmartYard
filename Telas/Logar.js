import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function Logar() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Conta Logada:', user.email);
                navigation.navigate('Conteudo');
            })
            .catch(error => alert(error.message));
    };

    let [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <LinearGradient colors={['#0097B2', '#7ED957']} style={styles.background} />
            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                    <Image resizeMode="stretch" style={styles.imglogo2} source={require('../assets/logoofc.png')} />
                </Animatable.View>
                <View style={{  backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '70%', borderRadius: 20, flexDirection:'column', marginBottom:'5%' }}>
                    <Text style={styles.title}> Login </Text>
                    <View style={styles.caixatexto}>
                        <TextInput
                            placeholder="Nome de Usuário ou E-mail"
                            fontFamily="Quicksand_700Bold"
                            style={styles.input}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                    <View style={styles.caixatexto}>
                        <TextInput
                            placeholder="Senha"
                            style={styles.input}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                    </View>
                    <KeyboardAvoidingView style={{  flex:1,justifyContent: 'flex-end', alignItems: 'flex-end',  marginBottom: '16%', }}>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Acessar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Registro')}>
                            <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
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
        height:'20%',
        marginBottom:'15%',
        paddingStart: '5%',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerForm: {
        backgroundColor: 'transparent',
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginTop: '5%',
        alignContent: 'center',
        alignItems: 'center',
    },
    caixatexto: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'left',
        borderRadius: 10,
        marginTop: '10%',
        marginBottom: '7%',
        width: '85%',
        height: 'auto',
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
    },
    input: {
        height: 40,
        fontSize: 14,
        marginLeft: 3,
        color: 'black',
        width: '100%',
        marginLeft: '10%',
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
        height: 200,
        width: 200,
        borderColor: 'white',
        borderRadius: 10,
    },
    button: {
        justifyContent: 'flex-end',
        width: 140,
        height: 50,
        backgroundColor: 'white',
        marginTop: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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
        fontFamily: 'Quicksand_400Regular',
    },
});

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    Modal,
    KeyboardAvoidingView,
    
} from 'react-native';

import { CheckBox } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase';
import firebase from "firebase/compat/app";
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { ScrollView } from 'react-native-gesture-handler';


export default function Register() {
    const navigation = useNavigation();
    const [isSelected, setSelection] = useState(false);
    const [showTermos, setShowTermos] = useState(false);

    /* TERMOS DE USO  */
    const handleTermosButtonPress = () => {
        setShowTermos(true);
    };

    const handleCloseTermos = () => {
        setShowTermos(false);
    };

    const toggleCheckBox = () => {
        setSelection(!isSelected);
    };

    const handleCheckBoxPress = () => {
        // Executar a função desejada quando a checkbox é pressionada
        if (isSelected===true) {
            handleSignUp();
        }
        if (isSelected === false) {
            alert('Você deve concordar com os termos para continuar!')
        }

    };
    const fechar = () => {
        alert(error.message);
        handleCloseTermos()
    }

    /* REGISTRO COM FIREBASE */
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('');

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert("As senhas não batem! Verifique-as!");
            return;
        }

        if (!isEmailValid(email)) {
            alert('Este tipo de email não é válido!');
            return;
        }

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                const uid = user.uid; 
                console.log('Registered with:', user.email);

                user
                    .sendEmailVerification()
                    .then(() => {
                        console.log('Email de verificação enviado.');
                    })
                    .catch((error) => {
                        console.error('Erro ao enviar o email de verificação:', error);
                    });

                const data = {
                    email,
                    fullName,
                };


                navigation.navigate('Conteudo', { user: data });
            })
            .catch((error) => {
                alert(error);
            });
    };

    /* CARREGANDO FONTES  */
    let [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    
    

    const Termos = ({ onClose }) => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={onClose}
            >
            
                <View style={styles.helpContainer}>
                    <LinearGradient
                        colors={['#0097B2', '#7ED957']}
                        style={styles.background}
                    />
                    <View style={{ flex:1,backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '95%', borderRadius: 20, flexDirection: 'column', marginBottom: '5%', margin:'4%' }}>
                        <Text style={styles.helpText}> Você deve concordar com os Termos de uso antes de criar sua conta.</Text>
                    <ScrollView style={{height:'35%',backgroundColor:'white', borderRadius:10, margin:'4%', borderWidth:2,}}>
                        <Text style={{ textAlign: 'justify', color: 'black', fontSize: 16, fontFamily: 'Quicksand_400Regular', margin:'5%' }}>Ao acessar e se cadastrar nos serviços da SmartYard, o usuário compreende e concorda que teremos conhecimento de sua localização ao fazermos a conexão de seu kit arduino com o aplicativo. Além disso, não nos responsabilizaremos por eventuais danos ao kit arduino causados pelo usuário, apenas caso o kit já seja entregue com algum tipo de defeito. A utilização das informações pessoais citada anteriormente será feita sob as normas da Constituição Federal de 1988 sendo, especificamente, das normas da Lei Geral de Proteção de Dados Pessoais (LGPD), lei nº 13.709 de 14 de agosto de 2018 e seus respectivos artigos. Com isso, o Jardim Inteligente Automatizado Ltda., comumente chamado de “SmartYard”, responsabiliza-se em fazer o que foi proposto nos termos e condições de uso presentes. </Text>
                    </ScrollView>
                        <CheckBox
                        title = {
                                <Text style={{ marginLeft:'5%',fontFamily: 'Quicksand_700Bold', fontSize: 16, color:'white' }}>Concordo com os termos de uso</Text>
                            }         c
                        checked={isSelected}
                        onPress={toggleCheckBox}        
                        containerStyle={{backgroundColor:'transparent', borderWidth:0, }}
                        checkedColor='white'
                        />
                        <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '8%', }}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseTermos}>
                                <Text style={styles.closeButtonText}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2} onPress={handleCheckBoxPress}>
                                <Text style={styles.buttonText}>Avançar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <LinearGradient
                colors={['#5DE0E6', '#004AAD']}
                style={styles.background}
            />

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                <Animatable.View
                    animation="fadeInLeft"
                    delay={500}
                    style={styles.containerHeader}>
                    <Image
                        resizeMode="stretch"
                        style={styles.imglogo5}
                        source={require('../assets/logoofc.png')}
                    />
                </Animatable.View>
                <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '75%', width:'100%', borderRadius: 20, flexDirection: 'column', marginBottom: '5%', alignItems:'center' }}>
                    <Text style={styles.title}> Cadastro </Text>
                <View
                    style={styles.caixatexto}>
                    <TextInput
                        placeholder="Nome Completo"
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        value={fullName}
                        onChangeText={text => setFullName(text)}
                    />
                </View>
                <View
                    style={styles.caixatexto}>
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View
                    style={styles.caixatexto}>
                    <TextInput
                        placeholder="Senha"
                        style={styles.input}
                         placeholderTextColor={'gray'}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                </View>

                <View
                    style={styles.caixatexto}>
                    <TextInput
                        placeholder="Confirmar Senha"
                        style={styles.input}
                        
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry
                    />
                </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '8%', }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTermosButtonPress}>
                    <Text style={styles.buttonText}>Registrar-se</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegister}
                    onPress={() => navigation.navigate('Logar')}>
                    <Text style={styles.registerText}>
                        Já possui uma conta? Clique para Logar!
                    </Text>
                </TouchableOpacity>
                </View>
                </View>
            </Animatable.View>
            { showTermos && <Termos onClose={handleCloseTermos} /> }
        </KeyboardAvoidingView>
        
    );

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerHeader: {
        height: '20%',
        marginBottom: '8%',
        paddingStart: '5%',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    registerText: {
        color: 'black',
    },
    background: {
        height: '100%',
        width: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },

    message: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    caixatexto: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'left',
        borderRadius: 10,
        marginTop: '2%',
        marginBottom: '7%',
        width: '85%',
        height: 'auto',
        alignItems: 'center',
        marginRight: '5%',
        marginLeft: '5%',
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
    title: {
        fontSize: 30,
        marginTop: '10%',
        alignSelf: 'center',
        color: 'white',
        height: 'auto',
        width: 'auto',
        fontFamily: 'Quicksand_700Bold',
        marginBottom:'5%'

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
        width: 150,
        height: 150,
        borderColor: 'white',
        margin: 10,
        borderRadius: 10,
    },
    imglogo5: {
        width: 150,
        height: 150,
        borderColor: 'white',
        margin: 10,
        borderRadius: 10,
    },
    button: {
        justifyContent: "flex-end",
        width: 140,
        height: 50,
        backgroundColor: 'white',
        marginTop: '10%',
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    button2: {
        justifyContent: "flex-end",
        width: 120,
        height: 45,
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#198F8F',
        fontSize: 18,
        fontFamily: 'Quicksand_700Bold',

    },
    buttonRegister: {
        marginTop: '4%',
        alignSelf: 'center',
    },
    registerText: {
        color: 'white',
        fontFamily: 'Quicksand_400Regular'
    },

    helpButton: {
        position: 'absolute',
        bottom: 250,
        right: 20,
        zIndex: 3,
        

    },
    helpButtonContent: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    helpButtonIcon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0097b2',
    },
    helpContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#0097B2'
    },
    closeButton: {
        justifyContent: "flex-end",
        width: 120,
        height: 45,
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 10,
        shadowColor: 'black',
    },
    closeButtonText: {
        color: 'red',
        fontSize: 18,
        fontFamily: 'Quicksand_700Bold',
    },
    helpText: {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 20, 
        fontFamily: 'Quicksand_700Bold', 
        margin: '5%', 
        marginTop: '10%'
    }
});

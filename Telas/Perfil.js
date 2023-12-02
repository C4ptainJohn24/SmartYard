import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    LinearGradient,
    Linking,
    Modal
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function Perfil() {

    const [isSelected, setSelection] = useState(false);
    const [showTermos, setShowTermos] = useState(false);

    /* TERMOS DE USO  */
    const handleTermosButtonPress = () => {
        setShowTermos(true)
    };

    const handleCloseTermos = () => {
        setShowTermos(false);
    };

    const toggleCheckBox = () => {
        setSelection(!isSelected);
    };

    const handleLogout = () => {
        auth
        .signOut().then(() => {
            navigation.navigate('Abertura1')
            alert('Saindo da conta...')
        }).catch((error) => {
            // An error happened.
        });
    }
    

        
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

 


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
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '95%', borderRadius: 20, flexDirection: 'column', marginBottom: '5%', margin: '4%' }}>
                        <Text style={styles.helpText}> Termos de Uso</Text>
                        <ScrollView style={{ height: '35%', backgroundColor: 'white', borderRadius: 10, margin: '4%', borderWidth: 2, }}>
                            <Text style={{ textAlign: 'justify', color: 'black', fontSize: 16, fontFamily: 'Quicksand_400Regular', margin: '5%' }}>Ao acessar e se cadastrar nos serviços da SmartYard, o usuário compreende e concorda que teremos conhecimento de sua localização ao fazermos a conexão de seu kit arduino com o aplicativo. Além disso, não nos responsabilizaremos por eventuais danos ao kit arduino causados pelo usuário, apenas caso o kit já seja entregue com algum tipo de defeito. A utilização das informações pessoais citada anteriormente será feita sob as normas da Constituição Federal de 1988 sendo, especificamente, das normas da Lei Geral de Proteção de Dados Pessoais (LGPD), lei nº 13.709 de 14 de agosto de 2018 e seus respectivos artigos. Com isso, o Jardim Inteligente Automatizado Ltda., comumente chamado de “SmartYard”, responsabiliza-se em fazer o que foi proposto nos termos e condições de uso presentes. </Text>
                        </ScrollView>
                        <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '8%', }}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseTermos}>
                                <Text style={styles.closeButtonText}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };


    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Informações</Text>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/logom.png')} style={styles.logo} />
                    </View>
                </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginLeft: '10%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 40, width: 40, }} source={require('../assets/termos.png')}></Image>
                </View>
                <TouchableOpacity style={styles.button2} onPress={handleTermosButtonPress}>
                    <Text style={styles.buttonText2}>Termos de Uso</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginLeft: '10%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 40, width: 40, }} source={require('../assets/site.png')}></Image>
                </View>
                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonText2}>Site</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginLeft: '10%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 40, width: 40, }} source={require('../assets/Instagram.png')}></Image>
                </View>
                <TouchableOpacity style={styles.button2} onPress={() => Linking.openURL('https://www.instagram.com/smartyard_ltda/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==')}>
                    <Text style={styles.buttonText2}>Instagram</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginLeft: '10%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 40, width: 40, }} source={require('../assets/X.png')}></Image>
                </View>
                <TouchableOpacity style={styles.button2} onPress={() => Linking.openURL('https://twitter.com/EtecYard')}>
                    <Text style={styles.buttonText2}>Link para o X</Text>
                </TouchableOpacity>
            </View>
               
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogout}>
                    <Text style={styles.buttonText}>Sair da Conta</Text>
                </TouchableOpacity>
                    {showTermos && <Termos onClose={handleCloseTermos} />}
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    button: {
        justifyContent: "flex-end",
        width: 140,
        height: 50,
        backgroundColor: 'white',
        marginTop: '8%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:'5%',
    },
    button2: {
       width: '60%',
        marginRight: '10%',
        height: 50,
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'left',
        alignSelf: 'center',
        marginBottom: '5%',
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
        backgroundColor: '#0097B2'
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
    },
    buttonText: {
        color: 'red',
        fontSize: 18,
        fontFamily: 'Quicksand_700Bold',

    },
    buttonText2: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Quicksand_700Bold',
        marginLeft:'8%'

    },
    headerTitleContainer: {
        flex: 1,
    },
    headerTitle: {
        color: 'black',
        fontSize: 25,
        marginLeft:'10%',
        fontFamily:'Quicksand_700Bold'
    },
    logoContainer: {
        paddingRight: 16,
    },
    logo: {
        width: 80,
        height: 80,
    },
    profileContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageButton: {
        position: 'absolute',
        bottom: 5,
        right: 40,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        marginBottom: "10%",
    },
    removeImageButton: {
        position: 'absolute',
        bottom: 10,
        right: 60,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e74c3c',
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    locationText: {
        color: 'black',
        alignSelf: "center"
    },
    infoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#3498db',
        marginBottom: 10,
        width: 250
    },
    inputField: {
        flex: 1,
        borderWidth: 0,
        paddingLeft: 0,
        fontSize: 16,
    },
    editIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    background: {
        height: '100%',
        width: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
});
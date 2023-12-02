import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useState, useEffect, useContext, createContext, } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { ref, onValue, } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function Alface() {
    const navigation = useNavigation();


    // Substitua as URLs das imagens de fundo e da verdura
    const vegetableImage = 'https://i.ibb.co/fFdX8Rj/image.png';
    const simpatia = 'https://i.ibb.co/zXzjgqP/Design-sem-nome-8.png';
    const logo = 'https://i.ibb.co/z72W3Ry/logo-removebg-preview.png';

    // Defina o status como 'ligado' ou 'desligado'
    const [kitStatus, setKitStatus] = useState('desligado');
    const [kitStatusColor, setKitStatusColor] = useState('desligado');
    //Se o kit estiver ligado vai fazer a parada e ficar verde ou vermelho

    const[usl, setUsl] = useState(null);
    const[umidadeA, setUmidadeA] = useState('');
    const[temperaturaL, settemperaturaL] = useState('');
    const [modoUSL, setModoUSL] = useState('');
    const [modoUA, setModoUA] = useState('');
    const [modoT, setModoT] = useState('');

    useEffect(()=>{
        pegarUmidadeSL();
        pegarUmidadeA();
        pegarTemperaturaL();
    }, [])

    useEffect(() => {
        VerificarUmidadeS();
        VerificarUmidadeA();
        VerificarTemp();
        StatusKit();
    },)

    function StatusKit(){

        if ( usl <= 5 ){
            setKitStatus('Desligado')
            setKitStatusColor('red')
        }
        if ( usl > 5 ){
            setKitStatus('Ligado')
            setKitStatusColor('green')
        }


    }

    function VerificarUmidadeS(){
        if (usl < 55){
            setModoUSL('A umidade do solo está baixa... Irrigando...')
        }
        if( usl > 55){
            setModoUSL('A umidade do solo está boa! Não é necessário irrigar...')
        }
    }
    function VerificarUmidadeA() {
        if (umidadeA > 50 && umidadeA <= 70){
            setModoUA('A umidade do ar está boa para a horta!')
        }
        if (umidadeA < 50 ) {
            setModoUA('A umidade do ar não é a perfeita para a horta!')
        }
        if (umidadeA > 70) {
            setModoUA('A umidade do ar não é a perfeita para a horta!')
        }
    }
    function VerificarTemp() {
        if (temperaturaL >= 21.1 && temperaturaL <= 35.0) {
            setModoT('A temperatura do ar está perfeita para germinação!')
        }
        if (temperaturaL < 21.1) {
            setModoT('A temperatura do ar está muito baixa para germinação!')
        }
        if (temperaturaL >= 35.0) {
            setModoT('A temperatura do ar está muito alta para germinação!')
        }
    }
    

    function pegarUmidadeSL(){
        const UmidadeS = ref(db, 'Geral/umidade/solo');
        onValue(UmidadeS, (snapshot) => {
        const UmiS = snapshot.val();
        setUsl(UmiS);
        console.log(UmiS);
    });
    }

    function pegarUmidadeA(){
        const UmidadeA = ref(db, 'Geral/umidade/ar');
        onValue(UmidadeA, (snapshot) => {
            const UmiA = snapshot.val();
             setUmidadeA(UmiA)
            console.log(UmiA);
        });
    }
    
    
    function pegarTemperaturaL(){  
        const Temperatura = ref(db, 'Geral/temperatura');
            onValue(Temperatura, (snapshot) => {
            const Temp = snapshot.val();
            settemperaturaL(Temp)
            console.log(Temp);
        }); 
    }

    let [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }
    

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#0097B2', '#7ED957']}
                style={styles.background}
            />
            <View style={{ zIndex: 3, paddingLeft: 20, flex: 1, backgroundColor: 'transparent' }}>
                <View style={{ marginBottom: 20 }}></View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        zIndex: 3,
                        width: 40,
                        marginBottom: -100,
                    }}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}>
                    <Ionicons name="close-outline" size={40} color="black" />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Image source={{ uri: logo }} style={styles.logo} />
                </View>
            </View>
            <Image source={require('../../assets/Alface.png')} style={styles.vegetableImage} />
            <Text style={styles.vegetableName}>Minha horta de Alface</Text>
            <View style={styles.statusContainer}>
                <View
                    style={[styles.statusIndicator, { backgroundColor: kitStatusColor, marginBottom: '4%', }]}
                />
                <Text style={styles.statusText}>Status: {kitStatus}</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.sensorData}>
                    <View style={styles.sensor}>
                        <Text style={styles.label}>Umidade do Solo</Text>
                        <Text style={styles.value}>{usl}%</Text>
                    </View>

                     <View style={styles.sensor}>
                        <Text style={styles.label}>Umidade do Ar</Text>
                        <Text style={styles.value}>{umidadeA}%</Text>
                    </View>

                    <View style={styles.sensor}>
                        <Text style={styles.label}>Temperatura</Text>
                        <Text style={styles.value}>{temperaturaL}°C</Text>
                    </View> 
                </View>
                <View style={styles.informa}>
                    <View style={{margin:'5%'}}>
                        <Text style={styles.titleP}>Central da Análise</Text>
                        <Text style={styles.value}>Umidade do Solo</Text>
                        <Text style={styles.label2}>{modoUSL} </Text>
                        <Text style={styles.value}>Umidade do Ar</Text>
                        <Text style={styles.label2}>{modoUA} </Text>
                        <Text style={styles.value}>Temperatura do Ar</Text>
                        <Text style={styles.label2}>{modoT} </Text>
                        <Image source={{ uri: simpatia }} style={styles.vegetableImage} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0097B2',
    },
    titleP:{
        fontSize:24,
        fontFamily:'Quicksand_700Bold',
        alignSelf:'center',
        marginBottom:'10%',
        color:'white'
    },  
    header: {
        flexDirection: 'row',
        alignItems: 'row',
        justifyContent: 'space-between',
        padding: 16,
        paddingLeft: '70%',
    },
    vegetableImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 30,
    },
    vegetableName: {
        fontSize: 22,
        fontFamily:'Quicksand_700Bold',
        color: 'white',
        alignSelf: 'center',
        zIndex: 1,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 51,
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginRight: 8,
    },
    statusText: {
        fontSize: 16,
        color: 'white',
        marginBottom:'4%',
        fontFamily: 'Quicksand_400Regular',
    },
    sensorData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    sensor: {
        flex: 5,
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2) ',
        margin:'2%',
        height:'100%'
    },
    label: {
        fontSize: 13,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'Quicksand_400Regular',
    },
    label2: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'Quicksand_400Regular',
        marginBottom:'6%'
    },
    value: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Quicksand_700Bold',
        justifyContent:'flex-end',
        marginBottom:'2%'
    },
    informa: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        height: 'auto',
        width: '100%',
        borderTopStartRadius: 50,
        borderTopRightRadius: 50,
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 15,
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

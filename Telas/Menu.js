import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function Home({ navigation }) {
    const lettuceIcon = require('../assets/Alface.png');
    const tomatoIcon = require('../assets/Tomate.png');
    const mintIcon = require('../assets/Hortela.png');
    const logo = require('../assets/logom.png');

    const kitStatus = 'ligado'; // Alterar pra URL 

    //Se o kit estiver ligado vai fazer a parada e ficar verde ou vermelho
    const statusColor = kitStatus === 'ligado' ? 'rgb(0, 163, 71)' : 'red';

    let [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }
    const categories = [
        {
            label: 'Alface',
            value: 'Alface',
            imageSource:
                require('../assets/Alface.png'),
        },
        {
            label: 'Tomate',
            value: 'Tomate',
            imageSource:
                require('../assets/Tomate.png'),
        },
        {
            label: 'Hortelã',
            value: 'Hortela',
            imageSource:
                require('../assets/Hortela.png'),
        },
    ];
    return (
        
        <View style={styles.container}>
            <StatusBar backgroundColor="#0097B2" barStyle="light"/>
            <LinearGradient
                colors={['#0097B2', '#7ED957']}
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>Minhas Hortas</Text>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('Alface')}>
                    <Image source={require('../assets/Alface.png')} style={styles.cardIcon} />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardText}>Alface</Text>
                        <View style={styles.statusContainer}>
                            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
                            <Text style={styles.statusText}>Status: {kitStatus}</Text>
                        </View>
                        <View style={styles.monitorButton}>
                            <Text style={styles.monitorButtonText}>Monitorar</Text>
                        </View>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AddKit')}>
                    <Text style={styles.buttonText}>+ Adicionar nova Horta</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        padding: 16,
    },
    logo: {
        width: 80,
        height: 80,
    },
    headerText: {
        fontSize: 22,
        color: 'white',
        fontFamily:'Quicksand_700Bold'
    },
    cardContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: 10,
        width: '100%',
        height: '100%',
    },
    background: {
        height: '100%',
        width: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    card: {
        width: '100%',
        height: '16%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    cardIcon: {
        width: 60,
        height: 60,
        marginRight: 16,
        marginStart: 10,
    },
    cardContent: {
        flex: 1,
        paddingVertical: 16,
    },
    cardText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Quicksand_700Bold',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 3,
    },
    statusText: {
        fontSize: 14,
        color: 'white',
        fontFamily:'Quicksand_400Regular',
        marginLeft:'2%'
    },
    monitorButton: {
        backgroundColor: 'rgb(0, 192, 88)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        boxShadow: '1px 2px 9px green',
    },
    monitorButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        justifyContent: "flex-end",
        width: 260,
        height: 50,
        backgroundColor: 'white',
        marginTop: '10%',
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
});
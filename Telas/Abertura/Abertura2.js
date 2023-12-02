import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';


export default function Abertura2() {


    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#55C742', '#44C960', '#198F8F']}
                style={styles.background}
            />
            <Animatable.View animation="fadeInLeft" style={styles.TitleContainer}>
                <Text style={styles.title}>Cuidar de uma horta dentro de sua casa nunca foi tão fácil...</Text>
            </Animatable.View>
            <View>
                <Animatable.View animation="fadeInLeft" style={styles.TextContainer}>
                    <Text style={styles.text}>Com a SmartYard, de pequenas até grandes hortas se tornaram possíveis, tudo isto graças a irrigação automatizada e inteligente.</Text>
                </Animatable.View>
            </View>
            <Animatable.View style={styles.ImageContainer}>
                <Animatable.Image
                    animation="fadeInLeft"
                    source={require('../../assets/3d-f.png')}
                    style={styles.Image}
                />
            </Animatable.View>

            <Animatable.View animation="fadeInLeft" style={styles.containerFooter}>
                <View style={styles.CB}>
                    <View style={styles.containerCarregamento}>
                        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.circleS}></Animatable.View>
                        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.circleS}></Animatable.View>
                        <View style={styles.circle}></View>
                    </View>
                    <View style={styles.containerBot}>
                        <TouchableOpacity style={styles.containerBotão} onPress={() => navigation.navigate('Abertura3')}>
                            <Text style={styles.text2}>Avançar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </View>
    );
};
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerHeader: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: 'red',
        height: '10%'

    },
    containerBot:
    {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-end'
    },
    background: {
        height: '100%',
        width: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    logoContainer: {
        marginTop: 10,
        paddingRight: 16,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    logo: {
        width: 130,
        height: 130,
    },
    ImageContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '15%',
        flex: 8,

    },
    Image: {
        width: '70%',
        height: 'auto',
    },
    TitleContainer: {
        marginTop: 20,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '20%'
    },
    TextContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '5%',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Quicksand_700Bold',
        color: 'white',
        textAlign: 'justify'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Quicksand_400Regular',
        color: 'white',
        textAlign: 'justify',
    },
    text2: {
        fontSize: 18,
        fontFamily: 'Quicksand_700Bold',
        color: '#198F8F',
        textAlign: 'justify',
        justifyContent: 'center',
        alignSelf: 'center',
        verticalAlign: 'middle',
        marginBottom: 12,
    },
    containerFooter: {
        flex: 4,
        flexDirection: 'column',
        height: '10%',
        justifyContent: "center",
        alignItems: 'center',
    },
    CB: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        margin: '5%'
    },
    containerCarregamento: {
        justifyContent: "flex-start",
        flexDirection: 'row',
        width: 160,
        height: 50,
        marginTop: '10%',
        marginLeft: '10%'
    },
    circle: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 20,
        height: 20,
        marginLeft: '4%',
    },
    circleS: {
        backgroundColor: 'lightblue',
        marginLeft: 10,
        borderRadius: 100,
        width: 20,
        height: 20,
        marginLeft: '4%',
    },
    botão: {

    },
    containerBotão: {
        justifyContent: "flex-end",
        width: 110,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        marginTop: '10%',
        marginRight: '10%'
    }

});
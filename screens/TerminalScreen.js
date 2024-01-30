import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity, Button, ActivityIndicator, Worker } from 'react-native';

import ABC from '../CustomModule';

import {  workerData } from 'worker_threads';

import LinearGradient from 'react-native-linear-gradient';


import AsyncStorage from '@react-native-async-storage/async-storage'



const TerminalScreen = ({navigation})=>{
    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
    }, [navigation]);


    const [text, onChangeText] = React.useState('');
    const [outputbox, changeText] = React.useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const usernameRef = useRef(null);
    
    
    const [connected, changestatus] = React.useState('');
    const makePeriodicCall = (ip, username, password) => {
        setInterval(() => {

        //   console.log("vals :"+ip+username+password);
          ABC.ParentConnectionStatus(ip, username, password)
            .then((result) => {
                if(result==true)
                    changestatus("Connected");
                else
                    changestatus("Disconnected");
            })
            .catch(error => {
                changestatus("Disconnected");
                console.log(error);
            });
        }, 2000);
      }







    const [IpAddress, Cipaddress] = React.useState('');
    const [Username, Cusername] = React.useState('');
    const [password, Cpass] = React.useState('');

    const fetchIpAddress = async () => {
        try {
          const a = await AsyncStorage.getItem("ip4594");
          if (a !== null) {
            Cipaddress(JSON.parse(a));
            // console.log(IpAddress);
          }
        }catch (e) {
          console.log('Failed to fetch data');
        }
      }
      const fetchUsername = async () => {
        try {
          const a = await AsyncStorage.getItem("u4594");
          if (a !== null) {
            Cusername(JSON.parse(a));
            // console.log(Username);
          }
        }catch (e) {
          console.log('Failed to fetch data');
        }
      }
      const fetchpass = async () => {
        try {
          const a = await AsyncStorage.getItem("p4594");
          if (a !== null) {
            Cpass(JSON.parse(a));
            // console.log(Username);
          }
        }catch (e) {
          console.log('Failed to fetch data');
        }
      }
      useEffect(() => {
        fetchIpAddress();
        fetchUsername();
        fetchpass();
      }, []);





    useEffect(() => {
        const intervalId = makePeriodicCall(IpAddress,Username,password);
        return () => clearInterval(intervalId);
      }, [IpAddress, Username, password]);
    
      
    
    

    const handleDonePress = () => {
        setIsExecuting(true);
        changeText(outputbox + "\n:~$ " +text + "\n");
        var temp = text;
        onChangeText('');
        setTimeout(() => {
            changeText(outputbox + "\n:~$ " + text);
          ABC.ExecuteCommand(IpAddress,Username,password, text)
            .then((result) => {
              console.log(text + result);
              changeText(outputbox + "\n:~$ " +temp + "\n" + result);
            })
            .catch((error) => {
              console.log(error);
              changeText(outputbox + "\n:~$ " +temp + "\n" + error);
            })
            .finally(() => {
              setIsExecuting(false);
              usernameRef.current.blur();
            });
        }, 100);
      };

    const handleButtonPress = () => {
        changeText('');
        onChangeText('');
    };


    return(
        <View style={styles.container}>
            
                {/* <View style={{backgroundColor:'#635A54',  }}> */}
                <LinearGradient colors={['#174c9a', '#181818',]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                >
                    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'flex-end', marginBottom:20}}>
                        <Text style={{fontSize:60, fontWeight:500, paddingLeft:10, paddingRight:10, paddingTop:10, fontFamily: 'NeueMontreal-Medium', color:"#FFFFFF"}}>
                            Terminal
                        </Text>
                        <Text style={{paddingRight:15, fontFamily: 'ubuntufont'}}>
                            +12,3% ↆ
                        </Text>
                    </View>
                    
                        <View style={{ backgroundColor:'#2313FE00', flexDirection:'row-reverse', padding:10, marginBottom:10}}>
                            <View style={{ backgroundColor:'#E9161600'}}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} 
                                    onPress={handleButtonPress}
                                    >
                                        <Text style={styles.buttonText}>Clear</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                    <View style={{backgroundColor:'#00000084', padding:10, borderRadius:20, borderWidth:0.3, borderColor:'#ffffff', marginRight:10}}>

                                        <Text style={{paddingLeft:5, paddingRight:5, fontFamily: 'NeueMontreal-Medium', }}>
                                            {connected}
                                        </Text>
                                    </View>
                            </View>
                            
                        </View>

                    {/* <View style={{backgroundColor:'#300A24', height:30, borderTopLeftRadius:20,borderTopRightRadius:20 }}>

                    </View> */}
                {/* </View> */}
                </LinearGradient>
                <LinearGradient colors={['#174c9a', '#181818',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
>
            <ScrollView style={{borderTopLeftRadius:20,borderTopRightRadius:20, backgroundColor:'#300a24', borderWidth:1, borderColor:'#090909'}}>
                <View style={{backgroundColor:'#CF686800', flexDirection:'row',   paddingLeft:10, paddingRight:10}}>
                    {/* <Text style={styles.font}>
                        ~$:
                    </Text> */}
                    <Text style={{fontSize:20, marginLeft:5, color:'#ffffff', backgroundColor:'#FF111100', fontFamily: 'ubuntufont'}}>
                        {outputbox}
                    </Text>
                    
                </View>
                <View style={{  backgroundColor:'#64F82900', flexDirection:'row', paddingLeft:10, paddingRight:10, }}>
                    <Text style={{fontSize:20, marginLeft:5, color:'#ffffff', backgroundColor:'#7B5F5F00', fontFamily: 'ubuntufont'}}>
                        :~$
                    </Text>

                    <TextInput
                        ref={usernameRef}
                        style={{fontSize:20, color:'#FFFFFF', backgroundColor:"#9239FF00",  paddingTop: 0, paddingBottom: 0, textAlignVertical: 'top', fontFamily: 'ubuntufont', flex:1}}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="enter command..."
                        autoCapitalize="none"
                        onSubmitEditing={handleDonePress}
                        editable={!isExecuting}
                    />
                    <View>{isExecuting && (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="small" color="#F0E5A9" /></View>)}</View>
                </View>
                <View style={{height:900, backgroundColor:'#00000000'}}>

                </View>
            </ScrollView>

            </LinearGradient>
         </View> 
    );
};

export default TerminalScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#B8900C'
    },
    font:{
        fontSize:20,
        marginLeft:5,
        color:'#ffffff',
        backgroundColor:'#F92E2E00',
        fontFamily: 'ubuntufont',
    },
    buttonContainer: {
        // paddingLeft: 60,
        paddingRight: 10,
        // paddingBottom:20,
    },
    button: {
        height: 35,
        width:120,
        backgroundColor: '#58000084',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth:0.3,
        borderColor:'#ffffff',
        fontFamily: 'NeueMontreal-Medium',
    },
    buttonText: {
        // fontSize: 20,
        fontFamily: 'NeueMontreal-Medium',
        color:"#E3E3E3"
    },
});



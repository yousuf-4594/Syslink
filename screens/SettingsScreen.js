import React, { useState, useEffect, useRef,  memo  } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity, Button, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';

import ABC from '../CustomModule';

const color1="#181818";
const color2="#174c9a";

const bg1="##472D2D";
const bg2="#2b3596";//real metrics
const bg3="#174c9a";//myconnection
const bg4="#2835b7";//disk + wifi
const bg5="#2835b7";//volume + power
const bg6="#174c9a";//process
const bg7="#223A98";
const bg8="#151D10C2";//title

const tbg1="#FFFFFF";
const tbg2="#ffffff";
const tbg3="#FFFFFF";


const SettingsScreen = ({navigation})=>{
    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation]);
      
      const [text, onChangeText] = React.useState('Useless Text');
      const [number1, onChangeNumber1] = React.useState('');
      const [text1, onChangeText1] = React.useState('');
      const [text2, onChangeText2] = React.useState('');

    const handleButtonPress = async () => {
        try {
            if(number1!="" && text1!="" && text2!=""){
                await AsyncStorage.setItem("ip4594", JSON.stringify(number1));
                await AsyncStorage.setItem("u4594", JSON.stringify(text1));
                await AsyncStorage.setItem("p4594", JSON.stringify(text2));
                console.log('Data saved successfully');
                ToastAndroid.showWithGravity(
                    'Data saved successfully',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
            }
            else{
                ToastAndroid.showWithGravity(
                    'Empty inputs',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
            }
          } 
        catch (e) {
            console.log('Failed to save data'+e);
            ToastAndroid.showWithGravity(
                'Failed to save data',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
        }
    };

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

    const handleButtonPress2 = async () => {
        console.log("sett:"+IpAddress+Username+password);
        ABC.ExecuteCommand(IpAddress, Username, password, "./run-all.sh")
        .then((result)=>{
            ToastAndroid.showWithGravity(
                'Syslink initilised',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
              );
        })
        .catch(error=>{
            console.log("cant start syslink error"+error);
        });
    };

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'flex-end', marginBottom:20}}>
                    <Text style={{fontSize:60, fontWeight:500, paddingLeft:10, paddingRight:10, paddingTop:10, fontFamily: 'NeueMontreal-Medium', color:"#9595958A"}}>
                            Dash
                    </Text>
                </View>
                <View style={{backgroundColor:bg7, margin:10, height:130, borderRadius:10,  }}>
                    <View>
                        <Text style={{marginLeft:20, color:"#FFFFFF6C", fontFamily: 'NeueMontreal-Bold', marginTop:15}}>Warning!</Text>
                        <Text style={{marginLeft:20, fontFamily: 'NeueMontreal-Bold', fontSize:20, marginTop:5, color:"#FFFFFF"}}>Has your system restarted ?</Text>
                        <Text style={{marginLeft:20, marginTop:10, fontFamily: 'NeueMontreal-Medium', color:"#FFFFFF"}}>ℹ Only initilise if system restarted/turned on</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
                            <TouchableOpacity onPress={handleButtonPress2} style={{marginRight:20, backgroundColor:"#DE49DE3B", width:100, alignItems:'center', justifyContent:'center', borderRadius:20, height:40, borderWidth:0.5, borderColor:"#FFFFFF9C"}}>
                                <Text style={{fontSize:20, fontFamily: 'NeueMontreal-Medium',}}>Initilise</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={{flexDirection:'row', }}>            
                        <View style={styles.temp}>

                        </View>
                        <View style={{backgroundColor:'#9B05FF00',flex:1,paddingLeft:10}}>
                            <Text style={{fontSize:40,marginTop:10,fontFamily: 'NeueMontreal-Bold'}}>Add user</Text>
                            <View style={{width:70,height:25,backgroundColor:'#FFEC59BE',marginTop:10,borderRadius:10,alignItems:'center'}}>
                                <Text style={{fontSize:22.5, color:'#000000', fontFamily: 'NeueMontreal-Medium', }}>Active</Text>
                            </View>
                            <Text style={{marginTop:10, fontFamily: 'NeueMontreal-Medium',}}>Add the required information for your remote Linux server</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#72842B00', flex:1, }}>
                        <View style={{borderColor:bg8,  borderWidth: 1, borderRadius: 5, margin:10}}>
                        <View style={{backgroundColor:bg8, height:25, borderColor:'#FF000000',  borderWidth: 1, borderTopRightRadius: 5, borderTopLeftRadius:5, paddingLeft:5, }}>
                                <Text style={{fontSize:20, fontFamily: 'NeueMontreal-Medium',}}>
                                    🌦 Ip address
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    style={{borderRadius:5,borderColor:'#000000',fontSize:20, fontFamily: 'NeueMontreal-Medium',}}
                                    onChangeText={onChangeNumber1}
                                    value={number1}
                                    placeholder="Ip address"
                                    keyboardType="numeric"  
                                />
                            </View>
                        </View>
                        <View style={{borderColor:bg8,  borderWidth: 1, borderRadius: 5, margin:10}}>
                        <View style={{backgroundColor:bg8, height:25, borderColor:'#FF000000',  borderWidth: 1, borderTopRightRadius: 5, borderTopLeftRadius:5, paddingLeft:5, }}>
                                <Text style={{fontSize:20, fontFamily: 'NeueMontreal-Medium',}}>
                                    🌥 User name
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    style={{borderRadius:5,borderColor:'#000000',fontSize:20, fontFamily: 'NeueMontreal-Medium',}}
                                    onChangeText={onChangeText1}
                                    value={text1}
                                    placeholder="Username"
                                />
                            </View>
                        </View>
                        <View style={{borderColor:bg8,  borderWidth: 1, borderRadius: 5, margin:10}}>
                            <View style={{backgroundColor:bg8, height:25, borderColor:'#FF000000',  borderWidth: 1, borderTopRightRadius: 5, borderTopLeftRadius:5, paddingLeft:5, }}>
                                <Text style={{fontSize:20, fontFamily: 'NeueMontreal-Medium',}}>
                                    ☁ Password
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    style={{borderRadius:5,borderColor:'#000000',fontSize:20, fontFamily: 'NeueMontreal-Medium',}}
                                    onChangeText={onChangeText2}
                                    value={text2}
                                    placeholder="Password"
                                />
                            </View>
                        </View>
                        <View style={{ backgroundColor:'#E9161600'}}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', marginTop:20}}>
                    <View style={{ backgroundColor:bg5, flex:1, height:400 ,marginRight:10, marginLeft:10, borderRadius:10}}>
                        <View style={{backgroundColor: bg8, borderTopRightRadius:10, borderTopLeftRadius:10, }}>
                            <Text style={styles.settingsTitle}>Settings</Text>
                        </View>
                        <View>
                            <Text style={styles.settingsText}>Account</Text>
                            <View style={{backgroundColor:'#000000CA', height:0.5,marginLeft:10,marginRight:10}}></View>
                            <Text style={styles.settingsText}>Language</Text>
                            <View style={{backgroundColor:'#000000CA', height:0.5,marginLeft:10,marginRight:10}}></View>
                            <Text style={styles.settingsText}>Privacy</Text>
                            <View style={{backgroundColor:'#000000CA', height:0.5,marginLeft:10,marginRight:10}}></View>
                            <Text style={styles.settingsText}>Notification</Text>
                            <View style={{backgroundColor:'#000000CA', height:0.5,marginLeft:10,marginRight:10}}></View>
                            <Text style={styles.settingsText}>Sound/Vibration</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor:bg5, flex:1, marginLeft:10, marginRight:10, borderRadius:10 }}>
                        <View style={{backgroundColor: bg8, borderTopRightRadius:10, borderTopLeftRadius:10, }}>
                            <Text style={styles.settingsTitle}>Preferences</Text>
                        </View>
                        <View>
                            <Text style={styles.settingsText}>Help/Support</Text>
                            <View style={{backgroundColor:'#000000CA', height:0.5,marginLeft:10,marginRight:10}}></View>
                            <Text style={styles.settingsText}>Version Information</Text>
                            <View style={{backgroundColor:'#000000CA', height:0.5,marginLeft:10,marginRight:10}}></View>
                            <Text style={styles.settingsText}>App Reset</Text>
                            <View style={{backgroundColor:'#000000CA', height:0.5,marginLeft:10,marginRight:10}}></View>
                            <Text style={styles.settingsText}>Notification</Text>
                        </View>
                    </View>
                </View>
                <View style={{height:150}}></View>
                
            </ScrollView>
        </View> 
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1,
    },
    card:{
        height:40,
        backgroundColor: '#640d14',
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    content:{
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        backgroundColor: color2,
        borderRadius:10,
    },
    cardText:{
        color: '#FFFFFF',
        fontSize: 20,
        paddingHorizontal: 16,
        alignSelf: 'center'
    },
    temp:{
        height:170,
        backgroundColor: '#9796962F',
        borderRadius:30,
        borderWidth:0.5,
        borderColor:'#000000',
        flex:1,
        margin:10,
        // shadowColor:'#FFFFFF',
        // shadowOffset:{
        //     width:20,
        //     height:20,
        // },
        // shadowOpacity:1,
        // shadowRadius:5.5,
        // elevation:10
        
    },
    buttonContainer: {
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom:20,
    },
    button: {
        height: 40,
        backgroundColor: bg8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 25, fontFamily: 'NeueMontreal-Medium',
    },
    settingsText:{
        fontSize:20,
        margin:10,
        marginTop:20, fontFamily: 'NeueMontreal-Medium',
    },
    settingsTitle:{
        fontSize:20,
        margin:3,
        marginLeft:10, fontFamily: 'NeueMontreal-Bold',
    },
});
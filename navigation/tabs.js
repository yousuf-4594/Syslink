import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet,  Text, View, Image, TouchableOpacity} from 'react-native';


import React, { useEffect, useRef } from 'react'




import HomeScreen from '../screens/HomeScreen';
import TerminalScreen from '../screens/TerminalScreen';
import FileScreen from '../screens/FilesScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Tab = createBottomTabNavigator();


const color1="#C0C0C0";
const color2="#606161";
const color3="#A7A6A6";
const color4="#748c94";

const Tabs = () => {
    
    console.log("geg");
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    // bottom:25,
                    // left:20,
                    // right:20,
                    elevation:0,
                    backgroundColor:'#000000D4',
                    // borderTopLeftRadius:20,
                    // borderTopRightRadius:20,
                    height:60,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', width: 60}}>
                        <Image
                            source={require('../assets/icons/house.png')}
                            resizeMode='contain'
                            style={{
                                width:focused ? 25 : 25,
                                height:focused ? 25 : 25,
                                tintColor:focused ? color1 : color2
                            }}
                            />
                            {focused && <Text style={{color: focused ?color3 : color4,fontSize:12, fontFamily: 'NeueMontreal-Medium'}}>Home</Text>}
                            
                            
                    </View>
                ),
            }} />
            <Tab.Screen name="Terminal" component={TerminalScreen}
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', width: 60, }}>
                        <Image
                            source={require('../assets/icons/terminal.png')}
                            resizeMode='contain'
                            style={{
                                width:focused ? 25 : 25,
                                height:focused ? 25 : 25,
                                tintColor:focused ? color1 : color2
                                
                            }}
                            />
                            {focused && <Text style={{color: focused ?color3 : color4,fontSize:12, fontFamily: 'NeueMontreal-Medium'}}>Terminal</Text>}
                    </View>
                ),
            }} />
            <Tab.Screen name="File Manager" component={FileScreen}
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', width: 60}}>
                        <Image
                            source={require('../assets/icons/filemanager.png')}
                            resizeMode='contain'
                            style={{
                                width:focused ? 25 : 25,
                                height:focused ? 25 : 25,
                                tintColor:focused ? color1 : color2
                            }}
                            />
                            {focused && <Text style={{color: focused ?color3 : color4,fontSize:12, fontFamily: 'NeueMontreal-Medium'}}>File manager</Text>}
                    </View>
                ),
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen}
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', width: 60}}>
                        <Image
                            source={require('../assets/icons/setting.png')}
                            resizeMode='contain'
                            style={{
                                width:focused ? 25 : 25,
                                height:focused ? 25 : 25,
                                tintColor:focused ? color1 : color2
                            }}
                            />
                            {focused && <Text style={{color: focused ? color3 : color4,fontSize:12, fontFamily: 'NeueMontreal-Medium'}}>Settings</Text>}
                    </View>
                ),
            }} />
        </Tab.Navigator>
        
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#00000000',
        shadowOffset:{
            width:0,
            height:10,
            
        },
        shadowOpacity:0.25,
        shadowRadius:5.5,
        elevation:9
    }
});

export default Tabs;
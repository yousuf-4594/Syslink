import React, { useCallback, useEffect, useRef, useState } from 'react';

import {View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, ActivityIndicator, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {ScrollView,TouchableOpacity,} from 'react-native';
import Animated, {FadeIn,FadeOut,Layout, } from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';

const LIST_ITEM_COLOR = '#C3C3C309';
const bg = '#212121';

import ABC from '../CustomModule';



import AsyncStorage from '@react-native-async-storage/async-storage';




const FileScreen = () => {




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




  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const initialMode = useRef(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    console.log('Component mounted!');
    setLoading(true);

    const timer = setTimeout(() => {
      ABC.parentfilemanager(IpAddress,Username,password,"")
      .then((result) =>{
        let assume = result.slice(0, -1);
        const rows = assume.split("\n");
        console.log(rows);
        const newItems = rows.map((row, index) => ({ id: index, value: row }));
        setItems(newItems);
        ABC.getCD()
        .then((result)=>{
          Ccd(result);
          console.log("result"+result);
        })
        .catch((error)=>{
          console.log(error);
        });
      })
      .catch((error)=>{
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
    }, 200);

  return () => clearTimeout(timer);
  }, []);


  const [items, setItems] = useState(
    new Array(0).fill("hello").map((_, index) => ({ id: index, value: "hello" }))
  );

  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  }, []);

  const onDelete = useCallback((itemId) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  }, []);

  const Clog = (itemid) =>{
    setError(false);
    console.log(itemid);

    if(!items[itemid].value.endsWith("/"))
      return;

    setItems([]);
    setLoading(true);
    const timer = setTimeout(() => {
    ABC.parentfilemanager(IpAddress,Username,password,items[itemid].value.slice(0, -1))
    .then((result)=>{
      let assume = result.slice(0, -1);
      const rows = assume.split("\n");
      console.log(rows);
      const newItems = rows.map((row, index) => ({ id: index, value: row }));
      setItems(newItems);
      ABC.getCD()
      .then((result)=>{
        Ccd(result);
        console.log("result"+result);
      })
      .catch((error)=>{
        console.log(error);
      });
    })
    .catch((error)=>{
      console.log(error);
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  }, 50);

  return () => clearTimeout(timer);

  };
  
  const [cd, Ccd] = React.useState('');

  const handleButtonPress = () => {
    setError(false);
    setItems([]);
    setLoading(true);
    const timer = setTimeout(() => {
    ABC.parentfilemanager(IpAddress,Username,password,"b")
    .then((result)=>{
      let assume = result.slice(0, -1);
      const rows = assume.split("\n");
      console.log(rows);
      const newItems = rows.map((row, index) => ({ id: index, value: row }));
      setItems(newItems);
      ABC.getCD()
      .then((result)=>{
        Ccd(result);
        console.log("result"+result);
      })
      .catch((error)=>{
        console.log(error);
      });
    })
    .catch((error)=>{
      console.log(error);
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  }, 50);

  return () => clearTimeout(timer);
  };

  const handleButtonPress2 = () => {
    ABC.clear()
    .then((result)=>{
      setError(false);
      console.log('Component mounted!');
      setItems([]);
      setLoading(true);

      const timer = setTimeout(() => {
        ABC.parentfilemanager(IpAddress,Username,password,"")
        .then((result) =>{
          let assume = result.slice(0, -1);
          const rows = assume.split("\n");
          console.log(rows);
          const newItems = rows.map((row, index) => ({ id: index, value: row }));
          setItems(newItems);
          ABC.getCD()
          .then((result)=>{
            Ccd(result);
            console.log("result"+result);
          })
          .catch((error)=>{
            console.log(error);
          });
        })
        .catch((error)=>{
          console.log(error);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
      }, 50);
    
      return () => clearTimeout(timer);
    })
    .catch((error)=>{

    });
    
  };

  const [connected, changestatus] = React.useState('');
    const makePeriodicCall = (ip, username, password) => {
        setInterval(() => {
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
        }, 4000);
      }

    useEffect(() => {
        const intervalId = makePeriodicCall(IpAddress,Username,password);
        return () => clearInterval(intervalId);
      }, [IpAddress, Username, password]);



      
  return (
    <View style={styles.container}>
      {/* <View style={{backgroundColor:'#7B7964', }}> */}
      <LinearGradient colors={['#174c9a', '#181818', ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                >
        <Text style={{fontSize:60, fontWeight:500, paddingLeft:10, paddingRight:10, paddingTop:10, fontFamily: 'NeueMontreal-Medium', color:"#FFFFFF",  marginBottom:20 }}>
          File manager
        </Text>
        <View style={{ backgroundColor:'#FF353500',padding:10, alignSelf: 'flex-end', flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginBottom:10}}>
            <View style={{backgroundColor:'#00000084', padding:10, borderRadius:20, borderWidth:0.3, borderColor:'#ffffff', marginRight:10, }}>
              <Text style={{paddingLeft:5, paddingRight:5, fontFamily: 'NeueMontreal-Regular', }}>
                  {connected}
              </Text>
            </View>
            <View style={{ backgroundColor:'#97636300'}}>
                <View style={styles2.buttonContainer}>
                    <TouchableOpacity style={styles2.button} 
                    onPress={handleButtonPress2}
                    >
                        <Text style={styles2.buttonText}>refresh</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} 
                onPress={handleButtonPress}
                >
                    <Text style={styles.buttonText}>←</Text>
                </TouchableOpacity>
            </View>
        </View>
      <View style={{backgroundColor:bg, borderTopLeftRadius:20,borderTopRightRadius:20, }}>
        <Text style={{fontSize:18, fontWeight:300, paddingLeft:15, paddingRight:15, paddingTop:10, marginBottom:10, fontFamily: 'NeueMontreal-Regular', color:"#FFFFFF" }}>
          {cd}
        </Text>
      </View>

      {/* </View> */}
      </LinearGradient>
                {/* <LinearGradient colors={['#E74646', '#B3C99C',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}> */}
      <View>{loading && (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}><ActivityIndicator size="large" color="#FFFFFF" /></View>)}</View>
      <View style={{justifyContent:"center", alignItems:"center", backgroundColor:bg }}>{Error && (<Image source={require('../assets/icons/computer.png')} style={{ width: 50, height: 50, resizeMode: 'contain', tintColor: '#8E8E8E',  }}/>)}</View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 0, paddingBottom:200 }}>
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              entering={
                initialMode.current ? FadeIn.delay(30 * index) : FadeIn
              }
              exiting={FadeOut}
              layout={Layout.delay(30)}
              // onTouchEnd={() => onDelete(item.id)}
              onTouchEnd={() => Clog(item.id)}
              style={styles.listItem}
              >
              <TouchableOpacity style={{backgroundColor:'#63636320', borderRadius: 5, height: 40,}}>
                <Text style={{paddingLeft:10, paddingTop:15, fontSize:20, fontFamily: 'NeueMontreal-Bold', color:"#FFFFFFBD"}}>{item.value}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
      {/* </LinearGradient> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
  },
  listItem: {
    height: 40,
    backgroundColor: LIST_ITEM_COLOR,
    width: '95%',
    marginVertical: 2,
    borderRadius: 5,
    alignSelf: 'center',
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 40,
    position: 'absolute',
    bottom: 50,
    right: '5%',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    // paddingLeft: 60,
    paddingRight: 10,
    // paddingBottom:20,
  },
  button: {
      height: 35,
      width:120,
      backgroundColor: '#FF75EF52',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderWidth:0.3,
      borderColor:'#FFFFFF',
  },
  buttonText: {
      fontSize: 30,
  },

});

const styles2 = StyleSheet.create({
  buttonContainer: {
    // paddingLeft: 60,
    paddingRight: 10,
    // paddingBottom:20,
  },
  button: {
    height: 35,
    width:120,
    backgroundColor: '#5290F368',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth:0.3,
    borderColor:'#ffffff'
  },
  buttonText: {
    // fontSize: 20,
    fontFamily: 'NeueMontreal-Regular',
  },

});

export default FileScreen;
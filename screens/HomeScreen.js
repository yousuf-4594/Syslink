import React, { useState, useEffect, useRef,  memo, useReducer  } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions,  TouchableOpacity, Button, Image, TextInput, FlatList, } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from "react-native-modal";

import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressBar from 'react-native-progress/Bar';

import ABC from '../CustomModule';

import Slider from '@react-native-community/slider';

import { ExampleTwo } from './exampleTwo';

const screenWidth = Dimensions.get('window').width;
const sliderWidth = screenWidth *0.8 ; // 80% of screen width

// const color1="#252526";
// const color2="#3175db";

// const bg1="##472D2D";
// const bg2="#e2e1e1";//real metrics
// const bg3="#e2e1e1";//myconnection
// const bg4="#e2e1e1";//disk + wifi
// const bg5="#e2e1e1";//volume + power
// const bg6="#e2e1e1";//process
// const bg7="#e2e1e1";
// const bg8="#3175db";//title

// const tbg1="#FFFFFF";
// const tbg2="#1F1F1F";
// const tbg3="#FFFFFF";

const color1="#1C1C1C";
const color2="#174c9a";

const bg1="#3B5A52";
const bg2="#2b3596";//real metrics
const bg3="#174c9a";//myconnection
const bg4="#2835b7";//disk + wifi
const bg5="#2835b7";//volume + power
const bg6="#174c9a";//process
const bg7="#174c9a";
const bg8="#151D10C2";//title

const tbg1="#FFFFFF";
const tbg2="#ffffff";
const tbg3="#FFFFFF";

const btnclr = "#FFFFFF98";






const Realtimeview = ({ cpuUsage,ramusage,uptime, location}) => {

  const [Dcpu, Ccpu] = useState(20);
  const [Dram, Cram] = useState(10);

  const [D2cpu, C2cpu] = useState(0.2);
  const [D2ram, C2ram] = useState(0.1);


  React.useEffect(() => {
    // console.log("realtime loaded\ncpu: "+cpuUsage+"\nram: "+ramusage+"\nuptime: "+uptime+"\nlocation: "+location);

    let var1 = parseFloat(cpuUsage.slice(0,-1));
    // console.log("cpuval  : "+var1);
    let var2 = parseFloat(ramusage.slice(0,-1));
    // console.log("ramval  : "+var2);

    if(var1>0){
      Ccpu(var1);
      C2cpu(var1/100);
    }
    if(var2>0){
      Cram(var2);
      C2ram(var2/100);
    }
    
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [progress, setProgress] = useState(0.3);

    return (
      <View style={{...Realtimeviewstyles.container, backgroundColor: bg2, marginTop:25,}}>
        <TouchableOpacity onPress={toggleModal}>
        <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:bg2, borderWidth:0.3, flexDirection:'row', justifyContent: 'space-between'}}>                        
          <Text style={{...info.title, margin:10, fontFamily:"NeueMontreal-Bold", color:tbg1, fontSize:25}}>Real time metrics</Text>    
          <Text style={{
                        marginRight:15,
                        margin:10,
                        fontSize:20, color:tbg2
                      }}>→</Text>     
        </View>
        </TouchableOpacity>
        <View style={{backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingBottom:15, paddingLeft:5, paddingRight:5, alignItems:'flex-end', flex:1}}>
          <View style={{justifyContent: 'space-evenly', backgroundColor:"#AAAAAA00", height:"100%"}}>
            <Text style={info.normal}>System Uptime</Text>
            <Text style={info.normal}>Power usage</Text>
            <Text style={info.normal}>Location</Text>
          </View>
          <View style={{ alignItems:'flex-end', paddingRight:5, justifyContent: 'space-evenly', backgroundColor:"#6D383800", height:"100%"}}>
            <Text style={{...info.normal, backgroundColor:"#C2212100"}}>{uptime.slice(0,-2)}</Text>
            <Text style={info.normal}>11W</Text>
            <Text style={{...info.normal, backgroundColor:"#C2212100"}}>{location.slice(0,-1)}</Text>
          </View>
      </View>
        <View style={{flex:1, backgroundColor:'#AAAAAA00'}}>
          <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems:'flex-end', marginLeft:15, marginRight:15 }}>
            <Text style={{flex:1, marginBottom:5, fontSize:20, fontFamily:'NeueMontreal-Medium',  color:tbg2}}>
              Cpu usage
            </Text>
            <ProgressBar progress={D2cpu} width={120} height={20} borderWidth={1} color='#EC5280' borderColor='#545252' borderRadius={15} backgroundColor='#ffffff'  />
          </View>
            <Text style={{textAlign:'right', marginRight:15, marginTop:5, fontFamily:'NeueMontreal-Medium',  color:tbg2}}>{Dcpu}%</Text>
          <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems:'flex-end', marginTop:15, marginLeft:15, marginRight:15 }}>
            <Text style={{flex:1, marginBottom:5, fontSize:20, fontFamily:'NeueMontreal-Medium', color:tbg2}}>
              RAM usage 
            </Text>
            <ProgressBar progress={D2ram} width={120} height={20} borderWidth={1} color='#5273EC' borderColor='#545252' borderRadius={15} backgroundColor='#ffffff' />
          </View>
            <Text style={{textAlign:'right', marginRight:15, marginTop:5, fontFamily:'NeueMontreal-Medium',  color:tbg2}}>{Dram}%</Text>
        </View>
        <Modal
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                isVisible={isModalVisible}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={500}
                animationOutTiming={100}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={100}
                style={styles.modal}
              >
                <View style={styles.modalContent}>
                  <View style={styles.center}>
                    <View style={styles.barIcon} />
                    <Text style={styles.text}>Real time metrics</Text>
                  </View>
                </View>
              </Modal>





      </View>
    );
};
  


const WifiDiskview = ({ ip, username, password, diskval, wifival }) => {

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  
  const [Dwifi, Cwifi] = useState('0.0');
  const [Ddisk, Cdisk] = useState('0.0');
  const [D1disk, C1disk] = useState('0.0');
  const [D2disk, C2disk] = useState('0.0');
  const [D3disk, C3disk] = useState('0.0');
  const [Dpercent, Cpercent] = useState(0);
  const [Ddown, Cdown] = useState(0);
  const [Dupload, Cupload] = useState(0);
  const [Dping, Cping] = useState(0);


  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
    ABC.Diskusage(ip, username, password)
    .then((result)=>{
      if(result!=null){
        // console.log(result);

        let rowLength = Math.ceil(result.length/3);
        C1disk(result.substring(0, rowLength).replace('@', ''));
        C2disk(result.substring(rowLength, 2*rowLength).replace('@', ''));
        C3disk(result.substring(2*rowLength).replace('\n', ''));

      }
    })
    .catch(error =>{
      console.log(error);
    });

  };


  useEffect(() => {
        let result = diskval;
        let rowLength = Math.ceil(result.length/3);
        C1disk(result.substring(0, rowLength).replace('@', ''));
        C2disk(result.substring(rowLength, 2*rowLength).replace('@', ''));
        C3disk(result.substring(2*rowLength).replace('\n', ''));

        let a = result.substring(0, rowLength).replace('@', '');
        let b = result.substring(rowLength, 2*rowLength).replace('@', '');
        let tval = parseInt(a.replace('G',''));
        let val = parseInt(b.replace('G',''));
        Cpercent((val/tval)*100);

      // console.log(wifival);
      let arr = wifival.split('\n');
      Cping(arr[0]);
      Cdown(arr[1]);
      Cupload(arr[2]);

  });
  

  

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);

    ABC.wifiinfo(ip, username, password)
    .then((result)=>{
      if(result!=null){
        Cwifi(result.slice(0, -1));
        // console.log(result);
      }
    })
    .catch(error =>{
      console.log(error);
    });
  };



    return (
      <View >
            <View style={{...WifiDiskviewstyles.disk, marginTop:25, marginLeft:25, backgroundColor:bg4}}>
            <TouchableOpacity onPress={toggleModal1}>
                <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:bg4, borderWidth:0.3, flexDirection:'row', justifyContent: 'space-between'}}>                        
                  <Text style={{...info.title, margin:10, fontFamily:"NeueMontreal-Bold",  color:tbg1, fontSize:25}}>Disk usage</Text>   
                  <Text style={{
                        marginRight:15,
                        margin:10,
                        fontSize:20,
                        color:tbg2
                      }}>→</Text>                       
                </View>
            </TouchableOpacity>
              <View style={{backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingBottom:15, paddingLeft:5, paddingRight:5, }}>
                <View>
                  <Text style={{marginLeft:10,margin:5,fontSize:15,fontFamily:"NeueMontreal-Medium", color:tbg2}}>Active time</Text>
                  <Text style={info.normal}>{D2disk}/{D1disk}</Text>
                </View>
                <View style={{ alignItems:'flex-end', paddingRight:5, paddingTop:5, paddingBottom:5, }}>
                      
                
     
                <CircularProgress
                  value={Dpercent}
                  radius={45}
                  inActiveStrokeOpacity={0.3}
                  activeStrokeWidth={10}
                  inActiveStrokeWidth={10}
                  progressValueStyle={{ fontWeight: '200', color: 'white' , fontFamily:"NeueMontreal-Medium"}}
                  activeStrokeSecondaryColor='#EC5252'
                  inActiveStrokeColor='#131313'
                  dashedStrokeConfig={{
                    count: 50,
                    width: 4,
                  }}
                />


                </View>
              </View>
            </View>
            <View style={{...WifiDiskviewstyles.wifi, marginLeft:25, marginTop:25, backgroundColor:bg4}}>
                <TouchableOpacity onPress={toggleModal2}>
                    <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:bg4, borderWidth:0.3, flexDirection:'row', justifyContent: 'space-between',}}>                        
                      <Text style={{...info.title, margin:10, fontFamily:"NeueMontreal-Bold", color:tbg1, fontSize:25}}>Wifi connection</Text>
                      <Text style={{
                        marginRight:15,
                        margin:10,
                        fontSize:20,
                      }}>→</Text>                   
                    </View>
                </TouchableOpacity>
                    <View style={{backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingLeft:5, paddingRight:5, alignItems:'flex-end', marginTop:5}}>
                        <View style={{ alignItems:'center'}}>
                          <Text style={info.normal}>↑ Upload</Text>
                          <Text style={{...info.normal, fontSize:15}}>{Dupload}MBit/s</Text>
                        </View>
                        <View style={{ alignItems:'center', paddingRight:5}}>
                            <Text style={info.normal}>↓ Down</Text>
                            <Text style={{...info.normal, fontSize:15}}>{Ddown}MBit/s</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', alignItems:'flex-end', marginTop:5}}>
                        <Text style={{marginLeft:27, fontSize:20, fontFamily:"NeueMontreal-Medium", marginTop:5, color:tbg2}}>ping</Text>
                        <Text style={{marginRight:18, fontSize:18, fontFamily:"NeueMontreal-Medium", marginTop:5, color:tbg2}}>{Dping}</Text>
                    </View>
            </View>


            <Modal
                onBackdropPress={() => setModalVisible1(false)}
                onBackButtonPress={() => setModalVisible1(false)}
                isVisible={isModalVisible1}
                swipeDirection="down"
                onSwipeComplete={toggleModal1}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={500}
                animationOutTiming={100}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={100}
                style={styles.modal}
              >
                <View style={{backgroundColor: "#3B5A52",
                      paddingTop: 12,
                      paddingHorizontal: 12,
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                      minHeight: 250,
                      paddingBottom: 20,  }}>
                  <View style={{alignItems:'center'}}>
                      <View style={{...styles.barIcon}} />
                      <Text style={{...styles.text, margin:5, fontFamily:"NeueMontreal-Bold"}}>Disk usage</Text>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent: 'space-between', paddingTop:25, paddingLeft:5, paddingRight:5, alignItems:'flex-end'}}>
                    <View style={{backgroundColor:"#FFFFFF00", paddingLeft:5}}>
                      <Text style={{...styles.text, margin:5}}>Total space on Disk</Text>
                      <Text style={{...styles.text, margin:5}}>Total space used</Text>
                      <Text style={{...styles.text, margin:5}}>Total space avaliable</Text>

                    </View>
                    <View style={{backgroundColor:"#C12F2F00", paddingRight:5}}>
                      <Text style={{...styles.text, margin:5}}>{D1disk}</Text>
                      <Text style={{...styles.text, margin:5}}>{D2disk}</Text>
                      <Text style={{...styles.text, margin:5}}>{D3disk}</Text>
                    </View>
                  </View>
                </View>
              </Modal>



              <Modal
                onBackdropPress={() => setModalVisible2(false)}
                onBackButtonPress={() => setModalVisible2(false)}
                isVisible={isModalVisible2}
                swipeDirection="down"
                onSwipeComplete={toggleModal2}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={500}
                animationOutTiming={100}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={100}
                style={styles.modal}
              >
                <View style={{backgroundColor: "#3B5A52",
                      paddingTop: 12,
                      paddingHorizontal: 12,
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                      minHeight: 300,
                      paddingBottom: 20,  }}>
                  <View style={{alignItems:'center'}}>
                      <View style={{...styles.barIcon, }} />
                      <Text style={{...styles.text, margin:5, fontFamily:"NeueMontreal-Bold"}}>Wifi connection</Text>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent: 'space-between', paddingTop:25, paddingLeft:5, paddingRight:5, alignItems:'flex-end'}}>
                    <View style={{backgroundColor:"#F1181800", paddingLeft:5, }}>
                      <Text style={{...styles.text, margin:5}}>Connection type</Text>
                      <Text style={{...styles.text, margin:5}}>Host name</Text>
                      <Text style={{...styles.text, margin:5}}>Interface</Text>
                      <Text style={{...styles.text, margin:5}}>Connection type</Text>
                      <Text style={{...styles.text, margin:5}}>Ip address</Text>
                    </View>
                    <View style={{backgroundColor:"#C12F2F00", paddingRight:5}}>
                      <Text style={{...styles.text, lineHeight:42, textAlign: 'right'}}>{Dwifi}</Text>
                    </View>
                  </View>
                </View>
              </Modal>



      </View>
    );
};



const HomeScreen = ({navigation})=>{
    // console.log("geg");

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation]);


      const [Dbool, Cbool] = useState(false);
      const [isModalVisible, setModalVisible] = useState(false);
      const [isModalVisible22, setModalVisible22] = useState(false);
      const [isModalVisible3, setModalVisible3] = useState(false);

      ///Power management -*-+*-/+-/*/+-/*/*-+/*-/*/+-*/-+/*-/+/*+/*-/+-/*-/*-+/*+-/-*/+*-/*-+/*-+/-/*/+-/*-/+*-/*+-/*-/+-/*-+/*+-/*-+/*-+//-+/*-+//
      const handleButtonPress1 = async (ip, username, password) => {
        console.log("\tip: "+ip+"\tuname: "+username+"\tpass: "+password);
        setModalVisible(!isModalVisible);
        ABC.powermanagement(ip, username, password, 1, 0)
        .then(result=>{
          console.log("immideate shutdown success");
        })
        .catch((error)=>{
          console.log("cant immideate shutdown"+error);
        });
      };
      const handleButtonPress11 = async () => {
        setModalVisible(!isModalVisible);
      };
      
      
      const handleButtonPress2 = async (ip, username, password) => {
          console.log("\tip: "+ip+"\tuname: "+username+"\tpass: "+password);
          setModalVisible22(!isModalVisible22);
          ABC.powermanagement(ip, username, password, 2, 0)
          .then(result=>{
            console.log("immideate restart success");
          })
          .catch((error)=>{
            console.log("cant immideate restart"+error);
          });
          
        
      };
      const handleButtonPress22 = () => {
        setModalVisible22(!isModalVisible22);
      };
      

      const handleButtonPress30 = (IpAddress, Username, password) => {
        setModalVisible3(!isModalVisible3);

        ABC.powermanagement(IpAddress, Username, password, 3, number1)
          .then((result)=>{
            console.log("Schedule shutdown"+number1);
          })
          .catch((error)=>{
            console.log("power err: "+error);
          });
      };
      const handleButtonPress31 = async (ip, username, password) => {
        setModalVisible3(!isModalVisible3);
        console.log("Schedule restart"+number1);

        ABC.powermanagement(ip, username, password, 4, number1)
          .then(result=>{
            console.log("schedule restart success");
          })
          .catch((error)=>{
            console.log("cant schedule restart"+error);
          });
      };
      const handleButtonPress33 = () => {
        setModalVisible3(!isModalVisible3);
      };
      ///-*-+*-/+-/*/+-/*/*-+/*-/*/+-*/-+/*-/+/*+/*-/+-/*-/*-+/*+-/-*/+*-/*-+/*-+/-/*/+-/*-/+*-/*+-/*-/+-/*-+/*+-/*-+/*-+//-+/*-+//



      const [isModalVisible1, setModalVisible1] = useState(false);
      const [isModalVisible2, setModalVisible2] = useState(false);

      //process info
      const toggleModal1 = (ip, username, password) => {
        setModalVisible1(!isModalVisible1);
      };
      const processshow = (IpAddress, Username, password) =>{
        ABC.processDesc(IpAddress, Username, password)
        .then((result)=>{
            console.log(result);

            // let c = result.split('\n');

            Cprocinfo(result.split('\n').map(row => row.split('@')));

            // console.log(c.map((c) => c.replace(/@/g, '\t')));
        })
        .catch(error =>{
          console.log(error);
        })
      };

      const usersshow = (IpAddress, Username, password) =>{
        ABC.usersDesc(IpAddress, Username, password)
        .then((result)=>{
            console.log(result);

            Cusersinfo(result);
            // let c = result.split('\n');


            // console.log(c.map((c) => c.replace(/@/g, '\t')));
        })
        .catch(error =>{
          console.log(error);
        })

      };


      const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
      };

        // const [Dipaddress, Cipaddress] = React.useState('');
        // const [Dusername, Cusername] = React.useState('');
        // const [Dstatus, Cstatus] = React.useState('');

        const [Duptime, Cuptime] = React.useState('0');
        // const [Dpower, Cpower] = React.useState('');
        const [Dproc, Cproc] = React.useState('0');
        const [Dcpu, Ccpu] = React.useState('0');
        const [Dloc, Cloc] = React.useState('0');
        const [Dram, Cram] = React.useState('0');
        const [Dwifi, Cwifi] = React.useState('0');
        const [Ddisk, Cdisk] = React.useState('0');
        const [IpAddress, Cipaddress] = React.useState('');
        const [Username, Cusername] = React.useState('');
        const [password, Cpass] = React.useState('');
        const [Dprocinfo, Cprocinfo] = React.useState([]);
        const [Dusersinfo, Cusersinfo] = React.useState('');
        const [IpAddress2, CIpAddress2] = React.useState('');
        const [Username2, Cusername2] = React.useState('');
        const [password2, Cpass2] = React.useState('');

        const initialState = {
          IpAddress: '',
          Username: '',
          password: ''
        };
        
        function reducer(state, action) {
          switch (action.type) {
            case 'SET_IP_ADDRESS':
              return {
                ...state,
                IpAddress: action.payload
              };
            case 'SET_USERNAME':
              return {
                ...state,
                Username: action.payload
              };
            case 'SET_PASSWORD':
              return {
                ...state,
                password: action.payload
              };
            default:
              return state;
          }
        }
        
          const [state, dispatch] = useReducer(reducer, initialState);
        
          function handleIpAddressChange(ipAddress) {
            dispatch({ type: 'SET_IP_ADDRESS', payload: ipAddress });
          }
        
          function handleUsernameChange(username) {
            dispatch({ type: 'SET_USERNAME', payload: username });
          }
        
          function handlePasswordChange(password) {
            dispatch({ type: 'SET_PASSWORD', payload: password });
          }
        
        

        const fetchIpAddress = async () => {
          try {
            const a = await AsyncStorage.getItem("ip4594");
            if (a !== null) {
              Cipaddress(JSON.parse(a));
              handleIpAddressChange(JSON.parse(a));

              // const parsedData = JSON.parse(IpAddress2);
              // const current = parsedData.current;
              // console.log(current); //

              // console.log("whats:"+current);
            }
          }catch (e) {
            console.log('Failed to fetch data1');
          }
        }
        const fetchUsername = async () => {
          try {
            const a = await AsyncStorage.getItem("u4594");
            if (a !== null) {
              Cusername(JSON.parse(a));
              handleUsernameChange(JSON.parse(a));
              // console.log(Username);
            }
          }catch (e) {
            console.log('Failed to fetch data2');
          }
        }
        const fetchpass = async () => {
          try {
            const a = await AsyncStorage.getItem("p4594");
            if (a !== null) {
              Cpass(JSON.parse(a));
              handlePasswordChange(JSON.parse(a));
              // console.log(Username);
            }
          }catch (e) {
            console.log('Failed to fetch data3');
          }
        }
        useEffect(() => {
          fetchIpAddress();
          fetchUsername();
          fetchpass();

        }, []);

        
      // useEffect(() => {
      //   const intervalId = setInterval(() => {
      //     ABC.ExecuteCommand("192.168.100.23", "yousuf", "123", "cat /tmp/syslink/cpuusage")
      //       .then((result) => {
      //         if (result === true) {
      //           Ccpu(result);
      //           console.log(result);
      //         } else {
      //           Ccpu("0");
      //         }
      //         // console.log(result);
      //       })
      //       .catch(error => {
      //         Ccpu("-");
      //         console.log(error);
      //       });
      //   }, 2000);

      //   return () => clearInterval(intervalId);
      // }, []);

      // cons makePeriodicCall = (ip, username, password, setCpu) => {
      //   const intervalIdRef = useRef(null);
        
      //   useEffect(() => {
      //     if (!intervalIdRef.current) {
      //       intervalIdRef.current = setInterval(() => {
      //         ABC.ExecuteCommand(ip, username, password, "cat /tmp/syslink/cpuusage")
      //           .then((result) => {
      //             if (result == true) {
      //               Ccpu(result);
      //             } else {
      //               Ccpu("40");
      //             }
      //             console.log("Dcpu: " + Dcpu + "\tresult: " + result);
      //           })
      //           .catch(error => {
      //             Ccpu("-");
      //             console.log(error);
      //           });
      //       }, 500);
      //     }
      //     return () => {
      //       clearInterval(intervalIdRef.current);
      //       intervalIdRef.current = null;
      //     };
      //   }, [ip, username, password, setCpu]);
      // };
      // makePeriodicCall("192.168.100.23", "yousuf", "123", Ccpu);

      const [connected, changestatus] = React.useState('');
      const [proceed, Cproceed] = React.useState(true);

      const makePeriodicCall = (ip, username, password) => {
        setInterval(() => {
          if(proceed===true){
              console.log("hello"+ip+username+password);
              Cproceed(false);
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
            
              console.log("buhuhuhuhuh Connected: "+connected+"\tproceed: "+proceed);
              console.log("OK");
            ABC.Pcpu(ip, username, password)
            .then((result)=>{
              // if(result.length > 0){
                console.log("ok");
                
                ABC.getcpu()
                .then(result =>{
                  if(result.length > 0)
                    Ccpu(result);
                    // console.log(result);
                })
                .catch(error=>{
                  console.log("error ARarafasgds");
                });

                ABC.getram()
                .then(result =>{
                  if( result.length > 0)
                    Cram(result);
                    // console.log(result);
                })
                .catch(error=>{
                  console.log("error ARarafasgds");
                });

                ABC.getuptime()
                .then(result =>{
                  if(result.length > 0)
                    Cuptime(result);
                    // console.log(result);
                })
                .catch(error=>{
                  console.log("error ARarafasgds");
                });

                ABC.getprocess()
                .then(result =>{
                  if(result.length > 0)
                    Cproc(result);
                    // console.log(result);
                })
                .catch(error=>{
                  console.log("error ARarafasgds");
                });

                ABC.getlocation()
                .then(result =>{
                  if(result.length > 0)
                    Cloc(result);
                })
                .catch(error=>{
                  console.log("error ARarafasgds");
                });

                ABC.getwifi()
                .then(result =>{
                  if(result.length > 0)
                    Cwifi(result);
                })
                .catch(error=>{
                  console.log("error ARarafasgds");
                });

                console.log("proceed: "+proceed);
                Cproceed(true);

            })
            .catch(error =>{
              console.log(error);
            });

            ABC.Diskusage(ip, username, password)
            .then((result)=>{
              if(result!=null){
                Cdisk(result);
                // console.log(result);
              }
            })
            .catch(error =>{
              console.log(error);
            });
          }


          }, 4000);
        }
  
  
      useEffect(() => {
          const intervalId = makePeriodicCall(IpAddress,Username, password);
          // const intervalId = makePeriodicCall(state.IpAddress, state.Username, state.password);
          return () => clearInterval(intervalId);
        // }, [IpAddress, Username, password]);
      // }, [state.IpAddress, state.Username, state.password]);
        }, [IpAddress, Username, password]);

        //increase decrease volume slider
        function handleSliderComplete(IpAddress, Username, password) {
          // console.log('Slider value:', value, "\tip: "+IpAddress+"\tuname: "+Username+"\tpass: "+password);
          ABC.ExecuteCommand(IpAddress, Username, password, "/syslink/command/volume.syslink "+value)
          .then((result)=>{
            console.log("inc vol success");
          })
          .catch((error)=>{
            console.log("cant inc vol");
          });
        }

        const [number1, onChangeNumber1] = React.useState('');
        const [value, setValue] = useState(0.5);


        
        const renderRow = ({ item }) => (
          <View style={{ backgroundColor:"#FFFFFF68", flex:1, width:"100%"}}>
            {item.split('@').map((col, index) => (
              <Text key={index} style={{ flex: 1 }}>{col}</Text>
            ))}
          </View>
        );

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={[styles.cardTop, {backgroundColor:color2}]}>
                    <View style={{backgroundColor:'#EDFF8800'}}>
                        <Image 
                            source={require('../assets/icons/mainfaceicon.png')} 
                            style={{ width: 50, height: 50, marginLeft:10 }} 
                            resizeMode="contain"
                        />
                    </View>
                    <View style={{backgroundColor:'#FF141400', marginRight:40}}>
                        <Text style={{fontSize:24, fontFamily:'NeueMontreal-Bold', color:tbg1}}>Good to see you again</Text>    
                    </View>
                    <View>
                        <Image 
                            source={require('../assets/icons/moon.png')} 
                            style={{ width: 20, height: 20, marginRight:20 }} 
                            resizeMode="contain"
                        />
                    </View>
                    
                </View>
                <View style={{...styles.card, height:180, backgroundColor:bg3, marginTop:20 }}>
                    <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:'#545353', borderWidth:1,}}>                        
                            <Text style={{...info.title, margin:10, fontFamily:"NeueMontreal-Bold", fontSize:25}}>My connection</Text>                        
                    </View>
                    <View style={{backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingBottom:15, paddingLeft:5, paddingRight:5, alignItems:'center', flex:1}}>
                        <View style={{backgroundColor:'#90464600', flex:1, }}>
                          <Text style={info.normal}>Ip address</Text>
                          <Text style={info.normal}>Username</Text>
                          <Text style={info.normal}>Status</Text>
                        </View >
                        <View style={{ alignItems:'flex-end', paddingRight:5, backgroundColor:'#46729000', flex:1}}>
                          <Text style={info.normal}>{IpAddress}</Text>
                          <Text style={info.normal}>{Username}</Text>
                          <Text style={info.normal}>{connected}</Text>
                        
                        </View>
                    </View>
                </View>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>                  
                    <Realtimeview cpuUsage={Dcpu} ramusage={Dram} uptime={Duptime} location={Dloc}/>
                    <WifiDiskview  ip={IpAddress} username={Username} password={password} diskval={Ddisk} wifival={Dwifi}/>
                </ScrollView>

                <View style={{
                  height: 110,
                  backgroundColor: bg5,
                  margin:5,
                  marginLeft:10,
                  marginRight:10,
                  marginTop:25,
                  borderRadius: 30,
                  borderColor:bg5, borderWidth:0.3, 
                }}>
                    <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:bg5, borderWidth:0.3, }}>                        
                      <Text style={{...info.title, fontFamily:"NeueMontreal-Bold",  margin:10,  color:tbg1, fontSize:25}}>Volume</Text>                        
                    </View>
                    <View style={{alignItems: 'center', justifyContent:'center', backgroundColor:'#24242400', marginTop:10 }}>
                    <View style={{backgroundColor:"#5454540A", width:"100%", alignItems: 'center', justifyContent:'center', borderRadius:30, margin:5, flexDirection:'row', alignItems:'flex-end'}}>
                      <Slider
                        style={{width: "80%", height: 27, }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#D3D3D3"
                        maximumTrackTintColor="#000000"
                        onValueChange={(value) => setValue(value)}
                        onSlidingComplete={() => handleSliderComplete(IpAddress, Username, password)}
                      />
{/* {() => handleButtonPress30(IpAddress, Username, password)} */}
                      <Text style={{fontSize:25, fontFamily:"NeueMontreal-Medium"}}>{parseInt(value)}</Text>
                    </View>
                  </View>
                </View>



                <View style={{...styles.outershutdown, marginTop:25, borderColor:bg5, backgroundColor:"#184c97"}}>
                    <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:bg5, borderWidth:0.3,}}>                        
                            <Text style={{...info.title, margin:10, fontFamily:"NeueMontreal-Bold",  color:tbg1, fontSize:25}}>System Power</Text>                        
                    </View>
                  <View style={styles.shutdown}>
                    <View style={styles.innershutdown}>
                      <Text style={{fontSize:18, textAlign: 'center', marginTop:3, fontFamily:"NeueMontreal-Medium", color:tbg3}}>Shutdown</Text>
                    <View style={{ backgroundColor:'#EEE60200', flex:1}}>
                            <View style={{backgroundColor:'#282828BF', flex:1, marginTop:40, marginLeft:4, marginRight:4, marginBottom:4, borderRadius:30}}>
                                <TouchableOpacity style={{backgroundColor:'#FFFFFF00', flex:1}} onPress={handleButtonPress11}>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:40, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                </TouchableOpacity>
                            </View>
                    </View>

                    </View>
                    <View style={styles.innershutdown}>
                    <Text style={{fontSize:18, textAlign: 'center', marginTop:3, fontFamily:"NeueMontreal-Medium", color:tbg3}}>Restart</Text>
                    <View style={{ backgroundColor:'#EEE60200', flex:1}}>
                            <View style={{backgroundColor:'#282828BF', flex:1, marginTop:40, marginLeft:4, marginRight:4, marginBottom:4, borderRadius:30}}>
                                <TouchableOpacity style={{backgroundColor:'#FFFFFF00', flex:1}} onPress={handleButtonPress22}>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:40, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                </TouchableOpacity>
                            </View>
                    </View>

                    </View>
                    <View style={styles.innershutdown}>
                    <Text style={{fontSize:18, textAlign: 'center', marginTop:3, fontFamily:"NeueMontreal-Medium", color:tbg3}}>Schedule</Text>
                    <View style={{ backgroundColor:'#EEE60200', flex:1}}>
                            <View style={{backgroundColor:'#282828BF', flex:1, marginTop:40, marginLeft:4, marginRight:4, marginBottom:4, borderRadius:30}}>
                                <TouchableOpacity style={{backgroundColor:'#FFFFFF00', flex:1}} onPress={handleButtonPress33}>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:40, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                    <View style={{backgroundColor:btnclr, height:1, marginLeft:32, marginTop:10, marginRight:32}}></View>
                                </TouchableOpacity>
                            </View>
                    </View>
                    </View>
                  </View>

                </View>
                <View style={{
                  height: 223,
                  backgroundColor: bg6,
                  margin:5,
                  marginLeft:10,
                  marginRight:10,
                  borderRadius: 30,
                  marginTop:25,
                  borderColor:bg6, borderWidth:0.3,
                }}>
                    <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:'#747474', borderWidth:0.3, }}>                        
                      <Text style={{...info.title, margin:10, fontFamily:"NeueMontreal-Bold",  color:tbg1, fontSize:25}}>Process management</Text>                        
                    </View>
                    <View style={{ backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingBottom:15, paddingLeft:15, paddingRight:15, alignItems:'flex-end', marginTop:5, }}>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>Total processes</Text>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>{Dproc.split("@")[0]}</Text>
                      
                    </View>
                    <View style={{ backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingBottom:15, paddingLeft:15, paddingRight:15, alignItems:'flex-end',  }}>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>Active processes</Text>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>{Dproc.split("@")[1]}</Text>
                    </View>
                    <View style={{ backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingBottom:15, paddingLeft:15, paddingRight:15, alignItems:'flex-end',  }}>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>Sleeping processes</Text>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>{Dproc.trim().split("@")[2]}</Text>
                    </View>
                    {/* <View style={{height:1, backgroundColor:'#05050542', marginLeft:15, marginRight:15, }}></View> */}
                    
                    <View style={{backgroundColor:'#28282800', flex:1, flexDirection:'row'}}>
                      <View style={{flex:1, height:2, }}></View>
                      <TouchableOpacity style={{backgroundColor:'#B52A2A00', flex:0.5, borderRadius:30, marginTop:15, marginRight:15, marginBottom:15, borderWidth:0.5, borderColor:'#FFFFFF81'}} onPress={toggleModal1}>
                        <Text style={{fontSize:18, textAlign: 'center', marginTop:10, fontFamily:"NeueMontreal-Medium", color:tbg2 }}>View</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                  height: 150,
                  backgroundColor: bg7,
                  margin:5,
                  marginLeft:10,
                  marginRight:10,
                  marginTop:25,
                  borderRadius: 30,
                  borderColor:bg7, borderWidth:0.3,
                }}>
                    <View style={{backgroundColor:bg8, borderTopLeftRadius:30, borderTopRightRadius:30, paddingLeft:5, borderColor:'#747474', borderWidth:0.3, }}>                        
                      <Text style={{...info.title, margin:10, fontFamily:"NeueMontreal-Bold", color:tbg1, fontSize:25}}>Profiles</Text>                        
                    </View>
                    <View style={{ backgroundColor:'#FF1E1E00', flexDirection:'row', justifyContent: 'space-between', paddingBottom:15, paddingLeft:15, paddingRight:15, alignItems:'flex-end', marginTop:5, }}>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>Current profile</Text>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium", color:tbg2}}>Yousuf</Text>
                    </View>
                    {/* <View style={{height:1, backgroundColor:'#DFFFFF42', marginLeft:15, marginRight:15, }}></View> */}
                    
                    <View style={{backgroundColor:'#28282800', flex:1, flexDirection:'row'}}>
                      <View style={{flex:1, height:2, }}></View>
                      <TouchableOpacity style={{backgroundColor:'#B52A2A00', flex:0.5, borderRadius:30, marginTop:15, marginRight:15, marginBottom:15, borderWidth:0.5, borderColor:'#FFFFFF81'}} onPress={toggleModal2}>
                        <Text style={{fontSize:18, textAlign: 'center', marginTop:10, fontFamily:"NeueMontreal-Medium", color:tbg2 }}>View</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.empty}></View>
            </ScrollView>
                
              <Modal
                onBackdropPress={() => setModalVisible1(false)}
                onBackButtonPress={() => setModalVisible1(false)}
                isVisible={isModalVisible1}
                swipeDirection="down"
                onSwipeComplete={toggleModal1}
                onModalShow={() => processshow(IpAddress, Username, password)}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={500}
                animationOutTiming={100}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={100}
                style={styles.modal}
              >
                <View style={{...styles.modalContent, minHeight: 700,}}>
                  <View style={styles.center}>
                    <View style={styles.barIcon} />
                    <Text style={{...styles.text, fontSize:25, marginTop:5, marginBottom:10}}>Process management</Text>
                    {/* <Text>{Dprocinfo}</Text> */}
                    {/* <FlatList
                      data={Dprocinfo}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={renderRow}
                      style={{backgroundColor:"#932D2D00", width:"100%"}}
                    /> */}
                    <View style={{backgroundColor:'#ffffff', width:"100%"}}>
                      <ExampleTwo tableData={Dprocinfo} />
                    </View>
                  </View>
                </View>
              </Modal>

              <Modal 
                onBackdropPress={() => setModalVisible2(false)}
                onBackButtonPress={() => setModalVisible2(false)}
                isVisible={isModalVisible2}
                swipeDirection="down"
                onSwipeComplete={toggleModal2}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={500}
                animationOutTiming={100}
                onModalShow={() => usersshow(IpAddress, Username, password)}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={100}
                style={styles.modal}
              >
                <View style={{...styles.modalContent, minHeight:250}}>
                  <View style={styles.center}>
                    <View style={styles.barIcon} />
                    <Text style={{...styles.text, fontFamily:"NeueMontreal-Bold"}}>User management</Text>
                    <View style={{ flexDirection:'row', justifyContent: 'space-between', paddingTop:25, paddingLeft:5, paddingRight:5, alignItems:'flex-end'}}>
                    <View >
                      <View style={{backgroundColor:'#3C8E4B00', flex:1}}>
                        <Text style={{...styles.text, margin:5, fontSize:20, color:"#ffffff"}}>Regular users</Text>
                        <Text style={{...styles.text, margin:5, fontSize:20, color:"#ffffff"}}>Logged in users</Text>
                      </View>
                    </View>
                      <View style={{textAlign:'right', backgroundColor:'#AE212100', flex:1 }}>
                        <Text style={{...styles.text,margin:4, fontSize:20, lineHeight:32, color:"#D1D3A2"}}>{Dusersinfo}</Text>
                      </View>
                    </View>

                  </View>
                </View>
              </Modal>
              
              <Modal isVisible={isModalVisible}>
                <View style={{ backgroundColor:bg1, height:120, borderRadius:30, justifyContent: 'space-between' }}>
                  <View style={{alignItems: 'center' }}>

                    <Text style={{fontSize:25,  marginTop:15, marginLeft:10, fontFamily:"NeueMontreal-Medium"}}>Are you sure?</Text>
                  </View>
                  <View style={{flexDirection:'row',  backgroundColor:'#C9101000', width:"100%", justifyContent: 'space-between'}}>
                    
                    <TouchableOpacity onPress={() => handleButtonPress1(IpAddress, Username, password)} style={{ padding: 10, backgroundColor:'#EA4444E8', flex:1, alignItems: 'center', borderBottomLeftRadius:30, borderTopWidth:2, borderTopColor:'#EE6B6BE8'}}>
                      <Text style={{ fontFamily:"NeueMontreal-Medium"}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleButtonPress11} style={{ padding: 10, backgroundColor:'#50DA87E9', flex:1, alignItems: 'center', borderBottomRightRadius:30, borderTopWidth:2, borderTopColor:'#B0E1C4E9' }}>
                      <Text style={{ fontFamily:"NeueMontreal-Medium"}}>No</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </Modal>
              <Modal isVisible={isModalVisible22}>
                <View style={{ backgroundColor:bg1, height:120, borderRadius:30, justifyContent: 'space-between' }}>
                  <View style={{alignItems: 'center' }}>
                    <Text style={{fontSize:25,  marginTop:15, marginLeft:10, fontFamily:"NeueMontreal-Medium"}}>Are you sure ?</Text>
                  </View>
                  <View style={{flexDirection:'row',  backgroundColor:'#C9101000', width:"100%", justifyContent: 'space-between'}}>
                    
                    <TouchableOpacity onPress={()=>handleButtonPress2(IpAddress, Username, password)} style={{ padding: 10, backgroundColor:'#EA4444E8', flex:1, alignItems: 'center', borderBottomLeftRadius:30, borderTopWidth:2, borderTopColor:'#EE6B6BE8'}}>
                      <Text style={{ fontFamily:"NeueMontreal-Medium"}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleButtonPress22} style={{ padding: 10, backgroundColor:'#50DA87E9', flex:1, alignItems: 'center', borderBottomRightRadius:30, borderTopWidth:2, borderTopColor:'#B0E1C4E9' }}>
                      <Text style={{fontFamily:"NeueMontreal-Medium"}}>No</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </Modal>
              <Modal isVisible={isModalVisible3}>
                <View style={{ backgroundColor:bg1, height:200, borderRadius:30, justifyContent: 'space-between' }}>
                  <View style={{alignItems: 'center' }}>
                    <Text style={{fontSize:20,  marginTop:10, marginLeft:10, fontFamily:"NeueMontreal-Bold"}}>Schedule</Text>
                    <View style={{flexDirection:'row', backgroundColor:"#901E1E00", justifyContent: 'space-between', alignItems: 'center', marginTop:25}}>


                    <Text style={{flex:1, marginLeft:15, fontFamily:"NeueMontreal-Medium", fontSize:20}}>Enter Time (in minutes)</Text>
                    <TextInput
                                    style={{borderRadius:5,borderColor:'#000000',fontSize:20, flex:1, fontFamily:"NeueMontreal-Medium", backgroundColor:"#FFFFFF0E", marginRight:15 }}
                                    onChangeText={onChangeNumber1}
                                    value={number1}
                                    placeholder="minutes"
                                    keyboardType="numeric"  
                                />
                    </View>
                  </View>
                  <View style={{flexDirection:'row',  backgroundColor:"#FFFFFF00", width:"100%", justifyContent: 'space-between'}}>
                    
                    <TouchableOpacity onPress={() => handleButtonPress30(IpAddress, Username, password)} style={{ padding: 10, backgroundColor:'#F36528E8', flex:1, alignItems: 'center', borderBottomLeftRadius:30, borderTopWidth:2, borderTopColor:'#EF936BE8'}}>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium"}}>Shutdown</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>handleButtonPress31(IpAddress, Username, password)} style={{ padding: 10, backgroundColor:'#434EE4E9', flex:1, alignItems: 'center', borderTopWidth:2, borderTopColor:'#7179E9E9' }}>
                    <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium"}}>Restart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleButtonPress33} style={{ padding: 10, backgroundColor:'#3DE26EE9', flex:1, alignItems: 'center', borderBottomRightRadius:30, borderTopWidth:2, borderTopColor:'#AAECBDE9' }}>
                      <Text style={{fontSize:20, fontFamily:"NeueMontreal-Medium"}}>Cancel</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </Modal>




        </View> 
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color1,
    },
    card: {
      height: 150,
      backgroundColor: '#545353',
      margin:5,
      marginLeft:10,
      marginRight:10,
      borderRadius: 30,
      justifyContent: 'space-between',
      borderColor:'#545353', borderWidth:1,
    },
    cardTop:{
      height:90,
      backgroundColor: '#3D3D3D',
      marginVertical: 10,
      marginLeft: 10,
      marginRight:10,
      borderRadius: 90,
      alignItems:'center',
      justifyContent: 'space-between',
      flexDirection:'row',
    },
    empty:{
      height: 150,
      backgroundColor: '#54535300',
      width:screenWidth
    },
    shutdown:{
      height: 200,
      backgroundColor: '#2835b7',
      borderRadius: 30,
      justifyContent: 'space-between',
      flexDirection:'row',
    },
    innershutdown:{
      
      width:110,
      backgroundColor: '#838383',
      marginLeft:10,
      marginRight:10,
      marginTop:10,
      marginBottom:10,
      borderRadius: 30,
      borderColor:'#0000008B', borderWidth:0.3,
    },
    outershutdown:{
      height: 250,
      backgroundColor: '#545353',
      margin:5,
      marginLeft:10,
      marginRight:10,
      borderRadius: 30,
      justifyContent: 'space-between',
      borderColor:'#ffffff', borderWidth:0.3,
    },
    // buttonContainer: {
    //   paddingLeft: 60,
    //   paddingRight: 60,
    //   paddingBottom:20,
    // },
    // button: {
    //     height: 0,
    //     backgroundColor: '#E72929',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 8,
    // },
    // buttonText: {
    //     color: '#FFFFFF',
    //     fontSize: 25,
    // },
    flexView: {
      flex: 1,
      backgroundColor: "white",
    },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: "#3B5A52",
      paddingTop: 12,
      paddingHorizontal: 12,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      minHeight: 600,
      paddingBottom: 20,
      
    },
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    barIcon: {
      width: 160,
      height: 5,
      backgroundColor: "#bbb",
      borderRadius: 8,
      
    },
    text: {
      color: "#bbb",
      fontSize: 24,
      fontFamily:'NeueMontreal-Medium',
      color:tbg2,
    },
    btnContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 500,
    },

});

const Realtimeviewstyles = StyleSheet.create({
    container: {
      backgroundColor: '#3B3A3A',
      borderRadius: 30,
      marginLeft:10,
      margin:5,
      marginRight:5,
      width:sliderWidth,
      height:sliderWidth,
      borderColor:'#555555', borderWidth:0.3,
    },
});

const WifiDiskviewstyles = StyleSheet.create({
    disk: {
      flex: 1,
      backgroundColor: '#3B3A3A',
      borderRadius: 30,
      marginLeft:5,
      margin:5,
      marginRight:10,
      width:sliderWidth*0.8,
      height:sliderWidth/ (2*1.5),
    },
    wifi: {
        flex: 1,
        backgroundColor: '#3B3A3A',
        borderRadius: 30,
        marginLeft:5,
        margin:5,
        marginRight:10,
        width:sliderWidth*0.8,
        height:sliderWidth/(2*1.5),
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
    },
});

const info = StyleSheet.create({
    title:{
        marginLeft:10,
        margin:5,
        fontSize:20,
        fontFamily:'NeueMontreal-Medium',
        color:tbg2,
    },
    normal:{
        marginLeft:10,
        margin:5,
        fontSize:20,
        fontFamily:'NeueMontreal-Medium',
        color:tbg2,
    },
});
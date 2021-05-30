import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
import Peer from 'peerjs'
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground,
    PermissionsAndroid,
    Modal,
    FlatList,
    ScrollView,
    Keyboard,
    SafeAreaView,
} from 'react-native';

//ICON
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const DATA = [
    {
        name: 'ABC',
        icon: 'av-timer',
    },
    {
        name: 'DEF',
        icon: 'flight-takeoff',
    },
    {
        name: 'GHI',
        icon: 'flight-takeoff',
    },
];


const Calls = (props) => {

    // const userInfo = useSelector(state => state.userInfo)
    // console.log('userInfo: ', userInfo)

    const socket = useRef();
    const myPeer = useRef();
    const myVideo = useRef();
    const partnerVideo = useRef();

    const [myID, setMyID] = useState("");
    const [stream, setStream] = useState();
    const [caller, setCaller] = useState("");
    const [calling, setCalling] = useState(false);
    const [callerName, setCallerName] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const [callAccepted, setCallAccepted] = useState(false);
    const [callRejected, setCallRejected] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [isReceivingCall, setIsReceivingCall] = useState(false);

    useEffect(() => {
        // "http://192.168.10.8:5000"
        socket.current = io.connect("http://10.0.2.2:5000");

        socket.current.emit('userInfo', { name: 'WAHB UR REHMAN', userRole: 'healthWorker' })

        socket.current.on("yourID", (id) => {
            setMyID(id);
        })
        socket.current.on("allUsers", (users) => {
            console.log('all users: ', users)
            setConnectedUsers(users);
        })

        socket.current.on("callComing", (data) => {
            setIsReceivingCall(true);
            ringtoneSound.play();
            setCaller(data.callerID);
            setCallerName(data.callerName)
            setCallerSignal(data.signal);
        })
    }, []);


    const renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            underlayColor="lightgrey"
            containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                paddingVertical: 15,
                paddingHorizontal: 0
            }}
        >
            <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 40, alignItems: 'center' }}> */}
                {/* <Icon name={item.icon} size={30} color="#4169e1" /> */}
                {/* <Avatart /> */}
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <MaterialIcons name="video-call" size={30} color="#4169e1" />
                {/* </View> */}
            </ListItem.Content>
        </ListItem>

    );

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    backgroundColor: '#4169e1',
                }}
            />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>

            <View style={styles.contentView} >
                <View style={{ ...StyleSheet.absoluteFill }} >
                    <ImageBackground
                        source={require('../Images/bg0.jpg')}
                        style={{ ...styles.imageBackground }}
                    >
                        <FlatList
                            key={item => item.index}
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={renderSeparator}
                        />
                    </ImageBackground>
                </View>
            </View>
        </SafeAreaView >
    );
}

export default Calls;

const styles = StyleSheet.create({
    headerView: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#ffffff'
    },
    contentView: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        // borderTopLeftRadius: 80,
        borderRadius: 20
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '4%',
        paddingHorizontal: '7%',
        flexDirection: 'column',
    },
})

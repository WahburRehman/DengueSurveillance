import React, { useState, useEffect } from 'react';
import { } from 'react-native';
import { Chip } from 'react-native-paper';
import Contacts from 'react-native-contacts';
import Spinner from 'react-native-spinkit';
import { ListItem } from 'react-native-elements';
import { useNetInfo } from "@react-native-community/netinfo";
import { useSelector, useDispatch } from 'react-redux';
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
    Keyboard
} from 'react-native';
import {
    TextInput,
    HelperText
} from 'react-native-paper';


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//COMPONENTS
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';
import { SafeAreaView } from 'react-native';

//SCREEN WIDTH
const { width, height } = Dimensions.get('window');

const SendSms = (props) => {

    const netInfo = useNetInfo();
    console.log(netInfo);
    const [contacts, setContacts] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const userInfo = useSelector(state => state.userInfo);
    const [mobileNumber, setMobileNumber] = useState({
        number: '',
        errorMessage: 'Please Follow required format',
        showError: false
    });
    const [gotContacts, setGotContacts] = useState(false);
    console.log(recipients);

    const [loadingValues, setLoadingValues] = useState({
        isLoading: false,
        backgroundOpactiy: 1
    });

    const [message, setMessage] = useState({
        message: '',
        bgColor: 'transparent',
        error: 'This Should not be Empty!!',
        showError: false
    });

    const numberRegex = new RegExp('^03[0-9]{9}$');

    const getContacts = async () => {
        const per = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }
        )
        if (per === 'granted') {
            Contacts.getAll().then(contacts => {
                setContacts(contacts);
                setGotContacts(true);
                setShowModal(true);
            })
        } else {
            console.log('permission denied');
        }
    }

    const checkNumberFormat = (number) => {
        Keyboard.dismiss();
        console.log('NUMBER: ', number)
        if (!numberRegex.test(number)) {
            console.log('invalid format');
            setMobileNumber({ ...mobileNumber, showError: true });
        } else {
            if (recipients.length > 9) {
                alert("maximum 10 recipients can be selected");
            } else {
                setMobileNumber({ ...mobileNumber, number: '' });
                setRecipients([...recipients, number]);
            }
        }
    }

    const addNumberToList = number => {
        console.log(number);
        if (recipients.length > 9) {
            console.log('limit reached');
        } else {
            if (!numberRegex.test(number)) {
                console.log('invalid format')
            } else {
                setRecipients([...recipients, number])
            }
        }
    }

    const removeNumberFromList = number => {
        console.log('number: ', number)
        // console.log(numberSelected[chipIndex]);
        // setNumberSelected(numberSelected[chipIndex] = false)
        setRecipients(recipients.filter((item, index) => {
            console.log(item)
            return item !== number
        }));
    }

    const handleMessageFocus = () => {
        setMessage({
            ...message,
            showError: false,
            bgColor: '#FFE7F5'
        });
    }

    const handleMessageBlur = () => {
        setMessage({
            ...message,
            showError: false,
            bgColor: message.length ? '#FFE7F5' : 'transparent'
        });
    }

    const handleSendMessage = () => {
        if (!recipients.length) {
            alert("Please Add Recipient(s)")
        }
        else if (!message.message) {
            setMessage({ ...message, showError: true });
        } else {
            if (!netInfo.isConnected || !netInfo.isInternetReachable) {
                alert('You are not connected to the internet');
            } else {
                setLoadingValues({ isLoading: true, backgroundOpactiy: 0.4 });
                let newList = recipients.map(number => {
                    if (number.startsWith("0")) {
                        return number.replace("0", "+92")
                    } else {
                        return number;
                    }
                });
                fetch('http://10.0.2.2:3000/sendSMS', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + userInfo.authToken
                    },
                    body: JSON.stringify({
                        'recipients': newList,
                        'campaignMessage': message.message
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.error) {
                            console.log(data.error);
                            // setShowSnackbar(true);
                            // setServerResponse(data.error);
                        }
                        else if (data.message) {
                            console.log(data.message);
                        }
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => {
                        setLoadingValues({ isLoading: true, backgroundOpactiy: 0.4 });
                    });
            }

        }
    }


    //MODAL FUNCTIONS

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item, index }) => (
        <ListItem
            bottomDivider
            underlayColor="lightgrey"
            onPress={() => recipients.includes(item.phoneNumbers[0].number) ? removeNumberFromList(item.phoneNumbers[0].number) : addNumberToList(item.phoneNumbers[0].number)}
            containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                paddingVertical: 15,
                paddingHorizontal: 0
            }}
        >
            <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View style={{ alignSelf: 'center', marginRight: 20 }}>
                    <MaterialCommunityIcons
                        size={30}
                        color="#4169e1"
                        name={recipients.includes(item.phoneNumbers[0].number) ? 'circle' : 'circle-outline'}
                    />
                </View>
                <View>
                    <View style={{ ...styles.ModalListTitleView, marginBottom: 5 }}>
                        <Icon name="person" size={20} color="#4169e1" />
                        <ListItem.Title style={{ fontSize: 18, marginLeft: 10 }}>{item.displayName}</ListItem.Title>
                    </View>
                    <View style={styles.ModalListTitleView}>
                        <Icon name="call-sharp" size={20} color="#4169e1" />
                        <ListItem.Subtitle style={{ fontSize: 16, marginLeft: 13 }}>{item.phoneNumbers[0].number}</ListItem.Subtitle>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    )

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
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                {loadingValues.isLoading && < Spinner style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: '44%',
                    top: '50%'
                }} size={70} color="blue" type="Circle" />}
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate('home')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Send SMS</Text>

                    <View style={styles.iconView}>
                    </View>
                </View>

                <View style={styles.contentView} >
                    <View style={{ ...StyleSheet.absoluteFill }} >
                        <ImageBackground
                            source={require('../Images/bg0.jpg')}
                            style={{ ...styles.imageBackground, opacity: loadingValues.backgroundOpactiy }}
                        >
                            <ScrollView horizontal style={styles.chipView}>
                                {recipients.map((item, index) => {
                                    return <Chip
                                        mode="outlined"
                                        key={index}
                                        style={styles.chipStyling}
                                        textStyle={styles.chipText}
                                        onClose={() => removeNumberFromList(item)}
                                    >
                                        {item}
                                    </Chip>
                                })}
                            </ScrollView>

                            <View style={styles.numberFieldAndIconView} >
                                <MyTextInput
                                    textInputMode="contained"
                                    textInputLabel="Mobile Number"
                                    textInputWidth='88%'
                                    getText={mobileNumber.number}
                                    maxLength={11}
                                    keyboardType='number-pad'
                                    autoFocus={true}
                                    textInputPlaceHolder="03001234567"
                                    setText={(text) => setMobileNumber({ ...mobileNumber, number: text })}
                                    textInputMarginBottom={0.1}
                                    isError={mobileNumber.showError}
                                    onFocus={() => setMobileNumber({ ...mobileNumber, showError: false })}
                                // onBlur={() => addNumberToList(mobileNumber)}
                                />

                                <TouchableOpacity
                                    style={styles.iconView}
                                    activeOpacity={0.5}
                                    onPress={gotContacts ? () => setShowModal(true) : getContacts}
                                >
                                    <MaterialCommunityIcons name="contacts" size={35} color="#4169e1" />
                                </TouchableOpacity>
                            </View>

                            <HelperText
                                type="error"
                                visible={mobileNumber.showError}
                                style={styles.helperTextStyling}
                            >
                                {mobileNumber.errorMessage}
                            </HelperText>

                            <View style={{ zIndex: 1, marginBottom: 20 }}>
                                <MyButton
                                    buttonName='Add Number'
                                    buttonMode="contained"
                                    buttonIcon='phone-plus'
                                    buttonColor={commonStyles.primaryColor.backgroundColor}
                                    buttonWidth='100%'
                                    buttonDisabled={false}
                                    onPress={() => checkNumberFormat(mobileNumber.number)}
                                />
                            </View>


                            {/**************************************/}
                            {/*MESSAGE TEXT INPUT */}
                            {/**************************************/}


                            <TextInput
                                mode="outlined"
                                label="Message*"
                                multiline
                                maxLength={250}
                                numberOfLines={8}
                                value={message.message}
                                style={{
                                    width: '100%',
                                    fontSize: 18,
                                    backgroundColor: message.bgColor,
                                }}
                                theme={{ colors: { primary: commonStyles.primaryColor.backgroundColor, underlineColor: 'transparent', } }}
                                onFocus={handleMessageFocus}
                                placeholder="Enter Your Message Here...."
                                placeholderTextColor={commonStyles.placeHolderColor.color}
                                onChangeText={(text) => setMessage({ ...message, message: text })}
                                error={message.showError ? true : false}
                                onBlur={handleMessageBlur}
                            />

                            {console.log(message.message)}

                            {/*******************************************/}
                            {/* HELPER TEXT FOR MESSAGE */}
                            {/*******************************************/}


                            <View style={styles.helperTextViewStyling}>
                                <HelperText
                                    type="error"
                                    visible={message.showError}
                                    style={styles.helperTextStyling}
                                >
                                    {message.error}
                                </HelperText>

                                <HelperText
                                    type="error"
                                    visible
                                    style={{ paddingHorizontal: 0, fontSize: 14, color: '#000000' }}
                                >
                                    {message.message.length}/250
                                    </HelperText>
                            </View>

                            <View style={{ width: '100%', zIndex: 1, position: 'absolute', bottom: 10, left: '8%' }}>
                                <MyButton
                                    buttonName='Send Message'
                                    buttonMode="contained"
                                    buttonIcon='send'
                                    buttonColor={commonStyles.primaryColor.backgroundColor}
                                    buttonWidth='100%'
                                    buttonDisabled={false}
                                    onPress={handleSendMessage}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </SafeAreaView >

            <Modal
                visible={showModal}
            >
                <ImageBackground
                    source={require('../Images/bg0.jpg')}
                    style={styles.imageBackground}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setShowModal(false)}
                        >
                            <Icon name="close" size={30} color="#4169e1" />
                        </TouchableOpacity>

                        <Text style={styles.title}>Contacts</Text>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={getContacts}
                        >
                            <Icon name="refresh" size={30} color="#4169e1" />
                        </TouchableOpacity>

                    </View>

                    <Text
                        style={{
                            textAlign: 'center',
                            marginVertical: 8,
                            fontSize: 18,
                            color: "#4169e1"
                        }}
                    >
                        Select Contacts To Send SMS
                    </Text>

                    <FlatList
                        keyExtractor={keyExtractor}
                        data={contacts}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                        showsVerticalScrollIndicator={false}
                        containerStyle={{ borderBottomWidth: 0 }}
                        style={{ backgroundColor: 'transparent', width: '100%' }}
                    />
                </ImageBackground>
            </Modal>

            {/* <Snackbar
                visible={showSnackbar}
                onDismiss={() => setShowSnackbar(false)}
                // action={{
                //     label: 'Undo',
                //     onPress: () => {
                //         // Do something
                //     },
                // }}
                duration={2000}

                style={{
                    backgroundColor: commonStyles.primaryColor.backgroundColor,
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginBottom: 30,
                    fontSize: '10%',

                }}
            >
                {serverResponse}
            </Snackbar> */}
        </>
    );
}

export default SendSms;

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
        borderTopLeftRadius: 80,
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
    numberFieldAndIconView: {
        width: '100%',
        height: '14%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // borderWidth: 2,
        // borderColor: 'green'
        // marginBottom: 10
    },
    chipView: {
        maxHeight: 40,
        // borderWidth: 2,
        // borderColor: 'blue'
    },
    chipStyling: {
        height: 40,
        alignItems: 'center',
        marginRight: 5
    },
    chipText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
        backgroundColor: 'transparent',
    },
    helperTextViewStyling: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    helperTextStyling: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        paddingHorizontal: 0,
        paddingVertical: 0,
        textTransform: 'uppercase',
    },
    ModalListTitleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start'
    },
});

import React, { useState, useEffect } from 'react';
import { } from 'react-native';
import { Chip } from 'react-native-paper';
import Contacts from 'react-native-contacts';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-spinkit';
import { ListItem } from 'react-native-elements'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground,
    PermissionsAndroid,
    Modal,
    FlatList
} from 'react-native';
import {
    Title,
    Paragraph,
    Snackbar
} from 'react-native-paper';

//ACTIONS
import * as actions from '../Redux/Actions/actions';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//COMPONENTS
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';

//SCREEN WIDTH
const { width, height } = Dimensions.get('window');

const SendSms = (props) => {


    const [create, setCreate] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [mobileNumber, setMobileNumber] = useState('');
    console.log(create);

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
                // console.log(contacts);
                setContacts(contacts);
                setShowModal(true);
                // contacts.map(item => {
                //     console.log(item.displayName);
                //     console.log(item.phoneNumbers[0].number);
                // })
            })
        } else {
            console.log('permission denied');
        }
    }

    const createNumberChip = (number) => {
        if (number) {
            if (!numberRegex.test(number)) {
                console.log('invalid format')
            } else {
                if (create.length < 3) {
                    console.log(number);
                    setMobileNumber('');
                    setCreate([...create, number])
                } else {
                    console.log('limit reached')
                }

            }
        } else {
            console.log('empty');
        }

    }

    const removeNumberChip = chipIndex => {
        setCreate(create.filter((item, index) => {
            return index !== chipIndex
        }));
    }

    const [showModal, setShowModal] = useState(false);

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            underlayColor="lightgrey"
            onPress={() => createNumberChip(item.phoneNumbers[0].number)}
            containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                paddingVertical: 15,
                paddingHorizontal: 0
            }}
        >
            <ListItem.Content >
                <View style={{ ...styles.ModalListTitleView, marginBottom: 5 }}>
                    <Icon name="person" size={20} color="#4169e1" />
                    <ListItem.Title style={{ fontSize: 18, marginLeft: 10 }}>{item.displayName}</ListItem.Title>
                </View>
                <View style={styles.ModalListTitleView}>
                    <Icon name="call-sharp" size={20} color="#4169e1" />
                    <ListItem.Subtitle style={{ fontSize: 16, marginLeft: 13 }}>{item.phoneNumbers[0].number}</ListItem.Subtitle>
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
            <View style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                {/* {loadingValues.isLoading && < Spinner style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: '46%',
                    top: '50%'
                }} size={70} color="blue" type="Circle" />} */}
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
                            style={{ ...styles.imageBackground, opacity: 1 }}
                        >


                            <View style={styles.numberFieldAndIconView} >
                                <MyTextInput
                                    textInputMode="contained"
                                    textInputLabel="Mobile Number"
                                    textInputWidth='80%'
                                    getText={mobileNumber}
                                    maxLength={11}
                                    keyboardType='number-pad'
                                    autoFocus={true}
                                    textInputPlaceHolder="03001234567"
                                    setText={(text) => setMobileNumber(text)}
                                    textInputMarginBottom={0.1}
                                // isError={showError.name}
                                // onFocus={() => handleOnFocusField('name')}
                                // onBlur={() => createNumberChip(mobileNumber)}
                                />

                                <TouchableOpacity
                                    style={styles.iconView}
                                    activeOpacity={0.5}
                                    onPress={getContacts}
                                >
                                    <AntDesign name="contacts" size={40} color="#4169e1" />
                                </TouchableOpacity>


                            </View>

                            <View style={{ zIndex: 1 }}>
                                <MyButton
                                    buttonName='Add Number'
                                    buttonMode="contained"
                                    buttonIcon='login'
                                    buttonColor={commonStyles.primaryColor.backgroundColor}
                                    buttonWidth='100%'
                                    buttonDisabled={false}
                                    onPress={() => createNumberChip(mobileNumber)}
                                />
                            </View>

                            <View style={styles.chipView}>
                                {create.map((item, index) => {
                                    return <Chip
                                        mode="outlined"
                                        key={index}
                                        style={styles.chipStyling}
                                        textStyle={styles.chipText}
                                        onClose={() => removeNumberChip(index)}
                                        onPress={() => console.log('Pressed')}
                                    >
                                        {item}
                                    </Chip>
                                })}
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </View >

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
                        <View></View>
                        <Text style={styles.title}>Contacts</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setShowModal(false)}
                        >
                            <Icon name="close" size={30} color="#4169e1" />
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
                    <View>
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={contacts}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}
                            containerStyle={{ borderBottomWidth: 0 }}
                            style={{
                                backgroundColor: 'transparent', width: '100%',
                            }}
                        />
                    </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10
    },
    chipView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    chipStyling: {
        width: '49%',
        height: 40,
        alignItems: 'center',
        marginBottom: 5
    },
    chipText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    detailsView: {
        marginVertical: 8
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
        backgroundColor: 'transparent',
    },
    ModalListTitleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start'
    },
});

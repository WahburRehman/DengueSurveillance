import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import {
    Title,
    Paragraph,
    Snackbar
} from 'react-native-paper';


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';

//COMPONENTS
import Header from '../Components/Header';
import MyButton from '../Components/Button';
import SplashScreen from './SplashScreen';

//SCREEN WIDTH
const { width, height } = Dimensions.get('window');
const textInputWidth = width - 50;

const RequestDetails = (props) => {

    const { id } = props.route.params;
    console.log('id', id);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const [request, setRequest] = useState({
        subject: '',
        message: '',
        requestStatus: '',
        date: ''
    });

    const [button, setButton] = useState({
        label: 'delete',
        icon: 'delete-empty',
        disable: false
    });

    useEffect(() => {
        fetch('http://10.0.2.2:3000/findOneRequest', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id
            })
        })
            .then(result => result.json())
            .then(data => {
                if (data.error) {
                    console.log(error)
                } else {
                    setRequest(prevState => {
                        return {
                            subject: data.subject,
                            date: data.date,
                            requestStatus: data.requestStatus,
                            message: data.requestMessage,
                        }
                    });
                }
            });
        setIsLoading(false);
    }, []);

    console.log('data: ', data);


    const handleDeleteButton = () => {
        console.log('delete button');
        fetch('http://10.0.2.2:3000/deleteOneRequest', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setServerResponse(data.error);
                    setShowSnackbar(true)
                }
                else if (data.message) {
                    console.log(data.message);
                    setServerResponse(data.error);
                    setShowSnackbar(true)
                    setRequest(prevState => {
                        return {
                            subject: '',
                            requestStatus: '',
                            date: '',
                            message: '',
                        }
                    });

                    setButton(prevState => {
                        return {
                            ...prevState,
                            label: 'deleted',
                            icon: 'delete',
                            disable: true
                        }
                    });
                }
            });
    }

    return (
        <>
            {isLoading ?
                <SplashScreen />
                :
                <>
                    <View style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                        <View style={styles.headerView}>
                            <TouchableOpacity
                                style={styles.iconView}
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate('allRequests')}
                            >
                                <Icon name="arrow-back" size={30} color="#ffffff" />
                            </TouchableOpacity>

                            <Text style={styles.headerText}>Request Details</Text>

                            <View style={styles.iconView}>
                            </View>
                        </View>

                        <View
                            style={{
                                ...styles.contentView,
                            }}
                        >
                            <View style={{ ...StyleSheet.absoluteFill }} >
                                <ImageBackground
                                    source={require('../Images/bg0.jpg')}
                                    style={styles.imageBackground}
                                >
                                    <View >

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>subject</Title>
                                            <Paragraph style={styles.paragraph}>{request.subject}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>status</Title>
                                            <Paragraph style={styles.paragraph}>{request.requestStatus}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>date</Title>
                                            <Paragraph style={styles.paragraph}>{request.date}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>message</Title>
                                            <Paragraph style={styles.paragraph}>{request.message}</Paragraph>
                                        </View>

                                    </View>

                                    <View>
                                        <MyButton
                                            buttonName={button.label}
                                            buttonMode="contained"
                                            buttonIcon={button.icon}
                                            buttonColor={commonStyles.primaryColor.backgroundColor}
                                            buttonWidth='100%'
                                            buttonDisabled={button.disable}
                                            onPress={handleDeleteButton}
                                        />
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>
                    </View >

                    <Snackbar
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
                    </Snackbar>
                </>
            }
        </>
    );
}

export default RequestDetails;

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
        justifyContent: 'space-between'
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
    paragraph: {
        fontSize: 18,
        marginTop: 7,
        paddingLeft: 2,
        backgroundColor: 'transparent',
    }
});







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

const ComplaintDetails = (props) => {

    const { id } = props.route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const [complaint, setComplaint] = useState({
        subject: '',
        message: '',
        complaintStatus: '',
        date: ''
    });

    const [button, setButton] = useState({
        label: 'delete',
        icon: 'delete-empty',
        disable: false
    });

    useEffect(() => {
        fetch('http://10.0.2.2:3000/findOneReport', {
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
                    setComplaint(prevState => {
                        return {
                            subject: data.subject,
                            date: data.date,
                            complaintStatus: data.reportStatus,
                            message: data.reportMessage,
                        }
                    });
                }
            });
        setIsLoading(false);
    }, []);


    const handleDeleteButton = () => {
        fetch('http://10.0.2.2:3000/deleteOneReport', {
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
                    console.log(data.error)
                    setServerResponse(data.error);
                    setShowSnackbar(true)
                }
                else if (data.message) {
                    setServerResponse(data.error);
                    setShowSnackbar(true)
                    setComplaint(prevState => {
                        return {
                            subject: '',
                            complaintStatus: '',
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

    const handleBackTo = () => {
        props.navigation.navigate('allComplaints');
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
                                onPress={() => props.navigation.navigate('allComplaints')}
                            >
                                <Icon name="arrow-back" size={30} color="#ffffff" />
                            </TouchableOpacity>

                            <Text style={styles.headerText}>Complaint Details</Text>

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
                                    <View style={{}}>
                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>subject</Title>
                                            <Paragraph style={styles.paragraph}>{complaint.subject}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>status</Title>
                                            <Paragraph style={styles.paragraph}>{complaint.complaintStatus}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>date</Title>
                                            <Paragraph style={styles.paragraph}>{complaint.date}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>message</Title>
                                            <Paragraph style={styles.paragraph}>{complaint.message}</Paragraph>
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

export default ComplaintDetails;

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
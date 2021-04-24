import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-spinkit';
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

//ACTIONS
import * as actions from '../Redux/Actions/actions';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';

//COMPONENTS
import MyButton from '../Components/Button';

//SCREEN WIDTH
const { width, height } = Dimensions.get('window');

const RequestDetails = (props) => {

    const { id } = props.route.params;
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const dispatch = useDispatch();
    const requests = useSelector(state => state.requests);

    const [loadingValues, setLoadingValues] = useState({
        isLoading: false,
        backgroundOpactiy: 1
    });

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
        const info = requests.filter(item => {
            return item._id === id;
        });

        console.log(info);

        setRequest({
            subject: info[0].subject,
            date: info[0].date,
            requestStatus: info[0].requestStatus,
            message: info[0].requestMessage,
        })
    }, []);

    const handleDeleteButton = () => {
        console.log('delete button');
        setLoadingValues({ isLoading: true, backgroundOpactiy: 0.5 });
        fetch('http://10.0.2.2:3000/deleteOneRequest', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
            })
        }).then(res => res.json())
            .then((data) => {
                setLoadingValues({ isLoading: false, backgroundOpactiy: 1 });
                if (data.error) {
                    console.log(data.error);
                    setServerResponse(data.error);
                    setShowSnackbar(true)
                }
                else if (data.message) {
                    console.log(data.message);
                    setServerResponse(data.message);
                    setShowSnackbar(true)
                    setRequest({
                        subject: '',
                        requestStatus: '',
                        date: '',
                        message: '',
                    });

                    setButton({
                        label: 'deleted',
                        icon: 'delete',
                        disable: true
                    });

                    dispatch(actions.deleteRequest(id));
                }
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                {loadingValues.isLoading && < Spinner style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: '46%',
                    top: '50%'
                }} size={70} color="blue" type="Circle" />}
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
                            style={{ ...styles.imageBackground, opacity: loadingValues.backgroundOpactiy }}
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

                            <View style={{ zIndex: 1 }}>
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







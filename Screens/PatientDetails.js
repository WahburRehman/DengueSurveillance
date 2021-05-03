import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-spinkit';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//COMPONENTS
import MyButton from '../Components/Button';

const PatientDetails = (props) => {

    const dispatch = useDispatch();
    const { patientInfo } = props.route.params;
    const userInfo = useSelector(state => state.userInfo);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [serverResponse, setServerResponse] = useState('');
    const [showFullDetails, setShowFullDetails] = useState(false);



    const [loadingValues, setLoadingValues] = useState({
        isLoading: false,
        backgroundOpactiy: 1
    });

    const [button, setButton] = useState({
        label: 'delete',
        icon: 'delete-empty',
        disable: false
    });

    const handleDeleteButton = () => {
        console.log('delete button');
        setLoadingValues({ isLoading: true, backgroundOpactiy: 0.5 });
        fetch(`http://10.0.2.2:3000/deleteOnePatientsRecord?patientID=${patientInfo._id}`, {
            method: "DELETE",
            headers: { 'Authorization': "Bearer " + userInfo.authToken }
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
                    setShowSnackbar(true);
                    setButton({
                        label: 'deleted',
                        icon: 'delete',
                        disable: true
                    });

                    dispatch(actions.deletePatient(patientInfo._id));
                }
            }).catch(error => {
                console.log(error);
            });
    }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
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
                        onPress={() => props.navigation.navigate('viewPatients')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>PROFILE</Text>

                    <View></View>
                </View>

                <View style={styles.contentView}>
                    <View style={{ ...StyleSheet.absoluteFill }}>
                        <ImageBackground
                            source={require('../Images/bg0.jpg')}
                            style={{ ...styles.imageBackground, opacity: loadingValues.backgroundOpactiy }}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}
                                style={{ maxHeight: '90%' }}
                            >
                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>name</Title>
                                    <Paragraph style={styles.paragraph}>{patientInfo.name}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>case ID</Title>
                                    <Paragraph style={styles.paragraph}>{patientInfo.caseID}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>dengue status</Title>
                                    <Paragraph style={styles.paragraph}>{patientInfo.dengueStatus}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>Doctor's Response</Title>
                                    <Paragraph style={styles.paragraph}>{patientInfo.doctorResponse}</Paragraph>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => setShowFullDetails(showFullDetails ? false : true)}
                                    >
                                        <Icon name={showFullDetails ? "caret-up-outline" : "caret-down-outline"} size={30} color="#4169e1" />
                                    </TouchableOpacity>
                                </View>

                                {showFullDetails ?
                                    <>


                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>age</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.age}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>gender</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.gender}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>contact number</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.phNo}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>district</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.district}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>home town</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.homeTown}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>recommended hospital</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.recommendedHospital}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>date</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.date}</Paragraph>
                                        </View>

                                        <View style={styles.detailsView}>
                                            <Title style={styles.title}>symptoms details</Title>
                                            <Paragraph style={styles.paragraph}>{patientInfo.symptoms}</Paragraph>
                                        </View>

                                        {patientInfo.symptomsImage ?
                                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                <Title style={styles.title}>symptoms Image</Title>
                                                <Image source={{ uri: 'data:image/png;base64,' + patientInfo.symptomsImage }} style={styles.symptomsImage} />
                                            </View>
                                            :
                                            null
                                        }
                                    </>
                                    :
                                    null
                                }
                            </ScrollView>

                            <View
                                style={{
                                    zIndex: 1,
                                    marginVertical: 10,
                                }}
                            >
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
            </SafeAreaView >

            <Snackbar
                visible={showSnackbar}
                onDismiss={() => setShowSnackbar(false)}
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

export default PatientDetails;

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
    symptomsImage: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: '#606060',
        marginVertical: 8
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '2%',
        paddingHorizontal: '7%'
    },
    detailsView: {
        marginVertical: 5
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor
    },
    paragraph: {
        fontSize: 18,
        marginTop: 7,
        paddingLeft: 0
    }
})

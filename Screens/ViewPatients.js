import React, { useState, useEffect } from 'react';
import { ListItem } from 'react-native-elements'


import Spinner from 'react-native-spinkit';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//ACTIONS
import * as actions from '../Redux/Actions/actions';


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//COMPONENTS
import SplashScreen from '../Screens/SplashScreen';
import DropDownList from '../Components/DropDownList';

const ViewPatients = (props) => {

    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState('newForHealthWorker');

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const patients = useSelector(state => state.patients);

    const [loadingValues, setLoadingValues] = useState({
        isLoading: false,
        backgroundOpactiy: 1
    });

    useEffect(() => {
        fetch(`http://10.0.2.2:3000/fetchAllPatients?recommendedBy=${userInfo._id}`, {
            headers: { 'Authorization': "Bearer " + userInfo.authToken },
        })
            .then(result => result.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data.length)

                    dispatch(actions.storePatients(data));
                }
            });
        setIsLoading(false);
        setLoadingValues({ isLoading: false, backgroundOpactiy: 1 });
    }, [refresh]);

    const handleItemPress = (patientInfo) => {
        console.log(patientInfo);
        props.navigation.navigate('patientDetails', { patientInfo })
    }

    const handleItemLongPress = (id) => {
        console.log(id);
        setDeletePateint(true);
    }

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            underlayColor="lightgrey"
            onPress={() => handleItemPress(item)}
            // onLongPress={() => handleItemLongPress(item._id)}
            containerStyle={{ backgroundColor: 'transparent', marginBottom: 5, borderColor: 'transparent' }}
        >
            <ListItem.Content>
                <View style={{ ...styles.listTitleView, }}>
                    <ListItem.Title style={{ fontSize: 18, marginBottom: 5 }}>{item.name}</ListItem.Title>
                    <ListItem.Title style={{ fontSize: 18, marginBottom: 5 }}>{item.caseID}</ListItem.Title>
                </View>
                <View style={styles.listTitleView}>
                    <ListItem.Subtitle style={{ fontSize: 16 }}>{item.dengueStatus}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 16 }}>{item.age < 1 ? '< 1' : item.age}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 16 }}>{item.gender}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 16 }}>{item.date}</ListItem.Subtitle>
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
            // </View>
        );
    }

    const displayData = () => {
        if (selectedValue === 'newForHealthWorker') {
            return patients.filter(item => {
                return item.caseStatus === selectedValue
            });
        }
        else if (selectedValue === 'all') {
            return patients
        }
        else {
            return patients.filter(item => {
                return item.dengueStatus === selectedValue
            });
        }
    }

    const handleRefreshButton = () => {
        refresh ? setRefresh(false) : setRefresh(true);
        setLoadingValues({ isLoading: true, backgroundOpactiy: 0.4 });
    }

    return (
        <>
            {isLoading ?
                <SplashScreen />
                :
                <>
                    <View style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                        {loadingValues.isLoading && < Spinner style={{
                            position: 'absolute',
                            zIndex: 1,
                            left: '44%',
                            top: '50%'
                        }} size={70} color="blue" type="ThreeBounce" />}

                        <View style={styles.headerView}>
                            <TouchableOpacity
                                style={styles.iconView}
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate('home')}
                            >
                                <Icon name="arrow-back" size={30} color="#ffffff" />
                            </TouchableOpacity>

                            <Text style={styles.headerText}>All Patients</Text>

                            <View style={styles.iconView}>
                                <TouchableOpacity
                                    style={styles.iconView}
                                    activeOpacity={0.5}
                                    onPress={() => props.navigation.navigate('selectAddPatient', { from: 'viewPatients' })}
                                >
                                    <Icon name="add" size={30} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.contentView}>
                            <View style={{ ...StyleSheet.absoluteFill }} >
                                <ImageBackground
                                    source={require('../Images/bg0.jpg')}
                                    style={{ ...styles.imageBackground, opacity: loadingValues.backgroundOpactiy }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingLeft: 15
                                    }}>
                                        <DropDownList
                                            dropDownItems={[
                                                { label: 'all', value: 'all' },
                                                { label: 'new', value: 'newForHealthWorker' },
                                                { label: 'negative', value: 'negative' },
                                                { label: 'positive', value: 'positive' },
                                                { label: 'suspected', value: 'suspected' },
                                            ]}
                                            dropDownDefaultValue={selectedValue}
                                            dropDownWidth={'85%'}
                                            dropDownBackgroundColor={commonStyles.textInputColor.color}
                                            dropDownOnChangeItem={item => setSelectedValue(item.value)}
                                        />

                                        <View style={styles.iconView}>
                                            <TouchableOpacity
                                                style={styles.iconView}
                                                activeOpacity={0.5}
                                                onPress={handleRefreshButton}
                                            >
                                                <Icon name="refresh" size={35} color="#4169e1" />
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                    <FlatList
                                        keyExtractor={keyExtractor}
                                        data={displayData()}
                                        renderItem={renderItem}
                                        showsVerticalScrollIndicator={false}
                                        ItemSeparatorComponent={renderSeparator}
                                        containerStyle={{ borderBottomWidth: 0 }}
                                        style={{ backgroundColor: 'transparent', width: '100%' }}
                                    />

                                </ImageBackground>
                            </View>
                        </View>
                    </View >

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
            }
        </>
    );
}

export default ViewPatients;

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
        paddingVertical: '8%',
        paddingHorizontal: '3%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    listTitleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
});

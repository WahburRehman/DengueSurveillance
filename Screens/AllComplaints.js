import React, { useState, useEffect } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { View, FlatList, StyleSheet } from 'react-native';


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//COMPONENTS
import Header from '../Components/Header';
import SplashScreen from './SplashScreen';
import DropDownList from '../Components/DropDownList';

const AllComplaints = (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState('pending');

    useEffect(() => {
        fetch('http://10.0.2.2:3000/fetchSpecificReports', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'reporterID': '605915ef97ab942584075529',
                'reportStatus': selectedValue,
            })
        })
            .then(result => result.json())
            .then(data => {
                setData(data);
            });
        setIsLoading(false);
    }, [selectedValue]);

    console.log(data);

    const handleItemPress = (id) => {
        props.navigation.navigate('complaintDetails', { id: id });
    }

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            onPress={() => handleItemPress(item._id)}
        >
            <ListItem.Content>
                <View style={{ ...styles.listTitleView, }}>
                    <ListItem.Title style={{ fontSize: 18, marginBottom: 5 }}>{item.subject}</ListItem.Title>
                </View>
                <View style={styles.listTitleView}>
                    <ListItem.Subtitle style={{ fontSize: 16 }}>Status: {item.reportStatus}</ListItem.Subtitle>
                    <ListItem.Subtitle style={{ fontSize: 16 }}>Date: {item.date}</ListItem.Subtitle>
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

    const handleDropDownChange = value => {
        setSelectedValue(value);
        setIsLoading(true);
    }

    const handleBackTo = () => {
        props.navigation.navigate('home');
    }

    const handleAddIcon = () => {
        props.navigation.navigate('newComplaint');
    }
    return (
        <>
            {isLoading ?
                <SplashScreen />
                :
                <>
                    <Header
                        headerTitle="Complaints"
                        showLeftIcon={true}
                        showRightIcon={true}
                        rightIcon="add"
                        backTo={handleBackTo}
                        rightIconPress={handleAddIcon}
                    />

                    <View style={{ marginVertical: 5 }}>
                        <DropDownList
                            dropDownItems={[
                                { label: 'pending', value: 'pending' },
                                { label: 'resolved', value: 'resolved' },
                            ]}
                            dropDownDefaultValue={selectedValue}
                            dropDownWidth={'100%'}
                            dropDownBackgroundColor={commonStyles.textInputColor.color}
                            dropDownOnChangeItem={item => handleDropDownChange(item.value)}
                        />
                    </View>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={data}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                        containerStyle={{ borderBottomWidth: 0 }}
                    />
                </>
            }
        </>
    );
}

export default AllComplaints;

const styles = StyleSheet.create({
    listTitleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
});

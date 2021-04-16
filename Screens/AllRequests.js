import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//COMPONENTS
import SplashScreen from './SplashScreen';
import Header from '../Components/Header';
import DropDownList from '../Components/DropDownList';

const AllRequests = (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState('pending');

    useEffect(() => {
        fetch('http://10.0.2.2:3000/fetchSpecificRequests', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'requesterID': '605915ef97ab942584075529',
                'requestStatus': selectedValue,
            })
        })
            .then(result => result.json())
            .then(data => {
                setData(data);
            });
        setIsLoading(false);
    }, [selectedValue]);

    const handleItemPress = (id) => {
        props.navigation.navigate('requestDetails', { id: id });

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
                    <ListItem.Subtitle style={{ fontSize: 16 }}>Status: {item.requestStatus}</ListItem.Subtitle>
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

    return (
        <>
            {isLoading ?
                <SplashScreen />
                :
                <>
                    {console.log(data)}
                    <Header
                        headerTitle="Requests"
                        showLeftIcon={true}
                        backTo={handleBackTo}
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

export default AllRequests;

const styles = StyleSheet.create({
    listTitleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
});

import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//COMPONENTS
import Header from '../Components/Header';
import MyButton from '../Components/Button';
import SplashScreen from '../Screens/SplashScreen';
import DropDownList from '../Components/DropDownList';

const ViewPatients = (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState('all');

    useEffect(() => {
        fetch('http://10.0.2.2:3000/fetchAllPatients', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'recommendedBy': '605915ef97ab942584075529',
                'selectedOption': selectedValue,
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
        console.log(id);
    }

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            onPress={() => handleItemPress(item._id)}
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

    const handleBackTo = () => {
        props.navigation.navigate('home');
    }

    return (
        <>
            {isLoading ?
                <SplashScreen />
                :
                <>
                    <Header headerTitle="view patients" showLeftIcon={true} backTo={handleBackTo} />

                    <DropDownList
                        dropDownItems={[
                            { label: 'all', value: 'all' },
                            { label: 'negative', value: 'negative' },
                            { label: 'not confirmed', value: 'not confirmed' },
                            { label: 'positive', value: 'positive' },
                            { label: 'suspected', value: 'suspected' },
                        ]}
                        dropDownDefaultValue={selectedValue}
                        dropDownWidth={'100%'}
                        dropDownBackgroundColor={commonStyles.textInputColor.color}
                        dropDownOnChangeItem={item => setSelectedValue(item.value)}
                    />

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

export default ViewPatients;

const styles = StyleSheet.create({
    listTitleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
});

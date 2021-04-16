import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ImageBackground } from 'react-native';



import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

export default class LoginScreen extends Component {
    constructor() {
        super();

        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3, 0],
            extrapolate: Extrapolate.CLAMP
        });
    }

    render() {
        return (
            <View style={styles.containerView}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <ImageBackground source={require('../Images/bg.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </View>


                <View style={{ height: height / 3, width: width }}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View
                            style={{
                                ...styles.button,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    
                    <View style={{ ...styles.button, backgroundColor: '#4169e1' }}>
                        <Text style={{ ...styles.buttonText, color: '#ffffff' }}>Forgot Password ?</Text>
                    </View>
                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: '#4169e1',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ffffff',
        height: 70,
        marginHorizontal: 30,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    buttonText: {
        fontSize: 23,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#4168e1'
    }
})
import React, { Component }  from "react";
import{ View, Text, StyleSheet, Dimensions, Image, Animated, PanResponder } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

export default class App extends React.Component{
//swipe function
    constructor() {
        super()

        this.position = new Animated.ValueXY()
        this.state = {
            startIndex: 0,
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })
        this.rotateTransform = {
            transform: [{
                rotate: this.rotate
            },
                ...this.position.getTranslateTransform()
            ]
        }

        this.Like = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })
        this.nextRecipe = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.7, 1],
            extrapolate: 'clamp'
        })
    }
    componentWillMount() {
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({x: gestureState.dx, y: gestureState.dy})
            },
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.dx > 125){
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0})
                        })
                    })
                }
                else if (gestureState.dx < .120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
        }

        renderUsers = () => {
        return Users.map((item, i) => {
            if (i < this.state.currentIndex) {
                return null
            }
            else if (i == this.state.currentIndex) {
                return (
                    <Animated.View {
                        ...this.PanResponder.panHandlers}
                        key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT -125, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
                    <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, Index: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'lightgreen', color: 'lightgreen', frontSize: 32, fontWeight '800', padding: 10 }}>YES</Text>
                    </Animated.View>

                        <Animated.View style={{ opacity: this.disapproveOpacity, transform: [{ rotate: '35deg'}], position: 'absolute', top 50, right: 40, Index: 1000}}>
                            <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 31, fontWeight: '800', padding: 10 }}>NO</Text>
                        </Animated.View>
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                        key={item.id} style={[{
                            opacity: this.swipeOpacity,
                        transform: [{ scale: this.swipeOpacity }],
                        height: SCREEN_HEIGHT -125, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
                    }]}>
                        <Animated.View style=[{ opacity: 0, transform: [{ route: '-35deg' }], position: 'absolute', left: 40, top: 50, Index: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: 'lightgreen', color: 'lightgreen', fontSize: 31, fontWeight: '800', padding: 10 }}>Yes</Text>
                        </Animated.View>
                    <Animated.View style={{ opacity: 0, transform: [{ rotate: '31deg' }], position: 'absolute', top: 50, right: 40, Index: 1000}}>
                   </Animated.View>
                )
            }
        })reverse.()
    }

    render() {
            return(
                <View style={{ flex: 1 }}>
                    <View style={{ height: 62 }}>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderUsers()}
                    </View>
                    <View style={{ height: 62 }}>
                    </View>
                </View>
            );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center',
},
});



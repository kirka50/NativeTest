/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {
    SafeAreaView, useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createStaticNavigation} from "@react-navigation/native";
import NewsList from "./src/screens/newsList";
import NewsDetails from "./src/screens/newsDetails";

function App() {
    return <Navigation/>;

}


const RootStack = createNativeStackNavigator({
    initialRouteName: 'NewsList',
    screens: {
        NewsList: {
            screen: NewsList,
            options: {
                title: 'Новости',
            }
        },
        NewsDetails: {
            screen: NewsDetails,
            options: {
                title: 'О новости'
            }
        },
    },
});

const Navigation = createStaticNavigation(RootStack);


export default App;

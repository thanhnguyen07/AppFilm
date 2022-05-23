import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen'
import PlaylistScreen from './screens/PlaylistScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailScreen from './screens/DetailScreen';
import DetailScreenNew from './screens/DetailScreenNew';
import PlayScreen from './screens/PlayScreen';
import Token from './screens/Token';

const BottomNav = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStackScreen = () => {
    return(
        <BottomNav.Navigator screenOptions={{tabBarShowLabel: false}}>
            <BottomNav.Screen 
            name="Home" component={HomeScreen} 
            options= {{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 name='home' size={27} color={color}/>
                }}
            />
            <BottomNav.Screen 
            name="Profile" component={ProfileScreen} 
            options= {{
                headerShown: false,
                tabBarIcon: ({color}) => <FontAwesome5 name='user' size={27} color={color}/>,
                }}
            />
        </BottomNav.Navigator>
    )
}


export default function Routers() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName= 'Token'>
                <Stack.Screen 
                name="Token"
                component={Token}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="RegisterScreen" 
                component={RegisterScreen}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="HomeStack" 
                component={HomeStackScreen}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="PlaylistScreen"
                component={PlaylistScreen}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="SearchScreen" 
                component={SearchScreen}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="DetailScreen" 
                component={DetailScreen}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="DetailScreenNew" 
                component={DetailScreenNew}
                options= {{headerShown: false}}
                />
                <Stack.Screen 
                name="PlayScreen" 
                component={PlayScreen}
                options= {{
                    headerBackTitle: 'Quay Lại',
                    headerTitle: '',
                    headerStyle: { 
                        backgroundColor: 'white',
                        // height: 90,
                     },
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
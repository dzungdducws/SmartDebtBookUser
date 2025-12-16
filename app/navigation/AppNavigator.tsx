import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/auth/login";
import RegisterScreen from "../screen/auth/register";
import { RootStackParamList, SCREEN } from "./screen-types";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { navigationRef } from "./navigation-service";
import HomeStack from "./HomeStack";
import LoadingScreen from "../screen/LoadingScreen";
import DebtorStack from "./DebtorStack";
import BillStack from "./BillStack";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  //   const {theme} = useSelector((state: RootReducer) => state.themeReducer);
  //   const customTheme =
  //     theme === 'default' ? MyAppTheme.default : MyAppTheme.dark;

  const MenuBarStackNavigator = createStackNavigator();

  const MainStack = () => {
    return (
      <MenuBarStackNavigator.Navigator
        initialRouteName={SCREEN.HOME_STACK}
        screenOptions={{
          // gestureEnabled: false,
          headerShown: false,
        }}
      >
        <MenuBarStackNavigator.Screen
          name={SCREEN.HOME_STACK}
          component={HomeStack}
        />

        <MenuBarStackNavigator.Screen
          name={SCREEN.DEBTOR_STACK}
          component={DebtorStack}
        />

        <MenuBarStackNavigator.Screen
          name={SCREEN.BILL_STACK}
          component={BillStack}
        />
      </MenuBarStackNavigator.Navigator>
    );
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={SCREEN.LOGIN}
      >
        <RootStack.Screen name={SCREEN.LOADING} component={LoadingScreen} />

        <RootStack.Screen name={SCREEN.LOGIN} component={LoginScreen} />

        <RootStack.Screen name={SCREEN.REGISTER} component={RegisterScreen} />

        <RootStack.Screen name={SCREEN.MAIN_STACK} component={MainStack} />
      </RootStack.Navigator>
    </>
  );
};
export default RootNavigation;

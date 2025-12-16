import { NavigationProp, RouteProp } from "@react-navigation/native";

export enum SCREEN {
  LOADING = "LOADING",
  MAIN_STACK = "MAIN_STACK",

  LOGIN = "LOGIN",
  REGISTER = "REGISTER",

  HOME_STACK = "HOME_STACK",
  MAIN_HOME = "MAIN_HOME",

  DEBTOR_STACK = "DEBTOR_STACK",
  DEBTOR_HOME = "DEBTOR_HOME",
  DEBTOR_DETAIL = "DEBTOR_DETAIL",

  SETTING_STACK = "SETTING_STACK",
  SETTING_HOME = "SETTING_HOME",
}

export type RootStackParamList = {
  [SCREEN.LOADING]: any;
  [SCREEN.MAIN_STACK]: any;

  [SCREEN.LOGIN]: any;
  [SCREEN.REGISTER]: any;

  [SCREEN.HOME_STACK]: any;
  [SCREEN.MAIN_HOME]: any;

  [SCREEN.DEBTOR_STACK]: any;
  [SCREEN.DEBTOR_HOME]: any;
  [SCREEN.DEBTOR_DETAIL]: any;

  [SCREEN.SETTING_STACK]: any;
  [SCREEN.SETTING_HOME]: any;
};

export type _RouteProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
};

export type AppNavigation = NavigationProp<RootStackParamList>;

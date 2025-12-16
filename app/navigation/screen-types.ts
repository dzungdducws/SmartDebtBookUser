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

  BILL_STACK = "BILL_STACK",
  BILL_HOME = "BILL_HOME",
  BILL_DETAIL = "BILL_DETAIL",
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

  [SCREEN.BILL_STACK]: any;
  [SCREEN.BILL_HOME]: any;
  [SCREEN.BILL_DETAIL]: any;
};

export type _RouteProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
};

export type AppNavigation = NavigationProp<RootStackParamList>;

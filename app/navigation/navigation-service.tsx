/* eslint-disable @typescript-eslint/no-explicit-any */
import {createRef} from 'react';

import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {AppNavigation, RootStackParamList} from './screen-types';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

export function navigateScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.current?.navigate(
    arg[0] as any,
    arg.length > 1 ? arg[1] : undefined,
  );
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export function pushScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.current?.dispatch(
    StackActions.push(arg[0] as any, arg.length > 1 ? arg[1] : undefined),
  );
}

export function replaceScreen<RouteName extends keyof RootStackParamList>(
  ...arg: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params?: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.current?.dispatch(
    StackActions.replace(arg[0] as any, arg.length > 1 ? arg[1] : undefined),
  );
}

export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack);
}
export function popToTop () {
  navigationRef?.current?.dispatch(StackActions.popToTop());
};

export function reset<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
) {
  navigationRef?.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName}],
    }),
  );
}

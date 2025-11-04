import { RouteProp } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { _RouteProps, SCREEN } from "./screen-types";
import MainHome from "../screen/home/MainHome";

const Stack = createSharedElementStackNavigator();

const HomeStack: React.FC<_RouteProps> = ({ route }: any) => (
  <Stack.Navigator
    initialRouteName={SCREEN.MAIN_HOME}
    screenOptions={{ gestureEnabled: false, headerShown: false }}
  >
    <Stack.Screen
      name={SCREEN.MAIN_HOME}
      component={MainHome}
      initialParams={route.params}
    />
  </Stack.Navigator>
);

export default HomeStack;

import { RouteProp } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { _RouteProps, SCREEN } from "./screen-types";
import { SettingHome } from "../screen/settings/SettingHome";

const Stack = createSharedElementStackNavigator();

const SettingStack: React.FC<_RouteProps> = ({ route }: any) => (
  <Stack.Navigator
    initialRouteName={SCREEN.SETTING_HOME}
    screenOptions={{ gestureEnabled: false, headerShown: false }}
  >
    <Stack.Screen
      name={SCREEN.SETTING_HOME}
      component={SettingHome}
      initialParams={route.params}
    />
  </Stack.Navigator>
);

export default SettingStack;

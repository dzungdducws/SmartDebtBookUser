import { RouteProp } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { _RouteProps, SCREEN } from "./screen-types";
import { DebtorHome } from "../screen/debtors/DebtorHome";
import { DebtorDetail } from "../screen/debtors/DebtorDetail";
const Stack = createSharedElementStackNavigator();

const DebtorStack: React.FC<_RouteProps> = ({ route }: any) => (
  <Stack.Navigator
    initialRouteName={SCREEN.DEBTOR_HOME}
    screenOptions={{ gestureEnabled: false, headerShown: false }}
  >
    <Stack.Screen
      name={SCREEN.DEBTOR_HOME}
      component={DebtorHome}
      initialParams={route.params}
    />
    <Stack.Screen
      name={SCREEN.DEBTOR_DETAIL}
      component={DebtorDetail}
      initialParams={route.params}
    />
  </Stack.Navigator>
);

export default DebtorStack;

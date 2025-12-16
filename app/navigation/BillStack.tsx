import { RouteProp } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { _RouteProps, SCREEN } from "./screen-types";
import { DebtorHome } from "../screen/Debtors/DebtorHome";
import { BillHome } from "../screen/bill/BillHome";

const Stack = createSharedElementStackNavigator();

const BillStack: React.FC<_RouteProps> = ({ route }: any) => (
  <Stack.Navigator
    initialRouteName={SCREEN.BILL_HOME}
    screenOptions={{ gestureEnabled: false, headerShown: false }}
  >
    <Stack.Screen
      name={SCREEN.BILL_HOME}
      component={BillHome}
      initialParams={route.params}
    />
  </Stack.Navigator>
);

export default BillStack;

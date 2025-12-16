import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import AppNavigator from "./app/navigation/AppNavigator";
import { navigationRef } from "./app/navigation/navigation-service";
import BusyIndicator from "./app/lib/components/LoadingIndicator";

if (__DEV__) {
  import("./app/config/ReactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
      <BusyIndicator />
    </Provider>
  );
}

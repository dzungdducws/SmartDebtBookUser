import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { navigateScreen } from "../navigation/navigation-service";
import { SCREEN } from "../navigation/screen-types";
import i18n from "../utils/i18n/i18n";
import { scaleSizeHeight } from "../utils/scale";

export default function LoadingScreen() {
  const { accessToken } = useSelector((state: RootState) => state.userSlice);

  useEffect(() => {
    const checkAuth = () => {
      if (accessToken) {
        navigateScreen(SCREEN.MAIN_STACK);
      } else {
        navigateScreen(SCREEN.LOGIN);
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <Text>{i18n.t("main:dang_tai")}</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: scaleSizeHeight(36),
  },
});

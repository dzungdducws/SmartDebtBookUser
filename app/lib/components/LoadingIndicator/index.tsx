import React, { useState, useEffect, memo } from "react";
import {
  View,
  ActivityIndicator,
  DeviceEventEmitter,
  StyleSheet,
  Text,
} from "react-native";
import colors from "../../../utils/colors";
import i18n from "../../../utils/i18n/i18n";
import { scaleSizeHeight } from "../../../utils/scale";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});

const BusyIndicator = () => {
  const [isVisible, setVisible] = useState(false);
  const [textState, setText] = useState(i18n.t("mainLanguage:dang_tai"));

  useEffect(() => {
    const emitter = DeviceEventEmitter.addListener(
      "changeLoadingEffect",
      (state) => {
        setVisible(!!state?.isVisible);
        setText(state?.title || i18n.t("mainLanguage:dang_tai"));
      }
    );

    return () => emitter.remove();
  }, []);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.mainColor} />
      <Text
        numberOfLines={1}
        style={{
          color: colors.white,
          fontSize: scaleSizeHeight(14),
          marginTop: scaleSizeHeight(8),
        }}
      >
        {textState}
      </Text>
    </View>
  );
};

export default memo(BusyIndicator);

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { scaleSizeHeight } from "../../utils/scale";

export default function GradientText({
  text = "Smart Debt Book",
  fontWeight = "bold",
  fontSize = scaleSizeHeight(40),
  lineHeight = scaleSizeHeight(40),
  textAlign = "center",
}: any) {
  return (
    <View style={{}}>
      <MaskedView
        maskElement={
          <Text
            style={{
              lineHeight: lineHeight,
              fontSize: fontSize,
              fontWeight: fontWeight,
              textAlign: textAlign,
            }}
          >
            {text}
          </Text>
        }
      >
        <LinearGradient
          colors={["#0A4A7C", "#00C49F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text
            style={{
              lineHeight: lineHeight,
              fontSize: fontSize,
              fontWeight: fontWeight,
              textAlign: textAlign,
              opacity: 0,
            }}
          >
            {text}
          </Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
}

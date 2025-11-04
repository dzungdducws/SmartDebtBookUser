import React from "react";
import { View, TextInput, Text } from "react-native";
import colors from "../../utils/colors";
import { scaleSizeWidth } from "../../utils/scale";

export const InputText = ({
  label,
  require = false,
  value,
  setValue,
  placeholder,
  keyboardType = "none",
  multiline = false,
  isCustomStyleInput = false,
  customStyleInput,
}: any) => {
  return (
    <View style={{ gap: scaleSizeWidth(8) }}>
      {label && (
        <Text
          style={{
            fontSize: scaleSizeWidth(14),
            lineHeight: scaleSizeWidth(22),
            fontWeight: "bold",
          }}
        >
          {label}
          {require && <Text style={{ color: colors.colorHotline }}> *</Text>}
        </Text>
      )}
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.cadet_grey_shadow_one,
            borderRadius: scaleSizeWidth(8),
            padding: scaleSizeWidth(12),
          },
          isCustomStyleInput && customStyleInput,
        ]}
      >
        <TextInput
          style={{
            width: "100%",
          }}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.colorTextGray}
          value={value}
          onChangeText={(k) => {
            setValue(k);
          }}
          underlineColorAndroid="transparent"
          returnKeyType={"search"}
        />
      </View>
    </View>
  );
};

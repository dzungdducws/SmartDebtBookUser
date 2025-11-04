import { CaretDown, XCircle } from "phosphor-react-native";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import colors from "../../utils/colors";
import { scaleSizeWidth } from "../../utils/scale";

export const InputPressable = ({
  label,
  require = false,
  onClickFn = () => {},
  checkValue = false,
  text,
  disabledRight = false,
  onClickFnRight = () => {},
  showRightXCircle = true,
  isCustomXCircle = false,
  customXCircle = () => {},
}: any) => {
  return (
    <View style={{ gap: scaleSizeWidth(8), backgroundColor: colors.white }}>
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
      <TouchableOpacity
        onPress={() => {
          onClickFn();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.cadet_grey_shadow_one,
          borderRadius: scaleSizeWidth(8),
          padding: scaleSizeWidth(12),
          justifyContent: "space-between",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: checkValue ? colors.blackColor : colors.gunmetal,
            width: "90%",
          }}
        >
          {text}
        </Text>
        <TouchableOpacity
          disabled={disabledRight}
          onPress={() => {
            if (checkValue && showRightXCircle) {
              onClickFnRight();
              return;
            }
            onClickFn();
          }}
        >
          {showRightXCircle ? (
            !checkValue ? (
              <CaretDown size={scaleSizeWidth(24)} color={colors.gunmetal} />
            ) : isCustomXCircle ? (
              customXCircle()
            ) : (
              <XCircle
                size={scaleSizeWidth(24)}
                color={colors.gunmetal}
                weight="fill"
              />
            )
          ) : (
            <CaretDown
              size={scaleSizeWidth(24)}
              color={colors.gunmetal}
              weight="fill"
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

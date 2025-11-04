import { use } from "i18next";
import { Check, ExclamationMark, X } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import colors from "../../utils/colors";
import i18n from "../../utils/i18n/i18n";
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  scaleSizeHeight,
} from "../../utils/scale";

export const ModalCustom = ({
  title = i18n.t("mainLanguage:thong_bao"),
  message = "",
  isCustomContent,
  customContent,
  onClose,
  onAction,
  btnText = i18n.t("coach:gui"),
  disabled = false,
}: any) => {
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 9999,
        top: 0,
        left: 0,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bgModal,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          width: WINDOW_WIDTH - scaleSizeHeight(24),
          backgroundColor: colors.white,
          borderRadius: scaleSizeHeight(16),
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderColor: colors.cadet_grey_shadow,
            paddingVertical: scaleSizeHeight(16),
          }}
        >
          <Text
            style={{
              fontSize: scaleSizeHeight(18),
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              right: scaleSizeHeight(16),
            }}
          >
            <X size={24} />
          </TouchableOpacity>
        </View>
        {isCustomContent ? (
          customContent()
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontSize: scaleSizeHeight(14),
              lineHeight: scaleSizeHeight(22),
            }}
          >
            {message}
          </Text>
        )}
        <View
          style={{
            padding: scaleSizeHeight(16),
            borderTopWidth: scaleSizeHeight(1),
            borderColor: colors.cadet_grey_shadow,
          }}
        >
          <TouchableOpacity
            disabled={disabled}
            onPress={onAction}
            style={{
              backgroundColor: disabled ? colors.cadet_grey : colors.mainColor2,
              paddingHorizontal: scaleSizeHeight(16),
              paddingVertical: scaleSizeHeight(6),
              borderRadius: scaleSizeHeight(8),
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: scaleSizeHeight(16),
                lineHeight: scaleSizeHeight(24),
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              {btnText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

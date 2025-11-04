import React, { memo } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  ImageStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  Platform,
} from "react-native";

import { scaleSizeWidth, WINDOW_WIDTH } from "../../utils/scale";
import { CaretLeft, MagnifyingGlass, XCircle } from "phosphor-react-native";
import colors from "../../utils/colors";
import constants from "../../utils/const";
import { goBack } from "../../navigation/navigation-service";
import GradientText from "./GradientText";

const BaseHeader = ({
  titleTextUnder = "",
  iconViewLeft = (
    <CaretLeft
      size={scaleSizeWidth(20)}
      color={colors.mainColor}
      weight="bold"
    />
  ),
  colorViewLeft = colors.white,
  titleColor = colors.white,
  titleText = "",
  titleRight = "",
  colorViewRight = colors.white,
  uriViewRight = undefined,
  typeHeader = "normal",
  customAll = null,
  customRight = "",
  statusChat = "",
  sizeIconLeft = 16,
  sizeIconRight = 18,
  numNoti = 0,
  editableInputSearch = false,
  isScrollText = false,
  disabledRight = false,
  avatarChat = undefined,
  unreadTotal = 0,
  isShowLeft = true,
  customViewTitle = <></>,
  rightComponent = undefined,
  leftComponent = undefined,
  style,
  styleTitle = {},
  autoFocus = true,
  valueSearch = "",
  customViewRight,
  onChangeText = (text?: string) => {},
  onLeftClick = () => {
    goBack();
  },
  onTitleClick = () => {},
  onRightClick = () => {},
  onSubmitEditing = () => {},
  onClearSearch = () => {},
}: any) => {
  const HEIGHT_INPUT = scaleSizeWidth(38);

  const styles = StyleSheet.create({
    safeView: {
      alignSelf: "stretch",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    viewHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: scaleSizeWidth(5),
      justifyContent: "space-between",
      paddingBottom: scaleSizeWidth(15),
    },
    styleTitleText: {
      fontSize: scaleSizeWidth(16),
      color: titleColor,
      backgroundColor: "transparent",
      fontWeight: "bold",
    },
    styleIconLeft: {
      width: scaleSizeWidth(sizeIconLeft),
      height: scaleSizeWidth(sizeIconLeft),
      tintColor: colorViewLeft,
      resizeMode: "contain",
    },
    viewInput: {
      flexDirection: "row",
      alignItems: "center",
      height: HEIGHT_INPUT,
      borderWidth: 1,
      paddingHorizontal: scaleSizeWidth(10),
      borderRadius: HEIGHT_INPUT / 2,
      backgroundColor: colors.white,
      borderColor: colors.backgroundGrayColor,
      overflow: "hidden",
    },
    iconSearch: {
      width: scaleSizeWidth(16),
      height: scaleSizeWidth(16),
      tintColor: colors.mainColor,
      resizeMode: "contain",
      marginRight: scaleSizeWidth(5),
    },
    inputSearch: {
      flex: 1,
      paddingLeft: scaleSizeWidth(10),
      backgroundColor: colors.white100,
      height: HEIGHT_INPUT,
      fontSize: scaleSizeWidth(14),
      color: colors.colorText,
    },
  });

  const viewCustomRight = () => {
    if (!!customRight) {
      if (customRight === "icon") {
        return (
          <TouchableOpacity
            onPress={onRightClick}
            disabled={disabledRight}
            style={{ paddingHorizontal: scaleSizeWidth(12) }}
          >
            <Image
              source={uriViewRight}
              style={{
                width: scaleSizeWidth(sizeIconRight),
                height: scaleSizeWidth(sizeIconRight),
                tintColor: colorViewRight,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        );
      }
      if (customRight === "text") {
        return (
          <TouchableOpacity
            onPress={onRightClick}
            disabled={disabledRight}
            style={{ paddingHorizontal: scaleSizeWidth(12) }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: scaleSizeWidth(14),
                color: colorViewRight,
                fontWeight: "bold",
                opacity: disabledRight ? 0.3 : 1,
              }}
            >
              {titleRight}
            </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={onRightClick}
            disabled={disabledRight}
            style={{ paddingHorizontal: scaleSizeWidth(12) }}
          >
            <>{customViewRight}</>
          </TouchableOpacity>
        );
      }
    } else {
      return <View style={{ width: scaleSizeWidth(30) }} />;
    }
  };
  return (
    <View
      style={{
        height: constants.HEIGHT_HEADER,
        width: WINDOW_WIDTH,
        backgroundColor: colors.bubleChat,
      }}
    >
      <View
        style={{
          justifyContent: "flex-end",
          // alignItems: "flex-end",

          width: WINDOW_WIDTH,
          height: "100%",
        }}
      >
        <View style={[styles.viewHeader, style]}>
          {isShowLeft ? (
            <TouchableOpacity
              onPress={onLeftClick}
              style={{
                width: "20%",
                paddingHorizontal: scaleSizeWidth(16),
                paddingVertical: scaleSizeWidth(5),
              }}
            >
              {iconViewLeft}
            </TouchableOpacity>
          ) : (
            <View style={{ width: "20%" }} />
          )}

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GradientText
              textAlign="center"
              fontSize={scaleSizeWidth(16)}
              lineHeight={scaleSizeWidth(22)}
              text={titleText}
            />

            {/* <Text numberOfLines={1} style={[styles.styleTitleText, styleTitle]}>
              {titleText}
            </Text> */}
          </View>

          <View style={{ width: "20%" }}>{viewCustomRight()}</View>
        </View>
      </View>
    </View>
  );
};

export default memo(BaseHeader);

import {
  UserCircleCheck,
  PencilSimpleLine,
  GlobeHemisphereEast,
  Trash,
  Info,
  FileX,
} from "phosphor-react-native";
import React, { forwardRef, memo, useImperativeHandle, useRef } from "react";
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from "react-native";
import colors from "../../utils/colors";
import {
  scaleSizeWidth,
  scaleSizeHeight,
  WINDOW_HEIGHT,
} from "../../utils/scale";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import HeaderModal from "./HeaderModal";

const renderIcon = (icon: any) => {
  const SIZE_ICON = scaleSizeWidth(18);
  const WEIGHT_ICON = "duotone";

  switch (icon) {
    case "profile":
      return (
        <UserCircleCheck
          size={SIZE_ICON}
          color={colors.mainColor}
          weight={WEIGHT_ICON}
          duotoneColor={colors.mainColor}
        />
      );

    case "edit":
      return (
        <PencilSimpleLine
          size={SIZE_ICON}
          color={colors.mainColor}
          weight={WEIGHT_ICON}
          duotoneColor={colors.mainColor}
        />
      );

    case "privacy":
      return (
        <GlobeHemisphereEast
          size={SIZE_ICON}
          color={colors.mainColor2}
          weight={WEIGHT_ICON}
          duotoneColor={colors.mainColor2}
        />
      );

    case "delete":
      return (
        <Trash
          size={SIZE_ICON}
          color={colors.tartOrange}
          weight={WEIGHT_ICON}
          duotoneColor={colors.tartOrange}
        />
      );

    case "report":
      return (
        <Info
          size={SIZE_ICON}
          color={colors.mainColor2}
          weight={WEIGHT_ICON}
          duotoneColor={colors.mainColor2}
        />
      );

    case "block":
      return (
        <FileX
          size={SIZE_ICON}
          color={colors.tartOrange}
          weight={WEIGHT_ICON}
          duotoneColor={colors.tartOrange}
        />
      );

    default:
      return <></>;
  }
};

export type BottomSheetCustomRef = {
  show: (value: boolean) => void;
  clear: () => void;
};

type DataBottomSheet = {
  icon?: any;

  option?: string;

  key?: string;

  label?: string;
};
interface PropsBottomSheetCustom {
  styleParentCustom?: StyleProp<ViewStyle>;

  data: DataBottomSheet[];

  isCustom?: boolean;

  customComponent?: React.ReactNode;

  onChoose?: (item: DataBottomSheet) => void;

  onTouchBackdrop?: () => void;

  onClose?: () => void;
}

const BottomSheetCustom = forwardRef<
  BottomSheetCustomRef,
  PropsBottomSheetCustom
>((props, ref) => {
  const actionSheet = useRef<ActionSheetRef>(null);
  const {
    styleParentCustom,
    data,
    isCustom = false,
    customComponent,
    onChoose,
    onTouchBackdrop,
  } = props;

  const onModal = (value: boolean) => {
    actionSheet?.current?.setModalVisible(value);
  };

  useImperativeHandle(
    ref,
    () => ({
      show: (value: boolean) => {
        onModal(value);
      },
      clear: () => {
        onModal(false);
      },
    }),
    []
  );

  return (
    <ActionSheet
      ref={actionSheet}
      containerStyle={styles.container}
      gestureEnabled={false}
      CustomHeaderComponent={<></>}
      statusBarTranslucent={true}
      drawUnderStatusBar={false}
      closeOnTouchBackdrop={true}
      onTouchBackdrop={onTouchBackdrop}
    >
      <HeaderModal
        onClose={() => {
          onModal(false);
        }}
        customLeft={<></>}
        styleSheetCustom={{
          backgroundColor: colors.grey300,
          height: scaleSizeWidth(4),
        }}
        style={{
          height: 0,
        }}
      />
      <View
        style={[
          styles.styleParent,
          {
            height:
              data.length === 1
                ? scaleSizeHeight(80)
                : scaleSizeHeight(60) * data.length,
          },
          styleParentCustom,
        ]}
      >
        {isCustom ? (
          customComponent
        ) : (
          <View style={styles.styleChildContainer}>
            {!!data && data.length ? (
              <ScrollView style={styles.styleContent}>
                {data.map((item: any, index: any) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (onChoose) {
                          onChoose(item);
                        }
                      }}
                      style={[styles.styleItem]}
                    >
                      {!!item.icon
                        ? item.icon
                        : renderIcon(item?.iconText || "")}

                      <Text numberOfLines={2} style={styles.styleTxt}>
                        {item.option?.toString() || item?.label?.toString()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : null}
          </View>
        )}
      </View>
    </ActionSheet>
  );
});

export default memo(BottomSheetCustom);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cultured,
    borderTopLeftRadius: scaleSizeWidth(16),
    borderTopRightRadius: scaleSizeWidth(16),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  styleParent: {
    flexDirection: "column",
    minHeight: WINDOW_HEIGHT / 1.6,
    maxHeight: WINDOW_HEIGHT / 1.4,
  },
  styleContent: {
    backgroundColor: colors.white,
    width: "90%",
    alignSelf: "center",
    borderRadius: scaleSizeWidth(16),
  },
  styleItem: {
    flexDirection: "row",
    paddingHorizontal: scaleSizeWidth(10),
    alignItems: "center",
    alignContent: "center",
    minHeight: scaleSizeHeight(48),
    borderBottomWidth: scaleSizeHeight(2),
    borderBottomColor: colors.cultured,
  },
  styleImg: {
    height: scaleSizeWidth(18),
    width: scaleSizeWidth(18),
    resizeMode: "contain",
  },
  styleTxt: {
    flex: 1,
    fontSize: scaleSizeWidth(14),
    fontWeight: "400",
    color: colors.charlestonGreen,
    marginLeft: scaleSizeWidth(15),
  },
  styleChildContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleSizeHeight(10),
  },
});

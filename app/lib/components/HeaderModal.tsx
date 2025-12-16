import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";
import colors from "../../utils/colors";
import i18n from "../../utils/i18n/i18n";
import { scaleSizeWidth } from "../../utils/scale";

export interface HeaderModalProps {
  title?: string;

  actionLabel?: string;

  style?: StyleProp<ViewStyle>;

  statusPrd?: React.ReactNode;

  total?: number;

  count?: string | number;

  customLeft?: React.ReactNode;

  customCenter?: React.ReactNode;

  customRight?: React.ReactNode;

  isSheetClose?: boolean;

  styleSheetCustom?: StyleProp<ViewStyle>;

  styleHeader?: StyleProp<ViewStyle>;

  onActionPress?: () => void;

  onClose: () => void;
}
const HeaderModal = ({
  title,
  actionLabel,
  style,
  statusPrd,
  total,
  count,
  customLeft,
  customCenter,
  customRight,
  isSheetClose = true,
  styleSheetCustom,
  styleHeader,
  onActionPress,
  onClose,
}: HeaderModalProps) => {
  return (
    <>
      {isSheetClose ? (
        <TouchableOpacity
          onPress={onClose}
          style={[styles.header, styleHeader]}
        >
          <View style={[styles.sheetClose, styleSheetCustom]} />
        </TouchableOpacity>
      ) : null}

      <View style={[styles.headerContainer, style]}>
        {!!customLeft ? (
          customLeft
        ) : (
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>{i18n.t("mainLanguage:dong")}</Text>
          </TouchableOpacity>
        )}
        {!!customCenter ? (
          customCenter
        ) : (
          <View style={styles.vTitle}>
            <Text style={styles.titleText}>{title}</Text>
            {!!total && total > 0 && (
              <Text style={styles.textCount}>{`${count}/${total}`}</Text>
            )}
          </View>
        )}
        {!!customRight
          ? customRight
          : !!actionLabel &&
            !!onActionPress && (
              <TouchableOpacity
                onPress={onActionPress}
                style={styles.actionBtn}
              >
                <Text style={styles.actionText}>{actionLabel}</Text>
              </TouchableOpacity>
            )}
        {statusPrd}
      </View>
    </>
  );
};

export default HeaderModal;

const styles = StyleSheet.create({
  headerContainer: {
    height: scaleSizeWidth(60),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    padding: scaleSizeWidth(16),
    justifyContent: "center",
  },
  actionBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    padding: scaleSizeWidth(16),
    justifyContent: "center",
  },
  closeText: {
    fontSize: scaleSizeWidth(13),
    lineHeight: scaleSizeWidth(18),
    color: colors.colorTextPrice,
  },
  actionText: {
    fontSize: scaleSizeWidth(13),
    lineHeight: scaleSizeWidth(18),
    color: colors.mainColor2,
  },
  vTitle: {
    alignItems: "center",
  },
  textCount: {
    color: "#6B7980",
    fontSize: scaleSizeWidth(14),
    fontWeight: "600",
  },
  titleText: {
    fontSize: scaleSizeWidth(18),
    lineHeight: scaleSizeWidth(27),
    color: colors.mainColor,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: scaleSizeWidth(5),
  },
  sheetClose: {
    width: scaleSizeWidth(50),
    height: scaleSizeWidth(5),
    borderRadius: scaleSizeWidth(10),
    backgroundColor: colors.backgroundGrayColor,
  },
});

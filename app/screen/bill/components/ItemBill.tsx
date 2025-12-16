import { User, CaretRight } from "phosphor-react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "../../../utils/colors";
import i18n from "../../../utils/i18n/i18n";
import { scaleSizeWidth, scaleSizeHeight } from "../../../utils/scale";
import { formatToVietnamTime } from "../../../utils/convert";

export const ItemBill = ({ item }: any) => {
  const renderSummary = (title: string, value: string) => {
    return (
      <View>
        <Text
          style={{
            fontSize: scaleSizeHeight(12),
            color: colors.grayTextColor,
            fontWeight: "500",
            marginBottom: scaleSizeHeight(4),
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: scaleSizeHeight(16),
            fontWeight: "600",
          }}
        >
          {value}
        </Text>
      </View>
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        backgroundColor: colors.white,
        borderRadius: scaleSizeWidth(16),
        borderWidth: scaleSizeWidth(1),
        borderColor: colors.cadet_grey_shadow,
        padding: scaleSizeWidth(16),

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: scaleSizeHeight(16),
        }}
      >
        {/* Left */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scaleSizeHeight(8),
              marginBottom: scaleSizeHeight(8),
            }}
          >
            <Text
              style={{
                fontSize: scaleSizeHeight(16),
                lineHeight: scaleSizeHeight(24),
                fontWeight: "600",
              }}
            >
              {i18n.t("main:hoa_don")}#{item?.id}
            </Text>
            <View
              style={{
                backgroundColor: colors.shadowOfMainColor2,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: colors.mainColor2,
                }}
              >
                {item?.summary?.matchedDebtorCount}/{item?.summary?.itemCount}{" "}
                {i18n.t("main:da_khop")}
              </Text>
            </View>
          </View>

          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 13, color: colors.grayTextColor }}>
              {i18n.t("main:thoi_gian_quet")}
              {": "}
              {formatToVietnamTime(item?.scannedAt || "")}
            </Text>
            <Text style={{ fontSize: 13, color: colors.grayTextColor }}>
              {i18n.t("main:thoi_gian_tao")}
              {": "}
              {formatToVietnamTime(item?.createdAt || "")}{" "}
            </Text>
          </View>
        </View>

        {/* Right */}
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: scaleSizeHeight(20),
              lineHeight: scaleSizeHeight(30),
              fontWeight: "700",
              color: colors.mainColor,
              marginBottom: scaleSizeHeight(8),
            }}
          >
            {item?.summary?.totalAmount.toLocaleString()} VNĐ
          </Text>
          <Text style={{ fontSize: 12, color: colors.grayTextColor }}>
            {item?.summary?.itemCount} {i18n.t("main:muc")}
          </Text>
        </View>
      </View>

      {/* Stats grid */}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: colors.antiFlashWhite,
          borderRadius: scaleSizeHeight(12),
          padding: scaleSizeHeight(12),
        }}
      >
        {renderSummary(
          i18n.t("main:tong_tien"),
          item?.summary?.totalAmount.toLocaleString() + " VNĐ"
        )}
        {renderSummary(i18n.t("main:so_muc"), item?.summary?.itemCount)}
        {renderSummary(
          i18n.t("main:da_khop"),
          item?.summary?.matchedDebtorCount
        )}
        {renderSummary(i18n.t("main:khoan_vay"), item?.summary?.loanCount)}
      </View> */}
    </TouchableOpacity>
  );
};

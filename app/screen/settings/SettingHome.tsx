import { View, Text } from "react-native";
import BaseHeader from "../../lib/components/BaseHeader";
import i18n from "../../utils/i18n/i18n";
import colors from "../../utils/colors";
import { scaleSizeWidth, scaleSizeHeight } from "../../utils/scale";
import { CaretRight, DotOutline } from "phosphor-react-native";
import { use, useEffect, useState } from "react";
import { _api } from "../../services/api";

export const SettingHome = () => {
  const [isLoadingAccountInfo, setIsLoadingAccountInfo] = useState(false);
  const [accountInfo, setAccountInfo] = useState<any>(null);

  const fetchAccountInfo = async () => {
    setIsLoadingAccountInfo(true);
    try {
      const data = await _api.getMain("/me");
      // setAccountInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Fetch account info error:", error);
    } finally {
      setIsLoadingAccountInfo(false);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader
        titleText={
          i18n.t("main:quan_ly_tai_khoan") + " - " + i18n.t("main:cai_dat")
        }
      />
      {/* thong_tin_tai_khoan */}
      <View
        style={{
          marginTop: scaleSizeHeight(16),
          marginHorizontal: scaleSizeWidth(16),
          gap: scaleSizeWidth(10),
          paddingVertical: scaleSizeHeight(10),
          paddingHorizontal: scaleSizeWidth(16),
          backgroundColor: colors.white,
          borderRadius: scaleSizeWidth(10),
          borderWidth: scaleSizeWidth(1),
          borderColor: colors.cadet_grey_shadow,
        }}
      >
        <Text
          style={{
            fontSize: scaleSizeWidth(14),
            lineHeight: scaleSizeWidth(22),
            fontWeight: "bold",
            color: colors.mainColor,
          }}
        >
          {i18n.t("main:thong_tin_tai_khoan")}
        </Text>
        <View>
          <Text
            style={{
              fontSize: scaleSizeWidth(12),
              lineHeight: scaleSizeWidth(18),
              // fontWeight: "bold",
              color: colors.grayTextColor,
            }}
          >
            {i18n.t("main:email")}
          </Text>
          <Text
            style={{
              fontSize: scaleSizeWidth(12),
              lineHeight: scaleSizeWidth(18),
              // fontWeight: "bold",
              color: colors.mainColor,
            }}
          >
            {accountInfo?.email || i18n.t("main:chua_cap_nhat")}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: scaleSizeWidth(12),
              lineHeight: scaleSizeWidth(18),
              // fontWeight: "bold",
              color: colors.grayTextColor,
            }}
          >
            {i18n.t("main:trang_thai_email").toLocaleUpperCase()}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <DotOutline
              size={14}
              weight="fill"
              color={
                accountInfo?.emailVerified ? colors.success : colors.warning
              }
            />
            <Text
              style={{
                fontSize: scaleSizeWidth(12),
                lineHeight: scaleSizeWidth(18),
                // fontWeight: "bold",
                color: accountInfo?.emailVerified
                  ? colors.success
                  : colors.warning,
              }}
            >
              {accountInfo?.emailVerified
                ? i18n.t("main:da_xac_thuc")
                : i18n.t("main:chua_xac_thuc")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

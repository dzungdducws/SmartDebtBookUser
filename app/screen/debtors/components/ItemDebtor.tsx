import { CaretRight, User } from "phosphor-react-native";
import { View, Image, Text } from "react-native";
import colors from "../../../utils/colors";
import { scaleSizeWidth, scaleSizeHeight } from "../../../utils/scale";
import i18n from "../../../utils/i18n/i18n";

export const ItemDebtor = ({ item }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: scaleSizeWidth(10),
        paddingVertical: scaleSizeHeight(10),
        paddingHorizontal: scaleSizeWidth(16),
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white,
        borderRadius: scaleSizeWidth(10),
        borderWidth: scaleSizeWidth(1),
        borderColor: colors.cadet_grey_shadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: scaleSizeWidth(10),
          alignItems: "center",
        }}
      >
        {item?.avt ? (
          <Image
            source={{ uri: item?.avt }}
            style={{ width: scaleSizeWidth(50), height: scaleSizeWidth(50) }}
          />
        ) : (
          <View
            style={{
              width: scaleSizeWidth(50),
              height: scaleSizeWidth(50),
              backgroundColor: colors.mainColor2,
              borderRadius: scaleSizeWidth(25),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <User
              weight="fill"
              color={colors.white}
              size={scaleSizeWidth(32)}
            />
          </View>
        )}
        <Text>{item?.displayNameAlias}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", color: colors.mainColor2 }}>
          {item?.amountOwed !== 0
            ? item?.amountOwed.toLocaleString() + " VNĐ"
            : i18n.t("main:da_tra_het_no")}
        </Text>

        <CaretRight size={scaleSizeWidth(24)} color={colors.mainColor2} />
      </View>
    </View>
  );
};

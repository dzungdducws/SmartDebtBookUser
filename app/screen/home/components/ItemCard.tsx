import { View, Text } from "react-native";
import colors from "../../../utils/colors";
import { scaleSizeWidth, scaleSizeHeight } from "../../../utils/scale";

export const ItemCard = ({
  icon = () => {},
  bgColorIcon = colors.mainColor2,
  title = "",
  value = 0,
}: any) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: scaleSizeWidth(10),
        paddingHorizontal: scaleSizeWidth(20),
        paddingVertical: scaleSizeHeight(10),
        gap: scaleSizeWidth(10),
        flexDirection: "row",
      }}
    >
      <View
        style={{
          padding: scaleSizeWidth(10),
          backgroundColor: bgColorIcon || colors.white,
          borderRadius: scaleSizeWidth(10),
        }}
      >
        {icon()}
      </View>
      <View
        style={{
          gap: scaleSizeWidth(10),
        }}
      >
        <Text
          style={{
            fontSize: scaleSizeWidth(16),
            lineHeight: scaleSizeHeight(24),
            fontWeight: "bold",
            color: colors.mainColor,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            fontSize: scaleSizeWidth(16),
            fontWeight: "bold",
            color: colors.mainColor,
          }}
        >
          {value.toLocaleString()} VNĐ
        </Text>
      </View>
    </View>
  );
};

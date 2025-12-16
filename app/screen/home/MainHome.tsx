import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import BaseHeader from "../../lib/components/BaseHeader";
import GradientText from "../../lib/components/GradientText";
import constants from "../../utils/const";
import colors from "../../utils/colors";
import { scaleSizeHeight, scaleSizeWidth } from "../../utils/scale";
import { images } from "../../utils/images";
import { useEffect, useRef, useState } from "react";
import { _api } from "../../services/api";
import { ItemCard } from "./components/ItemCard";
import {
  CaretRight,
  CheckCircle,
  PlusCircle,
  User,
} from "phosphor-react-native";
import i18n from "../../utils/i18n/i18n";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/userSlice";
import { FlatList } from "react-native-gesture-handler";
import { FloatBtn } from "./components/FloatBtn";
import { SCREEN } from "../../navigation/screen-types";
import { navigateScreen } from "../../navigation/navigation-service";
import { ItemDebtor } from "../debtors/components/ItemDebtor";
const MainHome = () => {
  const [netOutstanding, setNetOutstanding] = useState<any>(0);
  const [totalLoaned, setTotalLoaned] = useState<any>(0);
  const [totalReceived, setTotalReceived] = useState<any>(0);
  const [debtors, setDebtors] = useState<any[]>([]);
  const dispatch = useDispatch();

  const fetchDataMoney = async () => {
    const data = await _api.getMain("/loans/summary");
    setNetOutstanding(data?.netOutstanding || 0);
    setTotalLoaned(data?.totalLoaned || 0);
    setTotalReceived(data?.totalReceived || 0);
  };
  const fetchDebtors = async () => {
    const data = await _api.getMain("/debtors");
    setDebtors(data?.items || []);
  };
  useEffect(() => {
    fetchDataMoney();
    fetchDebtors();
  }, []);

  const onShowAllDebtors = () => {
    navigateScreen(SCREEN.DEBTOR_STACK);
  };

  return (
    <View>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          paddingTop: constants.TOP_HEADER + scaleSizeHeight(24),
          paddingHorizontal: scaleSizeWidth(20),
          backgroundColor: colors.antiFlashWhite,
          height: "100%",
          gap: scaleSizeHeight(20),
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: scaleSizeWidth(10),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(logout());
            }}
          >
            <Image
              source={images.mainLogo}
              style={{
                width: scaleSizeWidth(100),
                height: scaleSizeWidth(100),
              }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center" }}>
            <GradientText textAlign="left" fontSize={scaleSizeWidth(30)} />
            <Text
              style={{
                fontSize: scaleSizeWidth(16),
                fontWeight: "bold",
                color: colors.mainColor,
              }}
            >
              FINANCIAL TECHNOLOGY
            </Text>
          </View>
        </View>
        <View style={{ gap: scaleSizeHeight(20) }}>
          <ItemCard
            icon={() => (
              <CheckCircle size={32} weight="bold" color={colors.white} />
            )}
            bgColorIcon={colors.mainColor}
            title={i18n.t("main:so_tien_phai_thu")}
            value={netOutstanding}
          />
          <ItemCard
            icon={() => (
              <CheckCircle size={32} weight="bold" color={colors.white} />
            )}
            title={i18n.t("main:tong_cho_vay")}
            value={totalLoaned}
          />
          <ItemCard
            icon={() => (
              <CheckCircle size={32} weight="bold" color={colors.white} />
            )}
            title={i18n.t("main:tong_da_thu")}
            value={totalReceived}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: scaleSizeWidth(10),
            paddingHorizontal: scaleSizeWidth(20),
            paddingVertical: scaleSizeHeight(10),
            gap: scaleSizeWidth(10),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: scaleSizeWidth(16),
                fontWeight: "bold",
                color: colors.mainColor,
              }}
            >
              {i18n.t("main:nguoi_no_gan_day")}
            </Text>
            <TouchableOpacity
              onPress={() => onShowAllDebtors()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.mainColor,
                borderRadius: scaleSizeWidth(10),
                paddingHorizontal: scaleSizeWidth(10),
                paddingVertical: scaleSizeHeight(5),
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: scaleSizeWidth(13),
                  lineHeight: scaleSizeHeight(22),
                  fontWeight: "bold",
                }}
              >
                {i18n.t("special_id:xem_tat_ca")}
              </Text>
              <CaretRight
                weight="fill"
                size={scaleSizeWidth(16)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          {debtors.length > 0 ? (
            debtors.map((item, index) => <ItemDebtor key={index} item={item} />)
          ) : (
            <Text>{i18n.t("main:khong_co_nguoi_no")}</Text>
          )}
          {/* <FlatList
            nestedScrollEnabled
            data={debtors}
            renderItem={({ item }) => renderItemDebtor(item)}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text>{i18n.t("main:khong_co_nguoi_no")}</Text>}
          /> */}
        </View>
      </ScrollView>
      <FloatBtn />
    </View>
  );
};

export default MainHome;

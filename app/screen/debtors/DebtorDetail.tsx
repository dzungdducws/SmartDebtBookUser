import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import BaseHeader from "../../lib/components/BaseHeader";
import i18n from "../../utils/i18n/i18n";
import { useEffect, useState, useCallback } from "react";
import { _api } from "../../services/api";
import { FlatList } from "react-native-gesture-handler";
import { ItemDebtor } from "./components/ItemDebtor";
import { scaleSizeHeight, scaleSizeWidth } from "../../utils/scale";
import colors from "../../utils/colors";
import { Plus, PlusCircle } from "phosphor-react-native";
import { ModalCustom } from "../../lib/components/ModalCustom";
import { ModalThemNguoiNo } from "./components/ModalThemNguoiNo";
import { isEmail } from "../../utils/validate";

export const DebtorDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [displayNameAlias, setDisplayNameAlias] = useState("");
  const [email, setEmail] = useState("");
  const [billNames, setBillNames] = useState([""]);
  const [isValidModal, setIsValidModal] = useState(false);

  const handleSendData = async () => {
    const param = {
      displayNameAlias,
      email,
      billNames: billNames
        .filter((item) => item.trim().length > 0)
        .map((item) => ({ name: item })),
    };

    try {
      const response = await _api.putMain("/debtors", param);

      if (response?.statusCode === 409) {
        Alert.alert(
          i18n.t("main:loi"),
          i18n.t("main:email_da_ton_tai_vui_long_thay_doi_email")
        );
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.error("Send data error:", error);
      Alert.alert(i18n.t("main:loi"), i18n.t("main:gui_du_lieu_that_bai"));
    }
  };

  const handleValidateBillNames = () => {
    return billNames.some((item) => item.length > 0);
  };

  useEffect(() => {
    setIsValidModal(
      displayNameAlias.length > 0 && isEmail(email) && handleValidateBillNames()
    );
  }, [billNames, email, displayNameAlias]);

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader titleText={i18n.t("main:danh_sach_nguoi_no")} />
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
        style={{
          alignSelf: "flex-end",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: scaleSizeHeight(10),
          marginHorizontal: scaleSizeWidth(10),
          flexDirection: "row",
          gap: scaleSizeWidth(8),
          borderRadius: scaleSizeWidth(10),
          backgroundColor: colors.mainColor,
          paddingVertical: scaleSizeHeight(10),
          paddingHorizontal: scaleSizeHeight(20),
        }}
      >
        <PlusCircle size={32} color={colors.white} weight="bold" />
        <Text
          style={{
            color: colors.white,
            lineHeight: scaleSizeHeight(22),
            fontSize: scaleSizeHeight(16),
            fontWeight: "bold",
          }}
        >
          {i18n.t("main:them_nguoi_no")}
        </Text>
      </TouchableOpacity>

      {showModal && (
        <ModalCustom
          onClose={() => setShowModal(false)}
          title={i18n.t("main:them_nguoi_no")}
          isCustomContent={true}
          customContent={() => (
            <ModalThemNguoiNo
              displayNameAlias={displayNameAlias}
              setDisplayNameAlias={setDisplayNameAlias}
              email={email}
              setEmail={setEmail}
              billNames={billNames}
              setBillNames={setBillNames}
            />
          )}
          onAction={handleSendData}
          disabled={!isValidModal}
        />
      )}
    </View>
  );
};

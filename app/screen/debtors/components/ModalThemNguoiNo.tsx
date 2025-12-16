import {
  IdentificationCard,
  Plus,
  User,
  X,
  XCircle,
  XCircleIcon,
} from "phosphor-react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import colors from "../../../utils/colors";
import i18n from "../../../utils/i18n/i18n";
import { scaleSizeHeight, scaleSizeWidth } from "../../../utils/scale";
import { useState } from "react";
import { InputText } from "../../../lib/components/InputText";

export const ModalThemNguoiNo = ({
  displayNameAlias,
  setDisplayNameAlias,
  email,
  setEmail,
  billNames,
  setBillNames,
}: any) => {
  const handleAddBill = () => {
    setBillNames([...billNames, { name: "" }]);
  };

  const handleRemoveBill = (index: number) => {
    if (billNames.length > 1) {
      const newBills = billNames.filter((_: any, i: number) => i !== index);
      setBillNames(newBills);
    }
  };

  const handleChangeBill = (value: string, index: number) => {
    setBillNames((prevBills: any) =>
      prevBills.map((bill: any, i: number) =>
        i === index ? { ...bill, name: value } : bill
      )
    );
  };

  return (
    <View
      style={{
        justifyContent: "center",
        padding: scaleSizeHeight(16),
        gap: scaleSizeHeight(8),
      }}
    >
      <InputText
        label={i18n.t("main:ten_nguoi_no")}
        require
        value={displayNameAlias}
        placeholder={i18n.t("main:ten_nguoi_no")}
        setValue={setDisplayNameAlias}
      />
      <InputText
        label={i18n.t("main:email_nguoi_no")}
        require
        value={email}
        placeholder={i18n.t("main:email_nguoi_no")}
        setValue={setEmail}
      />
      <Text
        style={{
          fontSize: scaleSizeWidth(14),
          lineHeight: scaleSizeWidth(22),
          fontWeight: "bold",
        }}
      >
        {i18n.t("main:ten_hoa_don")}
        {<Text style={{ color: colors.colorHotline }}> *</Text>}
      </Text>
      {billNames.map((bill: any, index: number) => (
        <View
          key={index}
          style={{
            gap: scaleSizeHeight(8),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: billNames.length != 1 ? "90%" : "100%" }}>
            <InputText
              value={bill.name}
              placeholder={i18n.t("main:ten_hoa_don") + " " + (index + 1)}
              setValue={(text: string) => handleChangeBill(text, index)}
            />
          </View>
          {billNames.length != 1 && (
            <TouchableOpacity
              style={{ marginLeft: scaleSizeWidth(8) }}
              onPress={() => handleRemoveBill(index)}
            >
              <XCircle size={scaleSizeWidth(20)} color={colors.colorHotline} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          gap: scaleSizeHeight(8),
          marginTop: scaleSizeHeight(8),
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: colors.mainColor2,
            padding: scaleSizeHeight(8),
            borderRadius: scaleSizeHeight(8),
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleAddBill}
        >
          <Text style={{ color: colors.white }}>
            {i18n.t("main:them_then_nguoi_no")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

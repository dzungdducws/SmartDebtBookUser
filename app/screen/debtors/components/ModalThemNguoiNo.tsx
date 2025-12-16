import { IdentificationCard, Plus, User } from "phosphor-react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import colors from "../../../utils/colors";
import i18n from "../../../utils/i18n/i18n";
import { scaleSizeHeight } from "../../../utils/scale";
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
    setBillNames([...billNames, ""]);
  };

  const handleRemoveLastBill = () => {
    if (billNames.length > 1) {
      setBillNames(billNames.slice(0, -1));
    }
  };

  const handleChangeBill = (value: string, index: number) => {
    const newBills = [...billNames];
    newBills[index] = value;
    setBillNames(newBills);
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
      {billNames.map((bill: any, index: number) => (
        <InputText
          key={index}
          label={`${i18n.t("main:ten_hoa_don")} ${index + 1}`}
          value={bill}
          placeholder={i18n.t("main:ten_hoa_don")}
          setValue={(text: string) => handleChangeBill(text, index)}
        />
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

        {billNames.length > 1 && (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.colorHotline,
              padding: scaleSizeHeight(8),
              borderRadius: scaleSizeHeight(8),
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleRemoveLastBill}
          >
            <Text style={{ color: colors.white }}>
              {i18n.t("main:xoa_hoa_don_cuoi")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

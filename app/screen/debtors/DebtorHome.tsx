import { View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
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

export const DebtorHome = () => {
  const [debtors, setDebtors] = useState<any[]>([]);
  const [params, setParams] = useState<any>({ page: 1, limit: 10 });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [displayNameAlias, setDisplayNameAlias] = useState("");
  const [email, setEmail] = useState("");
  const [billNames, setBillNames] = useState([""]);

  const fetchDebtors = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const data = await _api.getMain("/debtors", params);

      const newItems = data?.items || [];
      setDebtors((prev) =>
        params.page === 1 ? newItems : [...prev, ...newItems]
      );
      setHasMore(newItems.length === params.limit);
    } catch (error) {
      console.error("Fetch debtors error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [params, isLoading, hasMore]);

  useEffect(() => {
    fetchDebtors();
  }, [params.page]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setParams((prev: any) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleRefresh = () => {
    setParams({ page: 1, limit: 10 });
  };

  const handleSendData = () => {
    const data = {
      displayNameAlias,
      email,
      billNames: billNames.map((item) => ({ name: item })),
    };
    const response = _api.postMain("/debtors", data);
    console.log(response);
  };

  const handleValidateBillNames = () => {
    billNames.forEach((item) => {
      if (item.trim().length > 0) return true;
    });
    return false;
  };

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
          disabled={
            displayNameAlias === "" ||
            !isEmail(email) ||
            handleValidateBillNames()
          }
        />
      )}
      <FlatList
        data={debtors}
        renderItem={({ item }) => <ItemDebtor item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: scaleSizeHeight(10),
          padding: scaleSizeWidth(10),
          paddingBottom: scaleSizeHeight(20),
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              size="small"
              color={colors.mainColor}
              animating={false}
            />
          ) : (
            <Text>{i18n.t("main:khong_co_nguoi_no")}</Text>
          )
        }
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="small"
              color={colors.mainColor}
              style={{ marginVertical: scaleSizeHeight(10) }}
            />
          ) : !hasMore && debtors.length ? (
            <View style={{ alignItems: "center", padding: 10 }}>
              <ActivityIndicator
                size="small"
                color={colors.mainColor}
                animating={false}
              />
              <Text style={{ color: colors.grayTextColor }}>
                {i18n.t("main:da_tai_het_du_lieu")}
              </Text>
            </View>
          ) : null
        }
      />

      {/* <TouchableOpacity
        style={{
          position: "absolute",
          right: scaleSizeWidth(40),
          bottom: scaleSizeHeight(40),
          alignItems: "center",
          backgroundColor: colors.mainColor2,
          borderRadius: scaleSizeWidth(25),
          width: scaleSizeWidth(50),
          height: scaleSizeWidth(50),
          justifyContent: "center",
        }}
        onPress={() => {}}
      >
        <PlusCircle
          size={scaleSizeWidth(40)}
          weight="duotone"
          color={colors.white}
        />
      </TouchableOpacity> */}
    </View>
  );
};

import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import BaseHeader from "../../lib/components/BaseHeader";
import i18n from "../../utils/i18n/i18n";
import { useEffect, useState, useCallback, useRef } from "react";
import { _api } from "../../services/api";
import { FlatList } from "react-native-gesture-handler";
import { scaleSizeHeight, scaleSizeWidth } from "../../utils/scale";
import colors from "../../utils/colors";
import { Plus, PlusCircle, Scan } from "phosphor-react-native";
import { ModalCustom } from "../../lib/components/ModalCustom";
import { isEmail } from "../../utils/validate";
import { ItemBill } from "./components/ItemBill";
import MediaPicker from "../../lib/components/MediaPicker";
import mime from "mime";

export const BillHome = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [params, setParams] = useState<any>({ page: 0, limit: 10 });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const modalOptionImg = useRef<any>(null);

  const fetchBills = useCallback(
    async (customParams?: any) => {
      if (isLoading || !hasMore) return;

      const currentParams = customParams || params;
      setParams(currentParams);
      setIsLoading(true);
      try {
        const data = await _api.getMain("/bills", currentParams);

        const newItems = data?.items || [];
        setBills((prev) =>
          customParams?.page === 1 ? newItems : [...prev, ...newItems]
        );
        setHasMore(newItems.length === customParams?.limit);
      } catch (error) {
        console.error("Fetch bills error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [params, isLoading, hasMore]
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchBills({
        page: params.page + 1,
        limit: params.limit,
      });
    }
  };

  const handleRefresh = async () => {
    const newParams = { page: 1, limit: 10 };
    setIsLoading(false);
    setParams(newParams);
    setHasMore(true);
    await fetchBills(newParams);
  };

  return (
    <View style={{ flex: 1 }}>
      <BaseHeader titleText={i18n.t("main:quan_ly_hoa_don")} />
      <TouchableOpacity
        onPress={() => {
          modalOptionImg.current?.onOpenModal();
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
        <Scan size={32} color={colors.white} weight="bold" />
        <Text
          style={{
            color: colors.white,
            lineHeight: scaleSizeHeight(22),
            fontSize: scaleSizeHeight(16),
            fontWeight: "bold",
          }}
        >
          {i18n.t("main:quet_hoa_don")}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={bills}
        renderItem={({ item }) => <ItemBill item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: scaleSizeHeight(24),
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
          ) : !hasMore && bills.length ? (
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

      <MediaPicker
        ref={modalOptionImg}
        handleSelect={async (image: any) => {
          const formData = new FormData();
          const fileName = image.split("/").pop() || "photo.jpg";
          const mimeType = mime.getType(image) || "image/jpeg";

          formData.append("image", {
            uri: image,
            name: fileName,
            type: mimeType,
          } as any);

          try {
            const response = await _api.postMain(
              "/bill-scan/scan",
              formData,
              true
            );
          } catch (error) {
            console.error("❌ Upload error:", error);
          } finally {
            handleRefresh();
          }
        }}
      />
    </View>
  );
};

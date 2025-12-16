import { Camera, List, PlusCircle, Scan, X } from "phosphor-react-native";
import { View, Animated, TouchableOpacity } from "react-native";
import colors from "../../../utils/colors";
import { scaleSizeWidth, scaleSizeHeight } from "../../../utils/scale";
import { useState, useRef } from "react";
import MediaPicker from "../../../lib/components/MediaPicker";
import { _api } from "../../../services/api";
import * as FileSystem from "expo-file-system";
import mime from "mime";
import { SCREEN } from "../../../navigation/screen-types";
import { navigateScreen } from "../../../navigation/navigation-service";

export const FloatBtn = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const modalOptionImg = useRef<any>(null);

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 6,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const positions = [
    {
      pos: { x: 0, y: -70 },
      icon: (
        <PlusCircle
          size={scaleSizeWidth(40)}
          weight="duotone"
          color={colors.white}
        />
      ),
      fn: () => {},
    },
    {
      pos: { x: -70, y: 0 },
      icon: (
        <Scan size={scaleSizeWidth(40)} weight="duotone" color={colors.white} />
      ),
      fn: () => {
        modalOptionImg.current?.onOpenModal();
      },
    },
    {
      pos: { x: -70, y: -70 },
      icon: (
        <List size={scaleSizeWidth(40)} weight="duotone" color={colors.white} />
      ),
      fn: () => {
        navigateScreen(SCREEN.BILL_STACK);
      },
    },
  ];
  return (
    <View
      style={{
        position: "absolute",
        right: scaleSizeWidth(40),
        bottom: scaleSizeHeight(40),
      }}
    >
      {positions.map((item: any, index) => {
        const translateX = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, item?.pos?.x],
        });
        const translateY = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, item?.pos?.y],
        });

        return (
          <Animated.View
            key={index}
            style={{
              position: "absolute",
              transform: [{ translateX }, { translateY }],
              opacity: animation,
            }}
          >
            <TouchableOpacity
              style={{
                width: scaleSizeWidth(60),
                height: scaleSizeWidth(60),
                borderRadius: 15,
                backgroundColor: colors.mainColor2,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={item?.fn}
            >
              {item?.icon}
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Nút chính */}
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: colors.mainColor2,
          borderRadius: scaleSizeWidth(25),
          width: scaleSizeWidth(50),
          height: scaleSizeWidth(50),
          justifyContent: "center",
        }}
        onPress={toggleMenu}
      >
        {!isExpanded ? (
          <PlusCircle
            size={scaleSizeWidth(40)}
            weight="duotone"
            color={colors.white}
          />
        ) : (
          <X size={scaleSizeWidth(40)} weight="duotone" color={colors.white} />
        )}
      </TouchableOpacity>

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
          }
        }}
      />
    </View>
  );
};

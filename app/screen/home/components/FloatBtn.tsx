import { Camera, GearSix, List, PlusCircle, X } from "phosphor-react-native";
import { View, Animated, TouchableOpacity } from "react-native";
import colors from "../../../utils/colors";
import { scaleSizeWidth, scaleSizeHeight } from "../../../utils/scale";
import { useState, useRef } from "react";
import { SCREEN } from "../../../navigation/screen-types";
import { navigateScreen } from "../../../navigation/navigation-service";

export const FloatBtn = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

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
        <Camera
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
        <GearSix
          size={scaleSizeWidth(40)}
          weight="duotone"
          color={colors.white}
        />
      ),
      fn: () => {
        navigateScreen(SCREEN.SETTING_STACK);
      },
    },
    {
      pos: { x: -70, y: -70 },
      icon: (
        <List size={scaleSizeWidth(40)} weight="duotone" color={colors.white} />
      ),
      fn: () => {},
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
              onPress={item?.fn}
              style={{
                width: scaleSizeWidth(60),
                height: scaleSizeWidth(60),
                borderRadius: 15,
                backgroundColor: colors.mainColor2,
                justifyContent: "center",
                alignItems: "center",
              }}
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
    </View>
  );
};

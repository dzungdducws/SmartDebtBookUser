import React, { useRef } from "react";
import { Animated, PanResponder, TouchableOpacity } from "react-native";
import { PlusCircle } from "phosphor-react-native";
import colors from "../../utils/colors";
import { scaleSizeWidth, scaleSizeHeight } from "../../utils/scale";

export default function DraggableButton() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
  const newX = Math.max(0, Math.min(gestureState.dx, 1000));
  const newY = Math.max(0, Math.min(gestureState.dy, 1000));
  pan.setValue({ x: newX, y: newY });
},

      onPanResponderRelease: () => {
        // giữ nguyên vị trí sau khi thả
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          right: scaleSizeWidth(40),
          bottom: scaleSizeHeight(40),
        },
        {
          transform: pan.getTranslateTransform(),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: colors.mainColor2,
          borderRadius: scaleSizeWidth(25),
          width: scaleSizeWidth(50),
          height: scaleSizeWidth(50),
          justifyContent: "center",
        }}
        onPress={() => {
          console.log("Button pressed");
        }}
        activeOpacity={0.8}
      >
        <PlusCircle
          size={scaleSizeWidth(40)}
          weight="duotone"
          color={colors.white}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

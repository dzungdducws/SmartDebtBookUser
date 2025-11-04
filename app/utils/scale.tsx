import { Dimensions, Platform } from "react-native";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

export const [shortDimension, longDimension] =
  WINDOW_WIDTH < WINDOW_HEIGHT
    ? [WINDOW_WIDTH, WINDOW_HEIGHT]
    : [WINDOW_HEIGHT, WINDOW_WIDTH];

//Guideline sizes are based on standard ~5" screen mobile device
export const GUIDELINE_BASE_WIDTH = 428;

export const GUIDELINE_BASE_HEIGHT = 926;

const scale = (size: number) => (shortDimension / GUIDELINE_BASE_WIDTH) * size;

const verticalScale = (size: number) =>
  (longDimension / GUIDELINE_BASE_HEIGHT) * size;

export const scaleSizeWidth = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const scaleSizeHeight = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

const checkDimensions = (dimensions: any[]) => {
  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");

  return dimensions.some(([width, height]) => {
    return (
      (window.height === height && window.width === width) ||
      (window.width === height && window.height === width) ||
      (screen.height === height && screen.width === width) ||
      (screen.width === height && screen.height === width)
    );
  });
};

export const isIphoneX = () => {
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    checkDimensions([
      [780, 360],
      [812, 375],
      [844, 390],
      [896, 414],
      [926, 428],
      [852, 393],
      [932, 430],
    ])
  );
};

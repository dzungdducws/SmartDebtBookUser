import { getStatusBarHeight } from "react-native-status-bar-height";
import { scaleSizeWidth, WINDOW_HEIGHT } from "./scale";
import { Platform } from "react-native";

const constants = {
  BASE_URL: "",
  MAX_STAR: 5,
  SERVER_TIMEOUT: 50000,
  TAG_UPDATE_USER_DATA: "tagUpdateUserData",
  TOP_HEADER: getStatusBarHeight() + 15,
  HEIGHT_HEADER: getStatusBarHeight() + scaleSizeWidth(78),
  HEIGHT_HEADER_1:
    getStatusBarHeight() +
    (Platform.OS === "android" ? scaleSizeWidth(75) : scaleSizeWidth(72)),
  HEIGHT_HEADER_2:
    getStatusBarHeight() +
    (Platform.OS === "android" ? scaleSizeWidth(75) : scaleSizeWidth(72)) -
    scaleSizeWidth(5),
  HEIGHT_HEADER_3:
    (getStatusBarHeight() +
      (Platform.OS === "android" ? scaleSizeWidth(95) : scaleSizeWidth(72))) *
    1.8,
};

export default constants;

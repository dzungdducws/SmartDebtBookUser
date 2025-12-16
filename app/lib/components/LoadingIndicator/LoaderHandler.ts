import { DeviceEventEmitter } from "react-native";
import i18n from "../../../utils/i18n/i18n";

const LoaderHandler = {
  hideLoader() {
    DeviceEventEmitter.emit("changeLoadingEffect", { isVisible: false });
  },
  showLoader(titleRes?: string, icon?: any) {
    let title = titleRes || i18n.t("main:dang_tai");
    DeviceEventEmitter.emit("changeLoadingEffect", {
      title,
      icon,
      isVisible: true,
    });
  },
};
export default LoaderHandler;

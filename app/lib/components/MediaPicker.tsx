import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera, CameraPlus } from "phosphor-react-native";
import i18n from "../../utils/i18n/i18n";
import BottomSheetCustom from "./BottomSheetCustom";
import { scaleSizeWidth } from "../../utils/scale";

export type MediaPickerRef = {
  onOpenModal: () => void;
};

export type MediaPickerProp = {
  data?: any;
  cropperCircleOverlay?: boolean;
  cropping?: boolean;
  multiSelect?: boolean;
  handleSelect?: (image: any) => void;
  mediaType?: "photo" | "video" | "any";
  maxFiles?: number;
  sizeCustom?: number | null;
  sizeWidth?: number | null;
  sizeHeight?: number | null;
  isPath?: boolean;
  onTouchBackdrop?: () => void;
  onActionChooseFile?: () => void;
};

const MediaPicker = forwardRef<MediaPickerRef, MediaPickerProp>(
  (props, ref) => {
    const {
      data,
      cropperCircleOverlay = false,
      cropping = false,
      multiSelect = false, // expo-image-picker không hỗ trợ multi-select
      handleSelect,
      mediaType = "photo",
      sizeCustom = null,
      sizeWidth = null,
      sizeHeight = null,
      isPath = true,
      onTouchBackdrop,
      onActionChooseFile,
    } = props;

    const refBottomSheet = useRef<any>(null);
    const [dataOptions] = useState([
      {
        key: "camera",
        label: i18n.t("mainLanguage:may_anh"),
        icon: <Camera size={scaleSizeWidth(18)} weight="duotone" />,
      },
      {
        key: "library",
        label: i18n.t("mainLanguage:thu_vien_anh"),
        icon: <CameraPlus size={scaleSizeWidth(18)} weight="duotone" />,
      },
    ]);

    const requestPermissions = async (needCamera = false) => {
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      let cameraStatus = "granted";
      if (needCamera) {
        const res = await ImagePicker.requestCameraPermissionsAsync();
        cameraStatus = res.status;
      }

      if (
        mediaStatus !== "granted" ||
        (needCamera && cameraStatus !== "granted")
      ) {
        Alert.alert(
          i18n.t("mainLanguage:loi"),
          i18n.t("mainLanguage:khong_co_quyen_truy_cap_anh_hoac_camera")
        );
        return false;
      }

      return true;
    };

    const onCropImg = async (uri: string) => {
      try {
        let width = sizeWidth ?? sizeCustom ?? 300;
        let height = sizeHeight ?? sizeCustom ?? 300;

        const result = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width, height } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        handleSelect?.(isPath ? result.uri : result);
      } catch (error) {
        console.log("Crop error:", error);
      }
    };

    const onOpenLibrary = async () => {
      const ok = await requestPermissions(false);
      if (!ok) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          mediaType === "any"
            ? ImagePicker.MediaTypeOptions.All
            : mediaType === "photo"
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,

        allowsEditing: cropping,
        quality: 1,
      });

      if (!result.canceled) {
        const image = result.assets[0];
        if (cropping) {
          await onCropImg(image.uri);
        } else {
          handleSelect?.(isPath ? image.uri : image);
        }
      }
    };

    const onOpenCamera = async () => {
      const ok = await requestPermissions(true);
      if (!ok) return;

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: cropping,
        quality: 1,
      });

      if (!result.canceled) {
        const image = result.assets[0];
        if (cropping) {
          await onCropImg(image.uri);
        } else {
          handleSelect?.(isPath ? image.uri : image);
        }
      }
    };

    const onModalVisible = (value: boolean) => {
      refBottomSheet.current?.show(value);
    };

    const onPressPicker = async (item: any) => {
      onModalVisible(false);
      setTimeout(() => {
        if (item.key === "library") {
          onOpenLibrary();
        } else if (item.key === "camera") {
          onOpenCamera();
        } else if (item.key === "file" && onActionChooseFile) {
          onActionChooseFile();
        }
      }, 500);
    };

    useImperativeHandle(ref, () => ({
      onOpenModal: () => {
        onModalVisible(true);
      },
    }));

    return (
      <BottomSheetCustom
        ref={refBottomSheet}
        data={data || dataOptions}
        onChoose={onPressPicker}
        onTouchBackdrop={onTouchBackdrop}
      />
    );
  }
);

export default memo(MediaPicker);

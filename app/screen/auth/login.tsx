import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Eye, EyeSlash, User, Lock } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { authAPI } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { AccountInfo, login } from "../../redux/slice/userSlice";
import i18n from "../../utils/i18n/i18n";
import { SCREEN } from "../../navigation/screen-types";
import { navigateScreen } from "../../navigation/navigation-service";
import colors from "../../utils/colors";
import { scaleSizeWidth } from "../../utils/scale";

export default function LoginScreen() {
  // const [email, setEmail] = useState("dzungdducws@gmail.com");
  // const [password, setPassword] = useState("Dungnd@2025");
  const [email, setEmail] = useState("ngdwdz@gmail.com");
  const [password, setPassword] = useState("123456Qq!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        i18n.t("main:ngon_ngu"),
        i18n.t("main:vui_long_nhap_day_du_thong_tin")
      );
      return;
    }
    setLoading(true);
    try {
      const response = await authAPI.login(email, password);

      const res: AccountInfo = {
        accessToken: response?.accessToken,
        user: response?.user,
      };

      dispatch(
        login({
          accessToken: response?.accessToken,
          user: response?.user,
        })
      );

      Alert.alert(
        i18n.t("main:thanh_cong"),
        i18n.t("main:dang_nhap_thanh_cong"),
        [
          {
            text: "OK",
            onPress: () => {
              navigateScreen(SCREEN.LOADING);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(i18n.t("main:loi"), i18n.t("main:dang_nhap_that_bai"));
        return;
      }
      Alert.alert(
        i18n.t("main:loi"),
        error.response?.data?.message || i18n.t("main:dang_nhap_that_bai")
      );
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigateScreen(SCREEN.REGISTER, {
      email,
      // password,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 40,
          color: "#333",
        }}
      >
        {i18n.t("main:dang_nhap")}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 10,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <User size={24} color="#666" style={{ marginRight: 10 }} />
        <TextInput
          style={{
            flex: 1,
            paddingVertical: 15,
            fontSize: 16,
          }}
          placeholder={i18n.t("main:nhap_email_hoac_so_dien_thoai")}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 10,
          paddingHorizontal: 15,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            paddingVertical: 15,
            fontSize: 16,
          }}
          placeholder={i18n.t("main:nhap_mat_khau")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeSlash size={24} color="#666" />
          ) : (
            <Eye size={24} color="#666" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#007AFF",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
          opacity: loading ? 0.7 : 1,
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {i18n.t("main:dang_nhap")}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={goToRegister}
      >
        <Text
          style={{
            color: colors.mainColor,
            fontSize: scaleSizeWidth(16),
            fontWeight: "bold",
            lineHeight: scaleSizeWidth(22),
          }}
        >
          {i18n.t("main:ban_chua_co_tk")} {i18n.t("main:dang_ky")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

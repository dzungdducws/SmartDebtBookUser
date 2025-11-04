import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { isEmail, validatePassword } from "../../utils/validate";
import {
  Eye,
  EyeSlash,
  User,
  Lock,
  Phone,
  IdentificationCard,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { authAPI } from "../../services/api";
import i18n from "../../utils/i18n/i18n";

export default function RegisterScreen({ route }: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState<string>(route.params.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert(
        i18n.t("main:loi"),
        i18n.t("main:vui_long_nhap_day_du_thong_tin")
      );
      return;
    }

    if (isEmail(email) === false) {
      Alert.alert(i18n.t("main:loi"), i18n.t("main:email_khong_hop_le"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(i18n.t("main:loi"), i18n.t("main:mat_khau_khong_giong_nhau"));
      return;
    }

    if (validatePassword(password) === false) {
      return;
    }

    setLoading(true);
    try {
      const userData = {
        fullname: fullName,
        email,
        password,
      };

      const response = await authAPI.register(userData);
      Alert.alert(i18n.t("main:thanh_cong"), i18n.t("main:dang_ky_thanh_cong"));
      navigation.goBack(); // Quay lại màn hình đăng nhập
    } catch (error: any) {
      Alert.alert(
        i18n.t("main:loi"),
        error.response?.data?.message || i18n.t("main:dang_ky_that_bai")
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 20,
          paddingTop: 60,
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
          {i18n.t("main:dang_ky")}
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
            placeholder={i18n.t("main:ho_va_ten")}
            value={fullName}
            onChangeText={setFullName}
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
          <IdentificationCard
            size={24}
            color="#666"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 15,
              fontSize: 16,
            }}
            placeholder={i18n.t("main:email")}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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
          <Lock size={24} color="#666" style={{ marginRight: 10 }} />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 15,
              fontSize: 16,
            }}
            placeholder={i18n.t("main:mat_khau")}
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
          <Lock size={24} color="#666" style={{ marginRight: 10 }} />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 15,
              fontSize: 16,
            }}
            placeholder={i18n.t("main:xac_nhan_mat_khau")}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
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
          }}
          onPress={handleRegister}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {i18n.t("main:dang_ky")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={goToLogin}
        >
          <Text
            style={{
              color: "#007AFF",
              fontSize: 16,
            }}
          >
            {i18n.t("main:ban_da_co_tai_khoan")} {i18n.t("main:dang_nhap")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

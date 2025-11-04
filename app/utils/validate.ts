import { Alert } from "react-native";

const isEmail = (str: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

const validatePassword = (password: string): boolean => {
  // 1️⃣ Kiểm tra độ dài
  if (password.length < 8) {
    Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 8 ký tự");
    return false;
  }

  // 2️⃣ Kiểm tra chữ thường
  if (!/[a-z]/.test(password)) {
    Alert.alert("Lỗi", "Mật khẩu phải chứa ít nhất một chữ thường (a-z)");
    return false;
  }

  // 3️⃣ Kiểm tra chữ hoa
  if (!/[A-Z]/.test(password)) {
    Alert.alert("Lỗi", "Mật khẩu phải chứa ít nhất một chữ hoa (A-Z)");
    return false;
  }

  // 4️⃣ Kiểm tra số
  if (!/[0-9]/.test(password)) {
    Alert.alert("Lỗi", "Mật khẩu phải chứa ít nhất một số (0-9)");
    return false;
  }

  // 5️⃣ Kiểm tra ký tự đặc biệt
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    Alert.alert("Lỗi", "Mật khẩu phải chứa ít nhất một ký tự đặc biệt");
    return false;
  }

  // ✅ Nếu qua hết tất cả kiểm tra
  return true;
};
export { isEmail, validatePassword };

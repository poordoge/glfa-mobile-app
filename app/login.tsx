import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function LoginScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo: accept admin@glfa.com / password123
      if (email === "admin@glfa.com" && password === "password123") {
        Alert.alert("Success", "Logged in successfully!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    Alert.alert("Sign Up", "Sign up functionality coming soon!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="gap-8 pb-8 flex-1 justify-center">
            {/* Header */}
            <View className="flex-row items-center gap-3 px-4">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-2xl">←</Text>
              </TouchableOpacity>
              <Text className="text-3xl font-bold text-foreground flex-1">
                {t("login.title")}
              </Text>
            </View>

            {/* Logo Section */}
            <View className="items-center gap-2">
              <Text className="text-6xl">🦁</Text>
              <Text className="text-2xl font-bold text-primary">GLFA Admin</Text>
              <Text className="text-sm text-muted">{t("login.subtitle")}</Text>
            </View>

            {/* Login Form */}
            <View className="px-4 gap-4">
              {/* Email Input */}
              <View className="gap-2">
                <Text className="text-sm text-muted font-semibold">{t("login.email")}</Text>
                <View
                  className="flex-row items-center gap-3 rounded-lg px-4 py-3 border"
                  style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                >
                  <Text>📧</Text>
                  <TextInput
                    placeholder="admin@glfa.com"
                    placeholderTextColor={colors.muted}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    editable={!isLoading}
                    className="flex-1 text-foreground"
                    style={{ color: colors.foreground }}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="gap-2">
                <Text className="text-sm text-muted font-semibold">{t("login.password")}</Text>
                <View
                  className="flex-row items-center gap-3 rounded-lg px-4 py-3 border"
                  style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                >
                  <Text>🔒</Text>
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor={colors.muted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                    className="flex-1 text-foreground"
                    style={{ color: colors.foreground }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Demo Credentials Hint */}
              <View
                className="rounded-lg p-3 border"
                style={{ borderColor: colors.border, backgroundColor: colors.surface }}
              >
                <Text className="text-xs text-muted font-semibold mb-1">Demo Credentials:</Text>
                <Text className="text-xs text-muted">Email: admin@glfa.com</Text>
                <Text className="text-xs text-muted">Password: password123</Text>
              </View>
            </View>

            {/* Login Button */}
            <View className="px-4 gap-3">
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className="rounded-lg py-4 px-4 items-center"
                style={{
                  backgroundColor: colors.primary,
                  opacity: isLoading ? 0.6 : 1,
                }}
                activeOpacity={0.8}
              >
                <Text className="text-base font-bold text-background">
                  {isLoading ? "Signing In..." : t("login.signIn")}
                </Text>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View className="flex-row items-center justify-center gap-2">
                <Text className="text-sm text-muted">Don't have an account?</Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text className="text-sm text-primary font-bold">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Info Section */}
            <View className="px-4 gap-3">
              <View
                className="rounded-lg p-4 border"
                style={{ borderColor: colors.border, backgroundColor: colors.surface }}
              >
                <Text className="text-sm font-bold text-foreground mb-2">
                  🔐 Admin Portal
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  This login is for academy administrators to manage registrations, news, products, and other content. Parents and students should use the registration form to enroll.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

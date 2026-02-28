import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useRouter } from "expo-router";
import { useI18n } from "@/lib/i18n-provider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeContext } from "@/lib/theme-provider";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
}

export default function MoreScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();
  const { language, setLanguage } = useI18n();
  const colorScheme = useColorScheme();
  const { setColorScheme } = useThemeContext();

  const menuItems: MenuItem[] = [
    {
      id: "about",
      label: t("common.about"),
      icon: "ℹ️",
      route: "/about",
    },
    {
      id: "gallery",
      label: t("gallery.title"),
      icon: "🖼️",
      route: "/gallery",
    },
    {
      id: "contact",
      label: t("common.contact"),
      icon: "📞",
      route: "/contact",
    },
    {
      id: "registration",
      label: t("registration.title"),
      icon: "📝",
      route: "/registration",
    },
    {
      id: "login",
      label: t("login.title"),
      icon: "🔐",
      route: "/login",
    },
  ];

  const handleLanguageChange = async (lang: string) => {
    await setLanguage(lang);
  };

  const handleThemeToggle = () => {
    const newScheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newScheme);
  };

  const renderMenuItem = (item: MenuItem) => (
    <Pressable
      key={item.id}
      onPress={() => item.route && router.push(item.route as any)}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <View
        className="flex-row items-center gap-4 p-4 rounded-lg border"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        <Text className="text-2xl">{item.icon}</Text>
        <Text className="text-base font-semibold text-foreground flex-1">{item.label}</Text>
        <Text className="text-lg text-muted">→</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="items-center gap-2 pt-4">
            <Text className="text-4xl font-bold text-foreground">{t("tabs.more")}</Text>
            <Text className="text-sm text-muted text-center">More options and settings</Text>
          </View>

          {/* Menu Items */}
          <View className="px-4 gap-3">
            {menuItems.map(renderMenuItem)}
          </View>

          {/* Settings Section */}
          <View className="px-4 gap-4">
            <Text className="text-lg font-bold text-foreground">{t("common.settings")}</Text>

            {/* Language Selector */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">{t("common.language")}</Text>
              <View className="flex-row gap-2">
                {[
                  { code: "en", label: "English" },
                  { code: "kh", label: "ខ្មែរ" },
                  { code: "cn", label: "中文" },
                ].map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    onPress={() => handleLanguageChange(lang.code)}
                    className="flex-1 py-2 px-3 rounded-lg border"
                    style={{
                      backgroundColor: language === lang.code ? colors.primary : colors.surface,
                      borderColor: language === lang.code ? colors.primary : colors.border,
                    }}
                  >
                    <Text
                      className="text-sm font-semibold text-center"
                      style={{
                        color: language === lang.code ? colors.background : colors.foreground,
                      }}
                    >
                      {lang.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Theme Toggle */}
            <View className="gap-2">
              <Text className="text-sm text-muted font-semibold">Theme</Text>
              <TouchableOpacity
                onPress={handleThemeToggle}
                className="py-3 px-4 rounded-lg border flex-row items-center justify-between"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <Text className="text-base font-semibold text-foreground">
                  {colorScheme === "dark" ? t("common.darkMode") : t("common.lightMode")}
                </Text>
                <Text className="text-xl">
                  {colorScheme === "dark" ? "🌙" : "☀️"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Info */}
          <View className="px-4 pt-4 border-t" style={{ borderTopColor: colors.border }}>
            <Text className="text-xs text-muted text-center">
              Golden Lion Football Academy v1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

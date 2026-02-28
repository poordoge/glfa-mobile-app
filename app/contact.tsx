import { ScrollView, Text, View, Pressable, Linking, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  icon: string;
}

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Main Campus - Phnom Penh",
    address: "Street 123, Phnom Penh, Cambodia",
    phone: "+855 12 345 678",
    email: "info@goldenlionfootball.com",
    hours: "Mon - Sun: 8:00 AM - 6:00 PM",
    icon: "🏟️",
  },
  {
    id: 2,
    name: "Chomkar Doung Campus",
    address: "Chomkar Doung, Phnom Penh, Cambodia",
    phone: "+855 12 345 679",
    email: "chomkar@goldenlionfootball.com",
    hours: "Mon - Sun: 8:00 AM - 6:00 PM",
    icon: "⚽",
  },
];

export default function ContactScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleMap = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center gap-3 pt-4 px-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-2xl">←</Text>
            </Pressable>
            <Text className="text-3xl font-bold text-foreground flex-1">
              {t("common.contact")}
            </Text>
          </View>

          {/* Intro */}
          <View className="px-4">
            <Text className="text-sm text-muted text-center">
              {t("contact.subtitle")}
            </Text>
          </View>

          {/* Locations */}
          <View className="px-4 gap-4">
            {LOCATIONS.map((location) => (
              <View
                key={location.id}
                className="rounded-xl border p-4 gap-3"
                style={{ borderColor: colors.border, backgroundColor: colors.surface }}
              >
                {/* Location Header */}
                <View className="flex-row items-center gap-3">
                  <Text className="text-3xl">{location.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-foreground">
                      {location.name}
                    </Text>
                  </View>
                </View>

                {/* Address */}
                <Pressable
                  onPress={() => handleMap(location.address)}
                  className="flex-row items-start gap-3"
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <Text className="text-xl">📍</Text>
                  <View className="flex-1">
                    <Text className="text-xs text-muted font-semibold mb-1">Address</Text>
                    <Text className="text-sm text-primary font-semibold">
                      {location.address}
                    </Text>
                  </View>
                </Pressable>

                {/* Phone */}
                <Pressable
                  onPress={() => handleCall(location.phone)}
                  className="flex-row items-center gap-3"
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <Text className="text-xl">📞</Text>
                  <View className="flex-1">
                    <Text className="text-xs text-muted font-semibold mb-1">Phone</Text>
                    <Text className="text-sm text-primary font-semibold">
                      {location.phone}
                    </Text>
                  </View>
                </Pressable>

                {/* Email */}
                <Pressable
                  onPress={() => handleEmail(location.email)}
                  className="flex-row items-center gap-3"
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <Text className="text-xl">📧</Text>
                  <View className="flex-1">
                    <Text className="text-xs text-muted font-semibold mb-1">Email</Text>
                    <Text className="text-sm text-primary font-semibold">
                      {location.email}
                    </Text>
                  </View>
                </Pressable>

                {/* Hours */}
                <View className="flex-row items-center gap-3">
                  <Text className="text-xl">🕐</Text>
                  <View className="flex-1">
                    <Text className="text-xs text-muted font-semibold mb-1">Hours</Text>
                    <Text className="text-sm text-foreground">{location.hours}</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-2 pt-2">
                  <TouchableOpacity
                    onPress={() => handleCall(location.phone)}
                    className="flex-1 rounded-lg py-2 px-3 items-center"
                    style={{ backgroundColor: colors.primary }}
                    activeOpacity={0.8}
                  >
                    <Text className="text-sm font-semibold text-background">Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleEmail(location.email)}
                    className="flex-1 rounded-lg py-2 px-3 items-center border"
                    style={{ borderColor: colors.primary }}
                    activeOpacity={0.8}
                  >
                    <Text className="text-sm font-semibold text-primary">Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleMap(location.address)}
                    className="flex-1 rounded-lg py-2 px-3 items-center border"
                    style={{ borderColor: colors.primary }}
                    activeOpacity={0.8}
                  >
                    <Text className="text-sm font-semibold text-primary">Map</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Quick Contact Section */}
          <View className="px-4 gap-3">
            <Text className="text-lg font-bold text-foreground">{t("contact.quickContact")}</Text>
            <View
              className="rounded-lg border p-4 gap-3"
              style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            >
              <View className="gap-2">
                <Text className="text-sm text-muted font-semibold">General Inquiries</Text>
                <Pressable
                  onPress={() => handleEmail("info@goldenlionfootball.com")}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <Text className="text-sm text-primary font-semibold">
                    info@goldenlionfootball.com
                  </Text>
                </Pressable>
              </View>

              <View className="gap-2">
                <Text className="text-sm text-muted font-semibold">Registration Support</Text>
                <Pressable
                  onPress={() => handleEmail("register@goldenlionfootball.com")}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <Text className="text-sm text-primary font-semibold">
                    register@goldenlionfootball.com
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

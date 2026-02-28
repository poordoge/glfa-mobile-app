import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface NewsPreview {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
}

const FEATURED_NEWS: NewsPreview[] = [
  {
    id: 1,
    title: "Happy New Year 2026 from Golden Lion",
    date: "Jan 1, 2026",
    category: "Announcements",
    image: "🎉",
  },
  {
    id: 2,
    title: "New Training Facility Opens",
    date: "Dec 12, 2025",
    category: "News",
    image: "🏟️",
  },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();

  const renderNewsCard = ({ item }: { item: NewsPreview }) => (
    <Pressable
      onPress={() => router.push("news" as any)}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="mr-3"
    >
      <View
        className="w-48 rounded-lg overflow-hidden border"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        <View className="h-24 items-center justify-center" style={{ backgroundColor: colors.border }}>
          <Text className="text-4xl">{item.image}</Text>
        </View>
        <View className="p-3 gap-2">
          <View
            className="px-2 py-1 rounded self-start"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-xs font-semibold text-background">{item.category}</Text>
          </View>
          <Text className="text-sm font-bold text-foreground" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-xs text-muted">{item.date}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-8 pb-8">
          {/* Hero Section */}
          <View className="bg-gradient-to-b from-primary/20 to-transparent rounded-2xl p-6 gap-4">
            <Text className="text-5xl font-bold text-foreground">{t("home.title")}</Text>
            <Text className="text-lg text-primary font-semibold">{t("home.subtitle")}</Text>
            <Text className="text-sm text-muted leading-relaxed">{t("home.description")}</Text>

            {/* CTA Buttons */}
            <View className="flex-row gap-3 pt-2">
              <TouchableOpacity
                className="flex-1 rounded-lg py-3 px-4 items-center"
                style={{ backgroundColor: colors.primary }}
                activeOpacity={0.8}
              >
                <Text className="text-base font-semibold text-background">
                  {t("home.enrollNow")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-lg py-3 px-4 items-center border"
                style={{ borderColor: colors.primary }}
                activeOpacity={0.8}
              >
                <Text className="text-base font-semibold text-primary">
                  {t("home.learnMore")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Highlights */}
          <View className="px-4 gap-3">
            <View className="flex-row items-center gap-2">
              <Text>⭐</Text>
              <Text className="text-sm text-foreground">{t("home.highlights.training")}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text>👨‍🏫</Text>
              <Text className="text-sm text-foreground">{t("home.highlights.coaches")}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text>👶</Text>
              <Text className="text-sm text-foreground">{t("home.highlights.ages")}</Text>
            </View>
          </View>

          {/* Featured Programs */}
          <View className="px-4 gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-foreground">
                {t("home.featuredPrograms")}
              </Text>
              <TouchableOpacity onPress={() => router.push("programs" as any)}>
                <Text className="text-sm text-primary font-semibold">View All →</Text>
              </TouchableOpacity>
            </View>

            <View className="gap-2">
              {[
                { stage: "Stage 1", age: "4-9 yrs", icon: "🎯" },
                { stage: "Stage 2", age: "10-12 yrs", icon: "👥" },
                { stage: "Stage 3", age: "13-15 yrs", icon: "⚡" },
                { stage: "Stage 4", age: "16-18 yrs", icon: "👑" },
              ].map((prog, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => router.push("programs" as any)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View
                    className="flex-row items-center gap-3 p-3 rounded-lg border"
                    style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                  >
                    <Text className="text-2xl">{prog.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{prog.stage}</Text>
                      <Text className="text-xs text-muted">{prog.age}</Text>
                    </View>
                    <Text className="text-lg text-primary font-bold">$25</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* News Highlights */}
          <View className="gap-3">
            <View className="px-4 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-foreground">
                {t("home.newsHighlights")}
              </Text>
              <TouchableOpacity onPress={() => router.push("news" as any)}>
                <Text className="text-sm text-primary font-semibold">View All →</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={FEATURED_NEWS}
              renderItem={renderNewsCard}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>

          {/* CTA Section */}
          <View className="mx-4 rounded-xl p-6 gap-3" style={{ backgroundColor: colors.primary }}>
            <Text className="text-lg font-bold text-background">
              Ready to Join the Golden Lions?
            </Text>
            <Text className="text-sm text-background opacity-90">
              Start your football journey today with expert coaching and world-class training.
            </Text>
            <TouchableOpacity
              className="rounded-lg py-3 px-4 items-center mt-2"
              style={{ backgroundColor: colors.background }}
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-primary">
                {t("home.enrollNow")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

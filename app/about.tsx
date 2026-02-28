import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface CoachProfile {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const COACHING_TEAM: CoachProfile[] = [
  {
    id: 1,
    name: "Gabi",
    role: "Head Coach",
    bio: "Coach Gabi brings strong experience in youth football development. Known for discipline, leadership, and player development skills.",
    image: "👨‍🏫",
  },
  {
    id: 2,
    name: "Leangsim",
    role: "Assistant Coach",
    bio: "Leangsim plays a key role in supporting team training. Expert in drills, organization, and player coordination.",
    image: "👨‍🏫",
  },
  {
    id: 3,
    name: "Kimheng",
    role: "Freestyle Coach",
    bio: "Kimheng is passionate and skilled in freestyle football. Expert in creative ball control and performance techniques.",
    image: "👨‍🏫",
  },
];

export default function AboutScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();

  const renderCoachCard = ({ item }: { item: CoachProfile }) => (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="mb-4"
    >
      <View
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        {/* Coach Image */}
        <View className="h-48 items-center justify-center" style={{ backgroundColor: colors.border }}>
          <Text className="text-7xl">{item.image}</Text>
        </View>

        {/* Coach Info */}
        <View className="p-4 gap-2">
          <Text className="text-lg font-bold text-foreground">{item.name}</Text>
          <Text className="text-sm text-primary font-semibold">{item.role}</Text>
          <Text className="text-sm text-muted leading-relaxed">{item.bio}</Text>
        </View>
      </View>
    </Pressable>
  );

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
              {t("common.about")}
            </Text>
          </View>

          {/* Mission Section */}
          <View className="px-4 gap-3">
            <Text className="text-lg font-bold text-foreground">{t("about.mission")}</Text>
            <View
              className="p-4 rounded-lg border"
              style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            >
              <Text className="text-sm text-muted leading-relaxed">
                {t("about.missionText")}
              </Text>
            </View>
          </View>

          {/* Academy Overview */}
          <View className="px-4 gap-3">
            <Text className="text-lg font-bold text-foreground">{t("about.overview")}</Text>
            <View
              className="p-4 rounded-lg border"
              style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            >
              <Text className="text-sm text-muted leading-relaxed">
                {t("about.overviewText")}
              </Text>
            </View>
          </View>

          {/* Coaching Team Section */}
          <View className="px-4 gap-4">
            <Text className="text-lg font-bold text-foreground">
              {t("about.coachingTeam")}
            </Text>

            <FlatList
              data={COACHING_TEAM}
              renderItem={renderCoachCard}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>

          {/* Values Section */}
          <View className="px-4 gap-3">
            <Text className="text-lg font-bold text-foreground">{t("about.values")}</Text>
            <View className="gap-2">
              {[
                { icon: "⭐", title: "Excellence", desc: "Striving for the highest standards" },
                { icon: "🤝", title: "Teamwork", desc: "Building strong team bonds" },
                { icon: "💪", title: "Discipline", desc: "Commitment to improvement" },
                { icon: "🎯", title: "Passion", desc: "Love for the beautiful game" },
              ].map((value, idx) => (
                <View
                  key={idx}
                  className="flex-row items-start gap-3 p-3 rounded-lg border"
                  style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                >
                  <Text className="text-2xl">{value.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-foreground">{value.title}</Text>
                    <Text className="text-xs text-muted">{value.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

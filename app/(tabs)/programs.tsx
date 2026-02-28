import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProgramStage {
  id: number;
  nameKey: string;
  ageGroupKey: string;
  focusKey: string;
  scheduleKey: string;
  durationKey: string;
  icon: string;
}

const PROGRAMS: ProgramStage[] = [
  {
    id: 1,
    nameKey: "programs.stage1.name",
    ageGroupKey: "programs.stage1.ageGroup",
    focusKey: "programs.stage1.focus",
    scheduleKey: "programs.stage1.schedule",
    durationKey: "programs.stage1.duration",
    icon: "🎯",
  },
  {
    id: 2,
    nameKey: "programs.stage2.name",
    ageGroupKey: "programs.stage2.ageGroup",
    focusKey: "programs.stage2.focus",
    scheduleKey: "programs.stage2.schedule",
    durationKey: "programs.stage2.duration",
    icon: "👥",
  },
  {
    id: 3,
    nameKey: "programs.stage3.name",
    ageGroupKey: "programs.stage3.ageGroup",
    focusKey: "programs.stage3.focus",
    scheduleKey: "programs.stage3.schedule",
    durationKey: "programs.stage3.duration",
    icon: "⚡",
  },
  {
    id: 4,
    nameKey: "programs.stage4.name",
    ageGroupKey: "programs.stage4.ageGroup",
    focusKey: "programs.stage4.focus",
    scheduleKey: "programs.stage4.schedule",
    durationKey: "programs.stage4.duration",
    icon: "👑",
  },
];

export default function ProgramsScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="items-center gap-2 pt-4">
            <Text className="text-4xl font-bold text-foreground">{t("programs.title")}</Text>
            <Text className="text-base text-muted text-center">{t("programs.subtitle")}</Text>
            <View className="w-12 h-1 bg-primary rounded-full mt-2" />
          </View>

          {/* Programs List */}
          <View className="gap-4 px-4">
            {PROGRAMS.map((program) => (
              <Pressable
                key={program.id}
                onPress={() => toggleExpand(program.id)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View
                  className={cn(
                    "rounded-2xl border p-4 gap-3",
                    "border-border bg-surface"
                  )}
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  }}
                >
                  {/* Program Header */}
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1 gap-2">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-2xl">{program.icon}</Text>
                        <Text className="text-lg font-bold text-foreground flex-1">
                          {t(program.nameKey)}
                        </Text>
                      </View>
                      <Text className="text-sm text-primary font-semibold">
                        {t(program.ageGroupKey)}
                      </Text>
                    </View>
                    <View className="items-center gap-1">
                      <Text className="text-2xl font-bold text-primary">{t("programs.price")}</Text>
                    </View>
                  </View>

                  {/* Expanded Details */}
                  {expandedId === program.id && (
                    <View className="gap-3 pt-3 border-t" style={{ borderTopColor: colors.border }}>
                      <View>
                        <Text className="text-sm text-muted font-semibold mb-1">Focus</Text>
                        <Text className="text-sm text-foreground leading-relaxed">
                          {t(program.focusKey)}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-sm text-muted font-semibold mb-1">Schedule</Text>
                        <Text className="text-sm text-foreground">{t(program.scheduleKey)}</Text>
                      </View>
                      <View>
                        <Text className="text-sm text-muted font-semibold mb-1">Duration</Text>
                        <Text className="text-sm text-foreground">{t(program.durationKey)}</Text>
                      </View>

                      {/* Enroll Button */}
                      <TouchableOpacity
                        className="mt-2 rounded-lg py-3 px-4 items-center"
                        style={{ backgroundColor: colors.primary }}
                        activeOpacity={0.8}
                      >
                        <Text className="text-base font-semibold text-background">
                          {t("programs.enroll")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Collapse Indicator */}
                  {expandedId !== program.id && (
                    <Text className="text-xs text-muted text-center mt-1">
                      Tap to expand details
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

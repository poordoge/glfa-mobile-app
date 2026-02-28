import { ScrollView, Text, View, FlatList, ActivityIndicator, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useNews } from "@/hooks/use-supabase-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All Categories", "Announcements", "News", "Match Results"];

export default function NewsScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { data: newsData, isLoading, error } = useNews();

  // Filter news based on selected category
  const filteredNews = selectedCategory === "All Categories"
    ? newsData || []
    : (newsData || []).filter(article => article.category === selectedCategory);

  const renderNewsCard = ({ item }: { item: any }) => (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="mb-4"
    >
      <View
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        {/* News Image */}
        <View className="h-40 items-center justify-center" style={{ backgroundColor: colors.border }}>
          <Text className="text-6xl">📰</Text>
        </View>

        {/* News Content */}
        <View className="p-4 gap-2">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="text-xs font-semibold text-primary px-2 py-1 rounded-full" style={{ backgroundColor: colors.border }}>
              {item.category}
            </Text>
            <Text className="text-xs text-muted">
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Text className="text-base font-bold text-foreground" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-sm text-muted leading-relaxed" numberOfLines={2}>
            {item.content}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="items-center gap-2 pt-4 px-4">
            <Text className="text-4xl font-bold text-foreground">{t("news.title")}</Text>
            <Text className="text-sm text-muted text-center">{t("news.subtitle")}</Text>
          </View>

          {/* Category Filter */}
          <View className="px-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {CATEGORIES.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View
                    className={cn(
                      "px-4 py-2 rounded-full border",
                      selectedCategory === category
                        ? "bg-primary border-primary"
                        : "border-border bg-surface"
                    )}
                    style={{
                      backgroundColor:
                        selectedCategory === category ? colors.primary : colors.surface,
                      borderColor:
                        selectedCategory === category ? colors.primary : colors.border,
                    }}
                  >
                    <Text
                      className={cn(
                        "text-sm font-semibold",
                        selectedCategory === category ? "text-background" : "text-foreground"
                      )}
                    >
                      {category}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Loading State */}
          {isLoading && (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color={colors.primary} />
              <Text className="text-sm text-muted mt-2">Loading news...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View className="px-4 py-4 rounded-lg border" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
              <Text className="text-sm text-muted text-center">
                Unable to load news. Please check your connection and try again.
              </Text>
            </View>
          )}

          {/* News List */}
          {!isLoading && !error && (
            <View className="px-4">
              {filteredNews.length > 0 ? (
                <FlatList
                  data={filteredNews}
                  renderItem={renderNewsCard}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                />
              ) : (
                <View className="items-center py-8">
                  <Text className="text-lg font-bold text-foreground mb-2">No news found</Text>
                  <Text className="text-sm text-muted text-center">
                    Try selecting a different category
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

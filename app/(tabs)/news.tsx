import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Happy New Year 2026 from Golden Lion Football School",
    date: "Jan 1, 2026",
    category: "Announcements",
    excerpt: "As we step into 2026, all of us at Golden Lion Football School would like to extend our warmest wishes to our players, parents, coaches, partners, and supporters.",
    image: "🎉",
  },
  {
    id: 2,
    title: "Golden Lion Football School Opens New Chomkar Doung",
    date: "Dec 12, 2025",
    category: "News",
    excerpt: "Golden Lion Football School is proud to announce the official opening of our new training facility in Chomkar Doung, expanding our mission to develop young football.",
    image: "🏟️",
  },
  {
    id: 3,
    title: "Dreams on the Turf: Golden Lion's Next Generation Steps Up",
    date: "Nov 22, 2025",
    category: "News",
    excerpt: "The air buzzed with a mixture of youthful excitement and focused determination at the Golden Lion Football School. Under a clear sky, our young talents showcased their skills.",
    image: "⚽",
  },
];

const CATEGORIES = ["All Categories", "Announcements", "News", "Match Results"];

export default function NewsScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredNews = selectedCategory === "All Categories" 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(item => item.category === selectedCategory);

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="mb-4"
    >
      <View
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        {/* Image */}
        <View className="h-40 items-center justify-center" style={{ backgroundColor: colors.border }}>
          <Text className="text-6xl">{item.image}</Text>
        </View>

        {/* Content */}
        <View className="p-4 gap-2">
          <View className="flex-row items-center gap-2">
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-xs font-semibold text-background">{item.category}</Text>
            </View>
            <Text className="text-xs text-muted">{item.date}</Text>
          </View>
          <Text className="text-base font-bold text-foreground">{item.title}</Text>
          <Text className="text-sm text-muted leading-relaxed" numberOfLines={2}>
            {item.excerpt}
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
          <View className="items-center gap-2 pt-4">
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
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
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
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* News List */}
          <View className="px-4">
            {filteredNews.length > 0 ? (
              <FlatList
                data={filteredNews}
                renderItem={renderNewsItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            ) : (
              <View className="items-center justify-center py-8">
                <Text className="text-muted">{t("news.noNews")}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

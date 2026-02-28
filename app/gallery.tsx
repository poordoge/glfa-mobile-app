import { ScrollView, Text, View, Pressable, FlatList, Modal, Dimensions, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useGallery } from "@/hooks/use-supabase-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Photo {
  id: number;
  category: string;
  image: string;
  title: string;
}

const PHOTOS: Photo[] = [
  { id: 1, category: "action", image: "⚽", title: "Action Shot 1" },
  { id: 2, category: "general", image: "👥", title: "Team Photo" },
  { id: 3, category: "training", image: "🏋️", title: "Training Session" },
  { id: 4, category: "team", image: "🏟️", title: "Team Match" },
  { id: 5, category: "action", image: "🎯", title: "Goal Moment" },
  { id: 6, category: "general", image: "🏅", title: "Achievement" },
  { id: 7, category: "training", image: "👟", title: "Drill Practice" },
  { id: 8, category: "team", image: "🤝", title: "Team Spirit" },
  { id: 9, category: "action", image: "⚡", title: "Fast Play" },
];

const CATEGORIES = [
  { id: "all", label: "All Categories", count: 9 },
  { id: "action", label: "action", count: 3 },
  { id: "general", label: "general", count: 2 },
  { id: "team", label: "team", count: 2 },
  { id: "training", label: "training", count: 2 },
];

export default function GalleryScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();
  const { data: galleryData = [], isLoading, error } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const displayPhotos = galleryData.length > 0 ? galleryData : PHOTOS;

  const filteredPhotos =
    selectedCategory === "all"
      ? displayPhotos
      : displayPhotos.filter((photo: any) => photo.category === selectedCategory);

  const handlePhotoPress = (photo: any) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const renderPhotoCard = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => handlePhotoPress(item)}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="flex-1 m-1"
    >
      <View
        className="h-32 rounded-lg items-center justify-center border overflow-hidden"
        style={{ borderColor: colors.border, backgroundColor: colors.border }}
      >
        <Text className="text-4xl">{item.image || "📷"}</Text>
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
              {t("gallery.title")}
            </Text>
          </View>

          {/* Subtitle */}
          <View className="px-4">
            <Text className="text-sm text-muted text-center">
              {t("gallery.subtitle")}
            </Text>
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
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <View
                    className={cn(
                      "px-4 py-2 rounded-full border",
                      selectedCategory === category.id
                        ? "bg-primary border-primary"
                        : "border-border bg-surface"
                    )}
                    style={{
                      backgroundColor:
                        selectedCategory === category.id ? colors.primary : colors.surface,
                      borderColor:
                        selectedCategory === category.id ? colors.primary : colors.border,
                    }}
                  >
                    <Text
                      className={cn(
                        "text-sm font-semibold",
                        selectedCategory === category.id ? "text-background" : "text-foreground"
                      )}
                    >
                      {category.label} ({category.count})
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
              <Text className="text-sm text-muted mt-2">Loading gallery...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View className="px-4 py-4 rounded-lg border" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
              <Text className="text-sm text-muted text-center">
                Using demo photos. Supabase connection not available.
              </Text>
            </View>
          )}

          {/* Photo Grid */}
          {!isLoading && (
            <View className="px-2">
              <Text className="text-xs text-muted px-2 mb-2">
                {filteredPhotos.length} photos
              </Text>
              <FlatList
                data={filteredPhotos}
                renderItem={renderPhotoCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Photo Viewer Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        >
          <View className="items-center gap-4">
            <Text className="text-7xl">{selectedPhoto?.image || "📷"}</Text>
            <Text className="text-lg font-bold text-white">{selectedPhoto?.title}</Text>
            <Text className="text-sm text-gray-300">Tap to close</Text>
          </View>
        </Pressable>
      </Modal>
    </ScreenContainer>
  );
}

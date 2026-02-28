import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  sizes: string[];
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Golden Lion Players Match Uniform 2026",
    price: 18,
    image: "👕",
    type: "Uniform",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Golden Lion Players Uniform",
    price: 10,
    image: "⚽",
    type: "Uniform",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Golden Lion Goalkeeper Uniform",
    price: 10,
    image: "🧤",
    type: "Uniform",
    sizes: ["S", "M", "L"],
  },
];

export default function ShopScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [priceRange, setPriceRange] = useState(200);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = selectedType === "All Types" || product.type === selectedType;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesType && matchesPrice;
  });

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      className="flex-1 m-2"
    >
      <View
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        {/* Product Image */}
        <View className="h-32 items-center justify-center" style={{ backgroundColor: colors.border }}>
          <Text className="text-5xl">{item.image}</Text>
        </View>

        {/* Product Info */}
        <View className="p-3 gap-2">
          <Text className="text-sm font-bold text-foreground" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="text-lg font-bold text-primary">${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            className="rounded-lg py-2 px-3 items-center mt-1"
            style={{ backgroundColor: colors.primary }}
            activeOpacity={0.8}
          >
            <Text className="text-sm font-semibold text-background">
              {t("shop.addToCart")}
            </Text>
          </TouchableOpacity>
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
            <Text className="text-4xl font-bold text-foreground">{t("shop.title")}</Text>
            <Text className="text-sm text-muted text-center">{t("shop.subtitle")}</Text>
          </View>

          {/* Search Bar */}
          <View className="px-4">
            <View
              className="flex-row items-center gap-3 rounded-lg px-4 py-3 border"
              style={{ borderColor: colors.border, backgroundColor: colors.surface }}
            >
              <Text>🔍</Text>
              <TextInput
                placeholder={t("shop.search")}
                placeholderTextColor={colors.muted}
                value={searchText}
                onChangeText={setSearchText}
                className="flex-1 text-foreground"
              />
            </View>
          </View>

          {/* Filters */}
          <View className="px-4 gap-3">
            <Text className="text-sm font-bold text-foreground">🎛️ {t("shop.filter")}</Text>

            {/* Type Filter */}
            <View>
              <Text className="text-xs text-muted font-semibold mb-2">{t("shop.type")}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {["All Types", "Uniform", "Gear"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setSelectedType(type)}
                    className={cn(
                      "px-3 py-2 rounded-full border",
                      selectedType === type
                        ? "bg-primary border-primary"
                        : "border-border bg-surface"
                    )}
                    style={{
                      backgroundColor: selectedType === type ? colors.primary : colors.surface,
                      borderColor: selectedType === type ? colors.primary : colors.border,
                    }}
                  >
                    <Text
                      className={cn(
                        "text-xs font-semibold",
                        selectedType === type ? "text-background" : "text-foreground"
                      )}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Price Range */}
            <View>
              <Text className="text-xs text-muted font-semibold mb-2">
                {t("shop.priceRange")}: ${priceRange}
              </Text>
              <View
                className="h-2 rounded-full"
                style={{ backgroundColor: colors.border }}
              >
                <View
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    width: `${(priceRange / 200) * 100}%`,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Product Grid */}
          <View className="px-2">
            <Text className="text-xs text-muted px-2 mb-2">
              {t("shop.showing", {
                count: filteredProducts.length,
                total: MOCK_PRODUCTS.length,
              })}
            </Text>
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

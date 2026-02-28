import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/hooks/use-supabase-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ShopScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();
  const { addItem, getTotalItems } = useCart();
  const { data: products = [], isLoading, error } = useProducts();
  
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [priceRange, setPriceRange] = useState(200);

  // Fallback to mock data if Supabase is not available
  const displayProducts = products.length > 0 ? products : [
    {
      id: 1,
      name: "Golden Lion Players Match Uniform 2026",
      price: 18,
      image_url: "👕",
      type: "Uniform",
      sizes: ["XS", "S", "M", "L", "XL"],
      description: "Official match uniform",
      stock: 50,
    },
    {
      id: 2,
      name: "Golden Lion Players Uniform",
      price: 10,
      image_url: "⚽",
      type: "Uniform",
      sizes: ["S", "M", "L", "XL"],
      description: "Training uniform",
      stock: 100,
    },
    {
      id: 3,
      name: "Golden Lion Goalkeeper Uniform",
      price: 10,
      image_url: "🧤",
      type: "Uniform",
      sizes: ["S", "M", "L"],
      description: "Goalkeeper gear",
      stock: 30,
    },
  ];

  const filteredProducts = displayProducts.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = selectedType === "All Types" || product.type === selectedType;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesType && matchesPrice;
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image_url || "📦",
    });
    Alert.alert("Added to Cart", `${product.name} has been added to your cart!`);
  };

  const renderProduct = ({ item }: { item: any }) => (
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
          <Text className="text-5xl">{item.image_url || "📦"}</Text>
        </View>

        {/* Product Info */}
        <View className="p-3 gap-2">
          <Text className="text-sm font-bold text-foreground" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="text-lg font-bold text-primary">${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
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
          {/* Header with Cart Button */}
          <View className="flex-row items-center justify-between pt-4 px-4">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-foreground">{t("shop.title")}</Text>
              <Text className="text-xs text-muted">{t("shop.subtitle")}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("cart" as any)}
              className="relative"
            >
              <Text className="text-3xl">🛒</Text>
              {getTotalItems() > 0 && (
                <View
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-xs font-bold text-background">{getTotalItems()}</Text>
                </View>
              )}
            </TouchableOpacity>
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

          {/* Loading State */}
          {isLoading && (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color={colors.primary} />
              <Text className="text-sm text-muted mt-2">Loading products...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View className="px-4 py-4 rounded-lg border" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
              <Text className="text-sm text-muted text-center">
                Using demo products. Supabase connection not available.
              </Text>
            </View>
          )}

          {/* Product Grid */}
          {!isLoading && (
            <View className="px-2">
              <Text className="text-xs text-muted px-2 mb-2">
                {t("shop.showing", {
                  count: filteredProducts.length,
                  total: displayProducts.length,
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
          )}

          {/* View Cart Button */}
          {getTotalItems() > 0 && (
            <View className="px-4 pt-4">
              <TouchableOpacity
                onPress={() => router.push("cart" as any)}
                className="rounded-lg py-3 px-4 items-center border"
                style={{ borderColor: colors.primary }}
                activeOpacity={0.8}
              >
                <Text className="text-base font-bold text-primary">
                  View Cart ({getTotalItems()} items)
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

import { ScrollView, Text, View, Pressable, TouchableOpacity, FlatList, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useCart } from "@/lib/cart-context";

export default function CartScreen() {
  const { t } = useTranslation();
  const colors = useColors();
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Empty Cart", "Please add items before checkout");
      return;
    }

    Alert.alert(
      "Checkout",
      `Total: $${getTotalPrice().toFixed(2)}\n\nThis is a demo. Payment integration coming soon!`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () => {
            Alert.alert("Success", "Order placed successfully!", [
              { text: "OK", onPress: () => {
                clearCart();
                router.back();
              }},
            ]);
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View
      className="flex-row items-center gap-3 p-4 rounded-lg border mb-3"
      style={{ borderColor: colors.border, backgroundColor: colors.surface }}
    >
      {/* Product Image */}
      <View
        className="w-16 h-16 rounded-lg items-center justify-center"
        style={{ backgroundColor: colors.border }}
      >
        <Text className="text-3xl">{item.image}</Text>
      </View>

      {/* Product Info */}
      <View className="flex-1 gap-1">
        <Text className="text-sm font-bold text-foreground" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-xs text-muted">${item.price.toFixed(2)}</Text>
        {item.size && <Text className="text-xs text-muted">Size: {item.size}</Text>}
      </View>

      {/* Quantity Controls */}
      <View className="flex-row items-center gap-2 bg-surface rounded-lg border" style={{ borderColor: colors.border }}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 items-center justify-center"
        >
          <Text className="text-lg font-bold text-primary">−</Text>
        </TouchableOpacity>
        <Text className="w-6 text-center text-sm font-semibold text-foreground">
          {item.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 items-center justify-center"
        >
          <Text className="text-lg font-bold text-primary">+</Text>
        </TouchableOpacity>
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        className="w-8 h-8 items-center justify-center"
      >
        <Text className="text-lg">🗑️</Text>
      </TouchableOpacity>
    </View>
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
              Shopping Cart
            </Text>
            {items.length > 0 && (
              <View
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs font-bold text-background">{getTotalItems()}</Text>
              </View>
            )}
          </View>

          {items.length > 0 ? (
            <>
              {/* Cart Items */}
              <View className="px-4">
                <FlatList
                  data={items}
                  renderItem={renderCartItem}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                />
              </View>

              {/* Price Summary */}
              <View className="px-4 gap-3">
                <View
                  className="rounded-lg border p-4 gap-2"
                  style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                >
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted">Subtotal</Text>
                    <Text className="text-sm font-semibold text-foreground">
                      ${getTotalPrice().toFixed(2)}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted">Shipping</Text>
                    <Text className="text-sm font-semibold text-foreground">$0.00</Text>
                  </View>
                  <View className="flex-row justify-between items-center pt-2 border-t" style={{ borderTopColor: colors.border }}>
                    <Text className="text-base font-bold text-foreground">Total</Text>
                    <Text className="text-lg font-bold text-primary">
                      ${getTotalPrice().toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Checkout Button */}
              <View className="px-4 gap-2">
                <TouchableOpacity
                  onPress={handleCheckout}
                  className="rounded-lg py-4 px-4 items-center"
                  style={{ backgroundColor: colors.primary }}
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-bold text-background">
                    Proceed to Checkout
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.back()}
                  className="rounded-lg py-3 px-4 items-center border"
                  style={{ borderColor: colors.primary }}
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-semibold text-primary">
                    Continue Shopping
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Empty State */}
              <View className="flex-1 items-center justify-center gap-4 px-4">
                <Text className="text-6xl">🛒</Text>
                <Text className="text-xl font-bold text-foreground">Cart is Empty</Text>
                <Text className="text-sm text-muted text-center">
                  Add some items from the shop to get started!
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("shop" as any)}
                  className="rounded-lg py-3 px-6 items-center mt-4"
                  style={{ backgroundColor: colors.primary }}
                  activeOpacity={0.8}
                >
                  <Text className="text-base font-bold text-background">
                    Continue Shopping
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

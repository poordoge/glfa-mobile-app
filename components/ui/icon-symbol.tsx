// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<string, string>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  // Tab navigation icons
  "house.fill": "home",
  "star.fill": "star",
  "newspaper.fill": "newspaper",
  "bag.fill": "shopping-bag",
  "ellipsis.circle.fill": "more-vert",
  // General icons
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "info.circle.fill": "info",
  "photo.fill": "photo",
  "phone.fill": "phone",
  "person.fill": "person",
  "lock.fill": "lock",
  "cart.fill": "shopping-cart",
  "magnifyingglass": "search",
  "xmark": "close",
  "checkmark": "check",
  "arrow.left": "arrow-back",
  "arrow.right": "arrow-forward",
  "heart.fill": "favorite",
  "share.fill": "share",
  "filter": "filter-list",
  "clock.fill": "schedule",
  "mappin.circle.fill": "location-on",
  "envelope.fill": "mail",
  "link": "link",
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name as string];
  return <MaterialIcons color={color} size={size} name={iconName as any} style={style} />;
}

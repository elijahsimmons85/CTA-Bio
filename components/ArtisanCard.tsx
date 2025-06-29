import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Artisan = {
  id: string;
  name: string;
  trade: string;
  portraitPath: string;
  description: string;
  videoUrls?: {
    intro?: string;
    craft?: string;
  };
};

type Props = {
  artisan: Artisan;
  index: number;
  animationValue: SharedValue<number>;
};

const portraitMap: Record<string, any> = {
  default: require("../assets/images/DefaultPortrait.png"),
  // Add more portrait mappings as needed
};

// Configuration constants for easy ratio adjustments
const LAYOUT_CONFIG = {
  portraitRatio: 0.65, // 45% of card height
  contentRatio: 0.35, // 55% of card height
  titleRatio: 0.3, // 25% of content section
  descriptionRatio: 0.3, // 45% of content section
  buttonsRatio: 0.4, // 30% of content section
};

export default function ArtisanCard({ artisan, index, animationValue }: Props) {
  const router = useRouter();

  const handlePress = () => {
    //router.push({
    //  pathname: "/artisan/[id]",
    //  params: { id: artisan.id },
    //});
  };

  const handleVideoPress = (videoType: "intro" | "craft") => {
    console.log(`Playing ${videoType} video for ${artisan.name}`);
    // You can implement video modal or navigation here
  };

  const imageSource =
    artisan.portraitPath && portraitMap[artisan.portraitPath]
      ? portraitMap[artisan.portraitPath]
      : portraitMap["default"];

  // Simplified animation - just scale, no opacity changes
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.95}
      >
        {/* Portrait Section */}
        <View
          style={[
            styles.portraitSection,
            { height: `${LAYOUT_CONFIG.portraitRatio * 100}%` },
          ]}
        >
          <Image
            source={imageSource}
            style={styles.portrait}
            resizeMode="cover"
          />
        </View>

        {/* Content Section */}
        <View
          style={[
            styles.contentSection,
            { height: `${LAYOUT_CONFIG.contentRatio * 100}%` },
          ]}
        >
          {/* Name and Trade */}
          <View
            style={[
              styles.titleSection,
              { height: `${LAYOUT_CONFIG.titleRatio * 100}%` },
            ]}
          >
            <Text
              style={styles.name}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {artisan.name}
            </Text>
            <Text
              style={styles.trade}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {artisan.trade}
            </Text>
          </View>

          {/* Description */}
          <View
            style={[
              styles.descriptionSection,
              { height: `${LAYOUT_CONFIG.descriptionRatio * 100}%` },
            ]}
          >
            <Text style={styles.description} numberOfLines={4}>
              {artisan.description}
            </Text>
          </View>

          {/* Video Buttons */}
          <View
            style={[
              styles.buttonSection,
              { height: `${LAYOUT_CONFIG.buttonsRatio * 100}%` },
            ]}
          >
            <TouchableOpacity
              style={[styles.videoButton, styles.introButton]}
              onPress={() => handleVideoPress("intro")}
              activeOpacity={0.8}
            >
              <Ionicons name="play-circle" size={68} color="#007AFF" />
              <Text
                style={styles.buttonText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                Play Bio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.videoButton, styles.craftButton]}
              onPress={() => handleVideoPress("craft")}
              activeOpacity={0.8}
            >
              <Ionicons name="play-circle" size={68} color="#FF6B35" />
              <Text
                style={styles.buttonText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                See Their Craft
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  portraitSection: {
    width: "100%",
    overflow: "hidden",
  },
  portrait: {
    width: "100%",
    height: "100%",
  },
  contentSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  titleSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    flex: 1,
  },
  trade: {
    fontSize: 35,
    color: "#666666",
    textAlign: "center",
    fontWeight: "500",
    flex: 1,
  },
  descriptionSection: {
    justifyContent: "center",
    paddingVertical: 8,
  },
  description: {
    fontSize: 20,
    color: "#333333",
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "400",
  },
  buttonSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: 12,
  },
  videoButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  introButton: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  craftButton: {
    borderColor: "#FF6B35",
    backgroundColor: "#fff5f0",
  },
  buttonText: {
    color: "#1a1a1a",
    fontSize: 30,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
});

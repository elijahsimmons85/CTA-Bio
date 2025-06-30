import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import artisans from "../assets/artisans.json";
import ArtisanCard from "../components/ArtisanCard";
import HiddenMaintenanceTrigger from "../components/HiddenMaintenanceTrigger";

export default function Index() {
  const ref = React.useRef<ICarouselInstance>(null);
  const { width, height } = Dimensions.get("window");
  const progress = useSharedValue<number>(0);
  const router = useRouter();

  const CARD_WIDTH = width * 1;
  const CARD_HEIGHT = height * 0.95;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  console.log("Window dimensions:", width, height);

  // Don't render until dimensions are known
  if (width === 0 || height === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#ffffff", "#dddddd"]} style={styles.container}>
      <Carousel
        ref={ref}
        data={artisans}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={{ width: width }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: CARD_WIDTH * 0.25,
          parallaxAdjacentItemScale: 0.7,
        }}
        pagingEnabled={true}
        snapEnabled={true}
        loop={true}
        autoPlay={false}
        scrollAnimationDuration={900}
        onProgressChange={progress}
        renderItem={({ item, index, animationValue }) => (
          <ArtisanCard
            artisan={item}
            index={index}
            animationValue={animationValue}
          />
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={artisans}
        dotStyle={{
          width: 20,
          height: 20,
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 50,
        }}
        activeDotStyle={{
          borderRadius: 100,
        }}
        containerStyle={{ gap: 5, marginTop: -30 }}
        onPress={onPressPagination}
      />

      <HiddenMaintenanceTrigger
        onActivate={() => router.push("/maintenance")}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
});

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination
} from "react-native-reanimated-carousel";
import artisans from "../assets/artisans.json";
import ArtisanCard from "../components/ArtisanCard";

export default function Index() {
  const ref = React.useRef<ICarouselInstance>(null);
  const { width, height } = useWindowDimensions();
  const progress = useSharedValue<number>(0);

  const CARD_WIDTH = width * 1;
  const CARD_HEIGHT = height * 0.9;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <LinearGradient
      colors={["#ffffff", "#dddddd"]}
      style={styles.container}
    >
      <Carousel
        ref={ref}
        data={artisans}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={{ width: width }} // the container takes the whole width
        mode="parallax"  // Changed from "horizontal-stack" to "parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,    // Scale for side cards
          parallaxScrollingOffset: CARD_WIDTH * 0.25,  // Offset for parallax effect
          parallaxAdjacentItemScale: 0.7,  // Scale for adjacent items
        }}
        pagingEnabled={true}      // center active card
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
					borderRadius: 100
        }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
        
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
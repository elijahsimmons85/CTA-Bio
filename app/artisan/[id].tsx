import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import artisans from "../../assets/artisans.json";

export default function ArtisanDetail() {
  const { id } = useLocalSearchParams();

  console.log("id param:", id);

  const artisan = artisans.find((a) => a.id === String(id));

  if (!artisan) {
    return (
      <View style={styles.container}>
        <Text>Artisan not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: artisan.portraitPath }} style={styles.image} />
      <Text style={styles.name}>{artisan.name}</Text>
      <Text style={styles.description}>{artisan.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});

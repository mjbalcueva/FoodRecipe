import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Assuming you have a similar structure for recipes in your Redux store
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];

  const getFavKey = (r) =>
    r?.idFood ||
    r?.idC ||
    r?.idCategory ||
    r?.customId ||
    (r?.title || "") + "|" + (r?.image || "");

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        {/* add back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#2563EB",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Heading */}
      <View testID="FavoriteRecipes">
        <Text
          style={{ fontSize: hp(3.8), marginTop: hp(4), marginLeft: 20 }}
          className="font-semibold text-neutral-600"
        >
          My Favorite Recipes
        </Text>
      </View>

      <TouchableOpacity
        testID="favoriteRecipes"
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2563EB",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteRecipesList}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item) => String(getFavKey(item))}
        renderItem={({ item }) => {
          const isApiRecipe = !!(
            item.idFood ||
            item.recipeName ||
            item.recipeImage
          );
          const imageUri = item.recipeImage || item.image;
          const title = item.recipeName || item.title || "";
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() =>
                isApiRecipe
                  ? navigation.navigate("RecipeDetail", { item })
                  : navigation.navigate("CustomRecipesScreen", { recipe: item })
              }
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.recipeImage} />
              ) : null}
              <Text style={styles.recipeTitle}>
                {title.length > 20 ? title.slice(0, 20) + "..." : title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  recipeImage: {
    width: "100%",
    maxWidth: 300,
    height: 180,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
});

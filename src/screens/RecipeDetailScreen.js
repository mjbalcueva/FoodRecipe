import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action

export default function RecipeDetailScreen({ route, navigation }) {
  const recipe = route?.params?.item || {};

  const dispatch = useDispatch();
  const favoriterecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );

  const isFavourite = favoriterecipes?.some(
    (favrecipe) => favrecipe.idFood === recipe.idFood
  ); // Check by idFood

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe)); // Dispatch the recipe to favorites
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        {!!recipe?.recipeImage && (
          <Image
            source={{ uri: recipe.recipeImage }}
            style={styles.recipeImage}
          />
        )}
      </View>
      {/* Back Button and Favorite Button */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteIcon}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>
      {/* recipe Description */}
      <View style={styles.contentContainer}>
        {/* Title and Category */}
        <View
          style={styles.recipeDetailsContainer}
          testID="recipeDetailsContainer"
        >
          {!!recipe?.recipeName && (
            <Text style={styles.recipeTitle} testID="recipeTitle">
              {recipe.recipeName}
            </Text>
          )}
          {!!recipe?.recipeCategory && (
            <Text style={styles.recipeCategory} testID="recipeCategory">
              {recipe.recipeCategory}
            </Text>
          )}
        </View>
        <View style={styles.miscContainer} testID="miscContainer">
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>⏱️</Text>
            <Text style={styles.miscText}>30 mins</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>👥</Text>
            <Text style={styles.miscText}>4 servings</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🔥</Text>
            <Text style={styles.miscText}>350 cal</Text>
          </View>
          {!!recipe?.recipeCategory && (
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>📊</Text>
              <Text style={styles.miscText}>{recipe.recipeCategory}</Text>
            </View>
          )}
        </View>
        {/* Ingredients */}
        {!!recipe?.ingredients?.length && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList} testID="ingredientsList">
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>
                    {ingredient.ingredientName} - {ingredient.measure}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {/* Instructions */}
        {!!recipe?.recipeInstructions && (
          <View style={styles.sectionContainer} testID="sectionContainer">
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructionsText}>
              {recipe.recipeInstructions}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  imageContainer: {
    width: "100%",
    height: 260,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  favoriteButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  recipeDetailsContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  recipeCategory: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  miscContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  miscItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  miscIcon: {
    marginRight: 6,
  },
  miscText: {
    color: "#374151",
  },
  sectionContainer: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#111827",
    marginRight: 8,
  },
  ingredientText: {
    color: "#374151",
  },
  instructionsText: {
    color: "#374151",
    lineHeight: 20,
  },
});

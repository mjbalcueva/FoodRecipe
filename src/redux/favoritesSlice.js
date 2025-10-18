import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const getFavKey = (recipe) =>
  recipe?.idFood ||
  recipe?.idC ||
  recipe?.idCategory ||
  recipe?.customId ||
  (recipe?.title || "") + "|" + (recipe?.image || "");

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      // ensure custom recipes have a stable id
      if (!recipe.idFood && !recipe.idC && !recipe.idCategory) {
        recipe.customId = recipe.customId || getFavKey(recipe);
      }
      const targetKey = getFavKey(recipe);
      const existingIndex = state.favoriterecipes.findIndex(
        (favRecipe) => getFavKey(favRecipe) === targetKey
      );

      if (existingIndex !== -1) {
        // Recipe exists, remove it from favorites
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Recipe doesn't exist, add it to favorites
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

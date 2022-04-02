import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './configure.JS';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookMark: [],
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    state.search.page = 1

    if (state.bookMark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (err) {
    // console.log(`${err}...model_JS😅😅😅`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    // console.log(`${err}...model_JS222😅😅😅`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  // console.log(start,end);
  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookMark = function (recipe) {
  // ADDING BOOKMARK
  state.bookMark.push(recipe);

  // MARK CURRENT RECIPE AS BOOKMARK
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookMark = function (id) {
  const index = state.bookMark.findIndex(el => el.id === id);
  // console.log(index);
  state.bookMark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

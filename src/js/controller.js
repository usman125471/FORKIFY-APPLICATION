import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import recipeView from './views/recipeView.js';
import paginationView from './views/paginationView.js';
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2

//---\\ FORKIFY APPLICATION //---\\
// console.log(`Hi Usman`);

console.log(`welcome to Application`);

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultView.update(model.getSearchResultPage());
    // LOADING REICPE \\
    await model.loadRecipe(id);
    const { recipe } = model.state;

    /// 2) RENDERING RECIPE \\\
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // console.log(resultView);
    resultView.renderSpinner();
    /// GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    /// LOAD SEARCH RESULTS
    await model.loadSearchResults(query);

    /// RENDERING DATA
    // console.log(model.state.search.result);
    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultPage());

    // RENDERING PAGINATION VIEW
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
  console.log(goToPage);
};

const controlServings = function (newServings) {
  // console.log(newServings);
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookMark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

import { createSlice, configureStore } from "@reduxjs/toolkit";

const currentsearch = createSlice({
  name: "CurrentSearch",
  initialState: {
    loading: false,
    type: "",
    result: "",
    error: "",
    bookmarks: [],
    Paper: "",
  },
  reducers: {
    resultloading: (state, action) => {
      state.loading = true;
    },
    resulttype: (state, action) => {
      state.type = action.payload;
    },
    resultsuccess: (state, action) => {
      state.loading = false;
      state.result = action.payload;
    },
    resulterror: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.type = "";
    },
    resultbookmarks: (state, action) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    resultremovebookmarks: (state, action) => {
      let paperid = action.payload;
      let newbookmarks = state.bookmarks.filter(
        (item) => item.paperId != paperid
      );
      state.bookmarks = newbookmarks;
    },
    resultpaper: (state, action) => {
      state.Paper = action.payload;
    },
  },
});

export const {
  resultloading,
  resulterror,
  resultsuccess,
  resultbookmarks,
  resultremovebookmarks,
  resulttype,
  resultpaper,
} = currentsearch.actions;
export const store = configureStore({
  reducer: {
    CurrentSearch: currentsearch.reducer,
  },
});

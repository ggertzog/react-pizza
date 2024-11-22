import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title',
}

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number; // Изменено на string
  currentPage: number;
  sort: SortItem;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0, // Изменено на ''
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) { // Изменено на string
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<FilterSliceState>>) { // Изменено на Partial
      const { categoryId, currentPage, sort } = action.payload;

      //Проверяем и применяем изменения, если есть
      if (categoryId !== undefined) state.categoryId = categoryId;
      if (currentPage !== undefined) state.currentPage = currentPage;
      if (sort !== undefined) state.sort = sort;
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
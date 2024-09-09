import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SLICE_NAME = "layout";

export type LayoutState = {
  isAppLoading: boolean;
  firstLocation: {
    value: string | null;
  };
};

export type LayoutStateSlice = { [SLICE_NAME]: LayoutState };

export const layoutSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    isAppLoading: true,
    firstLocation: {
      value: null,
    },
  } as LayoutState,
  reducers: {
    setIsAppLoading: (
      state,
      { payload: isLoading }: PayloadAction<boolean>
    ) => {
      state.isAppLoading = isLoading;
    },
    setFirstLocation: (
      state,
      { payload: pathname }: PayloadAction<string | null>
    ) => {
      state.firstLocation.value = pathname;
    },
  },
});

export const { setIsAppLoading, setFirstLocation } = layoutSlice.actions;

export const selectIsAppLoading = (state: LayoutStateSlice) =>
  state.layout.isAppLoading;
export const selectFirstLocation = (state: LayoutStateSlice) =>
  state.layout.firstLocation;

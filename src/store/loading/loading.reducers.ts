import { createReducer, on } from "@ngrx/store";
import { SHOW_LOADER, HIDE_LOADER } from "./loading.actions";
import { LoadingState } from "./LoadingState";

const initialState: LoadingState = { show: false };

const reducer = createReducer(initialState,
    on(SHOW_LOADER, () => {
        return { show: true };
    }),
    on(HIDE_LOADER, () => {
        return { show: false };
    })
);

export function loadingReducer(state: LoadingState, action) {
    return reducer(state, action);
}
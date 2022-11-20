import { createAction } from "@ngrx/store";
import { HIDE_LOADER, SHOW_LOADER } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";
import { LoadingState } from "./LoadingState";

describe('LoadingStore', () => {

    it('show', () => {
        const initialState: LoadingState = { show: false };
        const newState = loadingReducer(initialState, SHOW_LOADER());

        expect(newState).toEqual({ show: true });
    });

    it('hide', () => {
        const initialState: LoadingState = { show: true };
        const newState = loadingReducer(initialState, HIDE_LOADER());

        expect(newState).toEqual({ show: false });
    });

    it('should keep state if action is unknown', () => {
        const initialState: LoadingState = { show: true };
        const action = createAction('UNKNOWN')
        const newState = loadingReducer(initialState, action);

        expect(newState).toEqual({ show: true });
    });
})
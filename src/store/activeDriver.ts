//#region Action Types
import {Driver} from "../model/driver";

export const ACTIVE_DRIVER_REQUEST = 'ACTIVE_DRIVER_REQUEST';
export const ACTIVE_DRIVER_SUCCESS = 'ACTIVE_DRIVER_SUCCESS';
export const ACTIVE_DRIVER_FAILURE = 'ACTIVE_DRIVER_FAILURE';
//#endregion

//#region Action Creators
export const activeDriversRequest = () => {
    return {
        type: ACTIVE_DRIVER_REQUEST,
    }
};
export const activeDriversSuccess = (driver: Driver) => {
    return {
        type: ACTIVE_DRIVER_SUCCESS,
        payload: {
            driver,
        }
    }
};
export const activeDriversFailure = (errors: []) => {
    return {
        type: ACTIVE_DRIVER_FAILURE,
        payload: {
            errors
        }
    }
};
//#endregion

//#region Reducer
const initialState: State = {
    data: {} as Driver,
    loading: false,
    errors: [],
};
export const activeDriver = (state: State = initialState, {type, payload}: Action) => {
    switch (type) {
        case ACTIVE_DRIVER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACTIVE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.driver
            };
        case ACTIVE_DRIVER_FAILURE:
            return {
                ...state,
                loading: false,
                errors: state.errors.concat(payload.errors)
            };
        default:
            return state;
    }
};
//#endregion

//#region Thunk
export const requestActiveDriver = (driver: Driver) => async (dispatch: any) => {
    dispatch(activeDriversRequest());
    try {
        dispatch(activeDriversSuccess(driver));
    } catch (e) {
        dispatch(activeDriversFailure(e))
    }//#region Action Types
};

type State = {
    data: Driver,
    loading: boolean
    errors: [],
}
type Action = {
    type: string,
    payload: {
        driver: Driver,
        errors: [],
    },
}

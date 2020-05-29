import {Driver} from "../services/drivers.service";
import {Dispatch} from "redux";

//#region Action Types
export const ACTIVE_DRIVER_REQUEST = 'ACTIVE_DRIVER_REQUEST';
export const ACTIVE_DRIVER_SUCCESS = 'ACTIVE_DRIVER_SUCCESS';
export const ACTIVE_DRIVER_FAILURE = 'ACTIVE_DRIVER_FAILURE';
//#endregion

//#region Action Creators
export const activeDriversRequest = (): ActiveDriverRequestActionType => {
    return {
        type: ACTIVE_DRIVER_REQUEST,
    }
};
export const activeDriversSuccess = (driver: Driver): ActiveDriverSuccessActionType => {
    return {
        type: ACTIVE_DRIVER_SUCCESS,
        payload: {
            driver,
        }
    }
};
export const activeDriversFailure = (errors: []): ActiveDriverFailureActionType => {
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
export const activeDriver = (state: State = initialState, action: ActionTypes): State => {
    switch (action.type) {
        case ACTIVE_DRIVER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACTIVE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.driver
            };
        case ACTIVE_DRIVER_FAILURE:
            return {
                ...state,
                loading: false,
                errors: state.errors.concat(action.payload.errors)
            };
        default:
            return state;
    }
};
//#endregion

//#region Thunk
export const requestActiveDriver = (driver: Driver) => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(activeDriversRequest());
    try {
        dispatch(activeDriversSuccess(driver));
    } catch (e) {
        dispatch(activeDriversFailure(e))
    }
};
//#region Action Types
type State = {
    data: Driver,
    loading: boolean
    errors: string[],
}
type ActiveDriverRequestActionType = {
    type: typeof ACTIVE_DRIVER_REQUEST,
}
type ActiveDriverSuccessActionType = {
    type: typeof ACTIVE_DRIVER_SUCCESS,
    payload: ActiveDriverSuccessPayloadType,
}
type ActiveDriverSuccessPayloadType = {
    driver: Driver,
}
type ActiveDriverFailureActionType = {
    type: typeof ACTIVE_DRIVER_FAILURE,
    payload: ActiveDriverFailurePayloadType,
}
type ActiveDriverFailurePayloadType = {
    errors: string[],
}
type ActionTypes = ActiveDriverRequestActionType | ActiveDriverSuccessActionType | ActiveDriverFailureActionType;

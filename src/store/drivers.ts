//#region Action Types
import {Driver} from "../services/drivers.service";
import driverService from "../services/drivers.service";
import {Dispatch} from "redux";

export const DRIVERS_REQUEST = 'DRIVERS_REQUEST';
export const DRIVERS_SUCCESS = 'DRIVERS_SUCCESS';
export const DRIVERS_FAILURE = 'DRIVERS_FAILURE';
//#endregion

//#region Action Creators
export const driversRequest = (): DriversRequestActionType=> {
    return {
        type: DRIVERS_REQUEST,
    }
};
export const driversSuccess = (drivers: Driver[]): DriversSuccessActionType => {
    return {
        type: DRIVERS_SUCCESS,
        payload: {
            drivers,
        }
    }
};
export const driversFailure = (errors: []): DriversFailureActionType => {
    return {
        type: DRIVERS_FAILURE,
        payload: {
            errors
        }
    }
};
//#endregion

//#region Reducer
const initialState: State = {
    data: [],
    loading: false,
    errors: [],
};
export const drivers = (state: State = initialState, action: ActionTypes): State => {
    switch (action.type) {
        case DRIVERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DRIVERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.drivers
            };
        case DRIVERS_FAILURE:
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
export const requestDrivers = () => async (dispatch: Dispatch<ActionTypes>) => {
    dispatch(driversRequest());
    try {
        let {data} = await driverService.getDrivers();
        dispatch(driversSuccess(data.crews_info));
    } catch (e) {
        dispatch(driversFailure(e))
    }
};
//#endregion


type State = {
    data: Driver[],
    loading: boolean
    errors: string[],
}
type DriversRequestActionType = {
    type: typeof DRIVERS_REQUEST,
}
type DriversSuccessActionType = {
    type: typeof DRIVERS_SUCCESS,
    payload: DriversSuccessPayloadType,
}
type DriversSuccessPayloadType = {
    drivers: Driver[],
}
type DriversFailureActionType = {
    type: typeof DRIVERS_FAILURE,
    payload: DriversFailurePayloadType,
}
type DriversFailurePayloadType = {
    errors: string[],
}
type ActionTypes = DriversRequestActionType | DriversSuccessActionType | DriversFailureActionType;

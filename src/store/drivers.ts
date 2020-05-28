//#region Action Types
import {Driver} from "../model/driver";
import driverService from "../services/drivers.service";

export const DRIVERS_REQUEST = 'DRIVERS_REQUEST';
export const DRIVERS_SUCCESS = 'DRIVERS_SUCCESS';
export const DRIVERS_FAILURE = 'DRIVERS_FAILURE';
//#endregion

//#region Action Creators
export const driversRequest = () => {
    return {
        type: DRIVERS_REQUEST,
    }
};
export const driversSuccess = (drivers: any) => {
    return {
        type: DRIVERS_SUCCESS,
        payload: {
            drivers,
        }
    }
};
export const driversFailure = (errors: []) => {
    return {
        type: DRIVERS_REQUEST,
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
export const drivers = (state: State = initialState, {type, payload}: Action) => {
    switch (type) {
        case DRIVERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DRIVERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.drivers
            };
        case DRIVERS_FAILURE:
            return {
                ...state,
                loading: false,
                errors: state.data.concat(payload.errors)
            };
        default:
            return state;
    }
};
//#endregion

//#region Thunk
export const requestDrivers = () => async (dispatch: any) => {
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
    errors: [],
}
type Action = {
    type: string,
    payload: {
        drivers: [],
        errors: [],
    },
}

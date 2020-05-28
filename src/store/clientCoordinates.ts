//#region Action Types
import {Driver} from "../model/driver";
import driverService from "../services/drivers.service";

export const CLIENT_COORDINATES_REQUEST = 'CLIENT_COORDINATES_REQUEST';
export const CLIENT_COORDINATES_SUCCESS = 'CLIENT_COORDINATES_SUCCESS';
export const CLIENT_COORDINATES_FAILURE = 'CLIENT_COORDINATES_FAILURE';
//#endregion

//#region Action Creators
export const clientCoordinatesRequest = () => {
    return {
        type: CLIENT_COORDINATES_REQUEST,
    }
};
export const clientCoordinatesSuccess = (coordinates: []) => {
    return {
        type: CLIENT_COORDINATES_SUCCESS,
        payload: {
            coordinates,
        }
    }
};
export const clientCoordinatesFailure = (errors: []) => {
    return {
        type: CLIENT_COORDINATES_FAILURE,
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
export const clientCoordinates = (state: State = initialState, {type, payload}: Action) => {
    switch (type) {
        case CLIENT_COORDINATES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CLIENT_COORDINATES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.coordinates,
            };
        case CLIENT_COORDINATES_FAILURE:
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
export const requestClientCoordinates = (coordinates: any) => async (dispatch: any) => {
    dispatch(clientCoordinatesRequest());
    try {
        dispatch(clientCoordinatesSuccess(coordinates));
    } catch (e) {
        dispatch(clientCoordinatesFailure(e))
    }
};
//#endregion


type State = {
    data: number[],
    loading: boolean
    errors: [],
}
type Action = {
    type: string,
    payload: {
        coordinates?: [],
        errors: [],
    },
}

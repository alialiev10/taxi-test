//#region Action Types
import {Driver} from "../services/drivers.service";
import driverService from "../services/drivers.service";
import {Dispatch} from "redux";

export const CLIENT_COORDINATES_REQUEST = 'CLIENT_COORDINATES_REQUEST';
export const CLIENT_COORDINATES_SUCCESS = 'CLIENT_COORDINATES_SUCCESS';
export const CLIENT_COORDINATES_FAILURE = 'CLIENT_COORDINATES_FAILURE';
//#endregion

//#region Action Creators
export const clientCoordinatesRequest = (): ClientCoordinatesRequestActionType => {
    return {
        type: CLIENT_COORDINATES_REQUEST,
    }
};
export const clientCoordinatesSuccess = (coordinates: number[]): ClientCoordinatesSuccessActionType=> {
    return {
        type: CLIENT_COORDINATES_SUCCESS,
        payload: {
            coordinates,
        }
    }
};
export const clientCoordinatesFailure = (errors: []): ClientCoordinatesFailureActionType => {
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
export const clientCoordinates = (state: State = initialState, action: ActionTypes): State => {
    switch (action.type) {
        case CLIENT_COORDINATES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CLIENT_COORDINATES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.coordinates,
            };
        case CLIENT_COORDINATES_FAILURE:
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
export const requestClientCoordinates = (coordinates: number[]) => async (dispatch: Dispatch<ActionTypes>) => {
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
    errors: string[],
}
type ClientCoordinatesRequestActionType = {
    type: typeof CLIENT_COORDINATES_REQUEST,
}
type ClientCoordinatesSuccessActionType = {
    type: typeof CLIENT_COORDINATES_SUCCESS,
    payload: ClientCoordinatesSuccessPayloadType
}
type ClientCoordinatesSuccessPayloadType = {
    coordinates: number[],
}
type ClientCoordinatesFailureActionType = {
    type: typeof CLIENT_COORDINATES_FAILURE,
    payload: ClientCoordinatesFailurePayloadType
}
type ClientCoordinatesFailurePayloadType = {
    errors: string[],
}
type ActionTypes = ClientCoordinatesRequestActionType | ClientCoordinatesSuccessActionType | ClientCoordinatesFailureActionType;

import {Response} from '../model/response'
const getDrivers = (): Promise<DriversResponse> => {
    return fetch('http://www.mocky.io/v2/5ece32f43000007300ea0ef0')
        .then((res) => res.json())
};

const driverService = {
    getDrivers,
};

export default driverService;

export type Driver = {
    crew_id: number,
    car_mark: string,
    car_model: string,
    car_color: string,
    car_number: string,
    driver_name: string,
    driver_phone: string,
    lat: number,
    lon: number,
    distance: number,
}

export type DriversResponse = Response<{
    crews_info: Driver[]
}>

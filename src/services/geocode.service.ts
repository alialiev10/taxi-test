// const getDrivers = (): Promise<DriversResponse> => {
//     return fetch('https://geocode-maps.yandex.ru/1.x/?apikey=ваш API-ключ&geocode=37.611347,55.760241')
//         .then((res) => res.json())
// }; TODO Не работает геокодер Яндекса.


const getAddress = (type: string, params: string | number[]) => {
    switch (type) {
        case 'BY_COORDINATES':
            return 'Ул.Ленина, дом 20';
        case 'BY_ADDRESS':
            return [56.84565005145864, 53.20868570373535];
        default: return null;
    }
};

const geocodeService = {
    getAddress,
};

export default geocodeService;


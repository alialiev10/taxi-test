const decode: DecodeFn = ((data: number[] | string) => {
    if (typeof data === "string") {
        return [56.84565005145864, 53.20868570373535];
    }
    return 'Ул.Ленина, дом 20'
}) as DecodeFn;

const geocodeService = {
    decode,
};
export default geocodeService;

type DecodeFn = {
    (data: number[]): string
    (data: string): number[]
}

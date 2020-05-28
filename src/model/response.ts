export type Response<T = {}> = {
    code: number,
    descr: string,
    data: T,
}

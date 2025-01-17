export type TError = {
    data: {
        success: boolean,
        message: string,
        stack: string,
    },
    status: number,
}

export type TResponse = {
    data?: any,
    error?: TError,
}
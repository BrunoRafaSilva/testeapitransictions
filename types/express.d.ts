declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            custom: {
                offset?: number,
                limit?: number
            }
        }
    }
}

export { };

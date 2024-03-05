declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            pagination?: {
                limit: number;
                offset: number;
            }
        }
    }
}

export { };

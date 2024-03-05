import z from 'zod';
import express from 'express';

const middlewareGetLimitAndOffset = (req: express.Request) => {
    const customHeaders = z.object({
        limit: z.preprocess(
            (arg) => {
                if (!arg) {
                    return 10;
                }

                return Number(arg);
            },
            z.number().int(),
        ),
        offset: z.preprocess(
            (arg) => {
                if (!arg) {
                    return 0;
                }

                return Number(arg);
            },
            z.number().int(),
        ),
    }).parse(req.headers);

    req.custom.limit = customHeaders.limit;
    req.custom.offset = customHeaders.offset;
};
import express, { Application } from 'express';
import path from 'path';
import { Response, Request, NextFunction } from 'express';
import middlewareErrors from '../middlewares/error';

const PATH_DYNAMIKC_ROUTERS = path.join(__dirname, '..', 'controllers', 'dynamic');

const middlewareRouters = async (req: express.Request, res: express.Response) => {
    const pathFolder = `${PATH_DYNAMIKC_ROUTERS}${req.path.toLowerCase()}`;
    const pathController = path.join(pathFolder, `${req.method.toLowerCase()}.js`);

    const result: unknown = await (await import(`${pathController}`)).default(req, res);

    return result;
};

export default (app: Application) => {

    app.use(async (req: Request, res: Response) => {
        let responseBody;
        let success = true;
        try {
            if (req.method !== 'OPTIONS') {
                responseBody = await middlewareRouters(req, res);
                req.query.limit = '1';
            } else {
                res.status(200);
                responseBody = '';
            }
        } catch (err) {
            responseBody = middlewareErrors(err, res);
            success = false;
        }

        if (typeof (responseBody) === 'number') {
            responseBody = responseBody.toString();
        }

        const response = {
            ok: success,
            result: responseBody,
        };

        res.send(response);
    });

};

import jwt from 'jsonwebtoken';

export default (res, req, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify('token', 'secretkey');

            res.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json(
                {
                    message : 'wrong access'
                }
            );
        }
    } else {
        return res.status(403).json(
            {
                message : 'wrong access'
            }
        );
    }
 };
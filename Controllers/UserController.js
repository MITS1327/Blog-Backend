import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel(
            {
                email : req.body.email,
                fullName : req.body.fullName,
                passwordHash : hash,
                avatarUrl : req.body.avatarUrl
            }
        )

        const user = doc.save();

        const token = jwt.sign(
            {
                _id : user._id,
            },
            'secretkey',
            {
                expiresIn: '24h'
            }
        )

        const {paswordHash, ...userData} = user._doc;

        res.json(
            {
                ...userData,
                token
            }
        );
    } catch (err) {
        res.status(500).json(
            {
                message : 'register error'
            }
        )
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email : req.body.email});

        if(!user) {
            return res.status(404).json(
                {
                    message : 'user not found'
                }
            )
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPassword) {
            return res.status(404).json(
                {
                    message : 'incorrect password or login'
                }
            )
        }
        const token = jwt.sign(
            {
                _id : user._id,
            },
            'secretkey',
            {
                expiresIn: '24h'
            }
        );

        const {paswordHash, ...userData} = user._doc;

        res.json(
            {
                ...userData,
                token
            }
        );
    } catch (err) {
        res.status(500).json(
            {
                message : 'login error'
            }
        )
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(404).json(
                {
                    message : 'undefined user'
                }
            )
        }

        const {paswordHash, ...userData} = user._doc;

        res.json(userData);
    } catch (err) {
        res.status(500).json(
            {
                message : 'undefined user'
            }
        )
    }
};



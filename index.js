import express from 'express';
import mongoose from 'mongoose';
import {registerValidation, loginValidation, postCreateValidation} from "./validation.js";
import { UserController, PostController } from './Controllers/index.js';
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import multer from 'multer';
import cors from 'cors';

mongoose.connect(
    'mongodb+srv://Admin:Misha100@cluster0.eengew7.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => {
    console.log('DB OK');
});

const app = express();

const storage = multer.diskStorage(
    {
        destination : (_, __, cb) => {
            cb(null, 'uploads');
        },
        filename : (_, file, cb) => {
            cb(null, file.originalname);
        },
    }
);

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/uploads', checkAuth, upload.single('image'), (res, req) => {
    res.json(
        {
            url : `/upploads${req.file.originalname}`
        }
    )
})

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.patch('/posts/:id', checkAuth, handleValidationErrors, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);

app.listen(4444, () => {
    console.log('server started');
});
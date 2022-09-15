import { body } from 'express-validator';

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min : 5}),
]

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min : 5}),
    body('fullName').isLength({min : 3}),
    body('avatarUrl').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'enter post title').isLength({ min : 3 }).isString(),
    body('text', 'enter post text').isLength({min : 5}).isString(),
    body('tags', 'wrong tags format').optional().isString(),
    body('imageUrl', 'wrong url').optional().isURL()
]
import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

         res.json(posts);
    } catch (err) {
        return res.status(500).json(
            {
                message : 'get posts failed'
            }
        );
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.findOneAndUpdate(
            {
                _id : postId
            },
            {
                $inc : { viewsCounter : 1 }
            },
            {
                returnDocument : 'after'
            },
            (err, doc) => {
                if(err) {
                    return res.status(500).json(
                        {
                            message : 'return post failed'
                        }
                    );
                }

                if(!doc) {
                    return res.status(404).json(
                        {
                            message : 'undefined post'
                        }
                    )
                }

                res.json(doc);
            }
        )
    } catch (err) {
        return res.status(500).json(
            {
                message : 'get posts failed'
            }
        );
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.findByIdAndDelete(
            {
                _id : postId
            },
            (err, doc) => {
                if(err) {
                    return res.status(500).json(
                        {
                            message : 'delete post failed'
                        }
                    );
                }


                if(!doc) {
                    return res.status(404).json(
                        {
                            message : 'undefined post'
                        }
                    );
                }

                res.json(
                    {
                        success : true
                    }
                );
            }
        )
    } catch (err) {
        return res.status(500).json(
            {
                message : 'get posts failed'
            }
        );
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id : postId
            },
            {
                title : req.body.title,
                text : req.body.text,
                tags : req.body.tags,
                imageUrl : req.body.imageUrl,
                user : req.userId
            }
        )

        res.json(
            {
                success : true
            }
        );
    } catch(err) {
        return res.status(500).json(
            {
                message : 'cannot update post'
            }
        );
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel(
            {
                title : req.body.title,
                text : req.body.text,
                tags : req.body.tags,
                imageUrl : req.body.imageUrl,
                user : req.userId
            }
        );

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        return res.status(500).json(
            {
                message : 'create post failed'
            }
        );
    }
}
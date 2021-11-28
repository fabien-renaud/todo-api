import Joi, {Schema} from 'joi';

export const listSchema: Schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required()
});

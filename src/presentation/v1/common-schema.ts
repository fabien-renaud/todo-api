import Joi, {Schema} from 'joi';

export const idSchema: Schema = Joi.object({
    id: Joi.string().required()
});

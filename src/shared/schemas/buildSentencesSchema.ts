import Joi from 'joi';
import SentenceTypeEnum from 'src/backend/shared/constants/SentenceTypeEnum';
import ExampleStyleEnum from 'src/backend/shared/constants/ExampleStyleEnum';
import SuggestionSourceEnum from 'src/backend/shared/constants/SuggestionSourceEnum';

export const bulkSentencesSchema = Joi.array().items(
  Joi.object({
    igbo: Joi.string().required(),
    // https://stackoverflow.com/questions/42370881/allow-string-to-be-null-or-empty-in-joi-and-express-validation
    english: Joi.string().empty(''),
    style: Joi.string().valid(...Object.values(ExampleStyleEnum)),
    source: Joi.string().valid(...Object.values(SuggestionSourceEnum)),
    type: Joi.string()
      .valid(...Object.values(SentenceTypeEnum))
      .required(),
  }),
);

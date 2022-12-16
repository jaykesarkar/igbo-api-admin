import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string(),
  body: yup.string().optional(),
  media: yup.string().nullable(),
  tags: yup.array().min(0).of(yup.string()),
  id: yup.string().optional(),
});

const resolver = {
  resolver: yupResolver(schema),
};

export default resolver;

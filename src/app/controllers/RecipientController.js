import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i)
        .required(),
      street: Yup.string().required(),
      number: Yup.number()
        .positive()
        .required(),
      complement: Yup.string(),
      state: Yup.string()
        .matches(/^[A-Za-z]{2}$/i)
        .required(),
      city: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ.'*`´’,\- "]{3,}$/i)
        .required(),
      zip_code: Yup.string()
        .matches(/^[0-9]{8}$/)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const {
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      } = await Recipient.create(req.body);

      return res.json({
        id,
        name,
        street,
        number,
        complement: complement || '',
        state,
        city,
        zip_code,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Sorry we have a problem...try later....' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i),
      street: Yup.string(),
      number: Yup.number()
        .positive()
        .required(),
      complement: Yup.string(),
      state: Yup.string().matches(/^[A-Za-z]{2}$/i),
      city: Yup.string().matches(/^[A-Za-zÀ-ÿ.'*`´’,\- "]{3,}$/i),
      zip_code: Yup.string().matches(/^[0-9]{8}$/),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const recipient = await Recipient.findByPk(req.params.id);

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found' });
      }

      const {
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      } = await recipient.update(req.body);

      return res.json({
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Sorry, we have a problem...try later...' });
    }
  }
}

export default new RecipientController();

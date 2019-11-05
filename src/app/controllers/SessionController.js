import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: 'Invalid credentials' });
    }

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ errors: 'Invalid email' });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: 'Invalid password' });
    }

    const { id, name } = user;

    return res.json({
      user: { id, email, name },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expireIn
      })
    });
  }
}

export default new SessionController();

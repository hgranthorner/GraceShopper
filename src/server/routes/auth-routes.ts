import express = require('express')
import User from '../models/user'
const router = express.Router()

router.put(
  '/login',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    User.findOne({
      where: {
        name: req.body.name,
        password: req.body.password
      }
    })
      .then(user => res.send(user))
      .catch(() => res.sendStatus(401))
  }
)

export default router

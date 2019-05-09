import express = require('express')
import User from '../models/user'
const router = express.Router()

router.put('/login', (req: express.Request, res: express.Response) => {
  User.findOne({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(user => {
    if (!user) {
      res.sendStatus(401)
    } else {
      req.session!.userId = user.id
      res.send(user)
    }
  })
})

export default router

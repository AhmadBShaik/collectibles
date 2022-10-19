import express from 'express'
import user from './user.routes'
import auth from './auth.routes'
const router = express.Router();

router.get('/check', (_, res) => {
    return res.sendStatus(200)
})

router.use(user)
router.use(auth)
export default router;
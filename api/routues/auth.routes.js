import express from 'express'
import { test, signup, signin, signout } from '../controller/auth.controller.js';

const router = express()

// router.get('/test', (req, res) => {
//     console.log('test working')
//     res.send('test working')
// })

router.get('/test', test)
router.post('/sign-up', signup)
router.post('/sign-in', signin)
router.get('/sign-out', signout)

export default router;
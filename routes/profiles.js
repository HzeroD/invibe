import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from "../controllers/profiles.js"

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get("/", checkAuth, profilesCtrl.index)
router.get("/:id", checkAuth, profilesCtrl.show)
// router.get("/:id", checkAuth, profilesCtrl.edit)

export { router }
import { Router } from 'express'
import * as apiCtrl from '../../controllers/api.js'


const router = Router()

router.patch('/:id', apiCtrl.barExists)
router.get("/:location", apiCtrl.createCocktailReview)



export {
    router
}
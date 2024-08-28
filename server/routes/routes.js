import { Router } from 'express'
import controller from "../controller/controller.js"

const router = Router()

router.get("/getAll",controller.getAll)
router.post("/create",controller.create)
router.put("/update/:id",controller.update)
router.delete("/delete/:id",controller.remove)

export default router
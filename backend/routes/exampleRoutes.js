import express from "express";
const router = express.Router();
import {
  createExample,
  deleteExample,
  getAllExamples,
  updateExample,
} from "../controllers/exampleController.js";
router.route("/").post(createExample).get(getAllExamples);

router.route("/:id").delete(deleteExample).patch(updateExample);

export default router;

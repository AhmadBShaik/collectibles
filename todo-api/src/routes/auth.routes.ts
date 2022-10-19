import express from "express";
import {
  getAllCollectiblesHandler,
  createCollectiblesHandler,
  getCollectiblesHandler,
  updateCollectiblesHandler,
  deleteCollectibleHandler,
  deleteAllCollectibleHandler

} from "../controllers/collectible.controller";
import { authenticateToken } from "../middleware/access-token-validator";
import validateCollectible from "../middleware/create-collectible-validator";

const router = express.Router();

router.get('/check2', (req, res) => res.send(200))

// get all collectible items
router.get("/collectibles", authenticateToken, getAllCollectiblesHandler);

// create a collectible item
router.post(
  "/create-collectible",
  authenticateToken,
  validateCollectible,
  createCollectiblesHandler
);

// get a collectible item
router.get(
  "/collectible/:id",
  authenticateToken,
  getCollectiblesHandler
);

// update a collectible item
router.put(
    "/collectible/:id",
    authenticateToken,
    updateCollectiblesHandler
  );
  
// delete a collectible item
router.delete(
    "/collectible/:id",
    authenticateToken,
    deleteCollectibleHandler
)
// delete all collectible items

router.delete(
    "/collectibles",
    authenticateToken,
    deleteAllCollectibleHandler
)
export default router;

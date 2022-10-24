import { Request, Response } from "express";
import {
  getAllCollectibles,
  createCollectible,
  getCollectible,
  updateCollectible,
  deleteCollectible,
  deleteAllCollectibles,
} from "../services/collectible.service";

export const getAllCollectiblesHandler = async (
  req: Request,
  res: Response
) => {
  const owner_id = req.params.owner_id;
  try {
    const allCollectibles = await getAllCollectibles(owner_id);
    req.statusCode = 200;
    return res.json(allCollectibles);
  } catch (e) {
    console.log(e);
    req.statusCode = 500;
    return;
  }
};

export const createCollectiblesHandler = async (
  req: Request,
  res: Response
) => {
  const body = req.body;
  const owner_id = req.params.owner_id;
  try {
    await createCollectible(body, owner_id);
    res.statusCode = 201;
    return res.json("Collectible created!");
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    return;
  }
};

export const getCollectiblesHandler = async (req: Request, res: Response) => {
  const { id, owner_id } = req.params;

  try {
    const collectible = await getCollectible(id);
    if (!collectible) {
      res.statusCode = 404;
      return res.json(`collectible with id '${id}' not found`);
    }
    res.statusCode = 200;
    return res.json(collectible);
  } catch (e) {
    res.statusCode = 400;
    console.log(e);
    return;
  }
};

export const updateCollectiblesHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const body = req.body;
  try {
   await updateCollectible(body, id);
    res.statusCode = 200;
    return res.json({ message: "collectible updated!" });
  } catch (e) {
    res.statusCode = 400;
    console.log(e);
    return;
  }
};

export const deleteCollectibleHandler = async (req: Request, res: Response) => {
  const { id, owner_id } = req.params;
  try {
    const collectible = await deleteCollectible(id);
    if (!collectible) {
      res.statusCode = 404;
      return res.json(`collectible with id '${id}' not found`);
    }
    res.statusCode = 200;
    return res.json({ message: "collectible deleted!" });
  } catch (e) {
    res.statusCode = 500;
    console.log(e);
    return;
  }
};

export const deleteAllCollectibleHandler = async (
  req: Request,
  res: Response
) => {
  const { owner_id } = req.params;
  try {
    await deleteAllCollectibles(owner_id);
    res.statusCode = 200;
    return res.json({ message: "All collectibles are deleted!" });
  } catch (e) {
    res.statusCode = 500;
    console.log(e);
    return;
  }
};

import prisma from "../constants/prismaInstance";
import { CreateCollectible } from "../schemas/collectible.schema";

export const getAllCollectibles = async (owner_id: string) => {
  const allCollectibles = await prisma.collectible.findMany({
    where: {
      owner_id,
    },
  });
  return allCollectibles;
};

export const createCollectible = async (
  data: CreateCollectible,
  owner_id: string
) => {
  await prisma.collectible.create({
    data: {
      title: data.title as string,
      description: data.description as string,
      worth: data.worth as number,
      owner_id,
    },
  });
};

export const getCollectible = async (id: string) => {
  const collectible = await prisma.collectible.findFirst({
    where: {
      id,
    },
  });

  return collectible;
};

export const updateCollectible = async (
  data: Partial<CreateCollectible>,
  id: string
) => {
  let { title, description, worth } = data;

  await prisma.collectible.update({
    where: {
      id,
    },
    data: {
      title: title as string,
      description: description as string,
      worth: worth as number,
    },
  });

  return;
};

export const deleteCollectible = async (id: string) => {
  try {
    const collectible = await prisma.collectible.delete({
      where: {
        id,
      },
    });
    return collectible;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const deleteAllCollectibles = async (owner_id: string) => {
  try {
    const collectible = await prisma.collectible.deleteMany({
      where: {
        owner_id,
      },
    });
    return collectible;
  } catch (e) {
    console.log(e);
  }
};

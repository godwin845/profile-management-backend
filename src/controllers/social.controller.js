import {
  getAllSocialsService,
  addSocialService,
  updateSocialService,
  deleteSocialService,
} from "../services/social.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

export const getAllSocials = async (req, res) => {
  try {
    const socials = await getAllSocialsService();

    res.status(HTTP_STATUS.OK).json(socials);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const addSocial = async (req, res) => {
  try {
    const social = await addSocialService(req.body);

    res.status(HTTP_STATUS.CREATED).json(social);
  } catch (error) {
    if (error.message === "Social and link are required") {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const updateSocial = async (req, res) => {
  try {
    const social = await updateSocialService(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json(social);
  } catch (error) {
    if (error.message === "Social link not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const deleteSocial = async (req, res) => {
  try {
    const result = await deleteSocialService(req.params.id);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    if (error.message === "Social link not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
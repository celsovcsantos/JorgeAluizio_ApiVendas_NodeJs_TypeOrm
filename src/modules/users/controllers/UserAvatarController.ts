import { Request, Response } from 'express';
import UpdateAvatarUserService from '../services/UpdateAvatarUserService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatarUserService();
    const user = await updateAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });
    return res.json(user);
  }
}

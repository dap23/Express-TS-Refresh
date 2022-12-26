import { NextFunction, Request, Response } from 'express';
import { deleteUserById, findAllUsers, updateUserById } from '../services/user.service';

export const getMeHandler = (_req: Request, res: Response, next: NextFunction) => {
 try {
  const user = res.locals.user;
  res.status(200).json({
   status: 'success',
   data: user
  });
 } catch (err: any) {
  next(err);
 }
};

export const getAllUsersHandler = async (_req: Request, res: Response, next: NextFunction) => {
 try {
  const users = await findAllUsers();
  res.status(200).json({
   status: 'success',
   result: users.length,
   data: users
  });
 } catch (err: any) {
  next(err);
 }
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
 const { id } = req.params;
 try {
  const user = await updateUserById(id, { ...req.body });
  res.status(200).json({
   status: 'success',
   data: user
  });
 } catch (err: any) {
  next(err);
 }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
 const { id } = req.params;
 try {
  await deleteUserById(id);
  res.status(200).json({
   status: 'success',
   data: []
  });
 } catch (err: any) {
  next(err);
 }
};

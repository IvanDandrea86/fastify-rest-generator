import { FastifyReply, FastifyRequest } from 'fastify';

import { IUserCreateRequest, IUserDeleteRequest, IUserUpdateRequest } from './user.interface';
import userService from './user.service';

const userCreate = async (request: FastifyRequest<IUserCreateRequest>, reply: FastifyReply) => {
  try {
    const params = request.body;
    await userService.create(params);
    return { message: 'user created' };
  } catch (error:unknown) {
    const details=error instanceof Error ?  error.message : JSON.stringify(error)
    reply.code(500).send({ error: 'Failed to create user', details });
  }
};

const userUpdate = async (request: FastifyRequest<IUserUpdateRequest>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const params = request.body;
    await userService.update(id, params);
    return { message: 'user updated' };
  } catch (error) {
    const details = error instanceof Error ?  error.message : JSON.stringify(error)

    reply.code(500).send({ error: 'Failed to update user', details });
  }
};

const userDelete = async (request: FastifyRequest<IUserDeleteRequest>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    await userService.remove(id);
    return { message: 'user deleted' };
  } catch (error) {
    const details = error instanceof Error ?  error.message : JSON.stringify(error)

    reply.code(500).send({ error: 'Failed to delete user', details });
  }
};

export default { userCreate, userUpdate, userDelete };

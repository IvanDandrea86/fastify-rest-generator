import fs from 'fs/promises';
import { Structure } from '../types';
import { getFilePath, getImport } from '../helper';

export const createController = async (name: string, structure: Structure) => {
  const filePath = await getFilePath(name, structure, 'controller');

  const content = `
  import { FastifyReply, FastifyRequest } from 'fastify';

  import { ICreateRequest, IDeleteRequest, IUpdateRequest } from '${getImport(
    structure,
    'interfaces'
  )}${name}.interface';
  import ${name}Service from '${getImport(
    structure,
    'service'
  )}${name}.service';

  const ${name}Create = async (
    request: FastifyRequest<ICreate>,
    reply: FastifyReply
  ) => {
    try {
      // Add logic for creation here
      const params = request.body;
      await ${name}Service.create(params);
      return { message: 'Campaign Create' };
    } catch (error) {
      reply.send(error);
    }
  };

  const ${name}Update = async (
    request: FastifyRequest<IUpdate>,
    reply: FastifyReply
  ) => {
    try {
      // Add logic for update here
      const { id } = request.params;
      const params = request.body;
      await ${name}Service.update(id, params);
      return { message: 'Campaign updated' };
    } catch (error) {
      reply.send(error);
    }
  };

  const ${name}Delete = async (
    request: FastifyRequest<IDelete>,
    reply: FastifyReply
  ) => {
    try {
      // Add logic for delete here
      const { id } = request.params;
      await ${name}Service.remove(id);
      return { message: 'Campaign deleted' };
    } catch (error) {
      reply.send(error);
    }
  };

export default { ${name}Create, ${name}Update, ${name}Delete };

    `;

  await fs.writeFile(filePath, content);
};

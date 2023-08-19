import { FastifyReply, FastifyRequest } from 'fastify';

import { IExportCreateRequest, IExportDeleteRequest, IExportUpdateRequest } from './export.interface';
import exportService from './export.service';

const exportCreate = async (request: FastifyRequest<IExportCreateRequest>, reply: FastifyReply) => {
  try {
    const params = request.body;
    await exportService.create(params);
    return { message: 'export created' };
  } catch (error:unknown) {
    const details=error instanceof Error ?  error.message : JSON.stringify(error)
    reply.code(500).send({ error: 'Failed to create export', details });
  }
};

const exportUpdate = async (request: FastifyRequest<IExportUpdateRequest>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const params = request.body;
    await exportService.update(id, params);
    return { message: 'export updated' };
  } catch (error) {
    const details = error instanceof Error ?  error.message : JSON.stringify(error)

    reply.code(500).send({ error: 'Failed to update export', details });
  }
};

const exportDelete = async (request: FastifyRequest<IExportDeleteRequest>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    await exportService.remove(id);
    return { message: 'export deleted' };
  } catch (error) {
    const details = error instanceof Error ?  error.message : JSON.stringify(error)

    reply.code(500).send({ error: 'Failed to delete export', details });
  }
};

export default { exportCreate, exportUpdate, exportDelete };

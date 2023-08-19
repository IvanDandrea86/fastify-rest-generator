
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

  import exportController from './export.controller';
  import {
    CreateExportSchema,
    UpdateExportSchema,
    DeleteExportSchema,
  } from './export.schema';
  
  const exportRoutePlugin: FastifyPluginAsyncTypebox = async (server) => {
    const path = '/export';
  
    // Create
    server.post(`${path}`, { schema: CreateExportSchema }, exportController.exportCreate);
  
    // Update
    server.put(
      `${path}:id`,
      {
        schema: UpdateExportSchema,
      },
      exportController.exportUpdate
    );
    //  Delete
    server.delete(
      `${path}:id`,
      {
        schema: DeleteExportSchema,
      },
      exportController.exportDelete
    );
  };
  
  export default exportRoutePlugin;

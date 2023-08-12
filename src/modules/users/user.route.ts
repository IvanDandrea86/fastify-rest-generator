
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

  import userController from './user.controller';
  import {
    createSchema,
    deleteSchema,
    updateSchema,
  } from './user.schema';
  
  const userRoutePlugin: FastifyPluginAsyncTypebox = async (server) => {
    const path = '/user';
  
    // Create
    server.post(`${path}`, { schema: createSchema }, userController.userCreate);
  
    // Update
    server.put(
      `${path}:id`,
      {
        schema: updateSchema,
      },
      userController.userUpdate
    );
    //  Delete
    server.delete(
      `${path}:id`,
      {
        schema: deleteSchema,
      },
      userController.userDelete
    );
  };
  
  export default userRoutePlugin;

import { Type } from '@sinclair/typebox';

   const UpdateExportSchema = {
    params: Type.Object({
      id: Type.String(),
    }),
    body: {},
    response: {
      200: Type.Object({
        message: Type.String(),
      }),
    },
  };
   const CreateExportSchema = {
    body: {},
    response: {
      200: Type.Object({
        message: Type.String(),
      }),
    },
  };
  
   const DeleteExportSchema = {
    params: Type.Object({
      id: Type.String(),
    }),
    body: {},
    response: {
      200: Type.Object({
        message: Type.String(),
      }),
    },
  };

  export {DeleteExportSchema, CreateExportSchema,UpdateExportSchema}


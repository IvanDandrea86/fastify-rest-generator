import {
  ExportCreateBody,
  ExportUpdateBody
} from './export.interface';

export default {
  /**
   * Create a new Export
   * @param body Data to create the Export
   */
  async create(body: ExportCreateBody) {
    try {
      //    LOGICS HERE

    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create  Export: ${error.message}`);
      } else {
        throw new Error('Failed to create  Export');
      }    }
  },

  /**
   * Update an existing Export by ID
   * @param id ID of the Export
   * @param body Updated data for the Export
   */
  async update(id: string, body: ExportUpdateBody) {
    try {
      //    LOGICS HERE

    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to update  Export: ${error.message}`);
      } else {
        throw new Error('Failed to update  Export');
      }    }
  },

  /**
   * Remove a Export by ID
   * @param id ID of the Export
   */
  async remove(id: string) {
    try {
      //    LOGICS HERE
    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete  Export: ${error.message}`);
      } else {
        throw new Error('Failed to delete  Export');
      }    }
  }
};
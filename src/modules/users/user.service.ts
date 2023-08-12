import {
  UserCreateBody,
  UserUpdateBody
} from './user.interface';

export default {
  /**
   * Create a new User
   * @param params Data to create the User
   */
  async create(params: UserCreateBody) {
    try {
      //    LOGICS HERE

    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create  User: ${error.message}`);
      } else {
        throw new Error('Failed to create  User');
      }    }
  },

  /**
   * Update an existing User by ID
   * @param id ID of the User
   * @param params Updated data for the User
   */
  async update(id: string, params: UserUpdateBody) {
    try {
      //    LOGICS HERE

    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to update  User: ${error.message}`);
      } else {
        throw new Error('Failed to update  User');
      }    }
  },

  /**
   * Remove a User by ID
   * @param id ID of the User
   */
  async remove(id: string) {
    try {
      //    LOGICS HERE
    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete  User: ${error.message}`);
      } else {
        throw new Error('Failed to delete  User');
      }    }
  }
};
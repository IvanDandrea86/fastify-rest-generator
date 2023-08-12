
import { RequestGenericInterface } from 'fastify';

// Interfaces for User requests

export interface IUserCreateRequest extends RequestGenericInterface {
    Body: UserCreateBody;
}

export interface IUserUpdateRequest extends RequestGenericInterface {
    Body: UserUpdateBody;
    Params: UserParams;
}

export interface IUserDeleteRequest extends RequestGenericInterface {
    Params: UserParams;
}

// Body and Params interfaces

export interface UserCreateBody {
    [key: string]: any; // This is a generic type. Modify as needed.
}

export interface UserUpdateBody {
    [key: string]: any; // This is a generic type. Modify as needed.
}

export interface UserParams {
    id: string;
}
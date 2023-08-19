
import { RequestGenericInterface } from 'fastify';

// Interfaces for Export requests

export interface IExportCreateRequest extends RequestGenericInterface {
    Body: ExportCreateBody;
}

export interface IExportUpdateRequest extends RequestGenericInterface {
    Body: ExportUpdateBody;
    Params: ExportParams;
}

export interface IExportDeleteRequest extends RequestGenericInterface {
    Params: ExportParams;
}

// Body and Params interfaces

export interface ExportCreateBody {
    [key: string]: any; // This is a generic type. Modify as needed.
}

export interface ExportUpdateBody {
    [key: string]: any; // This is a generic type. Modify as needed.
}

export interface ExportParams {
    id: string;
}
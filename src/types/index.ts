export type Structure = 'module' | 'role';

export type StructureMap = {
  [key in Structure]: string;
};

export type Folders =
  | 'controllers'
  | 'interfaces'
  | 'schemas'
  | 'routes'
  | 'services'
  | 'modules';

export type Role = 'controller' | 'interface' | 'schema' | 'route' | 'service';

export type Structure = "module" | "role";

export type StructureMap = {
  [key in Structure]: string;
};

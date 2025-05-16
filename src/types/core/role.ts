import { MongoObject } from "../mongo-object";

export interface IRole {
  permissions: string[];
  _id: number;
  name: string;
  name_kh: string;
  default_page: string | null;
}

export interface IRolePermission extends MongoObject {
  name: string;
  status?: number;
  code?: string;
  permissions: string[];
  default_role?: number;
  is_active?: boolean;
}

export interface IPermissionStructure {
  name: string;
  sections: ISubPermissionStructure[];
  check?: boolean;
  indeterminate?: boolean | null;
}

export interface ISubPermissionStructure {
  name: string;
  permissions: ISubPermissionStructureItem[];
}

export interface ISubPermissionStructureItem {
  name: string;
  name_en?: string;
  permission: string;
  check?: boolean;
  split?: true;
  default_check?: boolean;
  required_check?: boolean;
}

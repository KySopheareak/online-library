export default class EnumConstant {
    public static readonly ACTIVE = 1;
    public static readonly INACTIVE = -1;
    public static readonly PENDING = 5;
    public static readonly REJECTED = -4;
    public static readonly DELETE = -9;
}

export enum TableStatusEnum {
    ACTIVE = EnumConstant.ACTIVE,
    INACTIVE = EnumConstant.INACTIVE,
    PENDING = EnumConstant.PENDING,
}

export enum StatusEnum {
    ACTIVE = EnumConstant.ACTIVE,
    INACTIVE = EnumConstant.INACTIVE,
}

export enum SnackbarEnum {
    ADD = 'add',
    EDIT = 'edit',
    DELETE = 'delete',
    UPDATE = 'update',
}

export enum PasswordErrorTypeEnum {
    TEXT_CASE = 'textCase',
    MINLENGTH = 'minLength',
    SPACIAL_CHAR = 'specialChar',
    SPACE = 'space',
    NUMBER = 'number',
}

export enum PatientVisitEnum {
    NEW_VISIT = 1,
}

export enum KeyCacheEnum {
    PATIENT_BILLING = 'PATIENT_BILLING',
    PATIENT_BILLING_QUEUE = 'PATIENT_BILLING_QUEUE',
    PATIENT_IPD_NURSE = 'PATIENT_IPD_NURSE',
    CONSULTATION_PATIENT_VISIT = 'CONSULTATION_PATIENT_VISIT',
    PATIENT_RECORD_LIST = 'PATIENT_RECORD_LIST',
}

export const enumStatusLaboratory = {
    ACTIVE: 1,
    COMPLETED: 2,
    COLLECTED: 3,
    PARTIALLY: 4,
}

export enum RoleEnum {
  ALL = 'all',
  ADMIN = 'admin',
  VIEWER = 'viewer'
}

export enum RoleIdEnum {
  ADMIN = 1,
  VIEWER = 14
}

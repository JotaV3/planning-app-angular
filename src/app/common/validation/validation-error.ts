export interface ValidationError{
    timestamp: Date;
    status: number;
    error: string;
    path: string;
    invalidFields: InvalidField[];
}

export interface InvalidField{
    field: string;
    error: string;
}
export interface ValidationError{
    timestamp: Date;
    status: number;
    error: string;
    path: string;
    invalidFieldList: InvalidField[];
}

export interface InvalidField{
    name: string;
    error: string;
}
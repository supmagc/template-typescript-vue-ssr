export interface ProgramEntry {
    program: string;
    project: string;
    component: string;
    user: string;
    hours: number;
    issues: string[];
    epics: string[];
}

export interface UserEntry {
    name: string;
    aliasses: string[];
}

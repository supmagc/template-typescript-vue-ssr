export interface Worklog {
    ticket: string;
    hours: string;
    user: string;
    project: string;
    component: string;
    epic: string;
    file: string;
}

export type WorklogWithProgram = Worklog | { program: string };

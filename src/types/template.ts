export interface TemplateFilter {
    component?: string;
    epic?: string;
    ticket?: string;
    program: string;
}

export interface Template {
    name: string;
    default: string;
    filters: TemplateFilter[];
}

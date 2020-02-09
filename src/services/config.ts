import Fs from 'fs';
import Path from 'path';
import { User } from '../types/user';
import { Project } from '../types/project';
import { Program } from '../types/program';
import { Template } from '../types/template';

export class ConfigService {
    private readonly configPath: string;
    public readonly users: User[];
    public readonly projects: Project[];
    public readonly programs: Program[];
    public readonly templates: Template[];

    public constructor(configPath: string) {
        this.configPath = configPath;

        this.users = this.loadConfigFile<User[]>('users.json');
        this.projects = this.loadConfigFile<Project[]>('projects.json');
        this.programs = this.loadConfigFile<Program[]>('programs.json');

        this.templates = [];
        for (const file of Fs.readdirSync(Path.resolve(this.configPath, 'templates'))) {
            this.templates.push(this.loadConfigFile<Template>(`templates/${file}`));
        }
    }

    public getProject(code: string): Project | undefined {
        for (const project of this.projects) {
            if (project.code === code) {
                return project;
            }
        }
        return undefined;
    }

    public getTemplate(name: string): Template | undefined {
        for (const template of this.templates) {
            if (template.name === name) {
                return template;
            }
        }
        return undefined;
    }

    private loadConfigFile<T>(fileName: string): T {
        return (Fs.readFileSync(Path.resolve(this.configPath, fileName), { encoding: 'UTF-8' }) as any) as T;
    }
}

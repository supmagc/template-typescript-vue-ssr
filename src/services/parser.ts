import Path from 'path';
import Fs from 'fs';
import { Worklog, WorklogWithProgram } from '../types/worklog';
import { ConfigService } from './config';
import _ from 'lodash';

export class ParserService {
    private readonly worklogPath: string;
    private readonly databasePath: string;
    private readonly config: ConfigService;

    public constructor(worklogPath: string, databasePath: string, config: ConfigService) {
        this.worklogPath = worklogPath;
        this.databasePath = databasePath;
        this.config = config;
    }

    public readWorklogs(file: string): WorklogWithProgram[] {
        const path = Path.resolve(this.worklogPath, file);
        if (!Fs.existsSync(path)) {
            throw new Error('File not found: ' + file);
        }

        const output: WorklogWithProgram[] = [];
        const content = Fs.readFileSync(path, 'UTF-8');
        const lines = content.split('\n');
        for (const line of lines) {
            const parts = line.split(';');
            const ticket = parts[0];
            const hours = parts[2];
            const user = parts[4];
            const project = parts[18];
            const component = parts[13];
            const epic = parts[20];

            if (ticket != 'Issue Key') {
                const worklog: Worklog = { ticket, hours, user, project, component, epic, file };
                const worklogWithProgram = this.addProgram(worklog);

                if (worklogWithProgram) {
                    output.push(worklogWithProgram);
                }
            }
        }

        Fs.writeFileSync(Path.resolve(this.databasePath, file + '.json'), JSON.stringify(output), 'UTF-8');
        return output;
    }

    private addProgram(worklog: Worklog): WorklogWithProgram | undefined {
        const project = this.config.getProject(worklog.project);
        if (!project) return undefined;

        const template = this.config.getTemplate(project.template);
        if (!template) return undefined;

        for (const filter of template.filters) {
            if (filter.component && filter.component == worklog.component) {
                return _.merge({ program: filter.program }, worklog) as WorklogWithProgram;
            }
            if (filter.ticket && filter.ticket == worklog.ticket) {
                return _.merge({ program: filter.program }, worklog) as WorklogWithProgram;
            }
            if (filter.epic && filter.epic == worklog.epic) {
                return _.merge({ program: filter.program }, worklog) as WorklogWithProgram;
            }
        }

        return _.merge({ program: template.default }, worklog) as WorklogWithProgram;
    }
}

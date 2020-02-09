import { ParserService } from './services/parser';
import { ConfigService } from './services/config';
import Sqlite from 'sqlite';

const config = new ConfigService('./config');
const parser = new ParserService('./worklogs', './database', config);

const logs = parser.readWorklogs('2020-01.csv');
Sqlite.open('./database/worklogs.sqlite');

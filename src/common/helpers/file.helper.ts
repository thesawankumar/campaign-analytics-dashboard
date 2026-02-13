import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {

    static readJSON(filePath: string) {
        const fullPath = path.join(process.cwd(), filePath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        return JSON.parse(data);
    }

    static writeJSON(filePath: string, data: any) {
        const fullPath = path.join(process.cwd(), filePath);

        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    }
}

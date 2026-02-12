import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {
    static readJSON(fileName: string) {
        const filePath = path.join(process.cwd(), fileName);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    static writeJSON(fileName: string, data: any) {
        const outputDir = path.join(process.cwd(), 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
}

import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {
    static readJSON(filePath: string) {
        const fullPath = path.join(process.cwd(), filePath);
        return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    }

    static writeJSON(fileName: string, data: any) {
        const outputDir = path.join(process.cwd(), 'output');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const fullPath = path.join(outputDir, fileName);
        fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    }
}

import { readdirSync } from 'fs';
import { join } from 'path';

export interface WalkOptions {
  filter?: string;
}

export class FileUtils {
  static walk(dir: string, options?: WalkOptions): string[] {
    const direntList: string[] = [];
    FileUtils._walk(direntList, dir, options);
    return direntList;
  }

  private static _walk(direntList: string[], dir: string, options?: WalkOptions): string[] {
    readdirSync(dir, { withFileTypes: true }).forEach((d) => {
      if (d.isDirectory()) {
        FileUtils._walk(direntList, join(dir, d.name), options);
      } else {
        if (options?.filter) {
          if (d.name.includes(options.filter)) {
            direntList.push(join(dir, d.name));
          }
        } else {
          direntList.push(join(dir, d.name));
        }
      }
    });
    return direntList;
  }
}

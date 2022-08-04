import * as figlet from 'figlet';

import { BannerOptions } from '../logger.interface';

export class LoggerUtils {
  public banner(msg: string, options?: BannerOptions): string {
    const data = figlet.textSync(msg.toUpperCase(), {
      font: 'Doh',
      ...options?.figletOptions,
    });
    let printMSG = `\n\n${data}`;
    if (options?.preffix) {
      printMSG = options.preffix + printMSG;
    }
    if (options?.suffix) {
      printMSG = printMSG + options.suffix;
    }

    return printMSG;
  }
}

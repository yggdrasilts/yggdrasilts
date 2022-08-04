//const { FileUtils } = require('../../dist/packages/yggdrasilts/volundr/src');
import { readFileSync, writeFileSync } from 'fs';

import chalk from 'chalk';
import { readCachedProjectGraph } from '@nrwl/devkit';
import readline from 'readline';
import semver from 'semver';

function invariant(condition, message) {
  if (!condition) {
    console.error(chalk.bold.red(message));
    process.exit(1);
  }
}

const [, , name, version] = process.argv;

// A simple SemVer validation to validate the version
const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
invariant(
  version && validVersion.test(version),
  `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`
);

const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(
  project,
  `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`
);

const rootPath = project.data?.root;
invariant(
  rootPath,
  `Could not find "build.options.rootPath" of project "${name}". Is project.json configured  correctly?`
);

process.chdir(rootPath);

try {
  console.log(`Reading package.json...`);
  const json = JSON.parse(
    readFileSync(`package.json`, {
      encoding: 'utf-8',
    }).toString()
  );
  let updatePkg = semver.gt(version, json.version);
  if (updatePkg) {
    json.version = version;
    console.log('Update version', json);
    writeFileSync(`package.json`, JSON.stringify(json, null, 2), {
      encoding: 'utf-8',
    });
  } else {
    console.warn(
      chalk.bold.yellow(`Version of package.json is greater than version.`)
    );
  }
} catch (e) {
  console.error(
    chalk.bold.red(
      `Error reading package.json file from library build output.`
    ),
    e
  );
}

/*FileUtils.walk('packages/yggdrasilts/nestjs', {
  filter: 'package.json',
}).forEach(async (d) => {
  // Updating the version in "package.json" before publishing
  try {
    console.log(`Reading ${d}...`);
    const json = JSON.parse(
      readFileSync(d, {
        encoding: 'utf-8',
      }).toString()
    );
    let updatePkg = semver.gt(version, json.version);
    //if (!updatePkg) {
    //  const rl = readline.createInterface({
    //    input: process.stdin,
    //    output: process.stdout,
    //  });
    //  console.warn(
    //    chalk.bold.yellow(`Version of ${d} is greater than version.`)
    //  );
    //  updatePkg = await new Promise((resolve) => {
    //    rl.question('Do you want to update it? Yes(y) / No(n)', (answer) => {
    //      if (answer && answer.toLowerCase().includes('yes', 'y')) {
    //        resolve(true);
    //      }
    //      rl.close();
    //      resolve(false);
    //    });
    //  });
    //}
    if (updatePkg) {
      json.version = version;
      console.log('Update version', json);
      writeFileSync(d, JSON.stringify(json, null, 2), {
        encoding: 'utf-8',
      });
    } else {
      console.warn(
        chalk.bold.yellow(`Version of ${d} is greater than version.`)
      );
    }
  } catch (e) {
    console.error(
      chalk.bold.red(`Error reading ${d} file from library build output.`),
      e
    );
  }
});*/

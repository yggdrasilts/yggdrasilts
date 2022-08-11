import { readFileSync, writeFileSync } from 'fs';

import chalk from 'chalk';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { readCachedProjectGraph } from '@nrwl/devkit';
import semver from 'semver';

const graph = readCachedProjectGraph();
const packages = [];
//console.log(graph.nodes);
for (const key in graph.nodes) {
  packages.push({ name: graph.nodes[key].name, root: graph.nodes[key].data.root });
}

const rootPath = process.cwd();

let answers = {};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'package',
      message: 'Select package:',
      choices: packages.map((p) => p.name),
    },
    {
      type: 'list',
      name: 'releaseType',
      message: 'Choose the increment version:',
      choices: ['major', 'minor', 'patch'],
    },
  ])
  .then((firstAnswers) => {
    answers = { ...firstAnswers };
    console.log(JSON.stringify(firstAnswers, null, 2));
    process.chdir(packages.find((p) => p.name === firstAnswers.package).root);
    try {
      console.log(`Reading package.json for package ${firstAnswers.package}...`);
      const json = JSON.parse(
        readFileSync(`package.json`, {
          encoding: 'utf-8',
        }).toString(),
      );
      const newVersion = semver.inc(json.version, answers.releaseType);
      inquirer
        .prompt({
          type: 'confirm',
          name: 'confirm',
          message: `You are going to change ${answers.package} version: ${json.version} => ${newVersion}. Are you sure?`,
        })
        .then((secondAnswers) => {
          answers = { ...answers, ...secondAnswers };
          const oldVersion = json.version;
          if (answers.confirm) {
            json.version = newVersion;
            writeFileSync(`package.json`, JSON.stringify(json, null, 2), {
              encoding: 'utf-8',
            });
            console.log(chalk.bold.greenBright(`${answers.package} package version has been update ${oldVersion} => ${newVersion}`));
            inquirer
              .prompt({
                type: 'confirm',
                name: 'publish',
                message: `Do you want to publish package ${answers.package}@${newVersion}?`,
              })
              .then((thirdAnswers) => {
                answers = { ...answers, ...thirdAnswers };
                if (answers.publish) {
                  inquirer
                    .prompt({
                      type: 'input',
                      name: 'otp',
                      message: 'Put the otp number:',
                    })
                    .then((fourthAnswers) => {
                      answers = { ...answers, ...fourthAnswers };
                      const publishCmd = `nx publish ${answers.package} --ver=${newVersion} --otp=${answers.otp}`;
                      console.log('publishCmd', publishCmd);
                      process.chdir(rootPath);
                      execSync(publishCmd, { stdio: 'inherit' });
                    });
                }
              });
          }
        });
    } catch (e) {
      console.error(chalk.bold.red(`Error reading package.json file from library build output.`), e);
    }
  });

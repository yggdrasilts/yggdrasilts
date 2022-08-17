export interface YggdrasiltsNestAppGeneratorSchema {
  name: string;
  directory?: string;
  frontendProject?: string;
  linter?: Exclude<Linter, Linter.TsLint>;
  skipFormat?: boolean;
  skipPackageJson?: boolean;
  standaloneConfig?: boolean;
  tags?: string;
  unitTestRunner?: UnitTestRunner;
  setParserOptionsProject?: boolean;
}

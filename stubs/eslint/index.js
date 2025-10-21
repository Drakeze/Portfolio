'use strict';

class ESLint {
  constructor(options = {}) {
    this.options = options;
  }

  async calculateConfigForFile() {
    return {
      plugins: ['@next/next'],
      rules: this.options?.baseConfig?.rules ?? {}
    };
  }

  async lintFiles() {
    return [];
  }

  async loadFormatter() {
    return {
      format() {
        return '';
      }
    };
  }

  static async outputFixes() {
    return;
  }

  static getErrorResults(results = []) {
    return Array.isArray(results) ? results.filter((file) => (file?.errorCount ?? 0) > 0) : [];
  }
}

ESLint.version = '8.57.0';

const CLIEngine = { version: ESLint.version };

module.exports = {
  ESLint,
  CLIEngine,
  Linter: class Linter {},
  RuleTester: class RuleTester {}
};

import { resolve } from "path";
import { runTests } from "vscode-test";
import globby from "globby";

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main(): Promise<void> {
  try {
    const extensionDevelopmentPath = resolve(__dirname, "..", "..");
    const testPkgFolder = resolve(
      extensionDevelopmentPath,
      "lib",
      "test",
      "suite"
    );

    const scenarioPaths = await globby(`${testPkgFolder}/**/index.js`);
    // Use for of + await to ensure running in sequence because vscode-test library cannot start multiple vscode instances at the same time
    for (const path of scenarioPaths) {
      await runTests({
        extensionDevelopmentPath,
        extensionTestsPath: path,
      });
      await sleep(5000);
    }
  } catch (err) {
    console.error("Failed to run tests: ", err);
    process.exit(1);
  }
}

main();

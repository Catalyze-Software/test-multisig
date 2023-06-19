import { exec, execSync } from "child_process";

export async function reset(): Promise<string> {
  return await new Promise((resolve, reject) => {
    exec(`bash scripts/reset.sh`, (error, stdout, stderr) => {
      if (stderr) {
        return resolve(`${stderr}`);
      }
      return reject(`${error} ${stdout}`);
    });
  });
}

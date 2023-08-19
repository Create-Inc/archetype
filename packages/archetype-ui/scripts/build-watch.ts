import { type ChildProcess, spawn } from "node:child_process";

import chokidar from "chokidar";

const processes: ChildProcess[] = [];
function killProcesses() {
  processes.forEach((process) => process.kill());
}

let watcher: chokidar.FSWatcher;

function exit() {
  killProcesses();
  if (watcher) watcher.close();
}

function error(type: "css" | "ts", data: string) {
  // error header with red background and bold text
  console.log("\x1b[41m\x1b[1m%s\x1b[0m", ` ${type.toUpperCase()} ERROR `);

  console.log();
  console.error(data);
}

function startTscWatch() {
  const tsc = spawn("tsc", ["-w"], { stdio: "pipe" });
  processes.push(tsc);

  tsc.stdout.on("data", (data) => {
    // remove control characters that clear the screen
    const sanitizedData: string = data.toString().replaceAll("\x1Bc", "");
    if (sanitizedData.includes("error TS")) error("ts", sanitizedData);
    else console.log(sanitizedData);
  });
}

function startPostCssWatch() {
  watcher = chokidar.watch("src/**/*.css").on("all", (event, path) => {
    if (["add", "change"].includes(event)) {
      console.log(`\nCompiling CSS: ${path}`);
      const postcss = spawn("postcss", ["--base", "src", path, "-d", "dist"], {
        stdio: "pipe",
      });
      processes.push(postcss);
      let wasError = false;
      postcss.stderr.on("data", (data) => {
        wasError = true;
        console.log(); // space
        error("css", data.toString());
      });
      postcss.on("exit", () => {
        if (!wasError) console.log(`\n${path} compiled successfully\n`);
      });
    }
  });
}

function startWatch() {
  startTscWatch();
  startPostCssWatch();
}

startWatch();

process.on("uncaughtException", exit);
process.on("SIGINT", exit);
process.on("SIGTERM", exit);

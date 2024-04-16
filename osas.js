const { execSync } = require("child_process");

function findAvailablePort(startPort) {
  let port = startPort;
  while (port <= 65535) {
    try {
      execSync(`nc -z localhost ${port}`);
      port++;
    } catch (error) {
      return port;
    }
  }
  throw new Error("No available port found");
}

const currentPort = 43149; // You can change this to your desired starting port
const newPort = findAvailablePort(currentPort);

console.log(`Starting development server on port ${newPort}`);

execSync(`npm run dev -- -p ${newPort}`, { stdio: "inherit" });

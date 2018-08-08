const axios = require("axios");
const spawn = require("child_process").spawn;
const fs = require("fs");

// global:
let address;

async function relax(ms) {
  return new Promise(res => setInterval(res, ms));
}

function logFileContent(path) {
  const content = fs.readFileSync(path, {
    encoding: "utf8"
  });
  console.log(">>", path, content);
}

function startMultichainDaemon() {
  const prog = "multichaind";
  const args = process.argv.slice(2);
  console.log(`>>> Connecting to ${args[args.length - 1]}`);
  console.log(`>>> args=${args.map(x => x.startsWith("-rpcpassword=") ? "-rpcpassword=..." : x)}`);

  const serverConfigPath = "/root/.multichain/multichain.conf";
  logFileContent(serverConfigPath);

  const chainPath = `/root/.multichain/${process.env.CHAINNAME}`;
  const chainConfigPath = `${chainPath}/multichain.conf`;
  if (fs.existsSync(chainConfigPath)) {
    logFileContent(chainConfigPath);
  } else {
    console.log(`Warning: chain config not found at ${chainConfigPath}, restoring from ${serverConfigPath}. Is the master node reachable from this node?`);
    if (!fs.existsSync(chainPath)) {
      fs.mkdirSync(chainPath);
    }
    fs.copyFileSync(serverConfigPath, chainConfigPath);
  }

  const mc = spawn(prog, args);

  mc.stdout.on('data', (data) => {
    console.log(`${prog}  | ${data.toString()}`);
    const regex = new RegExp('[0-9a-zA-Z]{30,40}');
    const match = regex.exec(data);
    if (match) address = match[0];
  })

  mc.on('close', async (code) => {
    if (code === 0) {
      console.log('>>> Connect: Success!');
    } else if (code === 1) {
      const retryIntervalMs = 10000;
      console.log(`>>> Connect: Failed to connect to Master. Retry in ${retryIntervalMs / 1000} Seconds...`);
      await relax(retryIntervalMs);
      startMultichainDaemon();
    } else {
      console.log(`>>> multichaind died with exit code ${code}. Abort.`);
      process.exit(code);
    }
  });
}

function askMasterForPermissions(address, organization) {
  const protocol = process.env.API_PROTO;
  const host = process.env.API_HOST;
  const port = process.env.API_PORT;
  const url = `${protocol}://${host}:${port}/api/network.registerNode`;
  console.log(`>>> Registration URL: ${url}`)
  return axios.post(url, {
    apiVersion: "1.0",
    data: {
      address,
      organization,
    }
  });
}

async function registerNodeAtMaster() {
  const retryIntervalMs = 10000;
  try {
    while (!address) await relax(5000);
    const organization = process.env.ORGANIZATION;
    console.log(`>>> Registering ${organization} node address ${address}`);
    await askMasterForPermissions(address, organization)
    console.log('>>> Node address registered successfully (approval pending).');
  } catch (error) {
    console.log(`>>> Could not register (${error}). Retry in ${retryIntervalMs / 1000} seconds ...`);
    await relax(retryIntervalMs);
    await registerNodeAtMaster();
  }
}

startMultichainDaemon();
setTimeout(registerNodeAtMaster, 5000);

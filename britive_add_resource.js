require('dotenv').config(); // Load environment variables from .env
const axios = require('axios');

// Britive API configuration
const BRITIVE_API_BASE_URL = process.env.BRITIVE_API_BASE_URL; // e.g., https://se-learn.britive.com
const BRITIVE_API_TOKEN = process.env.BRITIVE_API_TOKEN;       // Your Bearer token

// Generic function to add a resource
async function addResource(resource) {
  try {
    const response = await axios.post(
      `${BRITIVE_API_BASE_URL}/api/resources`, // Adjust if your actual endpoint differs
      resource,
      {
        headers: {
          Authorization: `Bearer ${BRITIVE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`✅ Resource '${resource.name}' added successfully.`);
    console.log(response.data);
  } catch (error) {
    console.error(`❌ Failed to add resource '${resource.name}':`, error.response?.data || error.message);
  }
}

// Example usage
const windowsResource = {
  name: 'WindowsServer01',
  type: 'Windows',
  hostname: 'winserver01.corp.local',
  description: 'Domain-joined Windows admin server',
};

const linuxResource = {
  name: 'LinuxSrv01',
  type: 'Linux',
  hostname: 'linuxsrv01.corp.local',
  description: 'Production Ubuntu server',
};

(async () => {
  await addResource(windowsResource);
  await addResource(linuxResource);
})();

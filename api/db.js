const { createClient } = require('@libsql/client');

const TURSO_URL = process.env.TURSO_DATABASE_URL || 'libsql://rushanth-rushanth.aws-ap-south-1.turso.io';
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODk4OTkzMjcsImlkIjoiMDFhMGJlNDctMWMwMS03NzY2LThmOWItZjYwN2YxODA3NGEzIiwia2lkIjoiRHNtR3R3NEFOel94SGQtSDdTb1poR0NrZnF4UHUwdkV6Z2l1cm5sRWFvcyIsInJpZCI6ImFlMDFkZTM5LTBjYTItNDBiMS1hOTUwLTUzNjdmYWUwNTgzNCJ9.bw55-TwOD2iWHfD8e02w6vAhWGpchFMe-45PMhFne0hqF6NA5HRygKbBbhTUzxlDpk2WqgqfWtRpFtNGv0JHBQ';

let clientInstance = null;

function getDb() {
  if (!clientInstance) {
    clientInstance = createClient({
      url: TURSO_URL,
      authToken: TURSO_AUTH_TOKEN
    });
  }
  return clientInstance;
}

module.exports = { getDb };

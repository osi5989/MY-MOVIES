// src/logger.js
let logs = [];

export function log(message) {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, message };
  logs.push(entry);
  console.info(`[LOG] ${timestamp}: ${message}`);
}

// מחזיר את כל הלוגים
export function getLogs() {
  return logs;
}

// ייצוא ללוגים כ־JSON
export function downloadLogsJSON(filename = "logs.json") {
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ייצוא ללוגים כ־TXT
export function downloadLogsTXT(filename = "logs.txt") {
  const text = logs.map(entry => `[${entry.timestamp}] ${entry.message}`).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

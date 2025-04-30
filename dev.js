
const { spawn } = require('child_process');
const path = require('path');

// Start the frontend
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start the backend
const backend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: path.join(__dirname, 'server'),
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  frontend.kill('SIGINT');
  backend.kill('SIGINT');
  process.exit(0);
});

frontend.on('close', code => {
  console.log(`Frontend process exited with code ${code}`);
  backend.kill();
  process.exit(code);
});

backend.on('close', code => {
  console.log(`Backend process exited with code ${code}`);
  frontend.kill();
  process.exit(code);
});

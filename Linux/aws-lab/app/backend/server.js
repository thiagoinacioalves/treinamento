const http = require('http');
const os = require('os');
const { execFile } = require('child_process');

const port = Number(process.env.PORT || 3000);
const instance = process.env.INSTANCE_NAME || os.hostname();

function queryItems(callback) {
  const args = [
    '-h', process.env.DB_HOST || '127.0.0.1',
    '-U', process.env.DB_USER || 'training_app',
    '-d', process.env.DB_NAME || 'training',
    '-At', '-F', '\t',
    '-c', 'SELECT id, name FROM items ORDER BY id'
  ];
  const env = { ...process.env, PGPASSWORD: process.env.DB_PASSWORD || '' };
  execFile('/usr/bin/psql', args, { env, timeout: 4000 }, (error, stdout, stderr) => {
    if (error) return callback(new Error(stderr.trim() || error.message));
    const items = stdout.trim() ? stdout.trim().split('\n').map(line => {
      const [id, name] = line.split('\t');
      return { id: Number(id), name };
    }) : [];
    callback(null, items);
  });
}

const server = http.createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    return response.end(JSON.stringify({ status: 'ok', service: 'training-api' }));
  }

  if (request.url === '/api/items') {
    return queryItems((error, items) => {
      if (error) {
        response.writeHead(500, { 'content-type': 'application/json; charset=utf-8' });
        return response.end(JSON.stringify({ error: 'Não foi possível consultar o banco', detail: error.message }));
      }
      response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ instance, items }));
    });
  }

  response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`training-api ouvindo em 127.0.0.1:${port}`);
});

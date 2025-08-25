// const cluster = require('node:cluster');

// for (const worker of Object.values(cluster.workers)) {
//   worker.send('big announcement to all workers');
  
// }
// console.log(cluster);

// const cluster = require('cluster');
// const http = require('http');
// const os = require('os');

// const numCPUs = os.cpus().length; // Obtém o número de núcleos de CPU

// if (cluster.isMaster) {
//   // Criando um worker para cada núcleo de CPU
//   console.log(`Master ${process.pid} is running`);

//   // Criando um processo filho para cada CPU
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork(); // Cria um novo worker
//   }

//   // Escutando eventos de erro ou morte dos workers
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
//   // Worker process
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end(`Hello from worker ${process.pid}`);
//   }).listen(8000);

//   console.log(`Worker ${process.pid} started`);
// }


const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
  // Processo mestre envia mensagem para os workers
  cluster.fork();

  cluster.on('message', (worker, message, handle) => {
    console.log(`Master received message from worker ${worker.process.pid}: ${message}`);
  });

} else {
  // Processo filho recebe mensagem do mestre
  process.send('Hello from worker');

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}

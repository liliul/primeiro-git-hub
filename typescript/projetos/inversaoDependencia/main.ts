import { randomUUID } from "node:crypto";
import { writeFile, readFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const terminal = createInterface({
    input: stdin,
    output: stdout
});

type Pedido = {
    id: string;
    item: string;
    quantidade: number;
}

interface RepositorioPedidos {
    salvar(pedido: Pedido): Promise<void>;
    buscar(id: string): Promise<Pedido | null>;
    buscarTodos(): Promise<Pedido[]>;
}

interface ServicoPedidos {
    create(pedido: Pedido): Promise<void>;
    buscarPedido(id: string): Promise<Pedido | null>;
    buscarTodosPedidos(): Promise<Pedido[]>;
}

interface Terminal {
    question(pergunta: string): Promise<string>;
    close(): void;
}

class JsonPedidosRepository implements RepositorioPedidos {
    async salvar(pedido: Pedido): Promise<void> {
        console.log('Salvando pedido no banco de dados...');
        let pedidos: Pedido[];

        try {
            const data = await readFile('./database/dbpedidos.json', 'utf-8');
            pedidos = JSON.parse(data);
        } catch (error) {
            if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
                pedidos = [];
            } else {
                throw error;
            }
        }

        pedidos.push(pedido);
        await writeFile('./database/dbpedidos.json', JSON.stringify(pedidos, null, 2));
    }

    async buscar(id: string): Promise<Pedido | null> {
        const data = await readFile('./database/dbpedidos.json', 'utf-8');

        return JSON.parse(data).find((p: {id: string}) => p.id === id) || null;
    }

    async buscarTodos(): Promise<Pedido[]> {
        const data = await readFile('./database/dbpedidos.json', 'utf-8');

        return JSON.parse(data);
    }
}

class PedidosService implements ServicoPedidos {
    constructor(private repositorio: RepositorioPedidos) {
    }

    async create(pedido: Pedido): Promise<void> {
        await this.repositorio.salvar(pedido);
    }

    async buscarPedido(id: string): Promise<Pedido | null> {
        return this.repositorio.buscar(id);
    }

    async buscarTodosPedidos(): Promise<Pedido[]> {
        return this.repositorio.buscarTodos();
    }
}

class PedidosController {
    constructor(
        private service: ServicoPedidos,
        private terminal: Terminal
    ) {
    }

    async criarPedido() {
        const item = await this.terminal.question('Digite o nome do item: ');
        const quantidade = await this.terminal.question('Digite a quantidade: ');

        const pedido: Pedido = {
            id: randomUUID(),
            item,
            quantidade: parseInt(quantidade)
        };

        await this.service.create(pedido);
        console.log('Pedido criado com sucesso!');
        this.terminal.close();
    }

    async buscarPedido() {
        const id = await this.terminal.question('Digite o ID do pedido: ');
        const pedido = await this.service.buscarPedido(id);

        if (pedido) {
            console.log('Pedido encontrado:', pedido);
        } else {
            console.log('Pedido não encontrado.');
        }
        this.terminal.close();
    }

    async listarPedidos() {
        const pedidos = await this.service.buscarTodosPedidos();
        console.log('Todos os pedidos:', pedidos);
        this.terminal.close();
    }
}

async function main() {
    const repositorio = new JsonPedidosRepository();
    const service = new PedidosService(repositorio);
    const controller = new PedidosController(service, terminal);
    // const uuid = randomUUID();
    
    // await service.create({ id: uuid, item: 'Produto A', quantidade: 2 });
    // await service.create({ id: randomUUID(), item: 'Produto B', quantidade: 5 });
    
    // await controller.criarPedido();
    // await controller.buscarPedido();
    await controller.listarPedidos();
    
    // console.log('Buscando: ', await service.buscarTodosPedidos());
}
await main();
// for (let i = 0; i < 5; i++) {
//     await main();
// }
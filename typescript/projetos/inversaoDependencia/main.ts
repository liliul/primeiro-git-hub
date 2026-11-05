import { randomUUID } from "node:crypto";
import { writeFile, readFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { connect, disconnect, model, Schema } from "mongoose";

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

const pedidoSchema = new Schema<Pedido>({
    id: { type: String, required: true, unique: true, immutable: true },
    item: { type: String, required: true, trim: true },
    quantidade: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: 'A quantidade deve ser um número inteiro.'
        }
    }
}, { versionKey: false });

const PedidoModel = model<Pedido>("Pedido", pedidoSchema, "pedidos");

class MongoDbPedidosRepository implements RepositorioPedidos {
    async salvar(pedido: Pedido): Promise<void> {
        await PedidoModel.create(pedido);
    }

    async buscar(id: string): Promise<Pedido | null> {
        return PedidoModel.findOne({ id })
            .select({ _id: 0 })
            .lean<Pedido>()
            .exec();
    }

    async buscarTodos(): Promise<Pedido[]> {
        return PedidoModel.find()
            .select({ _id: 0 })
            .lean<Pedido[]>()
            .exec();
    }
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
    }

    async buscarPedido() {
        const id = await this.terminal.question('Digite o ID do pedido: ');
        const pedido = await this.service.buscarPedido(id);

        if (pedido) {
            console.log('Pedido encontrado:', pedido);
        } else {
            console.log('Pedido não encontrado.');
        }
    }

    async listarPedidos() {
        const pedidos = await this.service.buscarTodosPedidos();
        console.log('Todos os pedidos:', pedidos);
    }
}

async function main() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('Defina a variável de ambiente MONGODB_URI para conectar ao MongoDB.');
        }

        await connect(mongoUri);
        const repositorio = new MongoDbPedidosRepository();
        const service = new PedidosService(repositorio);
        const controller = new PedidosController(service, terminal);

        // await controller.criarPedido();
        await controller.listarPedidos();
    } finally {
        await disconnect();
        terminal.close();
    }
}
await main();
// for (let i = 0; i < 5; i++) {
//     await main();
// }
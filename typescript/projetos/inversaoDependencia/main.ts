import { randomUUID } from "node:crypto";
import { writeFile, readFile } from "node:fs/promises";

interface repositorioPedidos {
    salvar(pedido: any): void;
    buscar(id: string): any | null;
}

const dbpedidos: any[] = [];

class pedidosService {
    constructor(private repositorio: repositorioPedidos) {
    }

    create(pedido: any): void {
        this.repositorio.salvar(pedido);
    }

    buscarPedido(id: string): any | null {
        return this.repositorio.buscar(id);
    }
}

class pedidosRepository implements repositorioPedidos {
    async salvar(pedido: any): Promise<void> {
        console.log('Salvando pedido no banco de dados...', pedido);
       await writeFile('./database/dbpedidos.json', JSON.stringify([...dbpedidos, pedido], null, 2));
    }

     async buscar(id: string): Promise<any | null> {
        const data = await readFile('./database/dbpedidos.json', 'utf-8');

        return JSON.parse(data).find(p => p.id === id) || null;
    }
}

function main() {
    const repositorio = new pedidosRepository();
    const service = new pedidosService(repositorio);
    const uuid = randomUUID();
    
    service.create({ id: uuid, item: 'Produto A', quantidade: 2 });
    service.create({ id: uuid, item: 'Produto B', quantidade: 5 });
    
    console.log(service.buscarPedido('690e9c69-1c7c-4dc8-821e-23461f34b7a2'));
    console.log(dbpedidos);
}

main();
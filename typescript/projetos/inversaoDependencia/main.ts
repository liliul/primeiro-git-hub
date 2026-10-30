interface repositorioPedidos {
    salvar(pedido: any): void;
    buscar(id: number): any | null;
}

const dbpedidos: any[] = [];

class pedidosService {
    constructor(private repositorio: repositorioPedidos) {
    }

    create(pedido: any): void {
        this.repositorio.salvar(pedido);
    }

    buscarPedido(id: number): any | null {
        return this.repositorio.buscar(id);
    }
}

class pedidosRepository implements repositorioPedidos {
    salvar(pedido: any): void {
        console.log('Salvando pedido no banco de dados...');
        dbpedidos.push(pedido);
    }

    buscar(id: number): any | null {
        return dbpedidos.find(p => p.id === id) || null;
    }
}

const repositorio = new pedidosRepository();
const service = new pedidosService(repositorio);

service.create({ id: 1, item: 'Produto A', quantidade: 2 });
console.log(service.buscarPedido(1));
const t4 = require('./index.js');

describe('deletarProduto', () => {
    test('deletarProduto', () => {
        t4.adicionarProduto({ produto: 'Batata' });
        expect(t4.lerProdutos().length).toBe(1);
        t4.deletarProduto(0);
        expect(t4.lerProdutos().length).toBe(0);
    });
})

describe ('adicionarProduto', () => {
    test('Adicionar produto com erro', () => {
    expect(() => t4.adicionarProduto(null)).toThrow();
    });
})

describe ('lerProdutos', () => {
    test('Ler produtos', () => {
    expect(t4.lerProdutos().length).toBe(0);
    t4.adicionarProduto({ produto: 'test' });
    expect(t4.lerProdutos().length).toBe(1);
    });
});

describe ('lerProduto por id', () => {
    test('Ler produtos por id', () => {
    t4.adicionarProduto({ produto: 'Batata' });
    expect(t4.lerProduto(1)).toEqual({ produto: 'Batata' });
    });
});

describe ('atualizarProduto', () => {
    test('atualizarProduto', () => {
    t4.adicionarProduto({ produto: 'Batata' });
    t4.atualizarProduto(1, { produto: 'coca-cola' });
    expect(t4.lerProduto(1)).toEqual({ produto: 'coca-cola' });
    });
})


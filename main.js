var router = new VueRouter();
var mainComponent = Vue.extend({
    components: {
        'bill-pay-component': billPayComponent
    },
    template: '<bill-pay.component></bill-pay.component>',
    data: function(){
        return {
            contas: [
                {data_vcto: '20/08/2016', descricao: 'Conta de luz', valor: 151.23, situacao: true},
                {data_vcto: '21/08/2016', descricao: 'Conta de água', valor: 82.10, situacao: false},
                {data_vcto: '22/08/2016', descricao: 'Conta de telefone', valor: 45.10, situacao: false},
                {data_vcto: '23/08/2016', descricao: 'Supermercado', valor: 102.89, situacao: false},
                {data_vcto: '24/08/2016', descricao: 'Cartão de Crédito', valor: 1500.99, situacao: false},
                {data_vcto: '25/08/2016', descricao: 'Empréstimo', valor: 300.00, situacao: false},
                {data_vcto: '26/08/2016', descricao: 'Gasolina', valor: 55.30, situacao: false}
            ]
        };
    }
})

router.map({
    '/bills': {
        name: 'bill.list',
        component: listacontasComponent
    },
    'bill/create': {
        name: 'bill.create',
        component: criarcontasComponent
    },
    'bill/:index/update': {
        name: 'bill.update',
        component: criarcontasComponent
    },
    '*': {
        component: listacontasComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bills'
});
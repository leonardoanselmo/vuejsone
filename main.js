var router = new VueRouter();
var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function(){
        return {
            billsPay: [
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
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
        }
    },
    'bill-receives': {
        name: 'bill-receive',
        component: billReceiveComponent
    },
    '*': {
        component: billPayListComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bill-pays'
});

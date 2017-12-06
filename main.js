var router = new VueRouter();

router.map({
    '/bills': {
        name: 'bill.list',
        component: listacontasComponent
    },
    'bill/create': {
        name: 'bill.create',
        component: criarcontasComponent
    },
    '*': {
        component: listacontasComponent
    }
});

router.start({
    components: {
        'app-component': appComponent
    }
}, '#app');

router.redirect({
    '*': '/bills'
});
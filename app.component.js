window.appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'lista-contas-component': listacontasComponent,
        'criar-contas-component': criarcontasComponent
    },
    template: `
    <style type="text/css">        
        .red {
            color: red;
        }
        .green {
            color: green;
        }
        .gray {
            color: gray;
        }
        .minha-classe {
            background-color: beige;
        }
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
        {{ status | statusGeneral }}
    </h3>
    <menu-component></menu-component>
    <router-view></router-view>   
    <!-- 
    <div v-show="activedView == 0">
        <lista-contas-component v-ref:bill-list-component></lista-contas-component>        
    </div>
    <div v-show="activedView == 1">
        <criar-contas-component v-bind:campos-conta.sync="camposConta"></criar-contas-component>        
    </div>
    -->
    `,
    data: function(){
        return {
            title: "Contas a pagar",
            activedView: 0
        };
    },
    computed: {
        status: function () {
            var billListComponent = this.$refs.billListComponent
            if(!billListComponent.contas.length){
                return false;
            }
            var count = 0;
            for (var i in billListComponent.contas) {
                if (!billListComponent.contas[i].situacao) {
                    count++;
                }
            }
            return count;
        }
    },
    methods: {},
    events: {
        'change-activedview': function(activedView){
            this.activedView = activedView;
        },
        'change-formtype': function(formType){
            this.$broadcast('change-formtype', formType);
        },
        'change-bill': function(bill){
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function(bill){
            this.$broadcast('new-bill', bill);
        }
    }
});

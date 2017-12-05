Vue.filter('situacaoLabel', function(situacao){
    if(situacao == 0){
        return "Não paga";
    } else {
        return "Paga";
    }
});
Vue.filter('statusGeneral', function(value) {
    if(value === false){
        return "Nenhuma conta cadastrada";
    }

    if(!value){
        return "Nenhuma conta a pagar";
    } else {
        return "Existem "+value+" contas a serem pagas.";
    }
});
var menuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="item in menu">
                <a href="#" @click.prevent="showView(item.id)">{{ item.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data: function() {
        return {
            menu: [
                {id: 0, name: "Listar contas"},
                {id: 1, name: "Criar conta"}
            ],
        };
    },
    methods: {
        showView: function(id) {
            this.$dispatch('change-activedview', id);
            if(id == 1){
                this.$dispatch('change-formtype', 'insert');
            }
        },
    }
});


var listacontasComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago {
            color: green;
        }
        .nao-pago {
            color: red;
        }    
    </style>
    <table border="1" cellpadding="10">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Situação</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(index, conta) in contas">
            <td>{{ index + 1 }}</td>
            <td>{{ conta.data_vcto }}</td>
            <td>{{ conta.descricao }}</td>
            <td>{{ conta.valor | currency 'R$ ' 2 }}</td>
            <td class="minha-classe" :class="{'pago': conta.situacao, 'nao-pago': !conta.situacao}">
                {{ conta.situacao | situacaoLabel }}
            </td>
            <td>
                <a href="#" @click.prevent="editarConta(conta)">Editar</a> |
                <a href="#" @click.prevent="excluirConta(conta)">Excluir</a>
            </td>
        </tr>
        </tbody>
     </table>        
    `,
    data: function() {
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
    },
    methods: {
        editarConta: function(camposConta) {
            this.$dispatch('change-bill', camposConta);
            this.$dispatch('change-activedview', 1);
            this.$dispatch('change-formtype', 'update');
        },
        excluirConta: function(camposConta){
            if(confirm('Deseja excluir esta conta? ')){
                this.contas.$remove(camposConta);
            }

        }
    },
    events: {
        'new-bill': function(bill){
            this.contas.push(bill);
        }
    }
});


var criarcontasComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="camposConta.data_vcto"/>
        <br/><br/>
        <label>Nome: </label>
        <select v-model="camposConta.descricao">
            <option v-for="conta in descricaoContas" value="{{ conta }}">
                {{ conta }}
            </option>
        </select>
        <br/><br/>
        <label>Valor: </label>
        <input type="text" v-model="camposConta.valor"/>
        <br/><br/>
        <label>Pago?: </label>
        <input type="checkbox" v-model="camposConta.situacao"/>
        <br/><br/>
        <input type="submit" value="Enviar"/>
    </form>    
    `,
    data: function() {
        return {
            formType: 'insert',
            descricaoContas: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],
            camposConta: {
                data_vcto: '',
                descricao: '',
                valor: '',
                situacao: false
            }
        };
    },
    methods: {
        submit: function(){
            if(this.formType == 'insert'){
                this.$dispatch('new-bill', this.camposConta);
            }

            this.camposConta = {
                data_vcto: '',
                descricao: '',
                valor: '',
                situacao: false
            }

            this.$dispatch('change-activedview', 0);
        }
    },
    events: {
        'change-formtype': function(formType){
            this.formType = formType;
        },
        'change-bill': function(bill){
            this.camposConta = bill;
        }
    }
});

var appComponent = Vue.extend({
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
    <div v-show="activedView == 0">
        <lista-contas-component v-ref:bill-list-component></lista-contas-component>        
    </div>
    <div v-show="activedView == 1">
        <criar-contas-component v-bind:campos-conta.sync="camposConta"></criar-contas-component>        
    </div>
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
Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app",
});


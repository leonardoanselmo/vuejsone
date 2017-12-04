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
            this.$parent.activedView = id;
            if(id == 1){
                this.$parent.formType = 'insert';
            }
        },
    }
});
Vue.component('menu-component', menuComponent);

var listacontasComponent = Vue.extend({
    template: `
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
            this.$parent.camposConta = camposConta;
            this.$parent.activedView = 1;
            this.$parent.formType = 'update';
        },
        excluirConta: function(camposConta){
            if(confirm('Deseja excluir esta conta? ')){
                this.contas.$remove(camposConta);
            }

        }
    }
});
Vue.component('lista-contas-component', listacontasComponent);

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
    props: ['camposConta', 'formType'],
    data: function() {
        return {
            descricaoContas: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ]
        };
    },
    methods: {
        submit: function(){
            if(this.formType == 'insert'){
                this.contas.push(this.camposConta);
            }

            this.camposConta = {
                data_vcto: '',
                descricao: '',
                valor: '',
                situacao: false
            }

            this.activedView = 0;
        }
    }
});
Vue.component('criar-contas-component', criarcontasComponent);
var appComponent = Vue.extend({
    template: `
    <style type="text/css">
        .pago {
            color: green;
        }
        .nao-pago {
            color: red;
        }
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
        {{ status | statusGeneral }}</h3>
    <menu-component></menu-component>
    
    <div v-if="activedView == 0">
        <lista-contas-component></lista-contas-component>        
    </div>
    <div v-if="activedView == 1">
        <criar-contas-component v-bind:camposConta="camposConta" v-bind:form-type="formType"></criar-contas-component>        
    </div>
    `,
    data: function(){
        return {
            test: '',
            title: "Contas a pagar",
            formType: 'insert',
            activedView: 0,
            camposConta: {
                data_vcto: '',
                descricao: '',
                valor: '',
                situacao: false
            },
        };
    },
    computed: {
        status: function () {
            if(!this.contas.length){
                return false;
            }
            var count = 0;
            for (var i in this.contas) {
                if (!this.contas[i].situacao) {
                    count++;
                }
            }
            return count;
        }
    }
});
Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app",
});


window.billPayListComponent = Vue.extend({
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
        <tr v-for="(index, o) in bills">
            <td>{{ index + 1 }}</td>
            <td>{{ o.date_due }}</td>
            <td>{{ o.name }}</td>
            <td>{{ o.value | currency 'R$ ' 2 }}</td>
            <td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
                {{ o.done | situacaoLabel }}
            </td>
            <td>
                <a v-link="{ name: 'bill-pay.update', params: {index: index} }">Editar</a> |
                <a href="#" @click.prevent="excluirConta(conta)">Excluir</a>
            </td>
        </tr>
        </tbody>
     </table>        
    `,
    http: {
        root: 'http://192.168.10.10:8000/api'
    },
    data: function() {
        return {
            // contas: this.$root.$children[0].billsPay
            bills: []
        };
    },
    created: function(){
        this.$http.get('bills').then(function(response){
            this.bills = response.data;
        });
    },
    methods: {
        excluirConta: function(camposConta){
            if(confirm('Deseja excluir esta conta? ')){
                this.$root.$children[0].billsPay.$remove(camposConta);
            }

        }
    }
});

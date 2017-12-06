window.listaPaycontasComponent = Vue.extend({
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
                <a v-link="{ name: 'bill.update', params: {index: index} }">Editar</a> |
                <a href="#" @click.prevent="excluirConta(conta)">Excluir</a>
            </td>
        </tr>
        </tbody>
     </table>        
    `,
    data: function() {
        return {
            contas: this.$root.$children[0].contas
        };
    },
    methods: {
        excluirConta: function(camposConta){
            if(confirm('Deseja excluir esta conta? ')){
                this.$root.$children[0].contas.$remove(camposConta);
            }

        }
    }
});

window.listacontasComponent = Vue.extend({
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

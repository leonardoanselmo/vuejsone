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
                <th>Código</th>
                <th>Vencimento</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Situação</th>
                <th>Ações</th>                
            </tr>
        </thead>
        <tbody>
            
            <tr v-for="(index,o) in bills">                             
                <td>{{ index + 1 }}</td>
                <td>{{ o.id }}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2 }}</td>
                <td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
                    {{ o.done | situacaoLabel }}
                </td>
                <td>
                    <a v-link="{ name: 'bill-pay.update', params: {id: o.id} }">Editar</a> |
                    <a href="#" @click.prevent="excluirConta(o)">Excluir</a>
                </td>
            </tr>
                        
        </tbody>
     </table>            
    `,
    data: function() {
        return {
            bills: []
        };
    },
    created: function(){
        var self = this;
        Bill.query().then(function(response){
            self.bills = response.data;
        });
    },
    methods: {
        excluirConta: function(bill){
            if(confirm('Deseja excluir esta conta?')){
                var self = this;
                Bill.delete({id: bill.id}).then(function(response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }

        }
    }
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menu: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        contas: [
            { data_vcto: '20/08/2016', descricao: 'Conta de luz', valor: 151.23, situacao: 1 },
            { data_vcto: '21/08/2016', descricao: 'Conta de água', valor: 82.10, situacao: 0 },
            { data_vcto: '22/08/2016', descricao: 'Conta de telefone', valor: 45.10, situacao: 0 },
            { data_vcto: '23/08/2016', descricao: 'Supermercado', valor: 102.89, situacao: 0 },
            { data_vcto: '24/08/2016', descricao: 'Cartão de Crédito', valor: 1500.99, situacao: 0 },
            { data_vcto: '25/08/2016', descricao: 'Empréstimo', valor: 300.00, situacao: 0 },
            { data_vcto: '26/08/2016', descricao: 'Gasolina', valor: 55.30, situacao: 0 }
        ]
    },
    computed: {
        status: function () {
            var count = 0;
            for (var i in this.contas) {
                if (!this.contas[i].situacao) {
                    count++;
                }
            }
            return !count ? "Nenhuma conta a pagar" : "Exitem " + count + " contas a serem pagas";
        }
    },
    methods: {
        showView: function( $number) {
            console.log($number);
        }

    }
})
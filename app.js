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
})
var app = new Vue({
    el: "#app",
    data: {
        test: '',
        title: "Contas a pagar",
        menu: [
            {id: 0, name: "Listar contas"},
            {id: 1, name: "Criar conta"}
        ],
        formType: 'insert',
        activedView: 0,
        camposConta: {
            data_vcto: '',
            descricao: '',
            valor: '',
            situacao: false
        },
        descricaoContas: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de Crédito',
            'Empréstimo',
            'Gasolina'
        ],
        contas: [
            { data_vcto: '20/08/2016', descricao: 'Conta de luz', valor: 151.23, situacao: true },
            { data_vcto: '21/08/2016', descricao: 'Conta de água', valor: 82.10, situacao: false },
            { data_vcto: '22/08/2016', descricao: 'Conta de telefone', valor: 45.10, situacao: false },
            { data_vcto: '23/08/2016', descricao: 'Supermercado', valor: 102.89, situacao: false },
            { data_vcto: '24/08/2016', descricao: 'Cartão de Crédito', valor: 1500.99, situacao: false },
            { data_vcto: '25/08/2016', descricao: 'Empréstimo', valor: 300.00, situacao: false },
            { data_vcto: '26/08/2016', descricao: 'Gasolina', valor: 55.30, situacao: false }
        ]
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
            //return !count ? "Nenhuma conta a pagar" : "Exitem " + count + " contas a serem pagas";
        }
    },
    methods: {
        showView: function(id) {
            this.activedView = id;
            if(id == 1){
                this.formType = 'insert';
            }
        },
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
        },
        editarConta: function(camposConta) {
            this.camposConta = camposConta;
            this.activedView = 1;
            this.formType = 'update';
        },
        excluirConta: function(camposConta){
            if(confirm('Deseja excluir esta conta? ')){
                this.contas.$remove(camposConta);
            }

        }
    }
});


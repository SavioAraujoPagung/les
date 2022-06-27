const { Router } = require('express');
const printer = require("node-thermal-printer");

const routes = Router();

routes.post('/imprimir', async (req, res, next) => {
    var body = req.body;
    var messagem = "Supermercado Pulinni 8-)\n\n\n";
    var messagem = "+++ Produtos Vendidos +++\n";
    var total = 0
    messagem += "-------------------------\n";

    body.map(
        (produto) => {
            total += produto.preco_venda
            messagem += "Nome: " + produto.nome + " - "
            messagem += "Preco: $" + produto.preco_venda + " - "
            messagem += "Quantidade: " + produto.quantidade + "\n"
            messagem += "-------------------------\n"
        }
    )

    messagem += "TOTAL: $" + total;

    printer.init({
        type: 'epson',
        interface: '/dev/usb/lp3',
        characterSet: 'LATINA'
    });
    
    printer.alignCenter();
    printer.println(messagem);
    printer.cut();
    printer.execute(function(err){
        if (err) {
            console.log("2/2")
            console.error(err);
        }else{
            console.log("2/2")
            console.log("Print done")
        }
    })
    return res.status(200).json("ok");
});

module.exports = routes;
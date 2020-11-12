const axios = require('axios')
const cheerio = require('cheerio')

const dados = async (url) => {
    const resultado = await axios.get(url)
    return resultado.data
}

const principal = async () => {
    const conteudo = await dados("https://santistadecora.com.br/vm/travesseiros")
    const $ = cheerio.load(conteudo)
    let travesseiros = []

    $('div.bq6m6y-4.dFQDmu').each((i, e) => {
        //  Pegando os valores desejados do site
        const nomeProduto = $(e).find('a > div.znbzn-7.gbEUzf > div.znbzn-2.eInOmt > p').text();
        const precoProduto = $(e).find('a > div.znbzn-7.gbEUzf > p > span.sc-181waw4-0.bfbPNo').text().trim();



        //  Ajustando texto
        var nomeAjustado = nomeProduto.replace("Kit Travesseiros", "Travesseiro");
        var nomeAjustado2 = nomeAjustado.replace("s", "");
        
        //  Quebrando para montar um array
        var arrNomeProduto = nomeAjustado2.split("Travesseiro");

        var arrPrecoProduto = precoProduto.split("R$");
    
        console.log(arrNomeProduto)
        console.log(arrPrecoProduto)

        //  Excel
        const excel = require('excel4node');
        var workbook = new excel.Workbook();
        var planilha = workbook.addWorksheet('Pagina1');

        for (let i = 0; i < arrNomeProduto.length; i++) {
            planilha.cell(i+1, 1).string("Travesseiro" + arrNomeProduto[i]);

        }
        for (let i = 1; i < arrPrecoProduto.length; i++) {
            planilha.cell(i, 2).string("R$" + arrPrecoProduto[i]);
        }

        workbook.write('ExcelSantista.xlsx');
    })

}
principal()

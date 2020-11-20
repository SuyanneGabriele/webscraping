const axios = require('axios')
const cheerio = require('cheerio')

const dados = async (url) => {
    const resultado = await axios.get(url)
    return resultado.data
}

const principal = async () => {
    const conteudo = await dados("https://santistadecora.com.br/vm/travesseiros?page=0")
    const $ = cheerio.load(conteudo)

    const nomeProduto = []
    const precoProduto = []

    $('div.bq6m6y-4.dFQDmu').each((i, e) => {
        //  Pegando os valores desejados do site
        $('a > div.znbzn-7.gbEUzf > div.znbzn-2.eInOmt > p').each(function (index) {
            nomeProduto[index] = $(this).text();
        });
        $('a > div.znbzn-7.gbEUzf > p > span.sc-181waw4-0.bfbPNo').each(function (index) {
            precoProduto[index] = $(this).text();
        });

        console.log(nomeProduto)
        console.log(precoProduto)

        // Excel
        const excel = require('excel4node');
        var workbook = new excel.Workbook();
        var planilha = workbook.addWorksheet('Pagina1');

        for (let i = 0; i < nomeProduto.length; i++) {
            planilha.cell(i + 1, 1).string(nomeProduto[i]);

        }
        for (let i = 1; i < precoProduto.length; i++) {
            planilha.cell(i, 2).string(precoProduto[i - 1]);
        }

        workbook.write('ExcelSantista.xlsx');
    })

}
principal()
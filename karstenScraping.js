const axios = require('axios')
const cheerio = require('cheerio')

const conteudo = async (url) => {
    const result = await axios.get(url)
    return result.data
}

const principal = async () => {
    const dados = await conteudo("https://www.karsten.com.br/cama/travesseiro")
    const $ = cheerio.load(dados)

    $('div.prateleira.n5colunas').each((i, e) => {

        //  Pegando os valores desejados
        var nomeProd = $(e).find(' ul > li > span > h3.product-name > a').text();
        const precoProd = $(e).find('ul > li > span > span > a > span.best-price').text().trim();

        //  Filtrando o texto
        nomeT = nomeProd.replace(/\n/g, "");
        precoT = precoProd.replace(/\n/g, "");

        //  Quebrando o texto para montar arrays
        var arrnomeprod = nomeT.split("Travesseiro")
        var arrprecoprod = precoT.split("R$")

        //  EXCEL
        const excel = require('excel4node');
        var workbook = new excel.Workbook();
        var planilha = workbook.addWorksheet('Pagina1');

        for (let i = 1; i < arrnomeprod.length-1; i++) {
            planilha.cell(i, 1).string("Travesseiro" + arrnomeprod[i]);
            planilha.cell(i, 2).string("R$" + arrprecoprod[i]);
        }

        workbook.write('ExcelKarsten.xlsx');

    })

}

principal()

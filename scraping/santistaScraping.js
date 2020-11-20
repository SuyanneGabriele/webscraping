const axios = require('axios')
const cheerio = require('cheerio')

const dados = async (url) => {
    const resultado = await axios.get(url)
    return resultado.data
}

const principal = async () => {
    const conteudo = await dados("https://santistadecora.com.br/vm/travesseiros?page=0")
    const $ = cheerio.load(conteudo)
    let travesseiros = []

    $('div.bq6m6y-4.dFQDmu').each((i, e) => {
        //  Pegando os valores desejados do site
        const nomeProduto = $(e).find('a > div.znbzn-7.gbEUzf > div.znbzn-2.eInOmt > p').text();
        const precoProduto = $(e).find('a > div.znbzn-7.gbEUzf > p > span.sc-181waw4-0.bfbPNo').text().trim();
        const numeroPaginas = $(e).find('a > div.ayjwdh-2.fGLEso > a').text();

        //  Gambiarra para ajustar o texto para por no excel
        var nomeAjustado = nomeProduto.replace("Kit Travesseiros", "Travesseiro");
        var nomeAjustadoA = nomeAjustado.replace("Enchimento para", "Travesseiro / Enchimento para");
        var nomeAjustadoB = nomeAjustadoA.replace("IIEnchimento para", "Travesseiro / Enchimento para");
        var nomeAjustadoC = nomeAjustadoB.replace("PeçasEnchimento para", "Travesseiro / Enchimento para");
        var nomeAjustadoD = nomeAjustadoC.replace("BallfillEnchimento para", "Travesseiro / Enchimento para");
        var nomeAjustadoE = nomeAjustadoD.replace("s", "");
        
        //  Quebrando para montar um array
        var arrNomeProduto = nomeAjustadoE.split("Travesseiro");
        var arrPrecoProduto = precoProduto.split("R$");
    
        console.log(arrNomeProduto)
        console.log(arrPrecoProduto)
        console.log(numeroPaginas)

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

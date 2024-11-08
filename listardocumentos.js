function getDados() {
    iframes = document.querySelectorAll("iframe");
    arvore = document.querySelectorAll("iframe")[0];
    visualizacao = document.querySelectorAll("iframe")[1];
    arvore_frame = document.querySelectorAll("iframe")[0];
    visualizacao_frame = document.querySelectorAll("iframe")[1];
    arvore_content = arvore_frame.contentDocument;
    visualizacao_content = visualizacao_frame.contentDocument;
    visualizacao_body = visualizacao_content.querySelector("body");
    info_div = visualizacao_body.querySelector("#divInformacao");
    arvore_body = arvore_content.querySelector("body");
    documentos = arvore_body.querySelector("#divArvore").querySelectorAll("[id^='anchor'][target='ifrVisualizacao']");
    numero_processo_el = arvore_content.querySelector(".infraArvoreNoSelecionado");
    tipo_processo = numero_processo_el.title
    numero_processo = numero_processo_el.innerText

    proc = numero_processo + " " + tipo_processo

    all_li = ""


    for (let k = 0; k < documentos.length; k++) {

        nome_documento = documentos[k].innerText
        // console.log("nome do documento",k, nome_documento)
        observacao = documentos[k].childNodes[0].title
        // console.log("observação",k, observacao)

        if (observacao.startsWith("Documento Cancelado")) {
            li_el = `<li style='list-style: decimal;color:red'>${nome_documento}</li>`
        } else {
            li_el = `<li style='list-style: decimal;' onclick='navigator.clipboard.writeText(this.innerText)'>${nome_documento}</li>`
        }
        all_li = all_li + li_el
        // console.log(all_li);
    }
    novaJanela(proc, all_li)
}

function novaJanela(proc, all_li) {
    alert("abrindo nova janela....serião mesmo...2")
    let novaJanela = window.open('', '_blank', 'width=600,height=400');
    if (novaJanela) {
        novaJanela.document.write(`<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${proc}</title></head><body><h1>${proc}</h1>${all_li}</body></html>`);
        novaJanela.document.close(); // Fecha o fluxo de escrita, garantindo que a página seja renderizada
    } else {
        alert('A nova janela foi bloqueada pelo navegador. Habilite pop-ups para visualizar o conteúdo.');
    }
}
getDados()

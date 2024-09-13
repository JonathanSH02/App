const { select, input, checkbox } = require('@inquirer/prompts')
const { relative } = require('path')

let meta = {
    value: 'Tomar água',
    checked: false
}
let metas = [meta]

const cadastrarMetas = async () => {
    const meta = await input({ message: "Digite a meta:" })

    if (meta.length === 0) {
        console.log('Essa meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: 'use as setas para mudar de metas,o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa',
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta foi digitada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((M) => {
            return M.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    
    if(realizadas.length == 0) {
        console.log('Não existe metas realizadas')
        return
    }
    
    await select({
        message: "Metas Realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const aberta = metas.filter((meta) => {
        return meta.checked != true
    })

    if(aberta.length == 0) {
        console.log("Não existem metas abertas!")
        return
    }

    await select ({
        message:"Metas Abertas:" + aberta.length,
        choices: [...aberta]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) =>{
        return {value: meta.value, checked: false}
    })
    const itensDeletar = await checkbox({
        message: 'Selecione item para deletar',
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensDeletar.length == 0){
        console.log("Nenhum item para deletar")
        return
    }

    itensDeletar.forEach((item) => {
        metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deleta(s) com sucesso")
}

const start = async () => {

    while (true) {

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "aberta"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMetas()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "aberta":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até logo")
                return
        }
    }

}

start()
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

    if (respostas.length == 0) {
        console.log("Nenhuma meta foi digitada")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

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
        return true
    })
    
    if(realizadas.length == 0) {
        console.log('Não existe metas realizadas')
        return
    }
    
    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
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
            case "sair":
                console.log("Até logo")
                return
        }
    }

}

start()
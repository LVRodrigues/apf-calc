# APF Calc

![GitHub](https://img.shields.io/github/license/LVRodrigues/cpp-fifo)

![Static Badge](https://img.shields.io/badge/angular-16-blue?logo=angular) 
![Static Badge](https://img.shields.io/badge/SAAS-yellow)
![Static Badge](https://img.shields.io/badge/NGXecharts-yellow)
![Static Badge](https://img.shields.io/badge/XML-yellow)


Calculadora de esforço de projeto usando Análise de Pontos de Função, baseado nas informações do
[International Function Point Users Group](https://ifpug.org).

# Links Úteis

* [![Static Badge](https://img.shields.io/badge/Manual_do_Usuário-blue)](https://github.com/LVRodrigues/apf-calc/wiki/Manual-do-Usu%C3%A1rio)

* [![Static Badge](https://img.shields.io/badge/Function_Point_Analisys-blue)](https://ifpug.org/ifpug-standards/fpa)

## Publicar nova versão.

Usando o fluxo de trabalho [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), execute os comandos:

```bash
git flow release start <id>
npm run release
git commit -a
git flow release finish '<id>'
```

## Diagrama de Classes

```mermaid
classDiagram
    Project *-- Module
    Module *-- Function
    Function <|-- FunctionData
    Function <|-- FunctionTransaction
    FunctionData <|-- FunctionALI
    FunctionData <|-- FunctionAIE
    FunctionTransaction <|-- FunctionCE
    FunctionTransaction <|-- FunctionEE
    FunctionTransaction <|-- FunctionSE
    Function ..> FunctionType
    FunctionData *-- Data
    FunctionTransaction *-- FunctionData

    class FunctionType {
        <<Enumeration>>
        ALI
        AIE
        EE
        CE
        SE
    }

    class Project {
        +name: string
        +description: string
        +responsible: string
        +date: date
        +score: number
        +version: number
        +modules: Module[]
    }    
    
    class Module {
        id: number
        name: string
        description: string
        functions: Function[]
    }
    
    class Function {
        +id: number
        +name: string
        +description: string 
        #_type: FunctionType
    }
    Function : +getType() FunctionType

    class FunctionData~Function~ {
        +datas: Data[]
    }

    class FunctionALI~FunctionData~ {
    }
    class FunctionAIE~FunctionData~{
    }

    class FunctionTransaction~Function~{
        +datas: FunctionData[]
    }

    class FunctionEE~FunctionTransaction~ {
    }
    class FunctionCE~FunctionTransaction~{
    }
    class FunctionSE~FunctionTransaction~ {
    }

    class Data {
        +id: number
        +name: string
        +description: string
    }
```
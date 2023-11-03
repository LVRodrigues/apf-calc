import { FactorType } from "./factor-type";
import { InfluenceType } from "./influence-type";

export class Factor {
    id!: FactorType;
    influence!: InfluenceType;

    constructor () {
    }

    public get description(): string {
        let result = 'indefinido';
        switch (this.id) {
            case FactorType.DATA_COMMUNICATION:
                result = 'Comunicação de Dados';
                break;
            case FactorType.DISTRIBUTED_PROCESSING:
                result = 'Processamento Distribuído';
                break;
            case FactorType.PERFORMANCE:
                result = 'Performance';
                break;
            case FactorType.HEAVILY_USED_CONFIGURATION:
                result = 'Configuração Intensamente Utilizada';
                break;
            case FactorType.TRANSACTION_VOLUME:
                result = 'Volume de Transações';
                break;
            case FactorType.ONLINE_DATA_ENTRY:
                result = 'Entrada de Dados On-Line';
                break;
            case FactorType.END_USER_EFFICIENCY:
                result = 'Eficiência do Usuário Final';
                break;
            case FactorType.ONLINE_UPDATE:
                result = 'Atualização On-Line';
                break;
            case FactorType.COMPLEX_PROCESSING:
                result = 'Processamento Complexo';
                break;
            case FactorType.REUSABILITY:
                result = 'Reusabilidade';
                break;
            case FactorType.EASE_OF_INSTALLATION:
                result = 'Facilidade de Instalação';
                break;
            case FactorType.EASE_OF_OPERATION:
                result = 'Facilidade de Operação';
                break;
            case FactorType.MULTIPLE_LOCATIONS:
                result = 'Múltiplos Locais';
                break;
            case FactorType.EASE_OF_CHANGE:
                result = 'Facilidade de Mudança';
                break;
        }
        return result;
    }
}

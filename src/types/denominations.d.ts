export type DenominationTypes = "RN10" | "RN20" | "RN50" | "RN100" | "RN200" | "RN500" | "RN2000" | "RC1" | "RC2" | "RC5" | "RC10";

// type DenominationTypes<k extends keyof DenominationIds> = {
// };


export interface Denomination {
    type: DenominationTypes;
    name: string;
    image?: string;
    description?: string;
}

// export interface DenominationStock  {
//     stock: number;
// }

// export type DenominationStock<k extends keyof DenominationTypes> = {
//     k: number;
// }

type DenominationStockType = {
    // [index in DenominationTypes]: index extends undefined ? undefined : number;
    [index in DenominationTypes]?: number;
};
// export const DenominationStock = new Map<DenominationTypes, number>();
// DenominationStock.set("RC1", 0);

export interface DenominationTransactionLog {
    type: DenominationTypes;
    time: Date;
    logId: string;
    description: string;
    verifiedAt?: Date;
}

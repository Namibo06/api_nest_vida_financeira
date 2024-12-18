import { TypeCsvOrExcel } from "src/enums/type_csv_or_excel.enum"

export type ExportCsvOrExcelDTO = {
    typeCsvOrExcel: TypeCsvOrExcel;
    startDate: string;
    endDate: string;
}
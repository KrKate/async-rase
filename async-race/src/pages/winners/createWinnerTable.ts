function createTableCell(text: string) {
    const cell = document.createElement('div');
    cell.textContent = text;
    return cell;
  }

export function createTableTitle() {
    const rowTitle = document.createElement('div');
    rowTitle.className = 'row-title';
    const tableNumber = createTableCell('Number');
    const tableCar = createTableCell('Car');
    const tableName = createTableCell('Name');
    const tableWins = createTableCell('Wins');
    const tableTime = createTableCell('Time');

    rowTitle.append(tableNumber, tableCar, tableName, tableWins, tableTime);
    return rowTitle;
}

let count = 0;
export function createTable(id: number, wins: number, time: number) {
    const rowTable = document.createElement('div');
    rowTable.className = 'row-title';
    count +=1;
    const rowNumber = createTableCell(`${count}`);
    const rowCar = createTableCell('Car');
    const rowName = createTableCell('Name');
    const rowWins = createTableCell(`${wins}`);
    const rowTime = createTableCell(`${time}`);

    rowTable.append(rowNumber, rowCar, rowName, rowWins, rowTime);
    return rowTable;
}

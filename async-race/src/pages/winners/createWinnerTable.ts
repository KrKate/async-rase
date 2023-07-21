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
  


export function createTable() {
    console.log('Table')
}

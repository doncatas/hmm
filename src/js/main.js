import { GetInventorsDataAsync } from "./utils/utils.js";
import { Table } from './models/Table.js'

let inventorsData = await GetInventorsDataAsync();
const table = new Table(inventorsData)

document.querySelectorAll(".styled-table th").forEach(th => {
    th.addEventListener("click", () => {
        const headerIndex = Array.prototype.indexOf.call(th.parentElement.children, th);
        table.sort(['name', 'tech', 'age'][headerIndex])
    })
})
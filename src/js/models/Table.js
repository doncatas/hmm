export { Table }

class Table {
    data = null;
    sortBy = null; //name|tech|age
    sortByAsc = true;

    constructor(val) {
        this.data = val
        this.render()
    }

    render() {
        document.getElementById("table_content").innerHTML = "";

        let tabledata = "";

        this.data.map((values) => {
            tabledata += `
            <tr>
                <td>${values.name}</td>
                <td>${values.tech}</td>
                <td>${values.age}</td>
            </tr>`;
        });

        document.getElementById("table_content").innerHTML = tabledata;
    }

    renderHeader() {
        document.getElementById("table").querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        document.getElementById("table").querySelector(`th:nth-child(${['name','tech','age'].indexOf(this.sortBy) + 1})`).classList.toggle("th-sort-asc", this.sortByAsc);
        document.getElementById("table").querySelector(`th:nth-child(${['name','tech','age'].indexOf(this.sortBy) + 1})`).classList.toggle("th-sort-desc", !this.sortByAsc);
    }

    sort(name) {
        if (name === this.sortBy) {
            this.sortByAsc = !this.sortByAsc
        } else {
            this.sortBy = name
            this.sortByAsc = true
        }
        this.sortData()
        this.renderHeader()
        this.render()
    }

    sortData() {
        this.data = this.data.sort((a, b) => {
            const x = this.sortByAsc ? a[this.sortBy] : b[this.sortBy]
            const y = this.sortByAsc ? b[this.sortBy] : a[this.sortBy]

            if (x > y) {
                return 1;
            }
            if (y > x) {
                return -1;
            }
            return 0;
        })
    }
}
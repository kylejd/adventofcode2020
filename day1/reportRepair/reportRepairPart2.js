import * as fs from 'fs';

const SUM_TOTAL = 2020;

const reportRepair = () => {
    let expenseReport = fs
        .readFileSync('./expenseReport.txt')
        .toString('utf-8')
        .split('\n');
    expenseReport = expenseReport.map((line) =>
        parseInt(line.replace(/\r?\n|\r/gm, ''))
    );

    const expenseReportMap = expenseReport.reduce(
        (m, v) => ((m[v] = true), m),
        {}
    );

    let entry1 = null;
    let entry2 = null;
    let entry3 = null;

    entry1 = expenseReport.find(
        (expense1) =>
            (entry2 = expenseReport.find(
                (expense2) => expenseReportMap[SUM_TOTAL - expense1 - expense2]
            ))
    );

    entry3 = SUM_TOTAL - entry1 - entry2;

    console.log(entry1 * entry2 * entry3);
};

reportRepair();

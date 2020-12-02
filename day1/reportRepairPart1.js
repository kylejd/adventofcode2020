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

    const entry1 = expenseReport.find(
        (expense) => expenseReportMap[SUM_TOTAL - expense]
    );

    const entry2 = SUM_TOTAL - entry1;

    console.log(entry1 * entry2);
};

reportRepair();

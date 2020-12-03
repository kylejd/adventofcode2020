import * as fs from 'fs';

const tobogganTrajectory = (right, down) => {
    let lines = fs.readFileSync('./map.txt').toString('utf-8').split('\n');
    lines = lines.map((line) => line.replace(/:\r?\n|\r/gm, ''));

    const slopeLength = lines[0].length;
    const slopeHeight = lines.length;

    let distance = right;

    let treeCount = 0;

    for (let step = down; step < slopeHeight; step += down) {
        if (lines[step][distance] === '#') {
            treeCount += 1;
        }

        distance += right;
        if (distance >= slopeLength) {
            distance = distance % slopeLength;
        }
    }

    return treeCount;
};

console.log(tobogganTrajectory(1, 1) * tobogganTrajectory(3, 1) * tobogganTrajectory(5, 1) * tobogganTrajectory(7, 1) * tobogganTrajectory(1, 2));

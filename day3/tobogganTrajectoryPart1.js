import * as fs from 'fs';

const SLOPE_RIGHT = 3;
const SLOPE_DOWN = 1;

const tobogganTrajectory = () => {
    let lines = fs.readFileSync('./map.txt').toString('utf-8').split('\n');
    lines = lines.map((line) => line.replace(/:\r?\n|\r/gm, ''));

    const slopeLength = lines[0].length;
    const slopeHeight = lines.length;

    let distance = SLOPE_RIGHT;

    let treeCount = 0;

    for (let step = SLOPE_DOWN; step < slopeHeight; step += SLOPE_DOWN) {
        if (lines[step][distance] === '#') {
            treeCount += 1;
        }

        distance += SLOPE_RIGHT;
        if (distance >= slopeLength) {
            distance = distance % slopeLength;
        }
    }

    console.log(treeCount);
};

tobogganTrajectory();

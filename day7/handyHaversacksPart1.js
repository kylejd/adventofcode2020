import * as fs from 'fs';
import { shortestPath } from 'graphology-library';
import Graph from 'graphology';

const handyHaversacks = () => {
    let lines = fs.readFileSync('./bagRules.txt').toString('utf-8').split('\n');

    const bagGraph = new Graph({ multi: true, allowSelfLoops: false });
    bagGraph.addNode('root');

    lines = lines.map((line) => line.replace(/:\r?\n|\r/gm, ''));

    // remove strings "contain", "." and "," from lines
    lines = lines.map((line) => line.replace(/bags?|\.|/gm, ''));

    lines.forEach((line) => {
        // create string containing only the name and quanity of a bag if the bag is a child
        const bags = line.split(/contain|,/gm).map((line) => line.trim());
        if (!bags.includes('no other')) {
            const parentBag = bags[0];

            if (!bagGraph.hasNode(parentBag)) {
                bagGraph.addNode(parentBag);
            }

            bagGraph.addEdge('root', parentBag, { weight: 0 });

            // remove the parent bag from the array
            bags.shift();

            bags.forEach((bag) => {
                const bagInfo = bag.split(' ');

                const quantity = parseInt(bagInfo[0]);
                bagInfo.shift();

                const name = bagInfo.join(' ');

                if (!bagGraph.hasNode(name)) {
                    bagGraph.addNode(name);
                }

                bagGraph.addEdge('root', name, { weight: 0 });
                bagGraph.addEdge(parentBag, name, { weight: quantity });
            });
        }
    });

    const result = bagGraph.nodes().reduce((count, node) => {
        if (shortestPath(bagGraph, node, 'shiny gold')) {
            return count + 1;
        }
        return count;
    }, 0);

    // minus 2 to account for root and itself
    console.log(result - 2);
};

handyHaversacks();

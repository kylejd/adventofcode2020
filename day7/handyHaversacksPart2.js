import * as fs from 'fs';
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

    const getBagCount = (count, currentNode) => {
        if (!bagGraph.outEdges(currentNode).length) {
            return count;
        } else {
            let returnCount = count;
            bagGraph.forEachOutEdge(currentNode, (_, attributes, __, target) => {
                returnCount += (attributes.weight ? attributes.weight : 1) * getBagCount(count, target);
            });
            return returnCount;
        }
    };

    // minus one for itself
    console.log(getBagCount(1, 'shiny gold') - 1);
};

handyHaversacks();

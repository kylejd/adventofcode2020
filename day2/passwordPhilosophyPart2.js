import * as fs from 'fs';

const passwordPhilosophy = () => {
    let passwords = fs.readFileSync('./passwords.txt').toString('utf-8').split('\n');

    passwords = passwords.map((line) =>
        line
            .replace(/:\r?\n|\r|:/gm, '')
            .replace(/-/gm, ' ')
            .split(' ')
    );

    passwords = passwords.map((line) => {
        return {
            policy: {
                firstIndex: parseInt(line[0]) - 1,
                secondIndex: parseInt(line[1]) - 1,
            },
            letter: line[2],
            password: line[3],
        };
    });

    const result = passwords.reduce((validPasswords, password) => {
        const firstIndex = password['policy']['firstIndex'];
        const secondIndex = password['policy']['secondIndex'];

        const isFirstIndexValid = password['password'][firstIndex] === password['letter'];
        const isSecondIndexValid = password['password'][secondIndex] === password['letter'];

        if ((isFirstIndexValid || isSecondIndexValid) && !(isFirstIndexValid && isSecondIndexValid)) {
            return validPasswords + 1;
        }

        return validPasswords;
    }, 0);

    console.log(result);
};

passwordPhilosophy();

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
                lowest: parseInt(line[0]),
                highest: parseInt(line[1]),
            },
            letter: line[2],
            password: line[3],
        };
    });

    const result = passwords.reduce((validPasswords, password) => {
        const occurrences = (password['password'].match(new RegExp(`${password['letter']}`, 'g')) || []).length;

        if (occurrences && occurrences >= password['policy']['lowest'] && occurrences <= password['policy']['highest']) {
            return validPasswords + 1;
        }

        return validPasswords;
    }, 0);

    console.log(result);
};

passwordPhilosophy();

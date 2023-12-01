const fs = require('node:fs');


const test_input = ['1abc2',
                    'pqr3stu8vwx',
                    'a1b2c3d4e5f',
                    'treb7uchet'];

const test_input2 = ['two1nine',
                     'eightwothree',
                     'abcone2threexyz',
                     'xtwone3four',
                     '4nineeightseven2',
                     'zoneight234',
                     '7pqrstsixteen'];


function parseInput(input) {
    return input
        .map(line => line.split('')
                         .map(x => parseInt(x, 10))
                         .filter(x => x)
                         .reduce((x, acc) => acc + x, '')
                         .split('')
                         .reverse()
                         .join('')
	).map(x => {
            if (x.length == 2) {
                return x;
            } else if (x.length == 1) {
                return x + x;
            } else {
                return x[0] + x[x.length-1];
            }
        }).map(x => parseInt(x, 10))
        .reduce((x, acc) => {
	    return acc + x;
        }, 0);
};

function sortisort(a, b) {
    return (a[0] > b[0]) ? 1 : -1;
}

function parseInput2(input) {
    let digits = [[1, 'one'],
                  [2, 'two'],
                  [3, 'three'],
                  [4, 'four'],
                  [5, 'five'],
                  [6, 'six'],
                  [7, 'seven'],
                  [8, 'eight'],
                  [9, 'nine']];

    let transformed = input.map((x, i) => {
        let transforms = digits
            .map(([num, word]) => [x.indexOf(word), word, num])
            .filter(([index, word, num]) => index !== -1)
            .sort(sortisort);

        let str = x;
        transforms.forEach((value) => {
            str = str.replaceAll(value[1], value[2]);
        });
        return str;
    });
    console.log(transformed)
    return parseInput(transformed);
}


fs.readFile('input/day1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let file_input = data.split(/\r?\n/).filter(x => x != "");
    //let parsed = parseInput(file_input);
    let parsed = parseInput2(file_input);
    console.log(parsed);
});


// day two is correct for test_input2, wrong for file_input :/

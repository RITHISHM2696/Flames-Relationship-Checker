// Convert to uppercase and keep only alphabets 
function cleanName(name) {
    name = name.toUpperCase();
    let result = "";
    for (let c of name) {
        if (c >= 'A' && c <= 'Z') {
            result += c;
        }
    }
    return result;
}

// Remove matching characters
function getFlamesCount(name1, name2) {

    let arr1 = name1.split("");
    let arr2 = name2.split("");

    // Remove common characters 
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j] && arr1[i] !== '0' && arr2[j] !== '0') {
                arr1[i] = '0';
                arr2[j] = '0';
                break; // break inner loop like Java
            }
        }
    }

    // Count remaining characters
    let count = 0;

    for (let c of arr1) {
        if (c !== '0') count++;
    }
    for (let c of arr2) {
        if (c !== '0') count++;
    }

    return count;
}

// Same FLAMES elimination logic 
function getFlamesResult(count) {
    let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let start = 0;   // like start = 0 in Java

    // 5 eliminations (because 6 letters → remove 5)
    for (let i = 0; i < 5; i++) {
        let c = 0;   

        for (let j = start; ; j++) {

            if (j === flames.length) j = 0; // wrap around like j=-1 trick in Java

            if (flames[j] !== '0') {
                c++;
            }

            if (c === count && flames[j] !== '0') {
                flames[j] = '0';      // eliminate
                start = j + 1;        // update start
                if (start === flames.length) start = 0;
                break;
            }
        }
    }

    // Find the last remaining letter
    for (let f of flames) {
        if (f !== '0') {
            return f;
        }
    }
}

function calculateFlames() {
    let name1 = cleanName(document.getElementById("name1").value);
    let name2 = cleanName(document.getElementById("name2").value);

    if (!name1 || !name2) {
        document.getElementById("result").innerText = "Enter valid names!";
        return;
    }

    let count = getFlamesCount(name1, name2);
    let resultLetter = getFlamesResult(count);

    let meaning = {
        "F": "FRIENDS",
        "L": "LOVERS",
        "A": "AFFECTIONATE",
        "M": "MARRIAGE",
        "E": "ENEMIES",
        "S": "SOULMATES"
    };

    document.getElementById("result").innerText = meaning[resultLetter];
}

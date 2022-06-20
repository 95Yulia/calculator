const btnContent = ['C', '÷', '×', 'DEL', '7', '8', '9', '−', '4', '5', '6', '+', '1', '2','3', '=', '0', ','];

function createBtn(selector, className, content, btnValue) {
    const elem = document.querySelector(selector);
    const btn = document.createElement('button');

    btn.value = btnValue;
    btn.className = className;
    btn.textContent = content;
    elem.appendChild(btn);
}

btnContent.forEach((item) => {
    switch (item) {
        case 'C':
        case 'DEL':
            createBtn('.btns', 'btn operation', item, item);
            break;
        case '÷':
            createBtn('.btns', 'btn operation', item, '/');
            break;
        case '×':
            createBtn('.btns', 'btn operation', item, '*');
            break;
        case '−':
            createBtn('.btns', 'btn operation', item, '-');
            break;
        case '+':
            createBtn('.btns', 'btn operation', item, '+');
            break;
        case ',':
            createBtn('.btns', 'btn num', item, '.');
            break;
        case '=':
            createBtn('.btns', 'btn equals', item, item);
            break;
        case '0':
            createBtn('.btns', 'btn num zero', item, item);
            break;
        default:
            createBtn('.btns', 'btn num', item, item);
    }
})

const btns = document.querySelector('.btns');
const btnEq = btns.querySelector('button[value="="]');
const btnDiv = btns.querySelector('button[value="/"]');
const btnMult = btns.querySelector('button[value="*"]');
const btnPlus = btns.querySelector('button[value="+"]');
const btnMinus = btns.querySelector('button[value="-"]');
const btnRemoveAll = btns.querySelector('button[value="C"]');
const btnRemoveItem = btns.querySelector('button[value="DEL"]');
const btnNum = btns.querySelectorAll('.num');
const btnNumArr = Array.from(btnNum);

let strRes = '';
let res;

function btnOnClick(event) {
    let result = document.querySelector('.result');
    let input = document.querySelector('.input');
    let target = event.target;
    let targetClass = target.className;

    switch (targetClass) {
        case "btn num":
        case "btn num zero":
            number();
            break;
        case "btn operation":
            operation();
            break;
        case "btn equals":
            equals();
            return;
    }

    if(strRes.length!==0) {
        try {
            switch (strRes.slice(-1)) {
                case "/":
                case "*":
                case "-":
                case "+":
                    res = eval(strRes.slice(0, -1));
                    break;
                default:
                    res = eval(strRes);
                    break;
            }

            let posDot = res.toString().indexOf('.');
            let posMinus = res.toString().indexOf('-');
            if(posDot !== -1) {
                let arrRes = res.toString().split('');
                arrRes.splice(posDot, 1, ',');
                result.textContent = arrRes.join('');
            } else if (posMinus !== -1) {
                let arrRes = res.toString().split('');
                arrRes.splice(posMinus, 1, '−');
                result.textContent = arrRes.join('');
            } else {
                result.textContent = String(res);
            }
        } catch (e) {
            // console.log(e);
            result.textContent = 'Ошибка';
        }
    } else {
        result.textContent = '';
    }

    function number() {
        if(target.value === '.') {
            if(strRes[strRes.length-1] !== '.') {
                input.textContent = input.textContent + target.textContent;
                strRes = strRes + target.value;
            }
        } else {
            if(strRes.slice(-1) === '0'&& strRes.length > 1 && (strRes.slice(-2, -1) === "/" || strRes.slice(-2, -1) === "*" || strRes.slice(-2, -1) === "-" || strRes.slice(-2, -1) === "+") || strRes.length === 1 && strRes.slice(-1) === '0') {
                input.textContent = input.textContent.slice(0,-1) + target.textContent;
                strRes = strRes.slice(0,-1) + target.value;
            } else {
                input.textContent = input.textContent + target.textContent;
                strRes = strRes + target.value;
            }
        }
    }

    function operation() {
        switch (target.value) {
            case 'DEL':
                input.textContent = input.textContent.slice(0, -1);
                strRes = strRes.slice(0, -1);
                break;
            case 'C':
                input.textContent = '';
                result.textContent = '';
                strRes = '';
                res = '';
                break;
            default:
                operationDefault(target);
                break;
        }
    }

    function equals() {
        if(result.textContent === 'Ошибка' || result.textContent === 'Infinity' || result.textContent === '-Infinity') {
            return;
        } else {
            strRes = String(res);
            input.textContent = result.textContent;
        }
    }

    function operationDefault(target) {
        if(!input.textContent.length) {
            if(target.value === '-') {
                input.textContent = input.textContent + target.textContent;
                strRes = strRes + target.value;
            } else {
                strRes = '';
                input.textContent = '';
            }
        } else {
            let lastElemStr = input.textContent[input.textContent.length-1];
            switch (lastElemStr) {
                case '+':
                case '−':
                case '×':
                case '÷':
                    input.textContent = input.textContent.slice(0,-1) + target.textContent;
                    strRes = strRes.slice(0, -1) + target.value;
                    break;
                default:
                    input.textContent = input.textContent + target.textContent;
                    strRes = strRes + target.value;
                    break;
            }
        }
    }
}

btns.onclick = btnOnClick;

document.addEventListener("keydown", (ev) => {
    if (!isNaN(+ev.key)) {
        let num = btnNumArr.find(item => item.value===`${ev.key}`);
        num.click();
        num.classList.add('hover_num');
    } else {
        switch (ev.key) {
            case '.':
            case ',':
                let btnDot =  btnNumArr.find(item => item.value===".");
                btnDot.click();
                btnDot.classList.add('hover_num');
                break;
            case '=':
            case 'Enter':
                btnEq.click();
                btnEq.classList.add('hover_equals');
                break;
            case '/':
                btnDiv.click();
                btnDiv.classList.add('hover_operation');
                break;
            case '*':
                btnMult.click();
                btnMult.classList.add('hover_operation');
                break;
            case '+':
                btnPlus.click();
                btnPlus.classList.add('hover_operation');
                break;
            case '-':
                btnMinus.click();
                btnMinus.classList.add('hover_operation')
                break;
            case 'Delete':
                btnRemoveAll.click();
                btnRemoveAll.classList.add('hover_operation');
                break;
            case 'Backspace':
                btnRemoveItem.click();
                btnRemoveItem.classList.add('hover_operation');
                break;
        }
    }
})

document.addEventListener("keyup", (ev) => {
    if (!isNaN(+ev.key)) {
        let num = btnNumArr.find(item => item.value===`${ev.key}`);
        num.classList.remove('hover_num');
    } else {
        switch (ev.key) {
            case '.':
            case ',':
                btnNumArr.find(item => item.value===".").classList.remove('hover_num');
                break;
            case '=':
            case 'Enter':
                btnEq.classList.remove('hover_equals');
                break;
            case '/':
                btnDiv.classList.remove('hover_operation');
                break;
            case '*':
                btnMult.classList.remove('hover_operation');
                break;
            case '+':
                btnPlus.classList.remove('hover_operation');
                break;
            case '-':
                btnMinus.classList.remove('hover_operation')
                break;
            case 'Delete':
                btnRemoveAll.classList.remove('hover_operation');
                break;
            case 'Backspace':
                btnRemoveItem.classList.remove('hover_operation');
                break;
        }
    }
})
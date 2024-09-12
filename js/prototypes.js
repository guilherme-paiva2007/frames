/**
 * Similar à `Array.forEach`, porém aplicado em HTMLCollection.
 * @param {Function} callback Passa pelos elementos dessa lista, executando tendo os parâmetros de: `element`, `index`, `collection`.
 */
HTMLCollection.prototype.forEach = function HTMLCollectionForEach(callback) { // Adicionar verificação
    let collection = this;
    for (let index = 0; index < this.length; index++) {
        const element = collection[index];
        callback(element, index, collection)
    }
}

/**
 * Adiciona um eventListener a todos os elementos da coleção.
 * @param {Event.type} event 
 * @param {(event: event) => void} method 
 */
HTMLCollection.prototype.addEventListener = function HTMLCollectionAddEventListener(event, method) { // Adicionar verificação
    this.forEach(element => {
        element.addEventListener(event, method);
    })
}

/**
 * Reescreve o valor de `innerHTML` de um elemento.
 * @param {string} content 
 * @param {"before"|"after"|"overwrite"} type 
 */
HTMLElement.prototype.write = function HTMLElementWrite(content, type) { // Adicionar verificação
    switch (type) {
        case "before":
            this.innerHTML = content + this.innerHTML
            break;
        case "after":
            this.innerHTML += content
            break;
        default:
        case "overwrite":
            this.innerHTML = content
            break;
    }
}

/**
 * Executa uma função baseada no valor atual do input
 * @param {Function(value, otherArgs)} executeFunction 
 * @param {Array} otherArgs
 */
function processInputValue(executeFunction, otherArgs) {
    if (this.value == undefined) this.value = "";

    executeFunction(this.value, otherArgs)
}
HTMLInputElement.prototype.processValue = processInputValue;
HTMLSelectElement.prototype.processValue = processInputValue;
HTMLMeterElement.prototype.processValue = processInputValue;
HTMLProgressElement.prototype.processValue = processInputValue;

/**
 * Remove um trecho de texto e retorna o novo.
 * @param {string} text
 * @returns {string}
 */
String.prototype.removeText = function removeText(text) {
    return this.split(text).join('');
};

/**
 * Diz se esta string é elemento de uma lista.
 * @param {string[]} list 
 * @returns {boolean}
 */
String.prototype.isIn = function isIn(list) {
    let isIn = false;
    list.forEach(element => {
        if (this == element) isIn = true;
    })
    return isIn;
}

/**
 * Transforma um número em hexadecinal
 * @returns {string}
 */
Number.prototype.toHexadecimal = function toHexadecimal() {
    let number = Math.floor(this);
    return number.toString(16);
}

/**
 * Verifica se um número está entre dois outros
 * @param {number} min Valor mínimo da verificação
 * @param {number} max Valor máximo da verificação
 * @param {boolean} includeEquals Inclue valores iguais ao mínimo ou máximo como verdadeiros
 * @param {boolean} complexReturn Muda o retorno para um objeto com detalhes da comparação
 * @returns {boolean|object}
 */
Number.prototype.isBetween = function isBetween(min, max, includeEquals, complexReturn) {
    if (min > max) [min, max] = [max, min];

    let isBetween = true;
    let rel = "between"
    let isEqualTo = null;
    if (includeEquals) {
        if (this > max) { isBetween = false; rel = "bigger" };
        if (this < min) { isBetween = false; rel = "smaller" };
        if (this == max) { isEqualTo = "max" }
        if (this == min) { isEqualTo = "min" }
    } else {
        if (this >= max) { isBetween = false; rel = "bigger" };
        if (this <= min) { isBetween = false; rel = "smaller" };
        if (this == max) { isEqualTo = "max" }
        if (this == min) { isEqualTo = "min" }
    }

    if (complexReturn) {
        let newObject = {}
        newObject.is = isBetween;
        newObject.rel = rel;
        newObject.includeEquals = includeEquals;
        newObject.isEqualTo = isEqualTo;
        newObject.originalValue = this + 0;
        isBetween = newObject;
    }

    return isBetween;
}

/**
 * Preenche um array até que ele esteja completamente cheio e retorna o novo array.
 * @param {any} filler 
 * @param {number} lengthNeeded 
 * @param {"before"|"after"} pos
 * @returns {array}
 */
Array.prototype.fillUntil = function fillUntil(filler, lengthNeeded, pos) {
    if (typeof lengthNeeded !== "number") lengthNeeded = 0;
    if (typeof pos !== "string") return;
    if (pos !== "after" && pos !== "before") pos = "after"

    let array = [];
    for (let i = 0; i < this.length; i++) {
        array[i] = this[i];
        
    }

    while (array.length < lengthNeeded) {
        if (pos == "after") {
            array.push(filler)
        }
        if (pos == "before") {
            array.unshift(filler)
        }
    }
    return array
}

/**
 * Retorna o valor invertido de uma string.
 * @returns {string}
 */
String.prototype.reverse = function reverse() {
    return this.split('').reverse().join('')
}

/**
 * Verifica se o tamanho de uma `string` está entre dois valores.
 * @param {Number} min Valor mínimo a ser verificado.
 * @param {Number} max Valor máximo a ser verificado. Se não for definido, será `Infinity`.
 * @returns {boolean}
 */
String.prototype.isBetween = function isBetween(min, max = Infinity) { // Atualizar para igual isBetween de números.
    if (max == undefined) max = Infinity;
    if (min > max) [max, min] = [min, max];

    let is = true;
    
    if (this.length < min) is = false;
    if (this.length > max) is = false;

    return is;
}

/**
 * Preenche uma `string` até alcançar o tamanho desejado.
 * @param {char} filler 
 * @param {number} lengthNeeded 
 * @param {"before"|"after"} pos 
 * @returns 
 */
String.prototype.fillUntil = function fillUntil(filler, lengthNeeded, pos = "after") {
    if (typeof lengthNeeded !== "number") lengthNeeded = 0;
    if (typeof pos !== "string") return;
    if (pos !== "after" && pos !== "before") pos = "after"
    if (filler.length > 1) filler = filler[0];

    let array = this.split('');
    for (let i = 0; i < this.length; i++) {
        array[i] = this[i];
    }

    while (array.length < lengthNeeded) {
        if (pos == "after") {
            array.push(filler)
        }
        if (pos == "before") {
            array.unshift(filler)
        }
    }
    return array.join('')
}

Number.prototype.formatInMoneyBR = function formatInMoneyBR(useBeforePlacer = true) {
    let moneyArray = this.toString().split('.');
    let integer = moneyArray[0];
    let decimal = moneyArray[1];

    if (decimal == undefined) decimal = "0";
    decimal = decimal.fillUntil('0', 2);

    let integerChars = integer.split('').reverse();
    integer = "";
    for (let i = 0; i < integerChars.length; i++) {
        integer += integerChars[i];
        if ((i + 1) % 3 == 0) integer += '.';
    }
    integer = integer.split('').reverse().join('');
    if (integer.startsWith(".")) integer = integer.slice(1);

    let beforePlacer = "";
    if (useBeforePlacer) beforePlacer = "R$";

    return beforePlacer + integer + "," + decimal;
}
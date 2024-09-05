    // Console Style

const styleC = {};
styleC.simple = "color: ";
styleC.grey = "color: grey";
styleC.code = "color: gold; text-decoration: underline";
styleC.type = "color: lightblue; text-decoration: underline";
styleC.number = "color: springgreen"

    // Storage Object and Methods

const storage = {};
storage.prefix = "aulasweb" + "_"

/**
 * Altera o prefixo das funções de storage.
 * @param {String} newPrefix `String` entre 1 e 30 caracteres.
 * @returns {void}
 */
storage.newPrefix = function storageSetNewPrefix(newPrefix) {
    let simple = "color: white"; let code = "color: gold"
    if (typeof newPrefix !== "string") return console.log(`%cErro com %cstorage.newPrefix%c:\n\t> Novo prefixo de tipo inválido. Insira o tipo %cstring%c.\n\t> Tipo do valor inserido: %c${typeof newPrefix}%c.`, styleC.simple, styleC.code, styleC.simple, styleC.type, styleC.simple, styleC.type, styleC.simple);
    if (!newPrefix.isBetween(1, 30)) return console.log(`%cErro com %cstorage.newPrefix%c:\n\t> Novo prefixo precisa de um valor de tamanho válido %c(Entre 1 e 30 caracteres)%c.\n\t> Tamanho do valor inserido: %c${newPrefix.length}%c.`, styleC.simple, styleC.code, styleC.simple, styleC.grey, styleC.simple, styleC.number, styleC.simple);

    storage.prefix = newPrefix + "_";
}

/**
 * Salva um valor no armazenamento do navegador - `window`
 * @param {String} infoName Nome do identificador do valor 
 * @param {String} info Valor a ser armazenado
 * @param {"local"|"session"} storageType Armazenamento que será usado
 * @returns {void}
 */
storage.set = function storageSaveInfo(infoName, info, storageType) {
    if (typeof infoName !== "string" || infoName == "" || infoName == undefined) return console.log(`Escrita falha definir um nome de local: Nome inválido.`);
    if (typeof info !== "string" || info == "" || info == undefined) return console.log(`Escrito falha ao definir um valor: Valor inválido.`);

    if (storageType == undefined) return;
    if (!storageType.isIn(['local', 'session'])) return;

    switch (storageType) {
        case "local":
            localStorage.setItem(storage.prefix + infoName, info);
            break;
        case "session":
            sessionStorage.setItem(storage.prefix + infoName, info);
            break;
        default:
            console.log(`Escrita de ${infoName} falha: Não possível definir tipo de armazenamento`);
            break;
    }
}

/**
 * Resgata um valor de algum armazenamento
 * @param {String} infoName Nome do identificador do valor
 * @param {"local"|"session"} targetStorage Tipo de armazenamento a ser procurado
 * @returns {String} Valor armazenado no local
 */
storage.get = function storageGetInfo(infoName, targetStorage) {
    if (typeof infoName !== "string" || infoName == "" || infoName == undefined) return console.log(`Busca falha ao procurar o nome do local: Nome inválido.`);
    if (targetStorage == undefined) return;
    if (!targetStorage.isIn(['local', 'session'])) targetStorage = "local";

    switch (targetStorage) {
        case "local":
            return localStorage.getItem(storage.prefix + infoName);
            break;
        case "session":
            return sessionStorage.getItem(storage.prefix + infoName);
            break;
        default:
            break;
    }
}

/**
 * Remove uma linha de armazenamento
 * @param {String} infoName 
 * @param {"local"|"session"} targetStorage 
 * @returns {void}
 */
storage.remove = function storageRemoveInfo(infoName, targetStorage) {
    if (typeof infoName !== "string" || infoName == "" || infoName == undefined) return console.log(`Busca falha ao procurar o nome do local: Nome inválido.`);
    if (targetStorage == undefined) return;
    if (!targetStorage.isIn(['local', 'session'])) targetStorage = "local";

    switch (targetStorage) {
        case "local":
            return localStorage.removeItem(storage.prefix + infoName);
            break;
        case "session":
            return sessionStorage.removeItem(storage.prefix + infoName);
            break;
        default:
            break;
    }
}

/**
 * Limpa o armazenamento local em todos os índices
 * @param {"both"|"local"|"session"} storageType Tipo do armazenamento a ser apagado (`both` como padrão)
 * @returns {void}
 */
storage.clear = function storageClear(storageType = "both") {
    function clearLocal() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(storage.prefix)) localStorage.removeItem(key)
        })
    }
    function clearSession() {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith(storage.prefix)) sessionStorage.removeItem(key)
        })
    }

    switch (storageType) {
        case "local":
            clearLocal();
            break;
        case "session":
            clearSession();
            break;
        case "both":
            clearLocal()
            clearSession()
            break;
        default:
            break;
    }
}

storage.localSet = (infoName, info) => { storage.set(infoName, info, 'local') }
storage.sessionSet = (infoName, info) => { storage.set(infoName, info, 'session') }
storage.localGet = (infoName) => { return storage.get(infoName, 'local') }
storage.sessionGet = (infoName) => { return storage.get(infoName, 'session') }
storage.localRemove = (infoName) => { storage.remove(infoName, 'local') }
storage.sessionRemove = (infoName) => { storage.remove(infoName, 'session') }
storage.localClear = () => { storage.clear('local') }
storage.sessionClear = () => { storage.clear('session') }
storage.fullClear = () => { storage.clear('both') }

    // Theme Object and Methods

const theme = {}
theme.color = {}

theme.list = ['light', 'dark', 'beige']
theme.default = 'light'
theme.color.list = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
theme.color.default = 'blue'

/**
 * Define o tema mostrado no site
 * @param {String} themeName 
 */
theme.set = function themeSet(themeName) {
    if (typeof themeName !== 'string') themeName = theme.default;
    if (!themeName.isIn(theme.list)) themeName = theme.default;

    storage.localSet('theme', themeName);

    theme.list.forEach(themeInList => {
        document.getElementsByTagName('html')[0].classList.remove(themeInList + "Theme")

        if (themeInList == themeName) {
            document.getElementsByTagName('html')[0].classList.add(themeName + "Theme")
        }
    })
};

theme.color.set = function themeColorSet(colorName) {
    if (typeof colorName !== "string") colorName = theme.color.default
    if (!colorName.isIn(theme.color.list)) colorName = theme.color.default

    storage.localSet('theme-color', colorName)

    theme.color.list.forEach(colorInList => {
        document.getElementsByTagName('html')[0].classList.remove(colorInList + 'Main')

        if (colorInList == colorName) {       
            document.getElementsByTagName('html')[0].classList.add(colorInList + 'Main')
        }
    })
}

theme.updateInputs = function themeUpdate() {
    inputs.update('themeSelector', storage.localGet('theme'), true)
    inputs.update('mainColorSelector', storage.localGet('theme-color'), true)
}

theme.load = function themeLoad() {
    theme.set(storage.localGet('theme'));
    theme.color.set(storage.localGet('theme-color'));

    theme.updateInputs();
}

    // Inputs Object and Methods

const inputs = {}

inputs.update = function inputUpdate(inputName, requiredValue, selectElement = false) { // Refazer para englobar inputs de radio, checkbox e select
    document.getElementsByName(inputName).forEach(element => {
        if (selectElement) {
            element.value = requiredValue;
        } else {
            if (element.value == requiredValue) {
                element.checked = true;
            }
        }
    })
}

inputs.applyEmptyPlaceholder = function inputApplyPlaceholder() {
    document.getElementsByTagName('input').forEach(element => {
        if (!element.placeholder == "") return;
        // if (!element.required) return;
        if (element.classList.contains('ignorePlaceholderWrite')) return;
        element.placeholder = "";
    })
}

    // Search and Methods

const search = {};

/**
 * Procura por um elemento ou vários na página.
 * @param {String} target 
 * @param {"id"|"class"|"tag"|"name"} type 
 * @returns {HTMLElement|HTMLCollection}
 */
search.element = function searchElement(target, type) { // ADICIONAR FILTRO, objeto com: ignoreClass: [], ignoreId: [], ignoreName: [], ignoreTag: [], ignoreProperty: { property: value|"all" }; Adicionar tipo de query (queryAll mas se achar somente um elemento, retorna ele)
    if (typeof target !== "string") return
    if (typeof type !== "string") return
    if (!type.isIn(['id', 'class', 'tag', 'name'])) return

    switch (type) {
        case "class":
            return document.getElementsByClassName(target)
        case "id":
            return document.getElementById(target)
        case "tag":
            return document.getElementsByTagName(target)
        case "name":
            return document.getElementsByTagName(target)
    }
}

/**
 * Percorre um `array` procurando por um objeto que contenha a propriedade citada, retornando o primeiro a ser encontrado.
 * @param {object[]} array 
 * @param {string} propertyName 
 * @param {any} propertyValue
 * @returns {number} Índice onde está posicionado o elemento. `-1` caso não encontre.
 */
search.objectPropertyInArray = function searchObjectPropertyInObjectArray(array, propertyName, propertyValue) { // Adicionar verificação depois por favor
    let propertyIndex = -1;

    array.forEach((object, index) => {
        Object.keys(object).forEach(key => {
            if (propertyIndex !== -1) return;
            if (object[key] == propertyValue && key == propertyName) return propertyIndex = index;
        })
    })

    return propertyIndex;
}

    // Navigation

function navigateTo(destination) {
    window.location.href = destination;
}

    // Economic Simulator

const bank = {}
const interest = {} // Juro = Interest

// Adicionar função de load() para carregar salvos em session e local (Procura primeiro em session, se não achar, pula para local).
// Adicionar salvamento automatico da lista de transações em session e opção externa (função) de salvar no local.

bank.transactionList = [];

bank.getTotal = function bankGetTotalTransactions() {
    let total = 0
    bank.transactionList.forEach(transaction => {
        total += transaction.value;
    })
    return total
}

bank.getTotalInputs = function bankGetTotalInputs() {
    let total = 0
    bank.transactionList.forEach(transaction => {
        if (transaction.direction !== "in") return;
        total += transaction.value;
    })
    return total
}

bank.getTotalOutputs = function bankGetTotalOutputs() {
    let total = 0
    bank.transactionList.forEach(transaction => {
        if (transaction.direction !== "out") return;
        total += transaction.originalValue;
    })
    return total
}

bank.update = function bankUpdate() {
    const transactions = search.element('bankTransactionsDisplay', 'id');
    const total = search.element('bankTotalValueDisplay', 'id');
    const inputValues = search.element('bankInputsValueDisplay', 'id');
    const outputValues = search.element('bankOutputsValueDisplay', 'id');

    if (total !== null) {total.write(bank.getTotal());}
    if (inputValues !== null) inputValues.write(bank.getTotalInputs());
    if (outputValues !== null) outputValues.write(bank.getTotalOutputs());

    if (transactions !== null) {
        let finalText = ``;
        bank.transactionList.forEach(transaction => {
            let directionClass = ""
            switch (transaction.direction) {
                case "in":
                    directionClass = "inputTransaction"
                    break;
                case "out":
                    directionClass = "outputTransaction"
                    break;
            }
            finalText += `<li class="${directionClass}"> <span class="transactionName">${transaction.name}</span> <span class="transactionValue">${transaction.originalValue}</span> <span class="transactionDirection">${transaction.direction.replace('in', 'Entrada').replace('out', 'Saída')}</span> <span class="transactionDate">${transaction.date}</span> <button class="transactionButton" onclick="bank.remove('${transaction.id}')">Remover</button></li>`
        })
        transactions.write(finalText)
    }
}

bank.newTransaction = function bankNewTransaction(name, value, date, direction) {
    if (typeof name !== "string") return;
    if (!name.isBetween(1, 50)) return;
    if (typeof value !== "number") return;
    if (value == 0) return;
    if (date.constructor !== Date) return;
    if (typeof direction !== "string") return;
    if (!direction.isIn(['in', 'out'])) return;

    let originalValue = value;
    if (value < 0) value = Math.abs(value);
    if (direction == "out") value = value * -1;

    let actDate = new Date();

    let id = `${actDate.getFullYear()}${(actDate.getMonth() + 1).toString().fillUntil('0', 2, 'before')}${actDate.getDate().toString().fillUntil('0', 2, 'before')}-${actDate.getHours().toString().fillUntil('0', 2, 'before')}${actDate.getMinutes().toString().fillUntil('0', 2, 'before')}${actDate.getSeconds().toString().fillUntil('0', 2, 'before')}${actDate.getMilliseconds().toString().slice(0, 2).fillUntil('0', 2, 'before')}`

    date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    bank.transactionList.push({ name: name, value: value, originalValue: originalValue, date: date, direction: direction, id: id });
    bank.update()
}

bank.removeTransaction = function bankRemoveTransaction(id) {
    // Adicionar verificação

    let newList = [];
    bank.transactionList.forEach(transaction => {
        if (transaction.id == id) return;
        newList.push(transaction);
    })

    bank.transactionList = newList;
    bank.update();
}

bank.new = (name, value, date, direction) => { bank.newTransaction(name, value, date, direction) };
bank.remove = (id) => { bank.removeTransaction(id) };
bank.list = bank.transactionList;

    // Pattern Classes

class patternList {
    constructor() {}
    write() {
        Object.values(this).forEach(pattern => {
            pattern.write()
        })
    }
}

class patternElement {
    constructor(target, type, rewriteType = "overwrite", value) {
        this.target = target;
        this.type = type; // Adicionar query aqui também
        this.value = value;
        this.rewriteType = rewriteType;
        if (!this.rewriteType.isIn(["overwrite", "after", "before"])) this.rewriteType = "overwrite";
    }
    write() {
        function posValue(element, value, type) {
            if (type == "before") return value + element.innerHTML;
            if (type == "after") return element.innerHTML + value;
            return value;
        }
        switch (this.type) {
            case "id":
                let element = document.getElementById(this.target);
                if (!element) return;
                if (!element.classList) return;
                this.value = posValue(element, this.value, this.rewriteType);
                if (element.classList.contains('ignorePatternWrite')) return;
                element.innerHTML = this.value
                break;
            case "class":
                document.getElementsByClassName(this.target).forEach(element => {
                    this.value = posValue(element, this.value, this.rewriteType);
                    if (element.classList.contains('ignorePatternWrite')) return;
                    element.innerHTML = this.value}
                )
                break;
            case "tag":
                document.getElementsByTagName(this.target).forEach(element => {
                    this.value = posValue(element, this.value, this.rewriteType);
                    if (element.classList.contains('ignorePatternWrite')) return;
                    element.innerHTML = this.value}
                )
                break;
            default:
                break;
        }
    }
}
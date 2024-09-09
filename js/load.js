bank.load()

search.element('numberInput', 'class').forEach(element => { element.pattern = "[0-9\.]{1,}" });
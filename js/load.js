bank.update()

search.element('currencySubmit', 'id').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = search.element('currencySubmit', 'id');

    bank.newTransaction(form.name.value, parseFloat(form.value.value), new Date(form.date.value), form.direction.value);
})
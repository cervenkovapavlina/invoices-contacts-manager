class IssuedInvoiceModel {
    constructor(id, invoiceNumber, variableSymbol, issuedDate, customer) {
        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.variableSymbol = variableSymbol;
        this.issuedDate = issuedDate;
        this.customer = customer;
    }


}

export default IssuedInvoiceModel;
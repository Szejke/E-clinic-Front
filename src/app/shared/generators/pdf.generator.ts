import * as jsPDF from 'jspdf';
import {Transfer, TRANSFER_STATUSES_NAMES} from '../models/transfer.model';


export function pdfGenerator(data: Transfer[]) {
  const img = new Image;

  const doc = new jsPDF();
  doc.setFont('times');
  doc.setFontStyle('normal')
  doc.setFontSize(20);

  for (let i = 0; i < data.length; i++) {
    doc.setPage(i + 1);
    doc.text(35, 30, 'POTWIERDZENIE WYKONANIA PRZELEWU');
    drawFooter();
    getTransferInfo(i);
  }

  doc.save('Transfer.pdf');

  function getDate(i) {
    const date = data[i].transactionDate;
    const separator = '.';
    return date['dayOfMonth'] + separator + date['month'] + separator + date['year'];
  }

  function getTransferInfo(i) {
    doc.setFontSize(14);
    doc.text(20, 50, 'Transakcja numer: ' + data[i].id);
    doc.line(20, 55, 160, 55);
    doc.setFontSize(12);
    console.log(data[i].transactionDate);
    doc.text(25, 65, 'Data transakcji: ' + getDate(i));
    doc.text(25, 75, 'Kwota transakcji: ' + data[i].amount + ' PLN');
    doc.text(25, 85, 'Typ transakcji: ' + data[i].type.name);
    doc.text(25, 95, 'Status: ' + TRANSFER_STATUSES_NAMES.get(data[i].status));
    doc.setFontSize(14);
    doc.text(20, 110, 'Odbiorca:');
    doc.setFontSize(12);
    doc.line(20, 115, 160, 115);
    doc.text(25, 125, 'Nazwa: ' + data[i].beneficiary.fullName);
    doc.text(25, 135, 'Numer konta: ' + data[i].beneficiary.accountIban);
    if (data[i].beneficiary.address) {
      doc.text(25, 145, 'Adres: ' + data[i].beneficiary.address);
    }
    if (data.length !== 1 && i !== data.length - 1) {
      doc.addPage();
    }
  }

  function drawFooter() {
    doc.line(0, 275, 210, 275);
    doc.setFontSize(10);
    doc.text(140, 280, 'E przychodnia, ');
    doc.text(140, 285, 'Filia: Kielce, Warszawska 7, 25-314 Kielce');
    doc.setFontSize(20);
  }
}

export function receiptGenerator(receipt: string) {
  const img = new Image;

  const doc = new jsPDF();
  doc.setFont('times');
  doc.setFontStyle('normal')
  doc.setFontSize(20);

  doc.setPage(1);
  doc.text(35, 30, 'RECEPTA');
  doc.text(20, 50, receipt);
  drawFooter()

  doc.save('receipt.pdf');

  function drawFooter() {
    doc.line(0, 275, 210, 275);
    doc.setFontSize(10);
    doc.text(140, 280, 'E przychodnia, ');
    doc.text(140, 285, 'Filia: Kielce, Warszawska 7, 25-314 Kielce');
    doc.setFontSize(20);
  }
}

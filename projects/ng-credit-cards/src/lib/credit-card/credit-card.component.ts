import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Payment from 'payment';

/**
 * Componente que exibe a animação de cartão de crédito
 */
@Component({
  selector: 'ncc-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit, OnChanges {
  /** Emissor do cartão de crédito  */
  @Input() public issuer: string;
  /** Número do cartão de crédito  */
  @Input() public number: string | number = '';
  /** Nome do titular do cartão de crédito  */
  @Input() public name: string;
  /** Data de validade do cartão de crédito  */
  @Input() public expiry: string | number;
  /** CVC do cartão de crédito  */
  @Input() public cvc: string | number;
  /** Indica qual campo está com o foco  */
  @Input() public focused: string;
  /** Exibe ou não a previsualização dos dados no cartão  */
  @Input() public preview: boolean;

  /** Array de cartões aceitos */
  @Input() public acceptedCards = [];

  /** Strings de localização */
  @Input() public locale: { valid: string } = {
    valid: 'valid thru',
  };

  /** Strings de placeholders */
  @Input() public placeholders: { name: string } = {
    name: 'YOUR NAME HERE',
  };

  ngOnInit() {
    this.setCards();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { acceptedCards } = this;

    if (
      changes.acceptedCards &&
      changes.acceptedCards.toString() !== acceptedCards.toString()
    ) {
      this.setCards();
    }
  }

  /**
   * Retorna a bandeira do cartão de crédito para exibição
   */
  getIssuer() {
    const { issuer, preview } = this;
    return preview && issuer ? issuer.toLowerCase() : this.getOptions().issuer;
  }

  /**
   * Retorna o número do cartão para exibição
   */
  getNumber() {
    const { number, preview } = this;

    let maxLength = preview ? 19 : this.getOptions().maxLength;
    let nextNumber =
      typeof number === 'number'
        ? number.toString()
        : number.replace(/[A-Za-z]| /g, '');

    if (isNaN(parseInt(nextNumber, 10)) && !preview) {
      nextNumber = '';
    }

    if (maxLength > 16) {
      maxLength = nextNumber.length <= 16 ? 16 : maxLength;
    }

    if (nextNumber.length > maxLength) {
      nextNumber = nextNumber.slice(0, maxLength);
    }

    while (nextNumber.length < maxLength) {
      nextNumber += '•';
    }

    if (['amex', 'dinersclub'].includes(this.issuer)) {
      const format = [0, 4, 10];
      const limit = [4, 6, 5];
      nextNumber = `${nextNumber.substr(
        format[0],
        limit[0]
      )} ${nextNumber.substr(format[1], limit[1])} ${nextNumber.substr(
        format[2],
        limit[2]
      )}`;
    } else if (nextNumber.length > 16) {
      const format = [0, 4, 8, 12];
      const limit = [4, 7];
      nextNumber = `${nextNumber.substr(
        format[0],
        limit[0]
      )} ${nextNumber.substr(format[1], limit[0])} ${nextNumber.substr(
        format[2],
        limit[0]
      )} ${nextNumber.substr(format[3], limit[1])}`;
    } else {
      for (let i = 1; i < maxLength / 4; i++) {
        const space_index = i * 4 + (i - 1);
        nextNumber = `${nextNumber.slice(0, space_index)} ${nextNumber.slice(
          space_index
        )}`;
      }
    }

    return nextNumber;
  }

  /**
   * Retorna as opções de bandeira
   */
  getOptions() {
    const number = <string>this.number;
    const issuer = Payment.fns.cardType(number) || 'unknown';

    let maxLength = 16;

    if (issuer === 'amex') {
      maxLength = 15;
    } else if (issuer === 'dinersclub') {
      maxLength = 14;
    } else if (['hipercard', 'mastercard', 'visa'].includes(issuer)) {
      maxLength = 19;
    }

    return {
      issuer,
      maxLength,
    };
  }

  /**
   * Retorna a validade do cartão para exibição
   */
  getExpiry() {
    const { expiry = '' } = this;
    const date = typeof expiry === 'number' ? expiry.toString() : expiry;
    let month = '';
    let year = '';

    if (date.includes('/')) {
      [month, year] = date.split('/');
    } else if (date.length) {
      month = date.substr(0, 2);
      year = date.substr(2, 6);
    }

    while (month.length < 2) {
      month += '•';
    }

    if (year.length > 2) {
      year = year.substr(2, 4);
    }

    while (year.length < 2) {
      year += '•';
    }

    return `${month}/${year}`;
  }

  /**
   * Seta os cartões aceitos
   */
  setCards() {
    const { acceptedCards } = this;
    let newCardArray = [];

    if (acceptedCards.length) {
      (<any>Payment).getCardArray().forEach(d => {
        // @ts-ignore
        if (acceptedCards.includes(d.type)) {
          newCardArray.push(d);
        }
      });
    } else {
      newCardArray = newCardArray.concat((<any>Payment).getCardArray());
    }

    (<any>Payment).setCardArray(newCardArray);
  }

  /**
   * Verifica se o número do cartão ultrapassou o limite de caracteres
   * @param number
   */
  isLargeNumber(number) {
    return number.replace(/ /g, '').length > 16;
  }
}

import { NgModule } from '@angular/core';
import { NgCreditCardsComponent } from './ng-credit-cards.component';
import { CreditCardComponent } from './credit-card/credit-card.component';


@NgModule({
  declarations: [NgCreditCardsComponent, CreditCardComponent],
  imports: [],
  exports: [NgCreditCardsComponent, CreditCardComponent]
})
export class NgCreditCardsModule { }

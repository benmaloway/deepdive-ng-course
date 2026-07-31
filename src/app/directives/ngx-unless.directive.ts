// directives with the ngx- prefix are custom directives used in same way as structural directives that are pre-packaged like *ngIf, *ngFor, etc

import { Directive } from '@angular/core';

@Directive({
  selector: '[ngxUnless]',
})
export class NgxUnlessDirective {

  /* constructor {

  } */
}

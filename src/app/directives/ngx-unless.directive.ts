// directives with the ngx- prefix are custom directives used in same way as structural directives that are pre-packaged like *ngIf, *ngFor, etc

import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';


@Directive({
  selector: '[ngxUnless]',
})
export class NgxUnlessDirective {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef
  ) {

  }

  visible = false;

  @Input()
  set ngxUnless(condition: boolean) {

    if (!condition && !this.visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;
    } else if (condition && this.visible) {
      this.viewContainer.clear();
      this.visible = false;
    }

  }

}

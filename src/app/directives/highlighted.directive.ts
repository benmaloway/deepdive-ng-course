// This directive is used to highlight a course-card component when it is selected. 
// The directive is applied to the course-card component in the app.component.html file. 
// The directive uses the HostBinding decorator to bind the 
// className property of the host element (the course-card component) to the cssClasses property of the directive. 
// The cssClasses property returns the string "highlighted", 
// which adds the highlighted class to the course-card component when it is selected.
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[highlighted]', // Does not need to be same name of the input-attr 'highlighted', but CAN be as with current example.
  exportAs: 'hl'
})
export class HighlightedDirective {

  constructor() { 
    //console.log('HighlightedDirective.constructor()');
  }
  // This allows passing of an expression directly from the html via the [highlighted] input-attribute, then used in getter below.
  @Input('highlighted')
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  // Specify which dom element property to bind to. In this case, we are binding to the className property of the host element.
  /* @HostBinding('className')
  
  // Typescript getters are used to define a property that is computed based on other properties. 
  get cssClasses() {
    return "highlighted";
  } */
  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }
/*     @HostBinding('style.border')
    get cssClasses() {
      return "1px solid red";
    } */

  @HostBinding('attr.disabled')
    get disabled() {
    return "true";
  }

  @HostListener('mouseover', ['$event'])
  mouseOver($event) {
    console.log($event)
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  // To use in exported instance of class with 'hl'
  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  } 


}

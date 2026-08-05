import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, QueryList, TemplateRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';

// default : encapsulation: ViewEncapsulation.Emulated
// This is the default mode and uses Angular's built-in emulation of the Shadow DOM to encapsulate styles. This means that styles defined in a component will only affect that component and not any other components. This is the most common form of encapsulation used in Angular.

// none : encapsulation: ViewEncapsulation.None
// None negates need for :host-context, ::host and ::ng-deep but also removes encapsulation so styles can bleed into other components.  Use with caution.


// shadowDom : encapsulation: ViewEncapsulation.ShadowDom
// The shadowDom encapsulation mode uses the browser's native shadow DOM implementation to encapsulate styles. This means that styles defined in a component will not affect any other components, and styles defined outside of the component will not affect the component. This is the most secure form of encapsulation, but it may not be supported in all browsers.

// Do not use ViewEncapsulation.Native as it is deprecated and will be removed in future versions of Angular.  Use ViewEncapsulation.ShadowDom instead.

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    constructor() {

    }

    ngOnInit() {

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}

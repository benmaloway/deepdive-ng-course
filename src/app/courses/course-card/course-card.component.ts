import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  Attribute,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import {Course} from '../../model/course';
import {CoursesService} from '../courses.service';


@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    // the default change detection mechanism scans the whole component tree for changes, which is usually ok for small applications but can be inefficient for large applications.  The alternative is onPush change detection.
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})

export class CourseCardComponent implements OnInit, OnDestroy, OnChanges, AfterContentChecked, AfterViewChecked, AfterContentInit, AfterViewInit, DoCheck {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();
    
    // constructors should have no logic and is used for dependency injection.
    constructor(
      private coursesServices: CoursesService,
      @Attribute('type') private type: string
    ) {
      // The course data is not yet defined at this point.
      //console.log('constructor', this.course);
    }

    // Keep a simple snapshot to detect changes not caught by default change detection
    private _lastDescription: string | undefined;

    ngDoCheck(): void {
      //console.log('ngDoCheck');
      if (!this.course) {
        return;
      }

      // Detect external mutations to the course description
      if (this.course.description !== this._lastDescription) {
        /* console.log('ngDoCheck - description changed', {
          previous: this._lastDescription,
          current: this.course.description,
        }); */
        this._lastDescription = this.course.description;
      }
    }

    // Your logic needs to go into lifecycle hooks.
    ngOnInit() {
      //console.log('ngOnInit', this.course);
    }
    // This is rarely needed as async pipe should automatically deal with cleaning up observable connections.
    ngOnDestroy() {
      // unsubscribe from any open connections.
      //console.log('ngOnDestroy');
    }

    ngOnChanges(changes: SimpleChanges): void {
      //console.log("ngOnChanges", changes);
    }

    // Use this very rarely because it fires quite ofent.
    ngAfterContentChecked() {
      //console.log('ngAfterContentChecked');
      // Only use for light updates, ok for last second modification.  Will not work on other rendered values like urls used in the content part of the component.  Angular always checks the content part for changes.
      //this.course.description = 'ngAfterContentChecked';
      //this.course.category = 'ADVANCED';
    }

    // After checking content to determine if re-render is needed, Angular checks the template itself to see if something has changed.
    ngAfterViewChecked(): void {
      //console.log('ngAfterViewChecked');
      // After it has checked all the expressions in the component, so further modification of the data will fire an error that an expression has changed and confuses Angular as to what to do next on rendered dom elements.
      // So the main use case would be a good place to functionality like scrolling to the bottom of a list.  You also use this rarely to avoid performance issues.
    }

    ngAfterContentInit() {
      //console.log('ngAfterContentInit');
    }

    ngAfterViewInit() {
      //console.log('ngAfterViewInit');
    }

    onTitleChanged(newTitle: string) {
      this.course.description = newTitle;
    }

    onSaveClicked(description:string) {

      this.courseEmitter.emit({...this.course, description});

    }

}
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
} from '@angular/core';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';


@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    // the default change detection mechanism scans the whole component tree for changes, which is usually ok for small applications but can be inefficient for large applications.  The alternative is onPush change detection.
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})

export class CourseCardComponent implements OnInit, OnDestroy, OnChanges {

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
      console.log('constructor', this.course);
    }

    // Your logic needs to go into lifecycle hooks.
    ngOnInit() {
      console.log('ngOnInit', this.course);
    }
    // This is rarely needed as async pipe should automatically deal with cleaning up observable connections.
    ngOnDestroy() {
      // unsubscribe from any open connections.
      console.log('ngOnDestroy');
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log("ngOnChanges", changes);
    }

    onTitleChanged(newTitle: string) {
      this.course.description = newTitle;
    }

    onSaveClicked(description:string) {

      this.courseEmitter.emit({...this.course, description});

    }

}
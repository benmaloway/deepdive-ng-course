import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  Attribute,
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

export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    constructor(
      private coursesServices: CoursesService,
      // The @Attribute decorator is used to inject the value of an attribute from the host element into the component. In this case, we are injecting the value of the type attribute from the course-card element into the type property of the CourseCardComponent. This allows us to customize the behavior of the component based on the value of the type attribute.  This value would normally not be changed after the component is created, so we can use it to determine how to render the component. For example, we could have different styles for beginner and advanced courses based on the value of the type attribute.
      @Attribute('type') private type: string
    ) {

    }

    ngOnInit() {

    }

    onTitleChanged(newTitle: string) {
      this.course.description = newTitle;
    }

    onSaveClicked(description:string) {

      this.courseEmitter.emit({...this.course, description});

    }

}
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
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
      private coursesServices: CoursesService
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
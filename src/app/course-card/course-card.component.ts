import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import { COURSES_SERVICE } from '../app.component';

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

    constructor(@Inject(COURSES_SERVICE) private coursesServices: CoursesService) {

    }

    ngOnInit() {

      console.log("coursesServices course card", this.coursesServices);

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }

}
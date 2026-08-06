import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy} from '@angular/core';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';


@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false,
    // If you remove this it will not create a unique instance of the service for this component. It will use the instance created in the root injector of the application. This is called a singleton service. The service is provided in the root injector of the application. The provider is responsible for creating an instance of the service and providing it to the component that needs it.
    providers: [
      {
        provide: CoursesService,
        useClass: CoursesService
      }
    ]
})

export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    constructor(private coursesServices: CoursesService) {

    }

    ngOnInit() {

      console.log("coursesServices course card " + this.coursesServices.id);

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }

}
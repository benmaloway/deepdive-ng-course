import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  Optional,
  Self,
  SkipSelf} from '@angular/core';
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

    constructor(
      // Use @Optional() to make the service optional. If the service is not provided, the application will not throw an error. This is useful for services that are not required for the application to function. For example, a logging service that is only used for debugging purposes. If the service is not provided, the application will still function normally.
      //@Optional() private coursesServices: CoursesService

      // This decorator makes sure the service can only come from the component itself
      // @Self() private coursesServices: CoursesService
      // This decorator makes sure the service can only come from the parent component. If the service is not provided in the parent component, the application will throw an error. This is useful for services that are required for the application to function. For example, a logging service that is required for the application to function. If the service is not provided in the parent component, the application will throw an error.
      @SkipSelf() private coursesServices: CoursesService
    ) {

    }

    ngOnInit() {

      
    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }

}
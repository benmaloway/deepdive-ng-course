import { CoursesService } from './services/courses.service';
import {Component, OnInit, Inject, Optional} from '@angular/core';
import { Observable } from 'rxjs';
import {Course} from './model/course';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
     providers: [
      {
         provide: CoursesService,
        useClass: CoursesService
      }
    ] 
})

export class AppComponent implements OnInit {

  // The dollar sign at the end of the variable name is a convention to indicate that this variable is an observable.
  courses$ : Observable<Course[]>;

  constructor(
    // Use @Optional() to make the service optional. If the service is not provided, the application will not throw an error. This is useful for services that are not required for the application to function. For example, a logging service that is only used for debugging purposes. If the service is not provided, the application will still function normally.
    //@Optional() private coursesService: CoursesService,
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {
    console.log('root component config:', config);
  }

  ngOnInit() {
    this.courses$ =  this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourse(course)
    // Will not trigger without subscribing to the observable. The observable will not be executed until it is subscribed to.
    .subscribe(
      () => {
        console.log("Course saved");
      },
      err => {
        console.log("Error saving course", err);
      }
    );
  }

}

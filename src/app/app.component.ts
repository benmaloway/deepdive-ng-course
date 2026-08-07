import { CoursesService } from './services/courses.service';
import {Component, OnInit, Inject} from '@angular/core';
import {Course} from './model/course';
import { AppConfig, CONFIG_TOKEN } from './config';
import { COURSES } from 'src/db-data';

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
  courses = COURSES;

  constructor(
    // Use @Optional() to make the service optional. If the service is not provided, the application will not throw an error. This is useful for services that are not required for the application to function. For example, a logging service that is only used for debugging purposes. If the service is not provided, the application will still function normally.
    //@Optional() private coursesService: CoursesService,
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {
    
  }

  ngOnInit() {
    
  }

  onEditCourse() {
    // With onPush change detection, the child component will not be checked for changes when the parent component is updated. This is because the child component is not aware of the changes made to the parent component. The child component will only be checked for changes when its input properties are updated. In this case, we are updating the course object in the parent component, but we are not updating the input property of the child component. Therefore, the child component will not be checked for changes and will not update its view.
    // To fix this, we need to create a new object and assign it to the input property of the child component. This will trigger change detection in the child component and update its view.
    const course = this.courses[0];
    const newCourse = {...course};
    newCourse.description = "New Value!";
    this.courses[0] = newCourse;
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

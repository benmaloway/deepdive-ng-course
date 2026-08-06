import { CoursesService } from './services/courses.service';
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {Course} from './model/course';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // In the event that you don't want to always specify a service that may or may not be injected, you need another approach.  Instead set it up in the service itself to be provided based on when needed called tree-shakable providers.  This is the preferred way to set up a service in Angular. It is provided in the root injector of the application. The provider is responsible for creating an instance of the service and providing it to the component that needs it.
   /*  providers: [
      {
        provide: CoursesService,
        useClass: CoursesService
      }
    ] */
})

export class AppComponent implements OnInit {

  // The dollar sign at the end of the variable name is a convention to indicate that this variable is an observable.
  courses$ : Observable<Course[]>;

  constructor(private coursesService: CoursesService) {
    console.log('root component constructor' + this.coursesService.id);
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

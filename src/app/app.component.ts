import { HttpClient } from '@angular/common/http';
import { CoursesService } from './services/courses.service';
import {Component, ChangeDetectionStrategy, InjectionToken, OnInit, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import {Course} from './model/course';

// Example of a manual injection token.  Normally classnames are used as unique identifiers for dependency injection.  However, in some cases, you may want to use a different identifier for a service.  In this case, we are using an injection token to create a unique identifier for the CoursesService.  This is useful when you want to have multiple instances of the same service in different parts of the application.  For example, you may want to have a different instance of the CoursesService for each module in the application.  In this case, you can use an injection token to create a unique identifier for each instance of the service.
function coursesServiceProvider(http:HttpClient) : CoursesService {
  return new CoursesService(http);
}

// Injection token is a way to create a unique identifier for a dependency injection provider. It is used to create a provider for a service that can be injected into a component or another service. The injection token is used to create a provider for the service in the root injector of the application. The provider is responsible for creating an instance of the service and providing it to the component that needs it. The injection token is used to create a provider for the service in the root injector of the application. The provider is responsible for creating an instance of the service and providing it to the component that needs it.
export const COURSES_SERVICE = new InjectionToken<CoursesService>('');


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false,
    providers: [
      {
        provide: COURSES_SERVICE,
        useFactory: coursesServiceProvider,
        deps: [HttpClient]
      }
    ]
})

// Angular can use the class name as unique id for injectable so this would be the typical for letting Angular do this

/*     providers: [
      {
        provide: CoursesService,
        useClass: CoursesService
      }
    ] 
    // OR shorthand
    providers: [
      {
        CoursesService
      }
    ] 
    
    */

export class AppComponent implements OnInit {

  // The dollar sign at the end of the variable name is a convention to indicate that this variable is an observable.
  courses$ : Observable<Course[]>;

  constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService) {

  }

  ngOnInit() {

    //const params = new HttpParams().set('pageNumber', '0').set('pageSize', '3');

    /* this.http.get('/api/courses', { params })
      .subscribe(
        courses => {
          console.log(this.courses);
          this.courses = courses;
        }); */
    // This will be moved to the courses service. The service will be responsible for fetching the data from the server and returning it to the component.
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

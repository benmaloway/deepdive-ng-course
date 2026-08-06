import { CoursesService } from './services/courses.service';
import {Component, OnInit, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import {Course} from './model/course';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    // Use custom config
    // To make tree-shakeable remove and provide the config in the root module. This will make the config available to all components and services in the application. The config can be provided using an InjectionToken, which is a unique identifier for the config values. The InjectionToken can be used to inject the config values into components and services that need them.
    /* providers: [
      {
        provide: CONFIG_TOKEN,
        useValue: () => APP_CONFIG
      }
    ] */
})

export class AppComponent implements OnInit {

  // The dollar sign at the end of the variable name is a convention to indicate that this variable is an observable.
  courses$ : Observable<Course[]>;

  constructor(
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

import { CoursesService } from './services/courses.service';
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {Course} from './model/course';

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

  constructor(private coursesService: CoursesService) {
    console.log('root component constructor' + this.coursesService.id);
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

import { Observable } from 'rxjs';
import { CoursesService } from './services/courses.service';
import {Component, OnInit, Inject, ChangeDetectionStrategy} from '@angular/core';
import {Course} from './model/course';
import { AppConfig, CONFIG_TOKEN } from './config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      {
        provide: CoursesService,
        useClass: CoursesService
      }
    ] 
})

export class AppComponent implements OnInit {

  // To use OnPush with async pipe, we need to use the observable directly in the template. The async pipe will subscribe to the observable and return the latest value it has emitted. When a new value is emitted, the async pipe marks the component to be checked for changes. The async pipe also unsubscribes automatically when the component is destroyed, preventing potential memory leaks.
  courses$: Observable<Course[]>;
 
  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {
    
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  onEditCourse() {

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

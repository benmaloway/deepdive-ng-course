import { Observable } from 'rxjs';
import { CoursesService } from './courses/courses.service';
import {Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck} from '@angular/core';
import {Course} from './model/course';
import { AppConfig, CONFIG_TOKEN } from './config';
import { COURSES } from 'src/db-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false,
})

export class AppComponent implements OnInit {

  courses: Course[] = COURSES;

  get coursesTotal(): number {
    return this.courses?.length ?? 0;
  }

  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {
    
  }

  ngOnInit() {
    this.coursesService.loadCourses()
    .subscribe(
      courses => {
        this.courses = courses;
        console.log('this.coursesTotal', this.coursesTotal);
      },
      err => {
        console.log("Error loading courses", err);
      }
    );
  }

  onEditCourse() {
    console.log('onEditCourse init this.courses[1].category = ', this.courses[1].category);
    this.courses[1].category = 'ADVANCED';
    console.log('onEditCourse CHANGE this.courses[1].category = ', this.courses[1].category);
  }

  onDeleteCourse() {

    // This will trigger ngOnDestroy to remove the card component and unsubscribe from any observables (which shouldn't be needed if using the async pipe).
    this.courses = [undefined];
  }

  // This hook only triggered when refreshing a reference to the input object. Just mutating a property of an input object does not register as a change.
  onChangeCourse() {
    /* const course = this.courses[0];

    const newCourse = {
      ...course,
      description: 'yo man ngOnChanges'
    }

    this.courses[0] = newCourse; */
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

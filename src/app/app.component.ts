import { Observable } from 'rxjs';
import { CoursesService } from './services/courses.service';
import {Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck} from '@angular/core';
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

export class AppComponent implements OnInit, DoCheck {

  courses: Course[];
  loaded:boolean = false;
 
  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    // ChangeDetectorRef is a service that can be injected into a component to allow the component to manually trigger change detection. This is useful when you have a component that is not being checked for changes by Angular's default change detection mechanism, such as when using OnPush change detection strategy. In this case, we are using ChangeDetectorRef to mark the component for check when the courses are loaded from the server.
    // This is an exceptional situation where the data is being loaded from the server very frequently and we want to update the view when the data is loaded. In most cases, you should not need to use ChangeDetectorRef and should rely on Angular's default change detection mechanism.
    private cd: ChangeDetectorRef
  ) {
    
  }
// This is a lifecycle hook that is called when the component is checked for changes. This is useful for debugging and understanding when change detection is being triggered. In this case, we are logging a message to the console when the component is checked for changes.
  ngDoCheck() {
    console.log("AppComponent checked for changes");
    // I only got it to work after clicking the edit course button.
    // NOTE, this only works fires after a subsequent change detection cycle, so it will not fire after the first change detection cycle.  This is because the first change detection cycle is triggered by the component being created and added to the DOM, and the subsequent change detection cycles are triggered by changes to the component's inputs or outputs.  In this case, we are using ChangeDetectorRef to mark the component for check when the courses are loaded from the server, which will trigger a subsequent change detection cycle.
    if (this.loaded) {
      this.cd.markForCheck();
      this.loaded = undefined;
    }
  }

  ngOnInit() {
    this.coursesService.loadCourses()
    .subscribe(
      courses => {
        this.courses = courses;
        this.loaded = true;
        console.log('ngOnit: courses loaded', courses);
        // Contrary to the instructor's vid, you still need markForCheck here as well as in ngDocheck
        this.cd.markForCheck();
      },
      err => {
        console.log("Error loading courses", err);
      }
    );
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

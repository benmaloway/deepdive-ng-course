import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class AppComponent implements OnInit {

  constructor() {

  }

  // @ViewChild(HighlightedDirective)
  // highlighted: HighlightedDirective;

  //If multiple items are using the highlighteddirective then query a specific component.
  @ViewChild(CourseCardComponent, {read: HighlightedDirective})
  highlighted: HighlightedDirective;

  courses = COURSES;

  ngOnInit() {
  }

  onToggle(isHighlighted: boolean) {
    console.log("isHighlighted = ", isHighlighted);
  }

  ngAfterViewInit() {
    console.log(this.highlighted)

  }

  onCourseSelected(course:Course) {

  }

}

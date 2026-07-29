import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false
})

// Use the life cycle hook AfterViewInit to access the view child elements after the view has been initialized.
export class AppComponent implements AfterViewInit {

  courses = COURSES;

  title = COURSES[0].description;

  startDate = new Date(2000, 0, 1);

  number = 9.99;



  // This decorator gets the first instance of the CourseCardComponent in the view and assigns it to the card property.
  @ViewChild(CourseCardComponent)
  card1: CourseCardComponent;
  
  // Returns the reference to the component instance of the CourseCardComponent in the view and assigns it to the card2 property.
  @ViewChild('cardRef2')
  card2: CourseCardComponent;

  // Returns the reference to the container dom native element.

  @ViewChild('cardRef3', { read: ElementRef })
  card3: ElementRef;


  // Returns the reference to the container div element in the view and assigns it to the containerDiv property.
  // You cannot use this to get deeper children of the component. You can only get the first level child elements of the component.
  @ViewChild('container')
  containerDiv: ElementRef;

  // This returns a QueryList of all the CourseCardComponent instances in the view and assigns it to the cards property. You can use this to get all the child components of a specific type in the view.
  /* @ViewChildren(CourseCardComponent)
  cards; */

  // This returns a QueryList of all the CourseCardComponent instances in the view and assigns it to the cards property. You can use this to get all the child components of a specific type in the view.
  @ViewChildren(CourseCardComponent)
  cards : QueryList<CourseCardComponent>;
  // If you want to read dom elements in the returned QueryList, you can use the read option to specify the type of the elements you want to read. In this case, we are reading the ElementRef of the CourseCardComponent instances in the view.
  // @ViewChildren(CourseCardComponent, { read: ElementRef })
  // cards : QueryList<ElementRef>;

  constructor() {
  }

  // Life cycle hook that is called after the component's view has been fully initialized. This is where you can safely access the view child elements.
  ngAfterViewInit(): void {

    // Subscribe to an obervable on the QueryList of CourseCardComponent instances in the view. This will be called whenever the list of child components changes (e.g. when a new component is added or removed).
    // Only triggered when the list of child components changes, not when the properties of the child components change.
    this.cards.changes.subscribe((cards) => {
      console.log("cards changed", cards);
    }); 
    // Always avoid any data mutations in the ngAfterViewInit life cycle hook. If you need to update any data, use the ngAfterViewChecked life cycle hook instead.
    console.log("after view init", this.cards.first);
  }

  onCoursesEdited() {
    console.log('onCoursesEdited');
    this.courses.push({
      id: this.courses.length + 1,
      description: 'ADDED Angular Testing Course',
      iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/angular-testing.png',
      longDescription: 'Learn to unit test and e2e test your Angular apps using Jasmine, Karma and Protractor',
      category: 'Testing',
      lessonsCount: 10
    });
    // this.courses = [...this.courses, {
    /* this.courses = [
      ...this.courses,
      {
        id: 5,
        description: 'ADDED Angular Testing Course',
        iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/angular-testing.png',
        longDescription: 'Learn to unit test and e2e test your Angular apps using Jasmine, Karma and Protractor',
        category: 'Testing',
        lessonsCount: 10
      }
    ]; */
  }

  trackCourse(index: number, course: Course) {
    return course.id;
  }

  onCourseSelected(course: Course) {
    console.log(this.card1);
    console.log(this.card2);
    console.log(this.card3);
    console.log("Container Div:", this.containerDiv);
  }

}

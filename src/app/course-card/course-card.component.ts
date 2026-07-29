import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input({ required: true })
  course: Course;

  @Input({ required: true })
  index: number;

  // Used with old ngFor syntax example.
  @Input()
  cardIndex: number;

  @Output()
  courseSelected = new EventEmitter<Course>();

  //To get the contents of projected content, you cannot use ViewChild
  @ContentChild('courseImageDiv')
  image: ElementRef;

  onCourseViewed() {
    //console.log("Course viewed: " + this.course.description);
    this.courseSelected.emit(this.course);
  }

  ngAfterViewInit() {
    console.log("CourseCardComponent view initialized");
    console.log("Image element: ", this.image);
  }

  cardClasses() {
    if (this.course.category === 'BEGINNER') {
      return {
        'beginner': true
      }
    }
    /* return {
      'beginner': this.course.category === 'BEGINNER'
    } */
  }

  cardStyles() {

    return {
      'text-decoration': 'underline'
    }
  }
}

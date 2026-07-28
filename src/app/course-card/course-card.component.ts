import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  onCourseViewed() {
  console.log("Course viewed: " + this.course.description);
  this.courseSelected.emit(this.course);
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

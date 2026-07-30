import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { Course } from '../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';


@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input({ required: true })
  index: number;


  @Input()
  cardIndex: number;

  @Output()
  courseSelected = new EventEmitter<Course>();

  //To get the contents of projected content, you cannot use ViewChild. This queries a template reference to 'container'
  // @ContentChild('container')
  // image;

  // To get the contents of projected content as a component instance.
  @ContentChild(CourseImageComponent, { read: ElementRef })
  image : ElementRef;

  // To get the first index of a list of projected content.
  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images : QueryList<ElementRef>;

  // Must use this lifecycle hook to access the projected content when all content has been initialized. You cannot access it in the constructor or ngOnInit.
  AfterContentInit() {
    console.log("CourseCardComponent content initialized", this.image); 
    console.log("CourseCardComponent content initialized", this.images);

  }

  @Input({ required: true })
  course: Course;

  constructor() { }

  ngOnInit(): void {
    // initialization logic if needed
    console.log('CourseCardComponent initialized');
  }

  ngAfterContentInit(): void {
    console.log('CourseCardComponent content initialized');
  }

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

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class AppComponent {

    courses = COURSES;

    onCourseSelected(course: Course) {
        console.log("Card selected: " + course.description);
    }

}

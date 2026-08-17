import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../model/course';

@Pipe({
    name: 'filterByCategory',
    standalone: false,
    pure: true
})

/*
filterByCategory is a pure pipe. Pure pipes only recompute when the reference of an argument changes. this.courses[1].category = 'ADVANCED' doesn't reassign this.courses — same array reference — so courses | filterByCategory: 'BEGINNER' in app.component.html:18 just returns its memoized previous result. The *ngFor never re-diffs, so course index 1 isn't even dropped from the BEGINNER list.
*/
export class FilterByCategoryPipe implements PipeTransform {

    transform(courses: Course[], category: string): any[] {
        let filtered: Course[] = [];
        if (!courses) {
            return filtered;
        }
        filtered = courses.filter(course => course.category === category);
        console.log('filtered: ', filtered);
        return filtered;
    }

}
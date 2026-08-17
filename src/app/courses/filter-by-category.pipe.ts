import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../model/course';

@Pipe({
    name: 'filterByCategory',
    standalone: false
})
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
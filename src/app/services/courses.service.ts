import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs/internal/Observable';

let counter = 0;

@Injectable()
export class CoursesService {

  id:number;

  constructor(
    private http: HttpClient
  ) {
    counter++;
    this.id = counter;
    console.log("CoursesService instance created", this.id);
  }

  loadCourses() : Observable<Course[]> {
    const params = new HttpParams().set('pageNumber', '0').set('pageSize', '3');
    return this.http.get<Course[]>('/api/courses', { params });
  }

  saveCourse(course: Course) {
    // X-Auth is a custom header that we can use to send additional information to the server. In this case, we are sending the userId of the user who is making the request. This is useful for authentication and authorization purposes. The server can use this information to determine if the user is allowed to make the request or not.
    const header = new HttpHeaders().set('X-Auth', 'userId');

    return this.http.put(`/api/courses/${course.id}`, course, { headers: header });
  }

}

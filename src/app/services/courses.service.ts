import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs/internal/Observable';
// This insures we only create one instance of the service for the entire application. This is called a singleton service.
// It is injected in constructor of the component that needs it. The service is provided in the root injector of the application.
// Behind the scenes this creates a 'provider' for the service in the root injector of the application. The provider is responsible for creating an instance of the service and providing it to the component that needs it.
// It's possible to create your own provider for the service in a specific module or component. This is called a 'local provider'. The local provider will create a new instance of the service for that specific module or component. This is useful when you want to have different instances of the service for different parts of the application.
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {
  
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

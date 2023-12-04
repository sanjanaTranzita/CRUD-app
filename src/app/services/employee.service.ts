import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private logValuesKey = 'employeeServiceLogs';

  constructor(private _http: HttpClient) {}

  private logOperation(operation: string, id?: number): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      operation,
      id,
    };

    // Get existing logs from local storage or initialize an empty array
    let allLogs = JSON.parse(localStorage.getItem(this.logValuesKey) || '[]');

    // Add the new log entry
    allLogs.push(logEntry);

    // Save the updated logs back to local storage
    localStorage.setItem(this.logValuesKey, JSON.stringify(allLogs));
  }

  addEmployee(data: any): Observable<any> {
    const operation = 'Add Employee';
    this.logOperation(operation);
    return this._http.post('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    const operation = 'Update Employee';
    this.logOperation(operation, id);
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    const operation = 'Get Employee List';
    this.logOperation(operation);
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number): Observable<any> {
    const operation = 'Delete Employee';
    this.logOperation(operation, id);
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  getEmployeeLogs(): any[] {
    // Get logs from local storage
    return JSON.parse(localStorage.getItem(this.logValuesKey) || '[]');
  }
}

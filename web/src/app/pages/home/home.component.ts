import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IProject } from '../../components/timer/session.model';
import { AppConstant } from '../../app.constant';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  projects: IProject[] = [];
  projectName: string = '';
  // project!: IProject;
  constructor(private router: Router) {}

  ngOnInit() {
    this._getProjects()
  }

  onProjectClicked(project: any) {
    this.router.navigate(['/activity', project.UUID]);
  }

  createProject() {
    const projectExist = this.projects.filter(proj => proj.name === this.projectName).length > 0;

    if(projectExist) {
      return alert('Project already exists');
    }

    if (this.projectName.trim()) {
      const project: IProject = {
        UUID: crypto.randomUUID(),
        name: this.projectName,
        sessions: []
      }
      this.projects.push(project);
      this.pushLocal();
    }

    const cancelButton = document.querySelector('#projectModal .btn-secondary') as HTMLButtonElement;
    cancelButton.click();
  }

  pushLocal() {
    localStorage.setItem(AppConstant.PROJECT_KEY, JSON.stringify(this.projects))
  }

  private _getProjects() {
    const projects = localStorage.getItem(AppConstant.PROJECT_KEY);
    if(projects) {
      this.projects = JSON.parse(projects);
    }
  }
}

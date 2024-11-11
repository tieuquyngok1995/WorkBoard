import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventMountArg } from '@fullcalendar/core';

import { TaskComponent } from '../task/task.component';
import { TaskCalendarService } from './task-calendar.service';
import { TaskDialog, TaskModel } from '../../core/model/model';
import { DialogConfig } from '../../config/dialog-config.model';
import { ProgramMode, TaskPriority } from '../../core/enum/enums';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {

  // Setting calendar
  public calendarOptions: CalendarOptions;

  // Set data
  private listData: TaskModel[];
  private taskTypeMapping: { [key: number]: { icon: string; name: string } };

  /**
   * A constructor initializes a class's objects upon creation.
   */
  constructor(private readonly dialog: Dialog, private readonly calendarService: TaskCalendarService) {
    // Set data
    this.listData = [];
    this.taskTypeMapping = this.createTaskTypeMapping();
    // Setting calendar
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: { // Setting header
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      buttonText: { // Set text button header
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      initialDate: new Date(), // Date default
      navLinks: true,
      editable: false,
      events: [],
      eventDidMount: ({ event, el }: EventMountArg) => {
        // Add icon task
        const timeElement = el.querySelector('.fc-event-time') as HTMLElement;

        const iconElement = document.createElement('i');
        const titleElement = el.querySelector('.fc-event-title') as HTMLElement;

        // Add type
        const type = event.extendedProps['type'];
        if (type) {
          const typeMaping = this.taskTypeMapping[type];
          iconElement.classList.add('bi', typeMaping.icon);

          titleElement.textContent = ' ' + typeMaping.name + ' | ' + event.title
        }

        if (timeElement) {
          timeElement.style.display = 'none';
        }

        el.querySelector('.fc-event-title')?.prepend(iconElement);
        // Add event double click
        el.addEventListener('dblclick', () => {
          console.log(event.id)
          // Open diag task
          this.dialog.open(TaskComponent, {
            disableClose: true,
            minWidth: DialogConfig.DEFAULT_WIDTH,
            data: {
              mode: ProgramMode.READ,
              data: this.listData.find(obj => obj.id === +event.id)
            } as TaskDialog,
          })
        })
      }
    };
  }

  /**
   * On init page.
   */
  ngOnInit(): void {
    this.calendarService.getAllTask().subscribe(data => {
      if (data) {
        this.listData = data ?? [];
        this.calendarOptions = {
          events: data.map(item => ({
            id: item.id.toString(),
            title: item.moduleID,
            start: item.dateCreate ?? undefined,
            end: item.dateDelivery ?? undefined,
            type: item.type,
            backgroundColor: item.priority === TaskPriority.HIGH ? 'rgb(255 134 134)' : item.priority === TaskPriority.MEDIUM ? 'rgb(168 198 229)' : '#ffff'
          }))
        };
      }
    })
  }

  /**
   * Create mapping task type.
   * @returns 
   */
  private createTaskTypeMapping(): { [key: number]: { icon: string; name: string } } {
    return {
      0: { icon: 'bi-file-earmark-code', name: 'Coding' },
      1: { icon: 'bi-file-earmark-code', name: 'Review' },
      2: { icon: 'bi-file-earmark-code', name: 'Fix Bug' },
      3: { icon: 'bi-file-earmark-bar-graph', name: 'Testcase' },
      4: { icon: 'bi-file-earmark-bar-graph', name: 'Review' },
      5: { icon: 'bi-file-earmark-bar-graph', name: 'Fix Bug' },
      6: { icon: 'bi-file-earmark-medical', name: 'Testing' },
      7: { icon: 'bi-file-earmark-medical', name: 'Review' },
      8: { icon: 'bi-file-earmark-medical', name: 'Fix Bug' }
    }
  }
}
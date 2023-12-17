import { writable } from "svelte/store";
import { v4 as uuidV4 } from "uuid";
export type taskType = {
  id: string;
  name: string;
  satf: boolean;
  sata: boolean;
  sati: boolean;
};

export const taskDb = writable<taskType[]>([]);

// New task creation
export function addtask(event: KeyboardEvent) {
  if (event.key != "Enter") return;

  const taskel = event.target as HTMLInputElement;
  const name = taskel.value;
  const satf = false;
  const sati = false;
  const sata = false;
  const id = uuidV4();
  taskDb.update((tempTasks) => {
    tempTasks.push({ id, name, sata, satf, sati });
    return tempTasks;
  });
  taskel.value = "";
}

// Toggle archive, completed, starred
export function toggleFinished(id: string) {
  taskDb.update((tempTasks) => {
    tempTasks.forEach((e) => {
      if (e.id === id) {
        e.satf = !e.satf;
        if (e.satf === true){
          if (e.sata === true){e.sata = !e.sata}
          else if(e.sati === true){e.sati = !e.sati }
        }
      }
    });
    return tempTasks;
  });
}

// toggle archive
export function toggleArchived(id: string) {
  taskDb.update((tempTasks) => {
    tempTasks.forEach((e) => {
      if (e.id === id) {
        e.sata = !e.sata;
        if (e.sata === true){
          if (e.sati === true){e.sati = !e.sati}
          else if(e.satf === true){e.satf = !e.satf }
        }
      }
    });
    return tempTasks;
  });
}

export function togglePriority(id: string){
  taskDb.update((tempTasks) => {
    tempTasks.forEach((e) => {
      if(e.id === id) {
        e.sati = !e.sati;
        if (e.sati === true){
          if (e.sata === true){e.sata = !e.sata}
          else if(e.satf === true){e.satf = !e.satf }
        }
      }
    });
  return tempTasks;
  });
}

export function del(id: string){
  if (confirm("This task will be deleted!!")){
    taskDb.update((tempTasks) => 
  {tempTasks.forEach((e) => {
    if(e.id === id) {
      let i= tempTasks.indexOf(e);
      tempTasks.splice(i,1);
    }
  });
return tempTasks});
  }
}





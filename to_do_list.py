import tkinter as tk
from tkinter import ttk
import datetime

window = tk.Tk()
window.geometry('400x325')
window.title('To-do-list')

# heading
border_heading = tk.RAISED 
frm_heading = tk.Frame(master=window, relief=border_heading, borderwidth=10, bg="black")
frm_heading.pack(fill=tk.BOTH)
lbl_heading = tk.Label(master=frm_heading, text="To Do List")
lbl_heading.pack(fill=tk.BOTH)

# subheading / quote
border_quote = tk.SUNKEN
frm_quote = tk.Frame(master=window, relief=border_quote, borderwidth=10)
frm_quote.pack(fill=tk.BOTH)
lbl_quote = tk.Label(master=frm_quote, text=datetime.datetime.now().strftime("%A, %d %b %Y"), bg="black", fg="white")
lbl_quote.pack(fill=tk.BOTH)

# listbox for tasks
border_box = tk.RIDGE
frm_box = tk.Frame(master=window, relief=border_box, borderwidth=6)
frm_box.pack(fill=tk.BOTH)
listbox_tasks = tk.Listbox(master=frm_box, bg="black", fg="white", selectmode=tk.EXTENDED)
listbox_tasks.pack(side="left", expand=True, fill=tk.BOTH)

# scrollbar for listbox 
scrollbar = ttk.Scrollbar(master=frm_box, orient=tk.VERTICAL, command=listbox_tasks.yview)
listbox_tasks.config(yscrollcommand=scrollbar.set)
scrollbar.pack(side="left", fill=tk.Y)

# task entry
ent_task = tk.Entry()
question = tk.Label(text="Task:", bg="black", fg="white")
question.pack(fill=tk.BOTH)
ent_task.pack(fill=tk.BOTH)

# restoring data
with open("tasks.txt") as history: 
    data = history.readlines()
    for i in range(0, len(data)):
        if data[i] != '\n':
            listbox_tasks.insert("end", data[i])

                
# adding task to listbox
def handle_btn_add():
    if len(ent_task.get()) != 0:
        new_task = ent_task.get()
        listbox_tasks.insert("end", new_task)
        ent_task.delete(0, tk.END)

# deleting task from listbox
def handle_btn_delete():
    while len(listbox_tasks.curselection()) != 0:
        idx_list = listbox_tasks.curselection()
        index = idx_list[0]
        listbox_tasks.delete(index)

# saving tasks in listbox
def handle_btn_save():
    task_list = listbox_tasks.get(0, listbox_tasks.size())
    with open("tasks.txt", "w") as file:
        for task in task_list:
            file.write("%s\n" % task)

# Add button
btn_add = tk.Button(
    text="Add task",
    bg="black",
    fg="white",
    command=lambda: handle_btn_add()
)
btn_add.pack(side="left", expand=True, fill=tk.X)

# Delete button
btn_delete = tk.Button(
    text="Delete task",
    bg="black",
    fg="white",
    command=lambda: handle_btn_delete()
)
btn_delete.pack(side="left", expand=True, fill=tk.X)

# Save button
btn_save = tk.Button(
    text="Save list",
    bg="black",
    fg="white",
    command=lambda: handle_btn_save()
)
btn_save.pack(side="left", expand=True, fill=tk.X)

# When left mouse button pressed over add/delete/save task or change quote button
btn_add.bind("<Button-1>", handle_btn_add())
btn_delete.bind("<Button-1>", handle_btn_delete())
btn_save.bind("<Button-1>", handle_btn_save())

window.mainloop()
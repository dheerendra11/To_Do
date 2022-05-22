import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'

class AddTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskDesc : ''
        }
    }

    handleTaskTextChange(e){
        this.setState({
            taskDesc : e.target.value
        })
    }

    handleAddTaskClick(){
        this.props.handleToCollectTaskInfo(this.state.taskDesc);
        this.setState({
            taskDesc: ''
        })
    }

    render(){
        return(
            <form> 
                <input type = "text" value = {this.state.taskDesc} onChange= {(e) => this.handleTaskTextChange(e)}/>
                <input type = "button" value = "Add task" onClick = {() => this.handleAddTaskClick()} />
            </form>
        );
    }
}

class AddList extends React.Component{

    handleTaskclick(task){
        this.props.handleToCollectTaskclickInfo(task);
    }

    render(){
        let lists = [];
        for(let i = 0; i < this.props.tasks.length; i++){
            let task = this.props.tasks[i];
            let spanaction;
            if(task.isFinished){
                spanaction = (
                    <span class="material-icons" onClick={() => this.handleTaskclick(task.desc)}>done</span>
                );
            }else{
                spanaction = (
                    <span class="material-icons" onClick={() => this.handleTaskclick(task.desc)}>pending_actions</span>
                );
            }

            let listItem = (
                <div key = {i}>
                    <span>{task.desc}</span>
                    {spanaction}
                </div>
            );
            lists.push(listItem);
        }

        return(
            <div className={this.props.forStyling}>
                <div className='list-container'> 
                    <div className='title'>{this.props.purpose}</div>
                    <div className = 'content'>{lists}</div>
                </div> 
            </div>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            tasks: []
        }
    }
    
    handleNewTask(taskDesc){
        let oldTasks = this.state.tasks.slice();
        oldTasks.push({
            desc : taskDesc,
            isFinished: false
        });

        this.setState({
            tasks: oldTasks
        })
    }

    handlestatus(task, newstatus){
        let oldTasks = this.state.tasks.slice();
        
        let taskItem = oldTasks.find(ot => ot.desc === task);
        taskItem.isFinished = newstatus;
        this.setState({
            tasks: oldTasks
        })
    }

    render(){
        let tasks = this.state.tasks;
        let todo = tasks.filter(t => t.isFinished === false);
        let donetask = tasks.filter(t => t.isFinished === true);

        return (
            <>
                <div className='add-task'>
                    <AddTask handleToCollectTaskInfo = {(taskDesc) => this.handleNewTask(taskDesc)}/>
                </div>
                <div className='task-lists'>
                    <AddList handleToCollectTaskclickInfo={(task) => this.handlestatus(task, true)} tasks={todo} purpose = "To-do" forStyling = "todo" />
                    <AddList handleToCollectTaskclickInfo={(task) => this.handlestatus(task, false)} tasks={donetask} purpose = "Finished" forStyling = "finished"/>
                </div>
            </>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));


